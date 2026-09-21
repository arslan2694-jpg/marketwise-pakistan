"""
Canonical structural map of Bertrand Russell's "A History of Western
Philosophy" (Simon & Schuster, 1945; this PDF: 955 pages, 0-indexed 0-954).

IMPORTANT: this map was built from the BOOK'S OWN BODY CHAPTER HEADINGS
(regex-scanned page by page with PyMuPDF), not from the printed Table of
Contents on pages 2-3 of the PDF. The printed TOC is defective in the
original 1945 edition: it silently omits Chapters XIV-XXII of Book One
(Plato's Utopia through Aristotle's Logic) and mis-numbers Chapter XXVIII
"Stoicism" as "XXIX" (duplicating the next chapter's numeral). The chapters
themselves are present and correctly numbered in the body text; this file
reflects the body, which is the source of truth.

Every start_page below is a verified PDF page index (0-indexed) where the
"CHAPTER <roman> <Title>" (or "BOOK"/"PART"/"Introduction") heading was
found via regex in the extracted text layer. `scripts/verify_structure.py`
re-derives headings independently and diffs them against this file so the
map can be checked after any PDF re-ingestion.
"""

# (book_index, part_index_within_book, chapter_index_within_book (1-based), roman, title, start_page)
BOOKS = [
    {
        "id": "book-1",
        "order": 1,
        "title": "Ancient Philosophy",
        "start_page": 19,
        "parts": [
            {
                "id": "book-1-part-1",
                "order": 1,
                "title": "The Pre-Socratics",
                "start_page": 20,
                "chapters": [
                    ("I", "The Rise of Greek Civilization", 20),
                    ("II", "The Milesian School", 41),
                    ("III", "Pythagoras", 46),
                    ("IV", "Heraclitus", 55),
                    ("V", "Parmenides", 65),
                    ("VI", "Empedocles", 70),
                    ("VII", "Athens in Relation to Culture", 75),
                    ("VIII", "Anaxagoras", 78),
                    ("IX", "The Atomists", 81),
                    ("X", "Protagoras", 90),
                ],
            },
            {
                "id": "book-1-part-2",
                "order": 2,
                "title": "Socrates, Plato, and Aristotle",
                "start_page": 98,
                "chapters": [
                    ("XI", "Socrates", 98),
                    ("XII", "The Influence of Sparta", 110),
                    ("XIII", "The Sources of Plato's Opinions", 120),
                    ("XIV", "Plato's Utopia", 124),
                    ("XV", "The Theory of Ideas", 135),
                    ("XVI", "Plato's Theory of Immortality", 148),
                    ("XVII", "Plato's Cosmogony", 159),
                    ("XVIII", "Knowledge and Perception in Plato", 165),
                    ("XIX", "Aristotle's Metaphysics", 175),
                    ("XX", "Aristotle's Ethics", 188),
                    ("XXI", "Aristotle's Politics", 200),
                    ("XXII", "Aristotle's Logic", 211),
                    ("XXIII", "Aristotle's Physics", 218),
                    ("XXIV", "Early Greek Mathematics and Astronomy", 223),
                ],
            },
            {
                "id": "book-1-part-3",
                "order": 3,
                "title": "Ancient Philosophy after Aristotle",
                "start_page": 233,
                "chapters": [
                    ("XXV", "The Hellenistic World", 233),
                    ("XXVI", "Cynics and Sceptics", 243),
                    ("XXVII", "The Epicureans", 254),
                    ("XXVIII", "Stoicism", 266),
                    ("XXIX", "The Roman Empire in Relation to Culture", 284),
                    ("XXX", "Plotinus", 298),
                ],
            },
        ],
    },
    {
        "id": "book-2",
        "order": 2,
        "title": "Catholic Philosophy",
        "start_page": 311,
        "introduction_start_page": 312,
        "parts": [
            {
                "id": "book-2-part-1",
                "order": 1,
                "title": "The Fathers",
                "start_page": 317,
                "chapters": [
                    ("I", "The Religious Development of the Jews", 317),
                    ("II", "Christianity During the First Four Centuries", 332),
                    ("III", "Three Doctors of the Church", 341),
                    ("IV", "Saint Augustine's Philosophy and Theology", 359),
                    ("V", "The Fifth and Sixth Centuries", 373),
                    ("VI", "Saint Benedict and Gregory the Great", 381),
                ],
            },
            {
                "id": "book-2-part-2",
                "order": 2,
                "title": "The Schoolmen",
                "start_page": 393,
                "chapters": [
                    ("VII", "The Papacy in the Dark Ages", 393),
                    ("VIII", "John the Scot", 405),
                    ("IX", "Ecclesiastical Reform in the Eleventh Century", 412),
                    ("X", "Mohammedan Culture and Philosophy", 424),
                    ("XI", "The Twelfth Century", 432),
                    ("XII", "The Thirteenth Century", 445),
                    ("XIII", "Saint Thomas Aquinas", 455),
                    ("XIV", "Franciscan Schoolmen", 466),
                    ("XV", "The Eclipse of the Papacy", 479),
                ],
            },
        ],
    },
    {
        "id": "book-3",
        "order": 3,
        "title": "Modern Philosophy",
        "start_page": 489,
        "parts": [
            {
                "id": "book-3-part-1",
                "order": 1,
                "title": "From the Renaissance to Hume",
                "start_page": 490,
                "chapters": [
                    ("I", "General Characteristics", 490),
                    ("II", "The Italian Renaissance", 494),
                    ("III", "Machiavelli", 503),
                    ("IV", "Erasmus and More", 511),
                    ("V", "The Reformation and Counter-Reformation", 521),
                    ("VI", "The Rise of Science", 524),
                    ("VII", "Francis Bacon", 539),
                    ("VIII", "Hobbes's Leviathan", 543),
                    ("IX", "Descartes", 554),
                    ("X", "Spinoza", 565),
                    ("XI", "Leibniz", 577),
                    ("XII", "Philosophical Liberalism", 592),
                    ("XIII", "Locke's Theory of Knowledge", 600),
                    ("XIV", "Locke's Political Philosophy", 613),
                    ("XV", "Locke's Influence", 636),
                    ("XVI", "Berkeley", 642),
                    ("XVII", "Hume", 654),
                ],
            },
            {
                "id": "book-3-part-2",
                "order": 2,
                "title": "From Rousseau to the Present Day",
                "start_page": 669,
                "chapters": [
                    ("XVIII", "The Romantic Movement", 669),
                    ("XIX", "Rousseau", 678),
                    ("XX", "Kant", 695),
                    ("XXI", "Currents of Thought in the Nineteenth Century", 711),
                    ("XXII", "Hegel", 721),
                    ("XXIII", "Byron", 737),
                    ("XXIV", "Schopenhauer", 744),
                    ("XXV", "Nietzsche", 750),
                    ("XXVI", "The Utilitarians", 763),
                    ("XXVII", "Karl Marx", 772),
                    ("XXVIII", "Bergson", 781),
                    ("XXIX", "William James", 800),
                    ("XXX", "John Dewey", 808),
                    ("XXXI", "The Philosophy of Logical Analysis", 817),
                ],
            },
        ],
    },
]

FRONT_MATTER = {
    "title_page": (0, 1),
    "table_of_contents": (2, 7),
    "preface": (8, 8),
    "introduction": (9, 18),
}

INDEX_START_PAGE = 824  # back-of-book alphabetical index; not teaching content
TOTAL_PAGES = 955


def flatten_chapters():
    """Yield every chapter with resolved end_page (next heading's start - 1)."""
    flat = []
    for book in BOOKS:
        for part in book["parts"]:
            for ch in part["chapters"]:
                flat.append(
                    {
                        "book_id": book["id"],
                        "book_title": book["title"],
                        "book_order": book["order"],
                        "part_id": part["id"],
                        "part_title": part["title"],
                        "part_order": part["order"],
                        "roman": ch[0],
                        "title": ch[1],
                        "start_page": ch[2],
                    }
                )
    # resolve end pages using the next chapter's start (or INDEX_START_PAGE for the last)
    for i, ch in enumerate(flat):
        if i + 1 < len(flat):
            ch["end_page"] = flat[i + 1]["start_page"] - 1
        else:
            ch["end_page"] = INDEX_START_PAGE - 1
    return flat


if __name__ == "__main__":
    flat = flatten_chapters()
    print(f"Total chapters: {len(flat)}")
    for ch in flat:
        print(
            f"{ch['book_id']:8} {ch['part_id']:16} Ch.{ch['roman']:6} "
            f"pp.{ch['start_page']}-{ch['end_page']:4}  {ch['title']}"
        )
