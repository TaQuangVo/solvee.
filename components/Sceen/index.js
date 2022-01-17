import { Canvas, render } from '@react-three/fiber'
import { Suspense } from 'react'
import {useState, useEffect} from 'react'



import PlaneMesh from './plane/planeMesh'
import ImageMesh from './images/mesh'
import BackgroundText from "../BackgroundText"

import { createContext, useContext } from 'react'
import {localScrollTriggerContext} from "../../context/localScrollTriggerContext"


export const scrollContextForward = createContext({
    scroll: null,
    isReady: false
})

const ImageMeshWrap = () => {
    const [isMobile, setisMobile] = useState(false)


    useEffect(() => {

        if(window.innerWidth < 500 && !isMobile){
            setisMobile(true)
        }
        if(window.innerWidth > 500 && isMobile){
            setisMobile(false)
        }
    },[])

    if(isMobile){
        return <></>
    }

    return (
        <Suspense fallback={null}>
            <ImageMesh imageId="creativeImage" textureUrl="./vision/accessive.jpg"/>
            <ImageMesh imageId="innovativeImage" textureUrl="./vision/creative.jpg"/>
            <ImageMesh imageId="accessibleImage" textureUrl="./vision/innovative.jpg"/>
        </Suspense>
    )
}


export default function index() {
    const contextVal = useContext(localScrollTriggerContext)

    return (
        <div className={"main-canvas"}>
            <BackgroundText />
            <Canvas>
                <scrollContextForward.Provider value={contextVal}>
                    <Suspense fallback={null}>
                        <PlaneMesh />
                    </Suspense>
                    <ImageMeshWrap />
                </scrollContextForward.Provider>
            </Canvas>
        </div>
    )
}
