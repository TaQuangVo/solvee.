import { extend } from "@react-three/fiber"
import * as THREE from "three"

class ImageMaterial extends THREE.ShaderMaterial{
    constructor(){
        super({
            uniforms:{
                uPosition:{value:new THREE.Vector2(0,0)},
                uScale:{value:new THREE.Vector2(1,1)},
                uScreenSize:{value:new THREE.Vector2(1,1)},
                uVelocity:{value: 0}
            },
            vertexShader:`
                uniform vec2 uScale;
                uniform vec2 uScreenSize;
                uniform vec2 uPosition;

                void main(){
                    vec3 pos = position;

                    pos.xy *= uScale;
                    pos.x = pos.x - uScreenSize.x/2. + uScale.x/2.;
                    pos.y = pos.y + uScreenSize.y/2. - uScale.y/2.;
                    pos.xy += uPosition;

                    

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader:`
                void main(){

                    gl_FragColor = vec4(1., 1., 0. , 1.);
                }
            `,
        })
    }
}

extend({ImageMaterial})