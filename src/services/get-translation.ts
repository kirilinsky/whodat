import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import de from "@/messages/de.json";

const messages = { en, ru, de };

export const t = (path: string, locale: "en" | "ru" | "de" = "en") => {
  const keys = path.split(".");
  let current: any = messages[locale];

  for (const key of keys) {
    if (current[key] === undefined) return path;
    current = current[key];
  }

  return current;
};
