import type { Metadata } from "next";
import { LoginSignupForm } from "@/components/auth/login-signup-form";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.loginSignup.loginTitle };
}

export default function LoginPage({ params }: { params: { locale: Locale } }) {
  return <LoginSignupForm dict={getDictionary(params.locale)} />;
}