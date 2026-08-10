import work1 from "@/assets/work-1.png.asset.json";
import work2 from "@/assets/work-2.png.asset.json";
import work3 from "@/assets/work-3.png.asset.json";
import work4 from "@/assets/work-4.png.asset.json";
import work5 from "@/assets/work-5.png.asset.json";
import work6 from "@/assets/work-6.png.asset.json";
import work7 from "@/assets/work-7.png.asset.json";
import tapi1 from "@/assets/tapi-1.jpg.asset.json";
import tapi2 from "@/assets/tapi-2.jpg.asset.json";
import tapi3 from "@/assets/tapi-3.jpg.asset.json";
import tapi4 from "@/assets/tapi-4.jpg.asset.json";
import tapi5 from "@/assets/tapi-5.jpg.asset.json";
import tapi6 from "@/assets/tapi-6.jpg.asset.json";
import tapi7 from "@/assets/tapi-7.jpg.asset.json";
import tapi8 from "@/assets/tapi-8.jpg.asset.json";
import tapi9 from "@/assets/tapi-9.jpg.asset.json";
import tapi10 from "@/assets/tapi-10.jpg.asset.json";

import { Armchair, Lightbulb, LucideIcon, Shield, Sun, Wand2 } from "lucide-react";

type CategoryId = "tint" | "ppf" | "upholstery" | "chrome" | "polish";

type Category = { id: CategoryId; label: string; icon: LucideIcon };

const categories: Category[] = [
  { id: "tint", label: "Фолиране на стъкла", icon: Sun },
  { id: "ppf", label: "Защитно фолио (PPF)", icon: Shield },
  { id: "upholstery", label: "Претапициране", icon: Armchair },
  { id: "chrome", label: "Chrome delete", icon: Wand2 },
  { id: "polish", label: "Полиране на фарове", icon: Lightbulb },
];

const categoryById = new Map(categories.map((c) => [c.id, c]));

type Shot = { src: string; alt: string; categoryId: CategoryId; note?: string };

const shots: Shot[] = [
  // Претапициране на тавани и интериор
  {
    src: tapi10.url,
    alt: "Черен таван и интериорни части след претапициране с велур",
    categoryId: "upholstery",
  },
  {
    src: tapi9.url,
    alt: "Оригинален бежов таван и интериорни части преди претапициране",
    categoryId: "upholstery",
    note: "Преди",
  },
  { src: tapi1.url, alt: "Претапициран таван на Audi в черен велур", categoryId: "upholstery" },
  { src: tapi2.url, alt: "Таван, претапициран в бордо велур", categoryId: "upholstery" },
  {
    src: tapi3.url,
    alt: "Претапициран таван на VW Passat в черен велур",
    categoryId: "upholstery",
  },
  {
    src: tapi4.url,
    alt: "Детайл от претапициран таван със сенници и плафон",
    categoryId: "upholstery",
    note: "Детайл",
  },
  {
    src: tapi5.url,
    alt: "Близък план на велурена материя на автотаван",
    categoryId: "upholstery",
    note: "Детайл",
  },
  {
    src: tapi6.url,
    alt: "Претапицирани сенници в бежов велур",
    categoryId: "upholstery",
    note: "Сенници",
  },
  {
    src: tapi7.url,
    alt: "Претапициран таван и колонки в Mercedes отвътре",
    categoryId: "upholstery",
    note: "Интериор",
  },
  {
    src: tapi8.url,
    alt: "Претапициран таван на Audi, монтиран в автомобила",
    categoryId: "upholstery",
    note: "Интериор",
  },
  {
    src: work2.url,
    alt: "BMW 7 с демонтиран таван за претапициране",
    categoryId: "upholstery",
    note: "Преди",
  },
  {
    src: work3.url,
    alt: "Интериор на Mercedes AMG след обработка",
    categoryId: "upholstery",
    note: "Интериор",
  },
  {
    src: work5.url,
    alt: "Audi A3 с изваден таван преди претапициране",
    categoryId: "upholstery",
    note: "Преди",
  },
  // Фолиране на автостъкла
  { src: work1.url, alt: "Бял VW Tiguan с фолирани стъкла", categoryId: "tint" },
  {
    src: work7.url,
    alt: "VW Golf с тъмно фолирани стъкла в бокса",
    categoryId: "tint",
    note: "След",
  },
  { src: work4.url, alt: "Audi TT с фолирани стъкла", categoryId: "tint" },
  {
    src: work6.url,
    alt: "VW Tiguan с фолирани стъкла след обработка",
    categoryId: "tint",
    note: "След",
  },
];
