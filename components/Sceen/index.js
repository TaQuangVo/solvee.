import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'


import PlaneMesh from './plane/planeMesh'
import ImageMesh from './images/mesh'
import BackgroundText from "../BackgroundText"

import { createContext, useContext } from 'react'
import {localScrollTriggerContext} from "../../context/localScrollTriggerContext"


export const scrollContextForward = createContext({
    scroll: null,
    isReady: false
})


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
                    <Suspense fallback={null}>
                        <ImageMesh imageId="creativeImage" />
                        <ImageMesh imageId="innovativeImage" />
                        <ImageMesh imageId="accessibleImage" />
                    </Suspense>
                </scrollContextForward.Provider>
            </Canvas>
        </div>
    )
}
