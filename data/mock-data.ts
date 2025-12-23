export interface Agent {
  name: string;
  title: string;
  brokerage: string;
  location: string;
  photo: string;
  videoUrl: string;
  bio: string;
  specializations: string[];
  socials: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
  contact: {
    phone: string;
    email: string;
    calendly?: string;
    whatsapp?: string;
  };
}

export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: "For Sale" | "Open House" | "Coming Soon" | "Under Contract";
  image: string;
  url: string;
}

export const agent: Agent = {
  name: "Sarah Johnson",
  title: "Licensed Real Estate Agent",
  brokerage: "Curb Views Realty",
  location: "Miami, FL",
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  bio: "With over 10 years of experience in luxury real estate, I specialize in helping clients find their dream homes in Miami's most prestigious neighborhoods. My approach combines deep market knowledge with personalized service to ensure every client feels supported throughout their real estate journey. Whether you're buying your first home or selling a luxury property, I'm here to make the process seamless and rewarding.",
  specializations: ["Luxury Homes", "Waterfront Properties", "Condos", "Investment Properties"],
  socials: {
    instagram: "https://instagram.com/sarahjohnsonrealty",
    linkedin: "https://linkedin.com/in/sarahjohnsonrealty",
    facebook: "https://facebook.com/sarahjohnsonrealty",
    tiktok: "https://tiktok.com/@sarahjohnsonrealty",
    youtube: "https://youtube.com/@sarahjohnsonrealty"
  },
  contact: {
    phone: "+1 (305) 555-0123",
    email: "sarah@curbviewsrealty.com",
    calendly: "https://calendly.com/sarahjohnsonrealty",
    whatsapp: "https://wa.me/13055550123"
  }
};

export const properties: Property[] = [
  {
    id: "n1qg5ko",
    title: "PH Rivage Tower - Apartment B23",
    address: "Rivage Tower, Miami Beach, FL",
    price: "$1,250,000",
    beds: 2,
    baths: 2,
    sqft: 1478,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
    url: "https://my.giraffe360.com/p/n1qg5ko"
  },
  {
    id: "35ru87b",
    title: "Oceanfront Luxury Condo",
    address: "Ocean Drive, Miami Beach, FL",
    price: "$2,850,000",
    beds: 3,
    baths: 3,
    sqft: 2200,
    status: "Open House",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
    url: "https://my.giraffe360.com/p/35ru87b"
  },
  {
    id: "1g61qx5",
    title: "Modern Downtown Loft",
    address: "Brickell Avenue, Miami, FL",
    price: "$875,000",
    beds: 1,
    baths: 2,
    sqft: 1100,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
    url: "https://my.giraffe360.com/p/1g61qx5"
  },
  {
    id: "h13ar1m",
    title: "Waterfront Villa",
    address: "Star Island, Miami Beach, FL",
    price: "$8,500,000",
    beds: 5,
    baths: 6,
    sqft: 5800,
    status: "Coming Soon",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
    url: "https://my.giraffe360.com/p/h13ar1m"
  }
];
