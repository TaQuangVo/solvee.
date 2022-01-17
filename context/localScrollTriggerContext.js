import { createContext, useEffect, useRef, useState, use } from 'react'

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export const localScrollTriggerContext = createContext({
    scroll: null,
    isReady: false
});


export default function ScrollTriggerProvider({children}){

    

    const scroll = useRef(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(async()=>{
        if (typeof window === "undefined") return

        const LocomotiveScroll = await import("locomotive-scroll")

        scroll.current =  new LocomotiveScroll.default({
        el: document.querySelector('.scrollContainer'),
        smooth: true,
        multiplier: 0.5,
        getSpeed:true,
        });

        //handle refresh
        const viewPortwidth = window.innerWidth
        let isDefaultResizeFunc = true;

        if(viewPortwidth < 500){
            console.log(viewPortwidth)
            ScrollTrigger.config({
                autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
            });
            isDefaultResizeFunc = false;
        }

        const lastResizedHeight = window.innerHeight
        const handleResize = (e) => {
            viewPortwidth = window.innerWidth
            if(viewPortwidth > 500 && !isDefaultResizeFunc){
                console.log(viewPortwidth)
                ScrollTrigger.config({
                    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
                });
                ScrollTrigger.update()
                isDefaultResizeFunc = true
                return;
            }

           if(viewPortwidth < 500 && isDefaultResizeFunc){
                ScrollTrigger.config({
                    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
                });
                ScrollTrigger.update()
           }

            const currentHeight = window.innerHeight
            if(Math.abs(currentHeight-lastResizedHeight) < 30) return

            lastResizedHeight = currentHeight;
            ScrollTrigger.update()
            

        }
        window.addEventListener("resize", handleResize)

        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        scroll.current.on("scroll", () => {
            ScrollTrigger.update()
        });
        ScrollTrigger.scrollerProxy(".scrollContainer", {
        scrollTop(value) {
            return arguments.length ? scroll.current.scrollTo(value, 0, 0) : scroll.current.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
        });
        ScrollTrigger.addEventListener("refresh", () => scroll.current.update());
        ScrollTrigger.refresh();

        setIsReady(true);

        return () => {
            scroll.current?.destroy()
            window.removeEventListener("resize", handleResize)
            setIsReady(false)
        }

    },[]);
    


    return(
        <localScrollTriggerContext.Provider value={{
            scroll: scroll.current,
            isReady: isReady
        }}>
            {children}
        </localScrollTriggerContext.Provider>
    )
}