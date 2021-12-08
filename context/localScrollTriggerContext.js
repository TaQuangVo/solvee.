import { createContext, useEffect, useRef, useState } from 'react'

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