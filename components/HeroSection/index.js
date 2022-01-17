import style from "./style.module.css"
import { useEffect, useContext } from 'react';
import { gsap } from "gsap/dist/gsap";
import { useRouter } from 'next/router'

import {localScrollTriggerContext} from "../../context/localScrollTriggerContext"

export default function HeroSection() {

    const {scroll, isReady} = useContext(localScrollTriggerContext)
    const router = useRouter()

    useEffect(()=>{
        if(!isReady) return

        const tl = gsap.timeline({
          defaults:{ease:"back"},
          onStart:()=>{
            document.body.classList.add("hiddenOverflow")
            scroll.stop()
          },
          onComplete:()=>{
            document.body.classList.remove("hiddenOverflow")
            scroll.start()
          }
        });

        const introTextColor = getComputedStyle(document.documentElement).getPropertyValue('--intro-text-color')
        const introTitleBackground = getComputedStyle(document.documentElement).getPropertyValue('--intro-title-background')
    
    
        tl.to(".intro-title", {
          color:introTextColor,
          duration:1.5
        }, 0.2)
        .to(".intro", {
          backgroundColor: introTitleBackground,
          duration:.5
        }, 2.5)
        .to(".intro-title", {
          color:introTitleBackground,
          duration: .5
        }, 2.5)
        .to(".intro", {
          opacity:0,
          duration:0,
        })
        .from(".hero-title h2", {
          opacity:0,
          x:50,
          stagger:.1,
        })
        .to(".hero-title", {
          opacity:0,
          duration:.2,
        })
      
      },[isReady]);

      const handleOnClick = (href) => {
        router.push(href)
      }

    return (
        <section className={style.container + " " + "herocentionSection"} >
            <div className={style.intro + " " + "intro"} data-scroll>
                <h3 className={"intro-title"}>SOLVEE SOLUTION</h3>
            </div>
            <div className={style.titles + " " + "hero-title"} data-scroll>
                <div>
                <h2>Website.</h2>
                <h2>Web-app.</h2>
                <h2>Design.</h2>
                <h2>Mobile-app.</h2>
                <h2>System.</h2>
                </div>
            </div>
            <div className={style.subscription + " " + "subscription" } data-scroll >
                <div className={style.subsWrap + " " + "heroSolusions"} >
                    <div><h3><span>Solvee</span>Solutions</h3></div>
                    <div><h1><span>FULLSTACK</span>-developer</h1></div>
                    <div><p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen. 
                    </p></div>
                    <div><button>Let cooperate</button></div>
                </div>
                <div className={style.subSpace}></div>
                <div className={style.subsWrap + " " + "heroWebsite" + " " +  "subscripAnimate"}>
                    <div><h3><span>Solvee</span>Solutions</h3></div>
                    <div><h1><span>Website</span>-Development</h1></div>
                    <div><p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen. 
                    </p></div>
                    <div><button>Let cooperate</button></div>
                </div>
                <div className={style.subSpace}></div>
                <div className={style.subsWrap + " " + "heroWebapp" + " " +  "subscripAnimate"} >
                    <div><h3><span>Solvee</span>Solutions</h3></div>
                    <div><h1><span>Web</span>-Application</h1></div>
                    <div><p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen. 
                    </p></div>
                    <div><button>Let cooperate</button></div>
                </div>
                <div className={style.subSpace}></div>
                <div className={style.subsWrap + " " + "heroDesign" + " " +  "subscripAnimate"} >
                    <div><h3><span>Solvee</span>Solutions</h3></div>
                    <div><h1><span>UI/UX</span>-Design</h1></div>
                    <div><p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen. 
                    </p></div>
                    <div><button>Let cooperate</button></div>
                </div>
                <div className={style.subSpace}></div>
                <div className={style.subsWrap + " " + "heroMobile" + " " +  "subscripAnimate"} >
                    <div><h3><span>Solvee</span>Solutions</h3></div>
                    <div><h1><span>Mobile</span>-Application</h1></div>
                    <div><p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen. 
                    </p></div>
                    <div><button>Let cooperate</button></div>
                </div>
                <div className={style.subSpace}></div>
                <div className={style.subsWrap + " " + "heroSystem" + " " +  "subscripAnimate"} >
                    <div><h3><span>Solvee</span>Solutions</h3></div>
                    <div><h1><span>System</span>-Development</h1></div>
                    <div><p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen. 
                    </p></div>
                    <div><button onClick={() => handleOnClick("/about")}>Let cooperate</button></div>
                </div>
                <div className={style.subSpace}></div>
                <div className={style.trailing + " " + "heroTrailing"}></div>
            </div>
        </section>
    )
}
