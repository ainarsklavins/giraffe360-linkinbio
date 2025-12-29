'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import AgentHeader from "./components/AgentHeader"
import VideoIntro from "./components/VideoIntro"
import AboutSection from "./components/AboutSection"
import PropertyList from "./components/PropertyList"
import ContactCTA from "./components/ContactCTA"
import PeekPropertiesButton from "./components/PeekPropertiesButton"
import { agent, properties } from "@/data/mock-data"

export default function Prototype3() {
  const [showMore, setShowMore] = useState(false)

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

        {/* Peek into Properties - Video-First Experience - PROMINENT */}
        <div className="px-4 mb-6">
          <PeekPropertiesButton />
        </div>

        {/* About Section - Compact */}
        <AboutSection bio={agent.bio} specializations={agent.specializations} />

        {/* Contact CTAs */}
        <ContactCTA contact={agent.contact} />

        {/* Show More Toggle Button */}
        <div className="px-4 mt-6">
          <button
            onClick={() => setShowMore(!showMore)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--g360-card)] hover:bg-[var(--g360-card-hover)] text-[var(--g360-gray)] text-sm font-medium transition-all"
          >
            {showMore ? (
              <>
                <span>Show less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>More about me</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showMore ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {/* Video Introduction */}
          <div className="mt-6">
            <VideoIntro videoUrl={agent.videoUrl} name={agent.name} />
          </div>

          {/* Property Listings */}
          <div className="mt-4">
            <PropertyList properties={properties} />
          </div>
        </div>
      </div>
    </main>
  )
}
