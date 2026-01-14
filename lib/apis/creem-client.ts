// Client-side only constants and types
export const PRODUCT_IDS = {
  FREE: 'prod_4JDhpJbNRTu3cbq5uvCFK2',
  PRO: 'prod_4JDhpJbNRTu3cbq5uvCFK',
  TEAM: 'prod_4JDhpJbNRTu3cbq5uvCFK',
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