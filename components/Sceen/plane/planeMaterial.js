import { extend } from "@react-three/fiber"
import * as THREE from "three"


class PlaneMaterial extends THREE.ShaderMaterial{
    constructor(){
        super({
            uniforms:{
                uScale: {value: new THREE.Vector2(2,1)},

                uZoomProgress: {value: 0},
                uTransistionProgress: {value:0},

                uTexture1:{value:undefined},
                uTexture2:{value:undefined},

                uSwichCurrent:{value:0},
                uSwichProgress:{value:0},

                uHeroTextureSize: {value: new THREE.Vector2(1,1)},
                uTime: {value: 0},
            },
            vertexShader:`
                vec3 mod289(vec3 x) {
                    return x - floor(x * (1.0 / 289.0)) * 289.0;
                  }
                  
                  vec4 mod289(vec4 x) {
                    return x - floor(x * (1.0 / 289.0)) * 289.0;
                  }
                  
                  vec4 permute(vec4 x) {
                       return mod289(((x*34.0)+1.0)*x);
                  }
                  
                  vec4 taylorInvSqrt(vec4 r)
                  {
                    return 1.79284291400159 - 0.85373472095314 * r;
                  }
                  
                  float snoise(vec3 v)
                    {
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                  
                  // First corner
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 =   v - i + dot(i, C.xxx) ;
                  
                  // Other corners
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                  
                    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
                    //   x1 = x0 - i1  + 1.0 * C.xxx;
                    //   x2 = x0 - i2  + 2.0 * C.xxx;
                    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
                  
                  // Permutations
                    i = mod289(i);
                    vec4 p = permute( permute( permute(
                               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                  
                  // Gradients: 7x7 points over a square, mapped onto an octahedron.
                  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                    float n_ = 0.142857142857; // 1.0/7.0
                    vec3  ns = n_ * D.wyz - D.xzx;
                  
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
                  
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
                  
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                  
                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );
                  
                    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                  
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                  
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                  
                  //Normalise gradients
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;
                  
                  // Mix final noise value
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                                  dot(p2,x2), dot(p3,x3) ) );
                    }

                    uniform vec2 uScale;
                    uniform float uTime;

                    uniform float uZoomProgress;
                    uniform float uTransistionProgress;

                    varying vec2 vUv;
                    varying float vPosZ;
                    varying float vTransistionProgress;


                void main(){

                    float Amp = .5;
                    float ZPosition = .8;
                    float MeshScale = .4;


                    vec3 pos = position;

                    float noiseFreq = 1.5;
                    float noiseAmp = 1.;
                    vec3 noisePos = vec3(pos.x*noiseFreq+uTime, pos.y, pos.z);
                    pos.z += snoise(noisePos) * noiseAmp * Amp * uZoomProgress;

                    //handle whole mesh scale
                    pos.xy *= uScale;
                    vec3 fullscreenPos = vec3(pos.xy, 0);
                    pos.xy *= 1. - MeshScale * uZoomProgress;
                    pos.y += ZPosition * uZoomProgress;

                    //handle mesh transistion
                    float activation = 1. - uv.x;

                    float lastToTransform = 0.5;
                    float startAt = activation * lastToTransform;
                    float progress = smoothstep(startAt, 1.0, uTransistionProgress);

                    //fliped
                    float flippedX = -pos.x;
                    pos.x = mix(pos.x,flippedX, progress);
                    pos.z += progress * 0.001;

                    vec3 transformedPos = pos + (fullscreenPos - pos) * progress;


                    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0);

                    vPosZ = transformedPos.z;
                    vTransistionProgress = uTransistionProgress;
                    vUv = uv;
                }
            `,
            fragmentShader:`
                uniform sampler2D uSolutionTxr;
                uniform sampler2D uWebsiteTxr;
                uniform sampler2D uWebappTxr;
                uniform sampler2D uDesignTxr;
                uniform sampler2D uMobileTxr;
                uniform sampler2D uSystemTxr;

                uniform sampler2D uTexture1;
                uniform sampler2D uTexture2;
                uniform float uSwichProgress;

                uniform vec2 uScale;
                uniform vec2 uHeroTextureSize;
                varying vec2 vUv;
                varying float vPosZ;
                varying float vTransistionProgress;

                vec2 getUv (vec2 uv, vec2 planeSize, vec2 textureSize) {
                    
                    float textureRatio = textureSize.x / textureSize.y;
                    float planeX = planeSize.y * textureRatio;
                    float ratioX = planeSize.x / planeX; 

                    float offsett = planeX - planeSize.x;
                    float offsettRatio = offsett / planeX / 2.;

                    return vec2(
                        uv.x * ratioX + offsettRatio,
                        uv.y
                    );
                }

                vec3 rgbShift(sampler2D textureImage1, sampler2D textureImage2, vec2 uv, float offset, float progress) {

                  vec2 uvCalc = min(uv + offset, 1.);
                  uvCalc = max(uvCalc, 0.);
                  

                  float r1 = texture2D(textureImage1, uvCalc).r;
                  vec2 gb1 = texture2D(textureImage1,uv).gb;

                  float r2 = texture2D(textureImage2, uvCalc).r;
                  vec2 gb2 = texture2D(textureImage2, uv).gb;

                  vec3 finalTexture = mix(vec3(r1,gb1), vec3(r2, gb2), progress);

                  return finalTexture;
                }

                void main(){
                    vec2 uv = getUv(vUv, uScale, uHeroTextureSize);
                    float z = vPosZ * 0.007;

                    vec3 rgb = rgbShift(uTexture1, uTexture2, uv, z, uSwichProgress);

                    float progress = min(vTransistionProgress*1.2, 1.);

                    vec3 finalRgb = mix(rgb, vec3(246./255., 246./255., 246./255.), progress);

                    //vec3 gradient = mix(vec3(214.0/255.0, 109.0/255.0, 255.0/255.0), vec3(253.0/255.0, 137.0/255.0, 191.0/255.0), vUv.x);


                    gl_FragColor = vec4(finalRgb, 1);
                }
            `
        })
    }
}

extend({PlaneMaterial})