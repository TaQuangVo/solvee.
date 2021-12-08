import "./material"
import { useRef, useEffect, useContext } from "react"
import { useThree } from "@react-three/fiber"
import {scrollContextForward} from "../index"


export default function ImageMesh({imageId}) {
    const materialRef = useRef(null)
    const Sceen = useThree();
    const {scroll, isReady} = useContext(scrollContextForward)

    let isFullScreen = false;
    let isAnimating = false;

    const getScreenSize = () => {
        const cameraPosZ = Sceen.camera.position.z - 1;
        const cameraAspect = Sceen.camera.aspect;
        const cameraFov = Sceen.camera.fov * (Math.PI / 180);

        const height = cameraPosZ * Math.tan(cameraFov / 2) * 2;
        const width = height * cameraAspect;

        return {
            width: width,
            height: height
        }
    }

    const updateMesh = (el) => {
        const sizes = el.getBoundingClientRect()
        const sceenSizes = getScreenSize()



        const elHeight = sizes.height;
        const elWidth = sizes.width;
        const windowSizeX = window.innerWidth;

        const sceenToWinRatio = sceenSizes.width / windowSizeX;
        
        const meshScaleX = elWidth * sceenToWinRatio;
        const meshScaleY = elHeight * sceenToWinRatio;

        const meshPosX = sizes.left * sceenToWinRatio;
        const meshPosY = -sizes.top * sceenToWinRatio;

        materialRef.current.uniforms.uPosition.value.set(meshPosX, meshPosY)
        materialRef.current.uniforms.uScale.value.set(meshScaleX, meshScaleY)
        materialRef.current.uniforms.uScreenSize.value.set(sceenSizes.width, sceenSizes.height)
    }

    useEffect(()=>{
        if(!isReady) return

        updateMesh(document.getElementById(imageId))

        scroll.on("scroll", (state) => {
            updateMesh(document.getElementById(imageId));
        });

    },[isReady])

    return (
        <mesh position={[0,0,1]}>
            <planeBufferGeometry args={[1,1]}/>
            <imageMaterial ref={materialRef} />
        </mesh>
    )
}
