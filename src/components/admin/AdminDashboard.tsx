import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { BUCKET, FOLDERS, PREFIX, galleryQueryOptions, type Shot } from "@/data/gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ACCEPTED_EXT = ["jpg", "jpeg", "png", "webp"];

function extOf(filename: string): string {
  return (filename.split(".").pop() ?? "").toLowerCase();
}

function nextNumberFor(shots: Shot[], folder: string): number {
  const folderPrefix = `${PREFIX}/${folder}/`;
  let max = 0;
  for (const shot of shots) {
    if (!shot.path.startsWith(folderPrefix)) continue;
    const name = shot.path.slice(folderPrefix.length);
    const match = name.match(/^(\d+)\./);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max + 1;
}

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const { data: shots = [], isLoading } = useQuery(galleryQueryOptions());
  const [activeFolder, setActiveFolder] = React.useState(FOLDERS[0]!.folder);
  const [uploading, setUploading] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["gallery", "shots"] });

  const handleDelete = async (shot: Shot) => {
    const { error } = await supabase.storage.from(BUCKET).remove([shot.path]);
    if (error) {
      toast.error("Неуспешно изтриване на снимката");
      return;
    }
    toast.success("Снимката е изтрита");
    invalidate();
  };

  const handleFiles = async (files: FileList | File[]) => {
    const all = Array.from(files);
    const list = all.filter((f) => ACCEPTED_EXT.includes(extOf(f.name)));
    if (all.length - list.length > 0) {
      toast.error(`Пропуснати ${all.length - list.length} файла с неподдържан формат`);
    }
    if (list.length === 0) return;

    setUploading(true);
    let n = nextNumberFor(shots, activeFolder);
    let failures = 0;
    for (const file of list) {
      const path = `${PREFIX}/${activeFolder}/${n}.${extOf(file.name)}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) {
        failures += 1;
      } else {
        n += 1;
      }
    }
    setUploading(false);
    invalidate();

    if (failures > 0) {
      toast.error(`Неуспешно качване на ${failures} от ${list.length} снимки`);
    } else {
      toast.success(`Качени ${list.length} снимки`);
    }
  };

  const folderShots = React.useMemo(
    () => shots.filter((s) => s.path.startsWith(`${PREFIX}/${activeFolder}/`)),
    [shots, activeFolder],
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <h1 className="text-xl font-semibold">Управление на снимки</h1>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut size={16} /> Изход
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Tabs value={activeFolder} onValueChange={setActiveFolder}>
          <TabsList className="h-auto flex-wrap">
            {FOLDERS.map((f) => (
              <TabsTrigger key={f.folder} value={f.folder}>
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {FOLDERS.map((f) => (
            <TabsContent key={f.folder} value={f.folder} className="mt-6 space-y-6">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  if (e.dataTransfer.files.length > 0) void handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-sm border border-dashed px-6 py-10 text-center transition-colors ${
                  dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/60"
                }`}
              >
                <UploadCloud size={28} className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {uploading
                    ? "Качване…"
                    : "Пуснете снимки тук или натиснете, за да изберете (JPG, PNG, WEBP)"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0)
                      void handleFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              {isLoading ? (
                <p className="text-sm text-muted-foreground">Зареждане…</p>
              ) : folderShots.length === 0 ? (
                <p className="text-sm text-muted-foreground">Няма снимки в тази категория.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {folderShots.map((shot) => (
                    <div
                      key={shot.path}
                      className="group relative aspect-square overflow-hidden rounded-sm border border-border"
                    >
                      <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 shadow-md"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Изтриване на снимка</AlertDialogTitle>
                            <AlertDialogDescription>
                              Тази снимка ще бъде премахната от галерията завинаги. Действието не
                              може да бъде отменено.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отказ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => void handleDelete(shot)}>
                              Изтрий
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
