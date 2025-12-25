import AgentHeader from "./components/AgentHeader";
import VideoIntro from "./components/VideoIntro";
import AboutSection from "./components/AboutSection";
import PropertyList from "./components/PropertyList";
import ContactCTA from "./components/ContactCTA";
import { agent, properties } from "@/data/mock-data";

export default function ClassicPrototype() {
  return (
    <main className="min-h-screen g360-gradient">
      {/* Container - centered with max width for mobile-first design */}
      <div className="max-w-md mx-auto pb-safe">
        {/* Agent Profile Header with Social Icons */}
        <AgentHeader
          name={agent.name}
          title={agent.title}
          brokerage={agent.brokerage}
          location={agent.location}
          photo={agent.photo}
          socials={agent.socials}
        />

        {/* Video Introduction - Compact */}
        <VideoIntro videoUrl={agent.videoUrl} name={agent.name} />

        {/* About Section - Compact */}
        <AboutSection bio={agent.bio} specializations={agent.specializations} />

        {/* Property Listings */}
        <PropertyList properties={properties} />

        {/* Contact CTAs */}
        <ContactCTA contact={agent.contact} />
      </div>
    </main>
  );
}
