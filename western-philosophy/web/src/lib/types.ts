// Types mirroring western-philosophy/data/content/*.md schemas.
// Keep in sync with CHAPTER_SCHEMA.md and DATA_MODEL.md.

export interface ChapterRef {
  id: string;
  roman: string;
  title: string;
  start_page: number;
  end_page: number;
}

export interface PartRef {
  id: string;
  order: number;
  title: string;
  start_page: number;
  chapters: ChapterRef[];
}

export interface BookRef {
  id: string;
  order: number;
  title: string;
  start_page: number;
  introduction_start_page?: number;
  parts: PartRef[];
}

export interface StructureFile {
  books: BookRef[];
  index_start_page: number;
  total_pages: number;
}

export interface PhilosopherMention {
  name: string;
  role_in_chapter: string;
  is_primary_subject: boolean;
}

export interface ConceptEntry {
  name: string;
  plain_explanation: string;
  precise_definition: string;
  why_it_mattered: string;
  historical_origin: string;
  associated_philosopher: string;
  examples: string[];
  objections: string[];
  competing_positions: string[];
  influence_on_later_thinkers: string;
  connection_to_politics_or_religion: string;
  is_major: boolean;
}

export interface ArgumentEntry {
  title: string;
  philosopher: string;
  premises: string[];
  conclusion: string;
  explanation: string;
  objections: string[];
  implications: string[];
}

export interface GlossaryTerm {
  term: string;
  beginner_explanation: string;
  academic_explanation: string;
  related_concepts: string[];
}

export type QuestionType =
  | "short_answer"
  | "identify_philosopher"
  | "identify_school"
  | "compare_contrast"
  | "argument_reconstruction"
  | "essay"
  | "chronology"
  | "oral";

export interface QuestionEntry {
  type: QuestionType;
  prompt: string;
  answer: string;
  explanation: string;
  source_page?: number;
}

export interface Flashcard {
  front: string;
  back: string;
  category: string;
}

export type QuizType =
  | "multiple_choice"
  | "true_false"
  | "matching"
  | "fill_in_blank"
  | "identify_philosopher"
  | "identify_school"
  | "chronology";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "university" | "expert";

export interface QuizQuestion {
  type: QuizType;
  difficulty: Difficulty;
  prompt: string;
  options?: string[];
  correct_index?: number;
  correct_answer?: string;
  explanation: string;
  related_concept?: string;
  source_page?: number;
}

export interface EssayPrompt {
  task_type: string;
  prompt: string;
  rubric: string[];
}

export interface ChapterContent {
  chapter_id: string;
  book_id: string;
  part_id: string;
  roman: string;
  title: string;
  start_page: number;
  end_page: number;
  orientation: string;
  historical_background: string;
  philosophical_problems: string[];
  philosophers_discussed: PhilosopherMention[];
  schools_discussed: string[];
  core_concepts: ConceptEntry[];
  arguments: ArgumentEntry[];
  key_distinctions: string[];
  connections_to_earlier_philosophers: string;
  connections_to_later_philosophers: string;
  political_social_context: string;
  religion_science_culture_context: string;
  russell_presentation: string;
  critical_context: string;
  key_takeaways: string[];
  study_notes: string;
  glossary_terms: GlossaryTerm[];
  questions: QuestionEntry[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  essay_prompts: EssayPrompt[];
  extraction_confidence: "high" | "medium" | "low";
}

export interface PhilosopherAppearance {
  chapter_id: string;
  role: string;
}

export interface PhilosopherProfile {
  slug: string;
  name: string;
  era: string;
  dates: string;
  geography: string;
  school: string;
  major_ideas: string[];
  works: string[];
  philosophical_domains: string[];
  biography: string;
  central_doctrines: string;
  key_arguments: string[];
  terminology: string[];
  ethics: string;
  politics: string;
  metaphysics: string;
  epistemology: string;
  philosophy_of_science: string;
  religion_theology: string;
  predecessors: string[];
  successors: string[];
  disagreements: { with: string; about: string }[];
  notable_quotations: { text: string; attribution: string; is_paraphrase: boolean }[];
  russell_view: string;
  why_this_matters: string;
  appears_in_chapters: PhilosopherAppearance[];
  extraction_confidence: "high" | "medium" | "low";
}

export interface SchoolProfile {
  slug: string;
  name: string;
  period: string;
  doctrines: string[];
  philosophers: string[];
  predecessor_schools: string[];
  successor_influence: string[];
  appears_in_chapters: string[];
}

export interface TimelineEvent {
  id: string;
  name: string;
  date: string;
  date_sort: number;
  category: ("philosophy" | "politics" | "religion" | "science" | "culture")[];
  description: string;
  related_philosophers: string[];
  related_chapters: string[];
}

export type RelationshipType =
  | "influenced"
  | "criticized"
  | "rejected"
  | "developed"
  | "anticipated"
  | "responded_to"
  | "borrowed_from"
  | "opposed"
  | "continued"
  | "transformed"
  | "historically_contextualized_by";

export interface GraphRelationship {
  from: string;
  from_type: "philosopher" | "school" | "concept";
  relationship: RelationshipType;
  to: string;
  to_type: "philosopher" | "school" | "concept";
  explanation: string;
  source_chapter: string;
}

export interface GlossaryEntry extends GlossaryTerm {
  slug: string;
  appears_in_chapters: string[];
}

export interface ConceptProfile extends ConceptEntry {
  slug: string;
  related_concepts: string[];
  appears_in_chapters: string[];
  evolution: { philosopher: string; treatment: string }[];
}
