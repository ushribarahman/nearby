import Hero from "../../components/home/Hero";
import NearbyEvents from "../../components/home/NearbyEvents";
import WhyNearby from "../../components/home/WhyNearby";
import FAQ from "../../components/common/FAQ";
import HomeCTA from "../../components/home/HomeCTA";

function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">

      <Hero />

      <NearbyEvents />

      <WhyNearby />

      <FAQ />

      <HomeCTA />

    </main>
  );
}

export default Home;