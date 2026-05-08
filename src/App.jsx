import { useState } from "react"
import PageLoader from "./components/loader/PageLoader"
import TopBar from "./components/bar/TopBar"
import Button from "./components/buttons/Button"
import Hero from "./pages/Hero"

function App() {

  const [loading, setLoading] = useState(false)

  return (
    <>
    <PageLoader />
    <div className="my-2.5 mx-2 space-y-2">
      <TopBar />
      <Hero />
    </div>
    </>
  )
}

export default App
