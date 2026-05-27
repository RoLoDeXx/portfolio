import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import FeaturedWork from '@/components/FeaturedWork'
import Work from '@/components/Work'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'
import { HillsDivider } from '@/components/SceneBg'

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <HillsDivider />
      <FeaturedWork />
      <HillsDivider />
      <Work />
      <Projects />
      <Skills />
      <Footer />
    </main>
  )
}
