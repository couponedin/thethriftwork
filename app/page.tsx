import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <div className="bg-black">
        <Navbar />
        <main id="main-content" className="relative">
          <Hero />
          {/* Higher z-index so this block slides over the pinned hero */}
          <div className="relative z-20 bg-[#050505] rounded-t-[22px] sm:rounded-t-[28px] md:rounded-t-[36px] lg:rounded-t-[48px] shadow-[0_-24px_60px_rgba(0,0,0,0.45)]">
            <Portfolio />
            <Services />
            <Testimonials />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
