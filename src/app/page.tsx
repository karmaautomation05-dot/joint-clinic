import Hero from "@/components/home/Hero";
import AboutDr from "@/components/home/AboutDr";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Statistics from "@/components/home/Statistics";
import BodyMapSelector from "@/components/home/BodyMapSelector";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import FAQ from "@/components/home/FAQ";
import AppointmentForm from "@/components/home/AppointmentForm";
import GoogleMaps from "@/components/home/GoogleMaps";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BodyMapSelector />
      <AboutDr />
      <ServicesOverview />
      <WhyChooseUs />
      <Statistics />
      <VideoTestimonials />
      <FAQ />
      <AppointmentForm />
      <GoogleMaps />
    </>
  );
}
