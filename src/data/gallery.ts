import { Armchair, Lightbulb, type LucideIcon, Shield, Sun, Wand2 } from "lucide-react";

export type CategoryId = "tint" | "ppf" | "upholstery" | "chrome" | "polish";

export type Category = { id: CategoryId; label: string; icon: LucideIcon };

export const categories: Category[] = [
  { id: "tint", label: "Фолиране на стъкла", icon: Sun },
  { id: "ppf", label: "Защитно фолио (PPF)", icon: Shield },
  { id: "upholstery", label: "Претапициране", icon: Armchair },
  { id: "chrome", label: "Chrome delete", icon: Wand2 },
  { id: "polish", label: "Полиране на фарове", icon: Lightbulb },
];

export const categoryById = new Map(categories.map((c) => [c.id, c]));

export type Shot = { src: string; alt: string; categoryId: CategoryId };

// Real shop photos, grouped by service folder under src/assets/.
const folders = import.meta.glob<{ default: string }>("../assets/*/*.jpg", { eager: true });

function loadFolder(folder: string): string[] {
  return Object.entries(folders)
    .filter(([path]) => path.includes(`/assets/${folder}/`))
    .sort(([a], [b]) => {
      const na = Number(a.match(/(\d+)\.jpg$/)?.[1] ?? Number.POSITIVE_INFINITY);
      const nb = Number(b.match(/(\d+)\.jpg$/)?.[1] ?? Number.POSITIVE_INFINITY);
      return na - nb;
    })
    .map(([, mod]) => mod.default);
}

function shotsFor(folder: string, categoryId: CategoryId): Shot[] {
  const label = categoryById.get(categoryId)!.label;
  return loadFolder(folder).map((src, i) => ({
    src,
    alt: `${label} — снимка ${i + 1}`,
    categoryId,
  }));
}

export const shots: Shot[] = [
  ...shotsFor("pretapicirane", "upholstery"),
  ...shotsFor("folio", "tint"),
  ...shotsFor("zatumnqvane-na-stukla", "tint"),
  ...shotsFor("zashtitno-folio", "ppf"),
  ...shotsFor("farove", "polish"),
  ...shotsFor("chrome-delete", "chrome"),
];
