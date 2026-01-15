// Client-side only constants and types
export const PRODUCT_IDS = {
  FREE: 'prod_5LE5agJB6audexGjr8nPXm',
  PRO: 'prod_5LE5agJB6audexGjr8nPXm',
  TEAM: 'prod_5LE5agJB6audexGjr8nPXm',
};

// Client-side interfaces
export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular?: boolean;
  buttonText?: string;
  productId: string;
}