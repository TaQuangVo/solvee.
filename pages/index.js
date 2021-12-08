import styles from '../styles/Home.module.css'
import HeroSection from "../components/HeroSection"
import VisionSection from "../components/VisionSection"



export default function Home() {
  return (
      <div className={styles.container + " " + "scrollContainer"} data-scroll-container>
        <main className={styles.main}>
          <HeroSection />
          <VisionSection />
          <div className= {styles.text}>
            <h2>hello</h2>
          </div>  
        </main>
      </div>
  )
}
