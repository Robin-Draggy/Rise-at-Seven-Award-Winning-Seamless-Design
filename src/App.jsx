import { useState } from "react"
import PageLoader from "./components/loader/PageLoader"
import TopBar from "./components/bar/TopBar"
import Button from "./components/buttons/Button"
import Hero from "./pages/Hero"
import Marquee from "./pages/Marquee"
import Descovery from "./pages/Descovery"
import TextMarquee from "./pages/TextMarquee"
import HoverGallery from "./pages/HoverGallery"
import Footer from "./pages/Footer"

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
      <TextMarquee />
      <HoverGallery />
      <Footer />      
    </div>
    </>
  )
}

export default App
