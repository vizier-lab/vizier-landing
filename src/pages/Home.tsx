import Hero from '../components/Hero'
import Quickstart from '../components/Quickstart'
import Integrations from '../components/Integrations'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Hero />
      <Quickstart />
      <Integrations />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
