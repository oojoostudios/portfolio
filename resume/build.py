"""Builds resume.html (-> PDF via Playwright) and resume.docx from content.json."""
import json, html, sys
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_TAB_ALIGNMENT

c = json.load(open('content.json'))
e = html.escape
INK, MUTED, ACCENT = '#111111', '#6b6b6b', '#111111'

def entries_html(items, kind):
    out = []
    for it in items:
        if kind == 'project':
            left = f"<strong>{e(it['name'])}</strong> <span class=muted>· {e(it['desc'])}</span>"
            right = e(it['meta'])
        else:
            left = f"<strong>{e(it['org'])}</strong> <span class=muted>· {e(it['role'])}, {e(it['place'])}</span>"
            right = e(it['dates'])
        lis = ''.join(f'<li>{e(b)}</li>' for b in it['bullets'])
        out.append(f'<div class=entry><div class=row><span>{left}</span><span class=muted>{right}</span></div><ul>{lis}</ul></div>')
    return ''.join(out)

page = f"""<!doctype html><html><head><meta charset=utf-8><style>
@page {{ size: Letter; margin: 0.42in 0.55in; }}
body {{ font: 9.4pt/1.32 'Helvetica Neue', Helvetica, Arial, sans-serif; color: {INK}; margin: 0; }}
h1 {{ font: 500 20pt/1.1 Georgia, 'Times New Roman', serif; margin: 0; }}
.title {{ color: {ACCENT}; font-weight: 600; margin: 2px 0 4px; }}
.contact {{ color: {MUTED}; font-size: 9pt; }}
.summary {{ margin: 10px 0 0; }}
h2 {{ font-size: 8pt; letter-spacing: .1em; text-transform: uppercase; color: {ACCENT}; margin: 11px 0 4px; padding-bottom: 3px; border-bottom: 0.75pt solid #d9dcd8; }}
.entry {{ margin-bottom: 6px; }}
.row {{ display: flex; justify-content: space-between; gap: 12px; }}
.muted {{ color: {MUTED}; font-weight: 400; }}
ul {{ margin: 2px 0 0; padding-left: 14px; }}
li {{ margin: 1px 0; }}
.skills div {{ margin: 1px 0; }}
</style></head><body>
<h1>{e(c['name'])}</h1>
<div class=title>{e(c['title'])}</div>
<div class=contact>{' · '.join(map(e, c['contact']))}</div>
<p class=summary>{e(c['summary'])}</p>
<h2>Selected product work</h2>{entries_html(c['projects'], 'project')}
<h2>Design experience</h2>{entries_html(c['experience'], 'job')}
<h2>Institutional finance (non-design roles)</h2>{entries_html(c['finance'], 'job')}
<h2>Skills</h2><div class=skills>{''.join(f'<div><strong>{e(k)}:</strong> {e(v)}</div>' for k, v in c['skills'])}</div>
<h2>Education</h2>{''.join(f'<div class=row><span><strong>{e(a)}</strong> <span class=muted>· {e(b)}</span></span><span class=muted>{e(d)}</span></div>' for a, b, d in c['education'])}
</body></html>"""
open('resume.html', 'w').write(page)

# DOCX: same content, plain single-column layout that ATS parsers read cleanly.
doc = Document()
sec = doc.sections[0]
sec.page_width, sec.page_height = Inches(8.5), Inches(11)
sec.left_margin = sec.right_margin = Inches(0.6)
sec.top_margin = sec.bottom_margin = Inches(0.5)
base = doc.styles['Normal']; base.font.name = 'Arial'; base.font.size = Pt(9.5)
base.paragraph_format.space_after = Pt(0)
rgb = lambda h: RGBColor.from_string(h.lstrip('#').upper())
tab = sec.page_width - sec.left_margin - sec.right_margin

def para(text='', size=None, bold=False, color=None, after=0, before=0):
    p = doc.add_paragraph(); p.paragraph_format.space_after = Pt(after); p.paragraph_format.space_before = Pt(before)
    if text:
        r = p.add_run(text); r.bold = bold
        if size: r.font.size = Pt(size)
        if color: r.font.color.rgb = rgb(color)
    return p

def heading(t):
    para(t.upper(), 8, True, ACCENT, after=2, before=9)

def row(bold, rest, right):
    p = para(); p.paragraph_format.tab_stops.add_tab_stop(tab, WD_TAB_ALIGNMENT.RIGHT)
    p.add_run(bold).bold = True
    r = p.add_run(f' · {rest}' if rest else ''); r.font.color.rgb = rgb(MUTED)
    r = p.add_run(f'\t{right}'); r.font.color.rgb = rgb(MUTED)

def bullets(items):
    for b in items:
        p = doc.add_paragraph(b, style='List Bullet'); p.paragraph_format.space_after = Pt(1)

para(c['name'], 20)
para(c['title'], 10, True, ACCENT)
para(' · '.join(c['contact']), 9, color=MUTED, after=6)
para(c['summary'])
heading('Selected product work')
for p in c['projects']:
    row(p['name'], p['desc'], p['meta']); bullets(p['bullets'])
heading('Design experience')
for j in c['experience']:
    row(j['org'], f"{j['role']}, {j['place']}", j['dates']); bullets(j['bullets'])
heading('Institutional finance (non-design roles)')
for j in c['finance']:
    row(j['org'], f"{j['role']}, {j['place']}", j['dates']); bullets(j['bullets'])
heading('Skills')
for k, v in c['skills']:
    p = para(); p.add_run(f'{k}: ').bold = True; p.add_run(v)
heading('Education')
for a, b, d in c['education']:
    row(a, b, d)
doc.save('resume-lorraine-kim.docx')
print('built')
