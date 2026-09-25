#!/usr/bin/env python3
"""Source-analysis pipeline, stage 1.

Reads textbook/Understanding-Islamic-Finance.pdf and produces:
  source/source-map.json         full outline: part > chapter > section > subsection with printed pages
  source/chapter-index.json      chapter list with page ranges and section counts
  source/extraction-notes/pages/pNNN.txt      raw text per PDF page (git-ignored: copyrighted)
  source/extraction-notes/chapters/chNN.txt   chapter text with [[p. N]] printed-page markers (git-ignored)
  source/extraction-notes/pdf-info.json       validation facts about the PDF

Printed page numbers are derived as PDF page - 28 (verified against running heads
on every body page from p.3 to p.516; chapter-opening pages carry no page number).
"""
import json, os, re, sys, hashlib
import pymupdf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'textbook', 'Understanding-Islamic-Finance.pdf')
OFFSET = 28

def clean(s):
    return (s.replace('Sharī´ah', 'Shari’ah').replace('´', '’')
             .replace('Lightof', 'Light of').strip())

def main():
    with open(PDF, 'rb') as f:
        head = f.read(5)
    if head != b'%PDF-':
        sys.exit('Not a PDF (possibly an HTML error page)')
    doc = pymupdf.open(PDF)
    size = os.path.getsize(PDF)
    sha = hashlib.sha256(open(PDF, 'rb').read()).hexdigest()
    notes = os.path.join(ROOT, 'source', 'extraction-notes')
    os.makedirs(os.path.join(notes, 'pages'), exist_ok=True)
    os.makedirs(os.path.join(notes, 'chapters'), exist_ok=True)
    texts = []
    for i, p in enumerate(doc):
        t = p.get_text()
        texts.append(t)
        open(os.path.join(notes, 'pages', f'p{i+1:03d}.txt'), 'w').write(t)
    json.dump({'file': 'textbook/Understanding-Islamic-Finance.pdf', 'bytes': size, 'sha256': sha,
               'pages': doc.page_count, 'metadata': doc.metadata, 'printedPageOffset': OFFSET,
               'textChars': sum(map(len, texts)), 'outlineEntries': len(doc.get_toc())},
              open(os.path.join(notes, 'pdf-info.json'), 'w'), indent=2)

    toc = doc.get_toc()
    parts, chapters = [], []
    part = None
    ch = None
    sec = None
    for level, title, pdfpage in toc:
        title = clean(title)
        printed = pdfpage - OFFSET
        m_part = re.match(r'Part (I+) (.*)', title)
        m_ch = re.match(r'^(\d+) (.*)', title) if level == 2 else None
        if m_part:
            part = {'id': 'part-' + m_part.group(1).lower(), 'number': m_part.group(1),
                    'title': m_part.group(2), 'page': printed, 'chapters': []}
            parts.append(part)
        elif m_ch:
            ch = {'number': int(m_ch.group(1)), 'title': m_ch.group(2), 'part': part['id'],
                  'startPage': printed, 'pdfStartPage': pdfpage, 'sections': []}
            chapters.append(ch); part['chapters'].append(ch['number'])
            sec = None
        elif level == 2:
            ch = None  # back matter (Acronyms, Glossary, ...)
        elif level == 3 and ch:
            m = re.match(r'^(\d+\.\d+) (.*)', title)
            sec = {'number': m.group(1) if m else None, 'title': m.group(2) if m else title,
                   'page': printed, 'subsections': []}
            ch['sections'].append(sec)
        elif level == 4 and ch and sec:
            m = re.match(r'^(\d+\.\d+\.\d+) (.*)', title)
            sec['subsections'].append({'number': m.group(1), 'title': m.group(2), 'page': printed})
    # page ranges
    backmatter = [t for t in toc if t[1] == 'Acronyms'][0][2] - OFFSET
    for i, c in enumerate(chapters):
        nxt = chapters[i + 1]['startPage'] if i + 1 < len(chapters) else backmatter
        # a Part divider (2 pages) precedes chapters 5 and 8
        if i + 1 < len(chapters) and chapters[i + 1]['part'] != c['part']:
            nxt = [p for p in parts if p['id'] == chapters[i + 1]['part']][0]['page']
        c['endPage'] = nxt - 1
        secs = c['sections']
        for j, s in enumerate(secs):
            s['endPage'] = (secs[j + 1]['page'] if j + 1 < len(secs) else c['endPage'] + 1) - 0
            s['endPage'] = max(s['page'], s['endPage'] if j + 1 < len(secs) else c['endPage'])
            subs = s['subsections']
            for k, ss in enumerate(subs):
                ss['endPage'] = subs[k + 1]['page'] if k + 1 < len(subs) else s['endPage']
        # chapter text with page markers
        buf = []
        for pp in range(c['startPage'], c['endPage'] + 1):
            buf.append(f'\n[[p. {pp}]]\n' + texts[pp + OFFSET - 1])
        open(os.path.join(notes, 'chapters', f'ch{c["number"]:02d}.txt'), 'w').write(''.join(buf))
    book = {'title': 'Understanding Islamic Finance', 'author': 'Muhammad Ayub',
            'publisher': 'John Wiley & Sons', 'series': 'Wiley Finance Series', 'year': 2007,
            'pageNumbering': 'Printed page numbers (PDF page minus %d)' % OFFSET}
    json.dump({'book': book, 'parts': parts, 'chapters': chapters},
              open(os.path.join(ROOT, 'source', 'source-map.json'), 'w'), indent=1, ensure_ascii=False)
    idx = [{'number': c['number'], 'title': c['title'], 'part': c['part'], 'pages': [c['startPage'], c['endPage']],
            'sections': len(c['sections']), 'subsections': sum(len(s['subsections']) for s in c['sections'])}
           for c in chapters]
    json.dump({'book': book, 'chapters': idx}, open(os.path.join(ROOT, 'source', 'chapter-index.json'), 'w'),
              indent=1, ensure_ascii=False)
    print(len(chapters), 'chapters;', sum(len(c['sections']) for c in chapters), 'sections;',
          sum(len(s['subsections']) for c in chapters for s in c['sections']), 'subsections')
    for c in idx: print(c)

if __name__ == '__main__':
    main()
