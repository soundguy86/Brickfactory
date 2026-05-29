import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Levels from './components/Levels'
import Process from './components/Process'
import Services from './components/Services'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Levels />
        <Process />
        <Services />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
