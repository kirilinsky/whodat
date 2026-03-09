import { cookies } from "next/headers";

export type Locale = "ru" | "en" | "de";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value as Locale;

  return lang || "ru";
}
