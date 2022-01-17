import { useRef, useEffect, useContext } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import "./planeMaterial"
import { Vector2 } from 'three';
import { TextureLoader } from 'three'

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import {scrollContextForward} from "../index"






export default function PlaneMesh() {
    const planeMaterialRef = useRef(null)
    const sceen = useThree();
    const {scroll, isReady} = useContext(scrollContextForward)



    const [solution, website, design, webapp, mobile, system] = useLoader(TextureLoader, [
        '/solvee/solutions.jpg',
        '/solvee/website.jpg',
        '/solvee/design.jpg',
        '/solvee/webapp.jpg',
        '/solvee/mobile.jpg',
        '/solvee/system.jpg',
      ])

    const getHeightToWidthRatia = () => {
        return window.innerHeight / window.innerWidth;
    }

    const getVirtualScreenSize = () => {
        const cameraPosZ = sceen.camera.position.z 
        const cameraFov = sceen.camera.fov * Math.PI / 180

        const heightToWidthRatia = getHeightToWidthRatia();

        const height = Math.tan(cameraFov/2) * cameraPosZ * 2;
        const width = height / heightToWidthRatia
        
        return {
            height,
            width,
        }
    }


    const updateSceen = () => {
        const virtualScreenSize = getVirtualScreenSize()

        planeMaterialRef.current.uniforms.uHeroTextureSize.value = new Vector2(solution.image.width, solution.image.height)
        planeMaterialRef.current.uniforms.uScale.value = new Vector2(virtualScreenSize.width, virtualScreenSize.height)
    }

    const swichTexture = ( toTexture ) => {

        if(planeMaterialRef.current.uniforms.uSwichCurrent.value == 0){
            planeMaterialRef.current.uniforms.uTexture2.value = toTexture
        }else{
            planeMaterialRef.current.uniforms.uTexture1.value = toTexture;
        }

        gsap.to(planeMaterialRef.current.uniforms.uSwichProgress, {
            overwrite:true,
            value: planeMaterialRef.current.uniforms.uSwichCurrent.value == 1 ? 0 : 1,
            duration: 0.3
        })
        planeMaterialRef.current.uniforms.uSwichCurrent.value = !planeMaterialRef.current.uniforms.uSwichCurrent.value;
    }

    useEffect(() => {

        if(!isReady) return

        updateSceen();
        planeMaterialRef.current.uniforms.uTexture1.value = solution;

        const tl = gsap.timeline({
            scrollTrigger:{
                //animation:tl,
                trigger:".heroSolusions",
                scroller:".scrollContainer",
                scrub:true,
                start:"0% 100%",
                end:"100% 100%"
            },
        })
        .to(planeMaterialRef.current.uniforms.uZoomProgress, {
            value: 1,
        })

        const CanvasVisionTransform = gsap.timeline({
            scrollTrigger:{
                trigger:".vision-container",
                scroller:".scrollContainer",
                scrub:true,
                start:"0% 100%",
                end:"100% 100%",
            }
        }).to(planeMaterialRef.current.uniforms.uTransistionProgress, {
            value: 1
        })




        const scrolltringerOps = (trigger) => {
            return {
                scroller:".scrollContainer",
                trigger:trigger,
                scrub:true,
                start:"50% 100%",
                end:"100% 100%",
            }
        }
        const solutionFadeout = gsap.timeline({
            scrollTrigger:scrolltringerOps(".heroWebsite"),
            onStart:() => {},
            onComplete: () => {swichTexture(website)},
            onReverseComplete: () => {swichTexture(solution)},
        })
        .to(".heroSolusions", {
            opacity: 0
        })
        //website fadout
        const websiteFadeout = gsap.timeline({
            scrollTrigger:scrolltringerOps(".heroWebapp"),
            onStart:() => {},
            onComplete: () => {swichTexture(webapp)},
            onReverseComplete: () => {swichTexture(website)},
        })
        .to(".heroWebsite", {
            opacity: 0
        })
        //web app fadout
        const webAppFadeout = gsap.timeline({
            scrollTrigger:scrolltringerOps(".heroDesign"),
            onStart:() => {},
            onComplete: () => {swichTexture(design)},
            onReverseComplete: () => {swichTexture(webapp)},
        })
        .to(".heroWebapp", {
            opacity: 0
        })
        //web design fadout
        const designFadeout = gsap.timeline({
            scrollTrigger:scrolltringerOps(".heroMobile"),
            onStart:() => {},
            onComplete: () => {swichTexture(mobile)},
            onReverseComplete: () => {swichTexture(design)},
        })
        .to(".heroDesign", {
            opacity: 0
        })
        //mobile fadout
        const mobileFadeout = gsap.timeline({
            scrollTrigger:scrolltringerOps(".heroSystem"),
            onStart:() => {},
            onComplete: () => {swichTexture(system)},
            onReverseComplete: () => {swichTexture(mobile)},
        })
        .to(".heroMobile", {
            opacity: 0
        })
        //system fadeout
        const systemFadeout = gsap.timeline({
            scrollTrigger:scrolltringerOps(".heroTrailing"),
            onStart:()=>{},
            onComplete:()=>{},
            onEnterBack:()=>{console.log("on enterBack")},
            onReverseComplete:()=>{}
        }).to(".heroSystem", {
            opacity: 0
        })


        //animate entering of subs
        document.querySelectorAll(".subscripAnimate").forEach(el => {
            gsap.timeline({
                scrollTrigger:{
                    scroller:".scrollContainer",
                    trigger:el,
                    start:"100% 110%",
                }
            }).from(el.querySelectorAll("div"),{
                duration:.3,
                stagger:.1,
                opacity:0,
                y:20
            })
        })


        
    }, [])

    useFrame(({clock}) => {
        planeMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    })


    return (
        <mesh>
            <planeBufferGeometry args={[1,1,50,50]}/>
            <planeMaterial ref={planeMaterialRef} wireframe={false}/>
        </mesh>
    )
}
