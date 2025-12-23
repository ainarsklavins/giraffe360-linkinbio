import AgentHeader from "@/components/AgentHeader";
import VideoIntro from "@/components/VideoIntro";
import AboutSection from "@/components/AboutSection";
import SocialLinks from "@/components/SocialLinks";
import PropertyList from "@/components/PropertyList";
import ContactCTA from "@/components/ContactCTA";
import { agent, properties } from "@/data/mock-data";

export default function Home() {
  return (
    <main className="min-h-screen g360-gradient">
      {/* Container - centered with max width for mobile-first design */}
      <div className="max-w-md mx-auto pb-safe">
        {/* Agent Profile Header */}
        <AgentHeader
          name={agent.name}
          title={agent.title}
          brokerage={agent.brokerage}
          location={agent.location}
          photo={agent.photo}
        />

        {/* Social Media Links */}
        <SocialLinks socials={agent.socials} />

        {/* Video Introduction */}
        <VideoIntro videoUrl={agent.videoUrl} name={agent.name} />

        {/* About Section */}
        <AboutSection bio={agent.bio} specializations={agent.specializations} />

        {/* Property Listings */}
        <PropertyList properties={properties} />

        {/* Contact CTAs */}
        <ContactCTA contact={agent.contact} />
      </div>
    </main>
  );
}
