import fs from "node:fs";
import path from "node:path";
import type {
  ChapterContent,
  ConceptProfile,
  GlossaryEntry,
  GraphRelationship,
  PhilosopherProfile,
  SchoolProfile,
  StructureFile,
  TimelineEvent,
} from "./types";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");

function readJson<T>(relPath: string): T | null {
  const full = path.join(CONTENT_DIR, relPath);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, "utf-8")) as T;
}

function readDirJson<T>(relDir: string): T[] {
  const full = path.join(CONTENT_DIR, relDir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(full, f), "utf-8")) as T);
}

export function getStructure(): StructureFile {
  const full = path.join(ROOT, "structure.json");
  if (!fs.existsSync(full)) {
    return { books: [], index_start_page: 0, total_pages: 0 };
  }
  return JSON.parse(fs.readFileSync(full, "utf-8")) as StructureFile;
}

export function getAllChapters(): ChapterContent[] {
  return readDirJson<ChapterContent>("chapters").sort(
    (a, b) => a.start_page - b.start_page
  );
}

export function getChapter(chapterId: string): ChapterContent | null {
  return readJson<ChapterContent>(`chapters/${chapterId}.json`);
}

export function getAllPhilosophers(): PhilosopherProfile[] {
  return readDirJson<PhilosopherProfile>("philosophers").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getPhilosopher(slug: string): PhilosopherProfile | null {
  return readJson<PhilosopherProfile>(`philosophers/${slug}.json`);
}

export function getAllConcepts(): ConceptProfile[] {
  return readDirJson<ConceptProfile>("concepts").sort((a, b) => a.name.localeCompare(b.name));
}

export function getConcept(slug: string): ConceptProfile | null {
  return readJson<ConceptProfile>(`concepts/${slug}.json`);
}

export function getAllSchools(): SchoolProfile[] {
  return readDirJson<SchoolProfile>("schools").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getSchool(slug: string): SchoolProfile | null {
  return readJson<SchoolProfile>(`schools/${slug}.json`);
}

export function getTimeline(): TimelineEvent[] {
  const events = readJson<TimelineEvent[]>("timeline/events.json") ?? [];
  return [...events].sort((a, b) => a.date_sort - b.date_sort);
}

export function getGraphRelationships(): GraphRelationship[] {
  return readJson<GraphRelationship[]>("graph/relationships.json") ?? [];
}

export function getGlossary(): GlossaryEntry[] {
  const entries = readJson<GlossaryEntry[]>("glossary/glossary.json") ?? [];
  return [...entries].sort((a, b) => a.term.localeCompare(b.term));
}

export interface FlatChapterRef {
  id: string;
  roman: string;
  title: string;
  start_page: number;
  end_page: number;
  book_id: string;
  book_title: string;
  part_id: string;
  part_title: string;
}

export function getFlatChapterRefs(): FlatChapterRef[] {
  const structure = getStructure();
  const flat: FlatChapterRef[] = [];
  for (const book of structure.books) {
    for (const part of book.parts) {
      for (const ch of part.chapters) {
        flat.push({
          id: ch.id,
          roman: ch.roman,
          title: ch.title,
          start_page: ch.start_page,
          end_page: ch.end_page,
          book_id: book.id,
          book_title: book.title,
          part_id: part.id,
          part_title: part.title,
        });
      }
    }
  }
  return flat.sort((a, b) => a.start_page - b.start_page);
}

export interface SearchDoc {
  type: "chapter" | "philosopher" | "concept" | "school" | "glossary" | "event";
  id: string;
  title: string;
  snippet: string;
  href: string;
}

export function getSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const ch of getAllChapters()) {
    docs.push({
      type: "chapter",
      id: ch.chapter_id,
      title: `Ch. ${ch.roman}. ${ch.title}`,
      snippet: ch.orientation,
      href: `/library/${ch.chapter_id}`,
    });
  }
  for (const p of getAllPhilosophers()) {
    docs.push({
      type: "philosopher",
      id: p.slug,
      title: p.name,
      snippet: p.biography || p.central_doctrines,
      href: `/philosophers/${p.slug}`,
    });
  }
  for (const c of getAllConcepts()) {
    docs.push({
      type: "concept",
      id: c.slug,
      title: c.name,
      snippet: c.plain_explanation,
      href: `/concepts/${c.slug}`,
    });
  }
  for (const s of getAllSchools()) {
    docs.push({
      type: "school",
      id: s.slug,
      title: s.name,
      snippet: s.doctrines.join("; "),
      href: `/schools/${s.slug}`,
    });
  }
  for (const g of getGlossary()) {
    docs.push({
      type: "glossary",
      id: g.slug,
      title: g.term,
      snippet: g.beginner_explanation,
      href: `/glossary`,
    });
  }
  for (const e of getTimeline()) {
    docs.push({
      type: "event",
      id: e.id,
      title: e.name,
      snippet: e.description,
      href: `/timeline`,
    });
  }
  return docs;
}

export function getContentStatus() {
  const structure = getStructure();
  const totalChapters = structure.books.reduce(
    (sum, b) => sum + b.parts.reduce((s, p) => s + p.chapters.length, 0),
    0
  );
  const generatedChapters = readDirJson<ChapterContent>("chapters").length;
  return { totalChapters, generatedChapters };
}
