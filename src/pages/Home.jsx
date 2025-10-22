import React from 'react'
import Header from '../components/Header'
import Hero from '../components/home_components/Hero'
import Sections1 from '../components/home_components/Sections1'
import Section2 from '../components/home_components/Section2'
import Section3 from '../components/home_components/Section3'
import FAQ from '../components/home_components/Faqs'
import Testimonial from '../components/Testimonial'
import ClientsLogos from '../components/Clients_logo'
import Achievements from '../components/Achievements'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className='bg-slate-100'>
      <Header/>
      <Hero/>
      <Sections1/>
      <Section2/>
      <Section3/>
      <Testimonial/>
      <FAQ />
      <ClientsLogos/>
      <Achievements/>
      <Footer/>
    </div>
  )
}
