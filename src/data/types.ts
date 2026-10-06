export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  region: string;
  country: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot: string;
  year: number;
  category: string;
  status: string;
  featured: boolean;
  badge?: string;
  headline: string;
  description: string;
  features: string[];
  amenities: string[];
  images: { id: string; alt: string }[];
  agentId: string;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  portraitId: string;
  email: string;
  phone: string;
  bio: string;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
};

export type Reason = {
  id: string;
  figure: string;
  label: string;
  copy: string;
};
