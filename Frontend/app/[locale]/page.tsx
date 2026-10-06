import { HomePageContent } from "@/components/home/home-page";
import type { Locale } from "@/lib/i18n-config";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  return <HomePageContent locale={params.locale} />;
}

