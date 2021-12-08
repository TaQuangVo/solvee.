import style from "./style.module.css"
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";



export default function index() {



    useEffect(() => {

        gsap.to(".bftScroll", {
            xPercent:-90,
            duration:1200,
            yoyo:true,
            repeat:-1,
            ease:"none"
        })

    })

    return (
        <div className={style.container}>
            <div className={style.scroller}>
                <div className={"bftScroll"}>
                    <h5>
                    CREATIVE - INOVATIVE - ACCESSIBLE - CREATIVE - INOVATIVE - ACCESSIBLE - CREATIVE - INOVATIVE - ACCESSIBLE - CREATIVE - INOVATIVE - ACCESSIBLE - CREATIVE - INOVATIVE - ACCESSIBLE - CREATIVE - INOVATIVE - ACCESSIBLE - CREATIVE
                    </ h5>
                </div>
            </div>
        </div>
    )
}
