import { Armchair, Lightbulb, type LucideIcon, Shield, Sun, Wand2 } from "lucide-react";
import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

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

export type Shot = { src: string; alt: string; categoryId: CategoryId; path: string };

export const BUCKET = "client-photos";
// All gallery images live under this path prefix inside the bucket.
export const PREFIX = "niksuna-auto";

// Subfolders under PREFIX, in display order. Two folders share the "tint"
// category but keep distinct labels (used for admin folder tabs and photo alt text).
export const FOLDERS: { folder: string; categoryId: CategoryId; label: string }[] = [
  { folder: "pretapicirane", categoryId: "upholstery", label: "Претапициране" },
  { folder: "folio", categoryId: "tint", label: "Фолиране на стъкла" },
  { folder: "zatumnqvane-na-stukla", categoryId: "tint", label: "Затъмняване на стъкла" },
  { folder: "zashtitno-folio", categoryId: "ppf", label: "Защитно фолио (PPF)" },
  { folder: "farove", categoryId: "polish", label: "Полиране на фарове" },
  { folder: "chrome-delete", categoryId: "chrome", label: "Chrome delete" },
];

const IMAGE_NAME_RE = /^(\d+)\.(jpe?g|png|webp)$/i;

async function listFolderShots(
  folder: string,
  categoryId: CategoryId,
  label: string,
): Promise<Shot[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list(`${PREFIX}/${folder}`, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw error;

  const files = (data ?? [])
    .map((f) => ({ name: f.name, match: f.name.match(IMAGE_NAME_RE) }))
    .filter((f): f is { name: string; match: RegExpMatchArray } => f.match !== null)
    .sort((a, b) => Number(a.match[1]) - Number(b.match[1]));

  return files.map((f, i) => {
    const path = `${PREFIX}/${folder}/${f.name}`;
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return {
      src: publicUrl,
      alt: `${label} — снимка ${i + 1}`,
      categoryId,
      path,
    };
  });
}

async function fetchShots(): Promise<Shot[]> {
  const perFolder = await Promise.all(
    FOLDERS.map(({ folder, categoryId, label }) => listFolderShots(folder, categoryId, label)),
  );
  return perFolder.flat();
}

export const galleryQueryOptions = () =>
  queryOptions({
    queryKey: ["gallery", "shots"],
    queryFn: fetchShots,
    staleTime: 60_000,
  });
