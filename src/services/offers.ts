import { offers } from "@/data/offers";
import type { Offer } from "@/types";

export async function fetchOffers(): Promise<Offer[]> {
  return Promise.resolve(offers);
}
