import ValuesSection from "@/components/ValuesSection"
import { HeroSection } from "../components/HeroSection"

import ProcedureSection from "@/components/ProcedureSection"

import Banner from "@/components/Banner"
import { useEffect } from "react"


const Home = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    return (
        <>
            <HeroSection />
            <ValuesSection />
            <ProcedureSection />
            <Banner />

        </>
    )
}
export default Home