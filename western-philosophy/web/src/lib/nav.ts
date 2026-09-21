export interface NavItem {
  label: string;
  href: string;
  icon: string; // key into NavIcon
  group: string;
}

export const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Study",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "dashboard", group: "Study" },
      { label: "Library", href: "/library", icon: "book", group: "Study" },
      { label: "Timeline", href: "/timeline", icon: "timeline", group: "Study" },
      { label: "Knowledge Graph", href: "/graph", icon: "graph", group: "Study" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Philosophers", href: "/philosophers", icon: "person", group: "Reference" },
      { label: "Concepts", href: "/concepts", icon: "concept", group: "Reference" },
      { label: "Schools", href: "/schools", icon: "school", group: "Reference" },
      { label: "Glossary", href: "/glossary", icon: "glossary", group: "Reference" },
    ],
  },
  {
    title: "Practice",
    items: [
      { label: "Flashcards", href: "/flashcards", icon: "cards", group: "Practice" },
      { label: "Quiz", href: "/quiz", icon: "quiz", group: "Practice" },
      { label: "Essay Practice", href: "/essays", icon: "essay", group: "Practice" },
    ],
  },
  {
    title: "You",
    items: [
      { label: "Notes & Bookmarks", href: "/notes", icon: "notes", group: "You" },
      { label: "Progress", href: "/progress", icon: "progress", group: "You" },
    ],
  },
];
