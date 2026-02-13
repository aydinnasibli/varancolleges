export interface Program {
  _id: string;
  title: string;
  slug: { current: string };
  country: { name: string; slug: { current: string } };
  description: string;
  image: any;
  degrees: string[];
  features: string[];
  rank?: string;
}

export interface Country {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
}
