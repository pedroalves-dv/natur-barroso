export const PHONE_NUMBER = "351960000000";
export const PHONE_DISPLAY = "+351 960 000 000";
export const EMAIL = "info@naturbarroso.pt";

export function waHref(message: string): string {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
