
import Footer from '../Footer/Footer'
import ClientTestimonials from '../Home/ClientTestimonials/ClientTestimonials'
import Navbar from '../Navbar/Navbar'
import AboutContent from './AboutContent'
import AboutHero from './AboutHero'
import AboutOurComit from './AboutOurComit'
import AboutWhatsNew from './AboutWhatsNew'
import AboutWhatWeDo from './AboutWhatWeDo'

function AboutUs() {
  return (
    <>
        <Navbar/>
        <AboutHero/>
        <AboutContent/>
        <AboutWhatWeDo/>
        <AboutWhatsNew/>
        <AboutOurComit/>
        <ClientTestimonials/>
        <Footer/>
    </>
  )
}

export default AboutUs
