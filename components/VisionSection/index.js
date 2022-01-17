import style from "./style.module.css"
import { useEffect, useContext } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {localScrollTriggerContext} from "../../context/localScrollTriggerContext"
gsap.registerPlugin(ScrollTrigger);


export default function index() {

    const {scroll, isReady} = useContext(localScrollTriggerContext)

    useEffect(()=>{

        if(!isReady) return

            const sectionLength = document.querySelector(".vision-scroller").clientWidth

            const padding = document.querySelector(".vision-padding")
            padding.style.height = `${sectionLength}px`
            padding.style.width = `100vw`

            const container = document.querySelector(".vision-container")
            const WdHeight = window.innerHeight
            container.style.height = `${WdHeight}px`

            gsap.timeline({
                scrollTrigger:{
                     trigger:".vision-section",
                     scroller:".scrollContainer",
                     scrub:true,
                     pin: ".vision-scroller",
                     start:"0% 0%",
                     end:"100% 100%",
                     id:"vistionTrigger",
                },
            }).to(".vision-scroller", {
                x: -sectionLength,
                ease:"none",
                overwrite: true,
            })


    },[isReady])

    return (
        <section className={"vision-section"} >
            <div className={style.container + " " + "vision-container"} >
                <div className={style.scroller + " " + "vision-scroller"}>
                    <div className={style.contentWraper}>
                        <div className={style.header}>
                            <span>Solvee</span>
                            <h2>Vision<span>.</span></h2>
                        </div>
                        <div className={style.visionItem}>
                            <div className={style.imageCover + " " + "visionImage"} id="creativeImage">
                                <img src="./vision/creative.jpg" />
                            </div>
                            <div className={style.content}>
                                <h3>Creative</h3>
                                <p>To Be Creative On Every Solution</p>
                                <span>Explore</span>
                            </div>
                            <span className={style.line}></span>
                        </div>
                        <div className={style.visionItem}>
                            <div className={style.imageCover + " " + "visionImage"} id="innovativeImage">
                                <img src="./vision/creative.jpg" />
                            </div>
                            <div className={style.content}>
                                <h3>Innovative</h3>
                                <p>Using Of Inovation Technologies</p>
                                <span>Explore</span>
                            </div>
                            <span className={style.line}></span>
                        </div>
                        <div className={style.visionItem}>
                            <div className={style.imageCover + " " + "visionImage"} id="accessibleImage">
                                <img src="./vision/creative.jpg" />
                            </div>
                            <div className={style.content}>
                                <h3>Accessible</h3>
                                <p>Bring Everyone Access To The Most Resent Technologies</p>
                                <span>Explore</span>
                            </div>
                            <span className={style.line}></span>
                        </div>
                        <div className={style.titles}>
                            <h2>We <span>Design.</span></h2>
                            <h2>We <span>Develop.</span></h2>
                            <h2>We <span>Inspire.</span> </h2>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <h5>Creative  -  Inovative  -  Accessible</h5>
                    </div>
                </div>
            </div>
            <div className={style.visionPadding + " " + "vision-padding"}></div>
        </section>
    )
}


