import { extend } from "@react-three/fiber"
import * as THREE from "three"

class ImageMaterial extends THREE.ShaderMaterial{
    constructor(){
        super({
            uniforms:{
                uPosition:{value:new THREE.Vector2(0,0)},
                uScale:{value:new THREE.Vector2(1,1)},
                uScreenSize:{value:new THREE.Vector2(1,1)},
                uSpeed:{value:0},
                uVelocity:{value: 0},
                uTexture:{value:null},
            },
            vertexShader:`
                uniform vec2 uScale;
                uniform vec2 uScreenSize;
                uniform vec2 uPosition;
                uniform float uSpeed;
                varying vec2 vUv;
                varying float vSpeed;
                
                


                void main(){
                    vUv = uv;
                    vSpeed = uSpeed * 0.002;
                    vec3 pos = position;

                    pos.x -= sin(vUv.y * 3.1415) * uSpeed * 0.002;

                    pos.xy *= uScale;
                    pos.x = pos.x - uScreenSize.x/2. + uScale.x/2.;
                    pos.y = pos.y + uScreenSize.y/2. - uScale.y/2.;
                    pos.xy += uPosition;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
                }
            `,
            fragmentShader:`
                varying vec2 vUv;
                uniform sampler2D uTexture;
                varying float vSpeed;

                vec3 rgbShift(sampler2D textureImage, vec2 uv, float offset) {
                    float uvXCalc = uv.x - offset;
  
                    float r = texture2D(textureImage, vec2(uvXCalc,uv.y)).r;
                    vec2 gb = texture2D(textureImage,uv).gb;
  
                    return vec3(r,gb);
                  }

                void main(){

                    vec3 col = rgbShift(uTexture, vUv, vSpeed);

                    gl_FragColor = vec4(col, 1.);
                }
            `,
        })
    }
}

extend({ImageMaterial})