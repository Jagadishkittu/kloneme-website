import Calendar from "@/components/sections/Calendar";
import Closing from "@/components/sections/Closing";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MeetKlo from "@/components/sections/MeetKlo";
// Privacy is hidden for now; restore the import and <Privacy /> below to bring it back
// import Privacy from "@/components/sections/Privacy";
import Problem from "@/components/sections/Problem";
import Stories from "@/components/sections/Stories";
import Streams from "@/components/sections/Streams";
import TwinMap from "@/components/sections/TwinMap";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TwinMap />
        <MeetKlo />
        <Problem />
        <Streams />
        <Closing />
        {/* <Privacy /> */}
        <Features />
        <Calendar />
        <Stories />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
