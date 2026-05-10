import { useState } from "react"
import PageLoader from "./components/loader/PageLoader"
import TopBar from "./components/bar/TopBar"
import Hero from "./pages/Hero"
import Marquee from "./pages/Marquee"
import Descovery from "./pages/Descovery"
import TextMarquee from "./pages/TextMarquee"
import HoverGallery from "./pages/HoverGallery"
import Footer from "./pages/Footer"
import ScrollTextSection from "./pages/ScrollTextSection"
import AnimatedText from "./components/animatedLinks/AnimatedText"
import StackedCards from "./pages/StackedCards"
import Services from "./pages/Services"
import FeaturedWorks from "./pages/FeaturedWorks"

function App() {

  const [loading, setLoading] = useState(false)

  return (
    <>
    <PageLoader />
    <div className="my-2.5 mx-2 space-y-2 overflow-x-hidden">
      <TopBar />
      <Hero />
      <Marquee />
      <Descovery />
      <div className="mx-5">
      {/* <FeaturedWorks /> */}
      </div>
      <Services />
      <TextMarquee />
      <StackedCards />
      <HoverGallery />
      {/* <AnimatedText /> */}
      {/* <ScrollTextSection /> */}
      <Footer />      
    </div>
    </>
  )
}

export default App
