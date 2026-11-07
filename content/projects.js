// All case-study content lives here.
//
// Figures: `file` is the path under public/images (no extension). The build's media
// check (scripts/check-media.mjs) fails if a hero is missing and lists missing optional
// figures. A missing optional figure is simply not rendered. `mount: true` sets a UI
// capture on the project tint with padding. `brief` is an internal production note and is
// never shown. `alt` describes the image for screen readers; `caption` is the visible,
// evidence-based caption.
//
// Voice: plain, first person, specific. Findings before method. One limit per beat.
// Never state a number, result or quote that can't be traced to project notes.

import { fxMonthly, fxDaily, fxReadings } from './fxdata.js';

export const projects = [
  {
    slug: 'fxpress',
    color: '#3848a8',
    tags: ['Consumer fintech', 'AI'],
    year: '2026',
    proof: 'Live rate-context product · 18 currency pairs',
    title: 'FXpress',
    tagline: 'Transparent rate context for international transfers',
    indexDesc: 'Transparent rate context for international transfers',
    hero: {
      file: 'fxpress/hero', size: 'wide', mount: true,
      alt: 'The live FXpress widget: a 500 USD to KRW conversion, the 30-day range, the recipient amount, Fexi’s one-sentence rate description, and Send Now and Save Target Rate buttons',
      caption: 'The live widget as it runs today: USD to KRW, the 30-day range, and Fexi’s descriptive sentence.',
    },
    group: 'work',
    status: 'Live',
    stage: 'Live product · reference-rate data · hands off to the sender’s own provider',
    cardSummary: 'Helping international senders interpret today’s exchange rate without predicting when to transfer.',
    meta: [
      ['Role', 'Independent product designer · research, design, build, testing'],
      ['Scope', 'Research, product design, AI interaction, build, usability testing'],
      ['Domain', 'Consumer fintech'],
      ['Timeline', '2026 · live'],
    ],
    links: [{ label: 'Try it live', href: 'https://fxpress.netlify.app' }],
    glance: {
      problem: 'Money transfer apps show today’s exchange rate and nothing about it. On central-bank reference rates, USD/KRW moved about 3.8% within a typical month over the past year, roughly $76 on a $2,000 transfer.',
      made: 'A live widget that places today’s rate in its 30-day range, then hands off to whichever provider the sender already uses. Every calculation is in code. The AI assistant rewords one sentence the code has already written.',
      happened: 'All five testers completed the send task on the high-fidelity prototype; four of five completed the target-rate task. The widget is live across 18 currency pairs, and all 33 AI calls in the first 30 days of logs returned without error.',
    },
    beats: [
      {
        label: 'Context',
        heading: 'A rate on its own tells you nothing',
        blocks: [
          { type: 'p', text: 'My parents have sent money from the US to Korea for decades. Every app they use shows today’s rate. None says whether it is a good one.' },
          { type: 'chart', kind: 'range', data: fxMonthly, title: 'Within a single month, the rate moved 2% to 9%', subtitle: 'USD/KRW reference rate: each bar runs from the month’s low to its high, labelled with the range as a share of the low. Sep 2025 to Sep 2026.', caption: 'Source: Frankfurter, ECB reference rates. Reference rates, not transfer quotes; provider fees and markups come on top.' },
          { type: 'p', text: 'The swing is the size of the opportunity a sender feels they are missing, not a saving anyone can lock in. The gap between what the rate does and what a sender can know is the product.' },
          { type: 'p', text: 'Four senders, interviewed in November 2025, described the same thing: choosing a day felt like guessing, and the only number they cared about was what the recipient gets. Two asked for a forecast. The product does not make one.' },
          { type: 'quote', size: 'display', text: 'I usually end up Googling the exchange rate and trying to catch it on a ‘good day,’ which is kind of ridiculous. It feels like I’m managing trades for personal transfers.', who: 'Monthly international sender, research participant' },
        ],
      },
      {
        label: 'Decisions',
        heading: 'Four decisions about what the product is allowed to say',
        blocks: [
          { type: 'p', text: 'Three rules framed every decision: no forecasting, no financial advice, no invented pricing. The product describes; the sender decides.' },
          {
            type: 'decision', title: 'Describe the rate instead of advising',
            chose: 'One sentence on where today’s rate sits, then a link to the sender’s own provider.',
            instead: 'An assistant that recommended a provider and a time to send; an auto-router that moved the money; a chat assistant.',
            why: 'A recommendation implies the product knows what the rate will do next. It doesn’t. Moving money would mean licensing, custody and compliance; a chat interface would slow a 30-second task.',
            figure: { file: 'fxpress/02-advice-before-after', mount: true, alt: 'Two phone screens side by side: an earlier concept where the assistant tells the sender to send today, and the shipped approach, a neutral description of where the rate sits', caption: 'Left: an earlier concept, where the assistant told the sender what to do. Right: the approach that shipped, a description of where the rate sits.' },
          },
          {
            type: 'decision', title: 'Compare against 30 days of history, not this session',
            chose: 'A 30-day range from central-bank reference rates, split into low, mid and high. With fewer than 10 days of history, no comparison at all.',
            instead: 'Comparing today’s rate with rates seen during the visitor’s session.',
            why: 'My first build called a rate “the best you’ve seen this session” on a first visit, with nothing to compare it to.',
          },
          {
            type: 'decision', title: 'Remove the fee line',
            chose: 'Show the amount at today’s rate, with a note that the provider’s fee and markup aren’t included.',
            instead: 'Showing an estimated fee next to the recipient amount.',
            why: 'FXpress can’t see what providers charge. An estimate on a money screen reads as a real figure.',
          },
          {
            type: 'decision', title: 'Keep the interpretation in code', highlight: true,
            chose: 'The code works out where the rate sits and writes the sentence. Fexi, the assistant, rewords it. A check rejects any reply that changes the meaning, adds a number or reads as advice. With fewer than 10 days of history the server answers without calling the model.',
            instead: 'Letting the AI read the data and interpret it, guided by instructions.',
            why: 'In October 2026 Fexi told a sender that a rate at the low end of the month meant more won for their dollar. It meant the opposite, and the sentence read fine.',
            compare: {
              heading: 'How the assistant’s instructions changed',
              items: [
                { label: 'First version', text: '…Write ONE short, warm sentence telling them whether now is a good moment to send and why… Do NOT predict the future.', note: '“Whether now is a good moment to send” is a request for advice, whatever the line about not predicting says.' },
                { label: 'Shipped version', text: 'You narrate. You never decide. … Never forecast … Never tell the user whether to send. … Never mention fees.', note: 'No calculating, forecasting or advising. The assessment happens in JavaScript before the model sees anything. Fexi’s thumbs-up pose went too; the gesture read as approval of the rate.' },
              ],
            },
            figure: { file: 'fxpress/03-fexi-states', size: 'wide', mount: true, alt: 'Seven Fexi assistant states shown as cards, each with the condition that triggers it and the sentence the assistant is allowed to say', caption: 'Fexi’s states and the sentence each is allowed to say. The assessment is computed in code; the assistant only phrases it.' },
          },
        ],
      },
      {
        label: 'Proof',
        heading: 'The live widget',
        blocks: [
          { type: 'p', text: 'FXpress as it runs today, with live reference rates for 18 currency pairs. Pick a currency to see where today’s rate sits, save a target rate, add a calendar reminder, and go on to Wise, Remitly, Xoom, Chase or a bank. FXpress itself does not move money.' },
          { type: 'figure', file: 'fxpress/02-live-widget', size: 'wide', mount: true, alt: 'Screen recording of the live FXpress widget: the amount changes, the currency switches and Fexi’s sentence updates', caption: 'The live widget: a change of currency, Fexi’s sentence updating, then the hand-off to the sender’s own provider.' },
          { type: 'embed', src: 'https://fxpress.netlify.app/', title: 'FXpress live widget', kind: 'phone', href: 'https://fxpress.netlify.app/' },
        ],
      },
      {
        label: 'Testing',
        heading: 'What five testers showed',
        blocks: [
          { type: 'p', text: 'Five people, seven tasks, unmoderated in Maze, on the earlier high-fidelity prototype: the version in which the product itself moved the money.' },
          { type: 'figure', file: 'fxpress/00-earlier-prototype', size: 'wide', mount: true, alt: 'Three phone screens from the earlier high-fidelity Figma prototype: the send screen, the currency picker, and a Set a Rate Trigger dialog', caption: 'The prototype that was tested. Send Now and Set Trigger for Best Rate carried equal weight, and the threshold field showed a bare number.' },
          { type: 'cols', worked: ['5 of 5 completed the send task.', 'All five looked at the recipient’s amount first.', '“I actually feel like I understand what this does before I’ve used it.” (cautious sender)'], broke: ['4 of 5 completed the target-rate task. One stopped at the threshold field because “1,380” had no currency; another hesitated there.', 'One tapped Send Now by mistake. The two buttons looked the same.'] },
          { type: 'quote', text: 'I don’t know what 1,380 means. Is that dollars, won, or shillings?', who: 'Sends money to Kenya, test participant #2' },
          { type: 'list', title: 'Changed before launch', items: ['Send Now is the filled primary button; the target-rate button is an outline.', 'The threshold field shows its currency, with a line of help text.', '“Set Trigger for Best Rate” became “Save Target Rate.” The product can’t promise a best rate.'] },
          { type: 'p', text: 'These changes are in the live widget and have not been re-tested.' },
        ],
      },
      {
        label: 'Limits',
        heading: 'What the live data showed, and what comes next',
        blocks: [
          { type: 'p', text: 'The 30-day comparison works when the rate moves within a range and misleads when it trends. Through the summer of 2026 the won strengthened steadily, and between 31 July and 20 September, 68 of the widget’s 75 logged readings said “low.”' },
          { type: 'chart', kind: 'line', data: fxDaily, readings: fxReadings, title: 'The rate fell for two months, and the widget kept saying “low”', subtitle: 'USD/KRW reference rate, 1 July to 20 September 2026. Beneath it, every widget reading in the log, placed by date and coloured by the label it gave.', caption: 'Sources: Frankfurter, ECB reference rates; FXpress event log, 75 readings across all currency pairs. A trend indicator has not shipped.' },
          { type: 'p', text: 'Next: show which way the rate has been moving as well as where it sits. The 33-call log window says nothing about whether each sentence was correct, and the offline fallback has no tracking.' },
        ],
      },
    ],
  },
  {
    slug: 'reconlayer',
    color: '#2f7a54',
    tags: ['B2B fintech', 'AI'],
    year: '2026',
    proof: 'Working Google Sheets prototype · tested with 5 operators',
    title: 'ReconLayer',
    tagline: 'Rule-based exception triage and AI-assisted dispute drafting',
    indexDesc: 'Rule-based exception triage and AI-assisted dispute drafting',
    hero: {
      file: 'reconlayer/hero', size: 'wide', mount: true,
      alt: 'The ReconLayer sidebar open beside a Google Sheets reconciliation workbook, showing a net dispute of $327,500, four value breaks, two population breaks and a Draft dispute email button',
      caption: 'The working add-on inside Google Sheets, on synthetic trade data. Values shown are illustrative.',
    },
    group: 'work',
    status: 'Working prototype',
    stage: 'Working Google Sheets proof of concept · synthetic trade data · not connected to production systems',
    cardSummary: 'Making missing trades and valuation differences visible inside a spreadsheet-native reconciliation workflow.',
    meta: [
      ['Role', 'Independent product designer · research, workflow design, implementation, usability testing'],
      ['Scope', 'Strategy, research, product design, build, testing'],
      ['Domain', 'B2B fintech, middle office'],
      ['Timeline', '12 weeks · Google Sheets add-on'],
    ],
    links: [
      { label: 'Watch it run', href: 'https://www.loom.com/share/f51e32b7800442b48ddb008a916215c6' },
      { label: 'Run it yourself', href: 'https://docs.google.com/spreadsheets/d/1S768YMxsITSpNE1bfjtJZS712crl365dC9mf_BUhYKE/copy', note: 'Copies the sheet to your Google account; the add-on runs there.' },
    ],
    context:
      'I worked in buy-side trading operations for eleven years and did this kind of reconciliation myself.',
    glance: {
      problem: 'Small operations teams reconcile internal records against broker files under a cutoff. A missing trade is easy to overlook when the workflow is built around valuation differences.',
      made: 'A spreadsheet-native prototype that classifies missing-record and value discrepancies with explicit rules. The AI drafts the dispute email only after classification; the analyst reviews it and sends outside the tool.',
      happened: 'Five buy-side operators tested it on synthetic records. Four completed the reconciliation-to-draft flow and rated ease of use 4.75 of 5. All four named a check they would make before sending; two would send the draft as is.',
    },
    beats: [
      {
        label: 'Context',
        heading: 'Two files, a cutoff, and exceptions that are easy to miss',
        blocks: [
          { type: 'p', text: 'On a small operations desk, reconciliation starts with two files and a spreadsheet. The analyst compares the firm’s records with the broker’s, chases anything that doesn’t match, and resolves it before a settlement or margin cutoff. Then they write near-identical emails to each counterparty by hand.' },
          { type: 'p', text: 'A missed trade or a misclassified break can move a margin call or the NAV. Five people across four buy-side firms, a COO, an operations lead, two analysts and an operational due-diligence consultant, described the same morning.' },
          { type: 'figure', file: 'reconlayer/01-manual-workbook', size: 'wide', mount: true, alt: 'A reconciliation spreadsheet built from synthetic records, with lookup formulas, #N/A cells where a record is missing, and hand-typed DISPUTE flags', caption: 'A manual reconciliation sheet built from synthetic records: lookups, #N/A cells where a record is missing, and hand-typed dispute flags. Each is a place for an error.' },
        ],
      },
      {
        label: 'Decisions',
        heading: 'Three decisions that shaped the product',
        blocks: [
          {
            type: 'decision', title: 'Work inside the spreadsheet, not alongside it',
            chose: 'An add-on that runs in the spreadsheet the analyst already uses.',
            instead: 'A standalone reconciliation product to sell.',
            why: 'Research changed the plan. Small desks often outsource this work, a free tool raises due-diligence questions, and the larger vendors already cover the core features. Nobody on a small team wants another system to log into.',
          },
          {
            type: 'decision', title: 'Make missing records visible before ranking differences',
            chose: 'Two groups: value breaks, where both sides have a figure that differs, and population breaks, where one side has no record at all.',
            instead: 'One list ranked by the size of the difference.',
            why: 'A missing trade has no difference to rank, so a ranked list buries it. It is often the most important item on the desk.',
          },
          {
            type: 'decision', title: 'Keep reconciliation rules separate from AI-generated writing', highlight: true,
            chose: 'Fixed rules classify every break first. The AI drafts the counterparty email from the classified data, within fixed limits, and cannot change a classification. The draft is shown for review. There is no Send button.',
            instead: 'AI-based classification; AI handling the easy cases and flagging the hard ones; a library of email templates; sending automatically.',
            why: 'An analyst can defend a rule. They can’t defend a hunch. Templates lost because the mix of breaks differs every morning, and the analyst owns each dispute, so the analyst sends it.',
            compare: {
              heading: 'Three versions of the email prompt',
              items: [
                { label: '1 · Plain request', text: 'Draft a dispute email for trade [ID] with [counterparty] that has a $[X] break.', note: 'Long, chatty emails, inconsistent currency formatting, some wrong field names.' },
                { label: '2 · Data in a template', text: 'Clean JSON variables injected into a standard prompt.', note: 'Figures were right, but the model guessed at why each break happened. A counterparty email shouldn’t speculate about causes.' },
                { label: '3 · Fixed format and limits (shipped)', text: 'Do NOT calculate, alter, or infer any figures … Fixed format: subject line, discrepancy, internal-vs-broker breakdown, call to action. Max 80 words.', note: 'Short, consistent, and limited to the data it’s given.' },
              ],
            },
            flow: {
              caption: 'The model proposes wording. It cannot change a classification or send a dispute.',
              stages: [
                { label: 'Internal and broker files', band: 'input' },
                { label: 'Reconcil\u00ADiation rules', band: 'rules' },
                { label: 'Reviewable exceptions', band: 'rules' },
                { label: 'AI-drafted email', band: 'ai' },
                { label: 'Analyst reviews and sends', band: 'outside' },
              ],
              bands: { input: 'Input', rules: 'Deterministic', ai: 'AI', outside: 'Analyst' },
            },
          },
        ],
      },
      {
        label: 'Proof',
        heading: 'From two files to a reviewable dispute draft',
        blocks: [
          { type: 'p', text: 'ReconLayer compares the two files, sets aside valuation differences below a threshold, and sorts the rest into value breaks and population breaks. On the synthetic data the threshold is $50,000 on the absolute valuation difference, a rule I set for the prototype; the sidebar labels it MTA.' },
          { type: 'p', text: 'Result: 4 value breaks, 2 population breaks, and a net value dispute of $327,500 across the four value breaks. The two missing-record breaks have nothing to net.' },
          { type: 'figure', file: 'reconlayer/04-sidebar-worklist', size: 'wide', mount: true, alt: 'The ReconLayer sidebar after a run, shown in two columns: the net value dispute, four value-break rows, two population-break rows with the missing side stated, and the Draft dispute email button', caption: 'The sidebar after a run: net dispute, value breaks, population breaks with the missing side stated, and the draft button.' },
          { type: 'figure', file: 'reconlayer/03-run', size: 'wide', mount: true, alt: 'Screen recording of the add-on in Google Sheets: Reconcile is clicked, the sidebar fills with value breaks and population breaks, then Draft dispute email produces a draft', caption: 'Reconcile, the sidebar fills, then Draft dispute email. Trimmed and sped up.' },
          { type: 'embed', src: 'https://www.loom.com/embed/f51e32b7800442b48ddb008a916215c6', title: 'ReconLayer demo video', kind: 'video', ratio: '16 / 9', href: 'https://www.loom.com/share/f51e32b7800442b48ddb008a916215c6', hrefLabel: 'Open on Loom' },
          { type: 'figure', file: 'reconlayer/05-email-draft', size: 'wide', mount: true, alt: 'A generated dispute email from the final prompt: subject line, the break IDs with internal and broker figures, and a request for confirmation', caption: 'A draft generated by the shipped prompt from the classified synthetic breaks, shown in two columns. The analyst verifies it and sends it outside the tool.' },
        ],
      },
      {
        label: 'Testing',
        heading: 'A usable workflow, not yet a trusted system',
        blocks: [
          { type: 'p', text: 'Five buy-side analysts and operators ran the real add-on, unmoderated, on the same synthetic data. Four finished reconciling, drafting and the survey; one stopped after reconciling.' },
          { type: 'cols', worked: ['Ease of use 4.75 of 5 from the four who finished.', 'On the AI draft: two would send it as is, one would edit it first, one wouldn’t trust it.'], broke: ['One of four misread “value break” and “population break”; another was unsure. The labels need plain-language explanations.', 'All four named something they’d check before sending, including the two who’d send as is.', 'What would stop them on a real morning was false positives and missed breaks, not the AI.'] },
          { type: 'quote', size: 'display', text: 'I’d at least still double-check the figures and breaks make sense.', who: 'Operations analyst, test participant' },
        ],
      },
      {
        label: 'Limits',
        heading: 'What production use would need',
        blocks: [
          { type: 'list', title: 'What the prototype doesn’t do', items: ['Google Sheets, not Excel, which most desks use. I didn’t have Excel to build or test in.', 'Two break types. Other causes are written up, not built.', 'Synthetic data on a personal Google account with the consumer Gemini API. Production would keep trade data inside the firm.', 'No audit trail. Analysts and compliance would need to see what was flagged and why; the audit view is specified, not built.'] },
          { type: 'list', title: 'Next', items: ['Plain-language break labels with short explanations.', 'The audit view.', 'Arbitrary broker file headers and email formats, in any workbook.'] },
        ],
      },
    ],
  },
  {
    slug: 'hwang-yoo-yup',
    color: '#6b2234',
    tags: ['Client work', 'Archive'],
    year: '2025',
    proof: 'Live archive · two navigation modes',
    title: 'Hwang Yoo-Yup Archive',
    tagline: 'Two ways to discover and research an artist’s work',
    indexDesc: 'Two ways to discover and research an artist’s work',
    hero: {
      file: 'hwang-yoo-yup/01-painting', size: 'bleed', crop: '21 / 9',
      alt: 'Detail of Hwang Yoo-Yup’s painting Home Return Way: figures on a road in earth tones and reds',
      caption: 'Hwang Yoo-Yup · Home Return Way, 1979 · oil on canvas · private collection. Detail.',
    },
    group: 'studio',
    status: 'Live',
    stage: 'Live site on Framer · catalogue in progress',
    cardSummary: 'Giving first-time visitors and scholars distinct ways to navigate an artist’s work.',
    meta: [
      ['Role', 'Solo product designer, paid commission from the artist’s estate'],
      ['Scope', 'Strategy, research, IA, visual design, curatorial writing, Framer build'],
      ['Domain', 'Cultural archive website'],
      ['Timeline', '9 weeks'],
    ],
    links: [{ label: 'Visit the archive', href: 'https://hwangyooyup.framer.website' }],
    glance: {
      problem: 'Hwang Yoo-Yup (1916–2010) painted the same subjects for six decades. First-time visitors need background before the work makes sense. Scholars need dates, exhibition history and a searchable record, and the background gets in their way.',
      made: 'One site with two paths. Discovery, organized by theme and motif, is the default; Archive Mode, organized as a structured record, is one toggle away on every page.',
      happened: 'The site is live on Framer with both modes working and the catalogue being added. The estate said the site honors their father’s work and legacy.',
    },
    beats: [
      {
        label: 'Context',
        heading: 'Two audiences, one site',
        blocks: [
          { type: 'p', text: 'Without context, six decades of returning to the same subjects can look repetitive. Scholars and curators arrive with specific questions and need the record, not the story.' },
          { type: 'figure', file: 'hwang-yoo-yup/hero', size: 'wide', mount: true, alt: 'The live archive homepage: a close-up of a Hwang Yoo-Yup oil painting with the title Painter of Earth in Korean and English, and a navigation bar with Overview, Journey, Motifs, Exhibition Plan and an Archive Mode toggle', caption: 'The live homepage. Discovery navigation across the top; Archive Mode one click to the right.' },
          { type: 'p', text: 'The structure came from the estate’s exhibition catalogues, academic texts and institutional records, from how other artist archives handle mixed audiences, and from four interviews: an art advisor, a gallery dealer, a museum director and a practicing artist. Two findings shaped it. Newcomers need context first, and that same context slows researchers down.' },
        ],
      },
      {
        label: 'Decisions',
        heading: 'Four decisions',
        blocks: [
          {
            type: 'decision', title: 'One site with two paths', highlight: true,
            chose: 'One site. Discovery (Overview, Journey, Motifs, Exhibition Plan) is the default, and Archive Mode (Biography, Works, Bibliography, Exhibitions, Timeline) is one toggle away on every page.',
            instead: 'Two sites: a public exhibition site and a scholarly archive.',
            why: 'Two sites would have been too much for the estate to maintain. With one, each audience starts where it makes sense and can switch at any point.',
            figure: { file: 'hwang-yoo-yup/02-navigation', size: 'wide', mount: true, alt: 'Two captures of the same archive page: Discovery navigation with Overview, Journey, Motifs and Exhibition Plan, and Archive Mode navigation with Biography, Works, Bibliography, Exhibitions and Timeline', caption: 'Archive Mode adds a second row of navigation under the Discovery nav. The toggle sits at the far right of every page.' },
          },
          {
            type: 'decision', title: 'Themes first, dates in the archive',
            chose: 'Discovery is organized by three themes I wrote and a Motifs section. The chronology lives in Archive Mode.',
            instead: 'Date order, which most artist archives use.',
            why: 'Newcomers don’t yet have the background to make sense of a timeline. Themes give them somewhere to start.',
          },
          {
            type: 'decision', title: 'Everything about a work on one page',
            chose: 'The full-size image, curatorial text, themes, details and related works, with historical context in an expandable section.',
            why: 'Scholars skip the context. Newcomers open it.',
            figure: { file: 'hwang-yoo-yup/03-artwork-page', size: 'wide', mount: true, alt: 'A live artwork page from the archive: the painting, its structured metadata block and the historical-context section', caption: 'An artwork page: the painting first, the structured record beside it, the context below.' },
          },
          {
            type: 'decision', title: 'A quiet visual system',
            chose: 'A dark burgundy background, warm off-white text and earth tones taken from Hwang’s paintings, with Korean and English at equal size.',
            why: 'The paintings carry the color. Every other visual choice was checked against whether it drew attention to them.',
          },
        ],
      },
      {
        label: 'Proof',
        heading: 'The live archive',
        blocks: [
          { type: 'p', text: 'The archive as its visitors see it. Switch between Discovery and Archive Mode from any page.' },
          { type: 'figure', file: 'hwang-yoo-yup/02-archive-toggle', size: 'wide', mount: true, alt: 'Screen recording of the live archive: the Discovery homepage, the Archive Mode toggle, then the Biography and Exhibitions pages in Archive Mode', caption: 'Discovery, the Archive Mode toggle, then Biography and Exhibitions in Archive Mode.' },
          { type: 'embed', src: 'https://hwangyooyup.framer.website/', title: 'Hwang Yoo-Yup archive, live site', kind: 'site', ratio: '16 / 10', href: 'https://hwangyooyup.framer.website/' },
        ],
      },
      {
        label: 'Next',
        heading: 'Live, with the catalogue in progress',
        blocks: [
          { type: 'p', text: 'The catalogue of works is still being added. I also wrote an exhibition plan for a retrospective in four sections, Formation, Displacement, Labor & Land, and Ritual. It is a proposal; no date is set.' },
          { type: 'figure', file: 'hwang-yoo-yup/04-exhibition-plan', size: 'wide', mount: true, alt: 'The Exhibition Plan section of the live site: four zones, Formation, Displacement, Labor & Land and Ritual, each with a focus line', caption: 'The exhibition plan on the live site: four zones, each with its focus. A proposal; no date is set.' },
          { type: 'p', text: 'The estate said the site stands as a testament to their father’s work and honors his legacy.' },
        ],
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
