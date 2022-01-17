import styles from '../styles/Home.module.css'
import HeroSection from "../components/HeroSection"
import VisionSection from "../components/VisionSection"
import ScrollTriggerProvider from "../context/localScrollTriggerContext"
import Sceen from "../components/Sceen"



export default function Home() {
  return (
    <ScrollTriggerProvider>
      <Sceen />
      <div className={styles.container + " " + "scrollContainer"} data-scroll-container>
        <main className={styles.main}>
          <HeroSection />
          <VisionSection />
          <div className= {styles.text}>
            <h2>Work With Us</h2>
          </div>  
        </main>
      </div>
    </ScrollTriggerProvider>
  )
}
