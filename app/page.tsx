import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MeetKlo from "@/components/sections/MeetKlo";
import Problem from "@/components/sections/Problem";
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
      </main>
    </>
  );
}
