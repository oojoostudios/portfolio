// All case-study content lives here.
//
// Figures: `file` is the path under public/images (no extension). The build's media
// check (scripts/check-media.mjs) fails if a hero is missing and lists missing optional
// figures. A missing optional figure is simply not rendered. `brief` is an internal
// production note for the designer and is never shown on the page. `alt` describes the
// image for screen readers; `caption` is the visible, evidence-based caption.
//
// Voice: plain, first person, specific. Headings describe what happened.
// Never state a number, result or quote that can't be traced to project notes.

export const projects = [
  {
    slug: 'fxpress',
    color: '#3848a8',
    tags: ['Consumer fintech', 'AI'],
    year: '2025–26',
    proof: 'Live rate-context product · 18 currency pairs',
    title: 'FXpress',
    tagline: 'Transparent rate context for international transfers',
    indexDesc: 'Transparent rate context for international transfers',
    hero: {
      file: 'fxpress/hero',
      alt: 'The live FXpress widget: a 500 USD to KRW conversion, the 30-day range, the recipient amount, Fexi’s one-sentence rate description, and Send Now and Save Target Rate buttons',
      caption: 'The live widget as it runs today: USD to KRW, the 30-day range, and Fexi’s descriptive sentence.',
      brief: 'Replace with a Figma-framed capture of the live widget if preferred; the current file is a direct screenshot of fxpress.netlify.app.',
    },
    group: 'work',
    status: 'Live',
    stage: 'Live product · reference-rate data · hands off to the sender’s own provider',
    cardSummary: 'Helping international senders interpret today’s exchange rate without predicting when to transfer.',
    meta: [
      ['Role', 'Independent product designer · research, design, build, testing'],
      ['Scope', 'Research, product design, AI interaction, build, usability testing'],
      ['Domain', 'Consumer fintech'],
      ['Timeline', 'Nov 2025 to Oct 2026 · live'],
    ],
    links: [{ label: 'Try it live', href: 'https://fxpress.netlify.app' }],
    glance: {
      problem: 'Money transfer apps show today’s exchange rate but give no context for it. On central-bank reference rates, USD/KRW moved an average of 3.7% within each month over the past year, about $74 on a $2,000 transfer.',
      made: 'A live widget that shows where today’s rate sits in its 30-day range, then hands off to the provider the sender already uses. The code does every calculation; the AI assistant only rewords a sentence the code has written.',
      happened: 'Five of five testers completed the send task in the high-fidelity Figma prototype, and four of five completed the target-rate task. The widget is live across 18 currency pairs; in the first 30 days of logs, all 33 AI calls returned without error.',
    },
    beats: [
      {
        label: 'Context',
        heading: 'A rate on its own tells you nothing',
        blocks: [
          { type: 'p', text: 'My parents have sent money from the US to Korea for decades. Every app they use shows today’s rate, but none says how it compares with recent weeks.' },
          { type: 'p', text: 'The day matters more than it seems. The 3.7% monthly swing above illustrates how much the rate moves, not a saving a sender could lock in, and it excludes provider fees and markups.' },
          { type: 'figure', file: 'fxpress/01-rate-range-chart', alt: 'Bar chart of monthly high and low USD/KRW reference rates from September 2025 to September 2026', caption: 'Monthly high-to-low USD/KRW reference-rate ranges, Sep 2025 to Sep 2026. Reference rates, not executable transfer quotes.', brief: 'Chart from actual date-stamped monthly highs and lows (Frankfurter data). 1600×900. See brief G1.' },
          { type: 'p', text: 'In November 2025 I interviewed four people who send money abroad. Picking a day to send felt like guessing, and what they cared about was how much the recipient would get. Two asked for a forecast, which I decided not to build.' },
          { type: 'quote', text: 'I usually end up Googling the exchange rate and trying to catch it on a ‘good day,’ which is kind of ridiculous. It feels like I’m managing trades for personal transfers.', who: 'Monthly international sender, research participant' },
        ],
      },
      {
        label: 'Decisions',
        heading: 'Four decisions about what the product is allowed to say',
        blocks: [
          { type: 'p', text: 'Three rules framed every decision: no forecasting, no financial advice, and no invented pricing. The product describes; the sender decides.' },
          {
            type: 'decision', title: 'Describe the rate instead of advising',
            chose: 'One sentence describing where today’s rate sits, then a link to the sender’s own provider.',
            instead: 'An assistant that recommended a provider and a time to send; an auto-router that moved the money; a chat assistant.',
            why: 'A recommendation implies the product knows what the rate will do next, and it doesn’t. Moving money would mean licensing, custody and compliance obligations; a chat interface would slow down a 30-second task.',
            figure: { file: 'fxpress/02-advice-before-after', alt: 'Two phone screens side by side: an earlier Figma concept where the assistant recommends when to send, and the live widget’s neutral rate description', caption: 'The assistant shifted from suggesting decisions to explaining recent exchange-rate context. Left: earlier high-fidelity concept. Right: live widget.', brief: 'See brief F5.' },
          },
          {
            type: 'decision', title: 'Compare against 30 days of history, not this session',
            chose: 'A 30-day range from central-bank reference rates, split into low, mid and high. With fewer than 10 days of history, it makes no comparison at all.',
            instead: 'Comparing today’s rate with rates seen during the visitor’s session.',
            why: 'My first build called a rate “the best rate you’ve seen this session” on a first visit, when there was nothing to compare it to.',
          },
          {
            type: 'decision', title: 'Remove the fee line',
            chose: 'Show the amount at today’s rate, with a note that the provider’s fee and markup aren’t included.',
            instead: 'Showing an estimated fee next to the recipient amount.',
            why: 'FXpress can’t see what providers charge, and an estimate on a money screen would look like a real figure.',
          },
          {
            type: 'decision', title: 'Keep the interpretation in code', highlight: true,
            chose: 'The code works out where the rate sits and writes the sentence. Fexi, the assistant, rewords it, and a check rejects any reply that changes the meaning, adds a number, or reads as advice. With fewer than 10 days of history the server answers without calling the model at all.',
            instead: 'Letting the AI read the data and interpret it, guided by instructions.',
            why: 'In October 2026 Fexi told a sender that a rate at the low end of the month meant they were getting the most won for their dollar. It meant the opposite. The sentence sounded fine, so a user wouldn’t have noticed.',
            compare: {
              heading: 'How the assistant’s instructions changed',
              items: [
                { label: 'First version', text: '…Write ONE short, warm sentence telling them whether now is a good moment to send and why… Do NOT predict the future.', note: 'Asking it to say “whether now is a good moment to send” is asking for advice, even with the line about not predicting.' },
                { label: 'Shipped version', text: 'You narrate. You never decide. … Never forecast … Never tell the user whether to send. … Never mention fees.', note: 'It rules out calculating, forecasting and advising. The assessment now happens in JavaScript before the model sees anything. I also removed a thumbs-up pose from Fexi’s avatar, because the gesture suggested approval of the rate.' },
              ],
            },
            figure: { file: 'fxpress/03-fexi-states', alt: 'Four Fexi assistant states shown as cards, each with the condition that triggers it and the sentence the assistant is allowed to say', caption: 'Fexi’s states and what each is allowed to say. The assessment is computed in code; the assistant only phrases it.', brief: 'From the Figma FexiCard component set (node 5628:12733). Confirm which states exist; see brief G2.' },
          },
        ],
      },
      {
        label: 'Proof',
        heading: 'The live widget',
        blocks: [
          { type: 'p', text: 'FXpress as it runs today, with live reference rates for 18 currency pairs. Pick a currency and see where today’s rate sits. People can save a target rate, add a calendar reminder, and go to a provider such as Wise, Remitly, Xoom, Chase or their own bank. FXpress itself does not move money.' },
          { type: 'embed', src: 'https://fxpress.netlify.app/', title: 'FXpress live widget', kind: 'phone', href: 'https://fxpress.netlify.app/' },
        ],
      },
      {
        label: 'Testing',
        heading: 'What testing the prototype showed',
        blocks: [
          { type: 'p', text: 'An unmoderated Maze test with five people and seven tasks, on the high-fidelity Figma prototype, an earlier version in which the product itself moved the money. Counts, not percentages.' },
          { type: 'figure', file: 'fxpress/00-earlier-prototype', alt: 'Three phone screens from the earlier high-fidelity Figma prototype: the send screen, the currency picker, and a Set a Rate Trigger dialog', caption: 'The earlier high-fidelity prototype that was tested. Send Now and Set Trigger for Best Rate had equal visual weight, and the threshold field showed a bare number.' },
          { type: 'cols', worked: ['5 of 5 completed the send task.', 'All five looked at the recipient’s amount first.', '“I actually feel like I understand what this does before I’ve used it.” (cautious sender)'], broke: ['4 of 5 completed the target-rate task. One stopped at the threshold field because “1,380” had no currency, and another hesitated there.', 'One tapped Send Now by mistake. Both buttons had the same visual weight.'] },
          { type: 'quote', text: 'I don’t know what 1,380 means. Is that dollars, won, or shillings?', who: 'Sends money to Kenya, test participant #2' },
          { type: 'list', title: 'What I changed before launch', items: ['Made Send Now the filled primary button and the target-rate button an outline.', 'Added the currency to the threshold field, with a line of help text.', 'Renamed “Set Trigger for Best Rate” to “Save Target Rate,” since the product can’t promise the best rate.'] },
          { type: 'figure', file: 'fxpress/04-buttons-before-after', alt: 'Before and after crops of the action area: equal-weight Send Now and trigger buttons with an unlabelled 1,380 threshold, then a filled primary button, outlined secondary button and a threshold labelled KRW per USD', caption: 'Testing exposed ambiguous button priority and a threshold with no currency. The revised hierarchy and labels addressed both; the revision has not been re-tested with users.', brief: 'See brief G3.' },
          { type: 'p', text: 'These changes are in the live widget. I haven’t re-tested them with users.' },
        ],
      },
      {
        label: 'Limits',
        heading: 'What the live data showed, and what’s next but not yet built',
        blocks: [
          { type: 'p', text: 'The 30-day comparison is useful when the rate moves up and down within a range, and less useful when it moves steadily in one direction. From July to September the won kept strengthening, and 68 of 75 readings said “low.”' },
          { type: 'figure', file: 'fxpress/05-range-reading-charts', alt: 'Two aligned charts: the USD/KRW reference rate falling from July to September 2026, and the widget’s range label reading low for 68 of 75 readings over the same period', caption: 'Observed rate direction versus the widget’s rolling range labels, Jul to Sep 2026. This informed the next design hypothesis; a trend indicator has not shipped.', brief: 'See brief G4.' },
          { type: 'p', text: 'Next I’d show which way the rate has been moving, as well as where it sits. The 33-call logging window above says nothing about whether every sentence was correct, and the offline fallback has no tracking, so I can’t say whether it has been used.' },
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
      file: 'reconlayer/hero',
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
      problem: 'Small operations teams compare internal records against broker files under time pressure. A missing trade can be overlooked when the workflow emphasizes valuation differences.',
      made: 'A spreadsheet-native prototype that classifies missing-record and value discrepancies with explicit rules. AI drafts dispute communications only after classification; the analyst reviews them and sends outside the tool.',
      happened: 'Five buy-side operators tested the add-on on synthetic records; four completed the reconciliation-to-draft flow and rated ease of use 4.75 of 5 on average. All four named a check they would make before sending; two said they might send the draft as is.',
    },
    beats: [
      {
        label: 'Context',
        heading: 'Two files, a cutoff, and exceptions that are easy to miss',
        blocks: [
          { type: 'p', text: 'On a small finance operations desk, reconciliation often starts with two files and a spreadsheet. The analyst compares the firm’s records with the broker’s file, looks into anything that doesn’t match, and resolves it before a settlement or margin cutoff. Then they write similar emails to each counterparty by hand.' },
          { type: 'p', text: 'Mistakes matter: a missed trade or misclassified break can affect a margin call or NAV. I interviewed five people across four buy-side firms, a COO, an operations team lead, two analysts and an external operational due-diligence consultant.' },
          { type: 'figure', file: 'reconlayer/01-manual-workbook', alt: 'An illustrative reconciliation spreadsheet built from synthetic records, with VLOOKUP formulas, #N/A cells and hand-typed DISPUTE flags', caption: 'Illustrative manual reconciliation sheet, built from synthetic records, showing why lookups, unmatched records and hand-entered flags need repeated analyst checks.', brief: 'See brief G5. Label inside the asset: ILLUSTRATIVE WORKBOOK · SYNTHETIC DATA.' },
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
            why: 'Research changed my plan: small desks often outsource this work, a free tool raises due-diligence questions, and larger vendors already cover the core features. A small team doesn’t want another system and login to maintain.',
          },
          {
            type: 'decision', title: 'Make missing records visible before ranking differences',
            chose: 'Two groups: value breaks, where both sides have a figure that differs, and population breaks, where one side has no record at all.',
            instead: 'One list ranked by the size of the difference.',
            why: 'A trade missing from one file has no difference to rank, so it would sink to the bottom of a ranked list. It is often the most important item on the desk.',
            figure: { file: 'reconlayer/03-break-rows', alt: 'Two exception cards comparing a valuation mismatch, where both records exist but values differ, with a trade present in the broker file only', caption: 'A missing-record exception needs a different label and review path from a valuation difference. Example trade values are synthetic.', brief: 'See brief F2.' },
          },
          {
            type: 'decision', title: 'Keep reconciliation rules separate from AI-generated writing', highlight: true,
            chose: 'Fixed rules classify every break first. The AI drafts the counterparty email from the classified data, within fixed limits, and cannot change a classification. The draft is shown for review; ReconLayer has no Send button.',
            instead: 'AI-based classification; AI handling the easy cases and flagging the hard ones; a library of email templates; sending automatically.',
            why: 'Analysts have to be able to explain each decision. In my words from the project: “An analyst can defend a rule. They can’t defend a hunch.” Templates lost because the mix of breaks is different every morning, and the analyst is responsible for each dispute, so the analyst sends it.',
            compare: {
              heading: 'Three versions of the email prompt',
              items: [
                { label: '1 · Plain request', text: 'Draft a dispute email for trade [ID] with [counterparty] that has a $[X] break.', note: 'Long, chatty emails, inconsistent currency formatting, some wrong field names.' },
                { label: '2 · Data in a template', text: 'Clean JSON variables injected into a standard prompt.', note: 'Figures were right, but the model guessed at why each break happened. A counterparty email shouldn’t speculate about causes.' },
                { label: '3 · Fixed format and limits (shipped)', text: 'Do NOT calculate, alter, or infer any figures … Fixed format: subject line, discrepancy, internal-vs-broker breakdown, call to action. Max 80 words.', note: 'Short, consistent, and limited to the data it’s given.' },
              ],
            },
            figure: { file: 'reconlayer/02-ai-boundary-diagram', alt: 'Flow diagram in five stages: internal and broker files, reconciliation rules, reviewable exceptions, AI-generated draft, analyst review. The rules and exceptions sit in a deterministic band; only the draft sits in the AI band', caption: 'The model can propose wording but cannot change a reconciliation classification or send a dispute.', brief: 'See brief F3.' },
          },
        ],
      },
      {
        label: 'Proof',
        heading: 'From two files to a reviewable dispute draft',
        blocks: [
          { type: 'p', text: 'ReconLayer compares the two files, sets aside valuation differences below a threshold, and sorts what’s left into value breaks and population breaks. On the synthetic test data the prototype applies a $50,000 threshold on the absolute valuation difference, a rule I set for the prototype (the sidebar labels it “MTA”).' },
          { type: 'p', text: 'Result: 4 value breaks, 2 population breaks, and a net value dispute of $327,500 across the four value breaks. The two missing-record breaks have no difference to net.' },
          { type: 'figure', file: 'reconlayer/04-sidebar-worklist', alt: 'Close-up of the ReconLayer sidebar: the net value dispute, four value-break rows, two population-break rows with the missing side stated, and the Draft dispute email button', caption: 'Reconciled synthetic trade records grouped for review. The net value discrepancy is shown separately from unmatched records.', brief: 'See brief G6.' },
          { type: 'embed', src: 'https://www.loom.com/embed/f51e32b7800442b48ddb008a916215c6', title: 'ReconLayer demo video', kind: 'video', ratio: '16 / 9', href: 'https://www.loom.com/share/f51e32b7800442b48ddb008a916215c6', hrefLabel: 'Open on Loom' },
          { type: 'figure', file: 'reconlayer/05-email-draft', alt: 'A generated dispute email from the final prompt: subject line, the break ID with internal and broker figures, and a request for confirmation, with annotations noting fixed data fields, no invented causes, and human sign-off outside the tool', caption: 'An AI-assisted dispute draft generated from classified synthetic breaks. The analyst remains responsible for verifying and sending it.', brief: 'See brief F4. Must be a real generated email from version 3.' },
        ],
      },
      {
        label: 'Testing',
        heading: 'A usable workflow, but not yet a trusted system',
        blocks: [
          { type: 'p', text: 'Five analysts and operators from the institutional buy-side ran the real add-on, unmoderated, on the same synthetic data. Four finished reconciling, drafting and the survey; one stopped after reconciling. With four responses the results are directional, not a benchmark.' },
          { type: 'cols', worked: ['The four who finished rated ease of use 4.75 out of 5 on average.', 'On the AI draft: 2 would send it as is, 1 would edit it first, and 1 wouldn’t trust it.'], broke: ['One of four misread “value break” and “population break,” and another was unsure of them. The labels need short explanations.', 'All four named something they’d check before sending, including the two who’d send as is.', 'What would stop them using it on a real morning was false positives and missed breaks, rather than the AI.'] },
          { type: 'quote', text: 'I’d at least still double-check the figures and breaks make sense.', who: 'Operations analyst, test participant' },
        ],
      },
      {
        label: 'Limits',
        heading: 'What would need to change for production use',
        blocks: [
          { type: 'list', title: 'What the prototype doesn’t do', items: ['Google Sheets, not Excel: most desks use Excel, but I didn’t have Excel to build or test in.', 'Two break types only; other causes are written up for later.', 'Not ready for real data: it runs on a personal Google account with the consumer Gemini API, on synthetic data. A production version would need to keep trade data inside the firm.', 'No audit trail yet: analysts and compliance teams would need to see what was flagged and why. An audit view is specified but not built.'] },
          { type: 'list', title: 'What I’d change next', items: ['Plain-language break labels with short explanations.', 'The audit view.', 'Different broker file headers and email formats, in any workbook.'] },
        ],
      },
    ],
  },
  {
    slug: 'hwang-yoo-yup',
    color: '#6b2234',
    tags: ['Client work', 'Archive'],
    year: '2026',
    proof: 'Live archive · two navigation modes',
    title: 'Hwang Yoo-Yup Archive',
    tagline: 'Two ways to discover and research an artist’s work',
    indexDesc: 'Two ways to discover and research an artist’s work',
    hero: {
      file: 'hwang-yoo-yup/hero',
      alt: 'The live archive homepage: a close-up of a Hwang Yoo-Yup oil painting with the title Painter of Earth in Korean and English, and a navigation bar with Overview, Journey, Motifs, Exhibition Plan and an Archive Mode toggle',
      caption: 'Live archive homepage with Discovery navigation and the Archive Mode toggle.',
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
      problem: 'Hwang Yoo-Yup (1916–2010) painted the same subjects for six decades. First-time visitors need background before the work makes sense; scholars need dates, exhibition history and a searchable record, and long interpretive text gets in their way.',
      made: 'One site with two paths. Discovery, organized by theme and motif, is the default; Archive Mode, organized as a structured record, is one toggle away on every page.',
      happened: 'The site is live on Framer with both modes working, and the catalogue is being added. The estate told me the site honors their father’s work and legacy.',
    },
    beats: [
      {
        label: 'Context',
        heading: 'Two audiences with different needs',
        blocks: [
          { type: 'p', text: 'First-time visitors often know little about Korean history, and without background Hwang’s six decades of returning to the same subjects can look repetitive. Scholars and curators arrive with specific questions and need dates, exhibition history and a searchable record.' },
          { type: 'figure', file: 'hwang-yoo-yup/01-painting', alt: 'Hwang Yoo-Yup’s painting Home Return Way (1979), an oil painting of figures on a road in earth tones', caption: 'Hwang Yoo-Yup · Home Return Way, 1979 · oil on canvas · private collection.', brief: 'See brief G7. Authorized reproduction only; confirm title, year, medium, dimensions and credit with the estate.' },
          { type: 'p', text: 'I went through the estate’s exhibition catalogs, academic texts, institutional records and biographical documents, looked at how other artist archives handle mixed audiences, and interviewed four people in the art world: an art advisor, a gallery dealer, a museum director and a practicing artist. Two findings shaped the structure: newcomers need context first, and that same context slows researchers down.' },
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
            why: 'Two sites would have been too much for the estate to maintain. With one site, each audience starts where it makes sense for them and can switch at any point.',
            figure: { file: 'hwang-yoo-yup/02-navigation', alt: 'Two captures of the same archive page: Discovery navigation with Overview, Journey, Motifs and Exhibition Plan, and Archive Mode navigation with Biography, Works, Bibliography, Exhibitions and Timeline', caption: 'The same site offers narrative discovery and structured archive navigation without duplicating content.', brief: 'See brief G8.' },
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
            why: 'Scholars can skip the context and newcomers can open it.',
            figure: { file: 'hwang-yoo-yup/03-artwork-page', alt: 'A live artwork page from the archive with callouts pointing to the artwork image, the structured metadata block, and the expandable historical-context section', caption: 'Art-first presentation with structured metadata and optional historical context, preserving both research paths.', brief: 'See brief G9.' },
          },
          {
            type: 'decision', title: 'A quiet visual system',
            chose: 'A dark burgundy background, warm off-white text and earth tones taken from Hwang’s paintings, with Korean and English at equal size.',
            why: 'I wanted the paintings to carry the color, and I checked each visual choice against whether it drew attention to them.',
            figure: { file: 'hwang-yoo-yup/04-palette-type', alt: 'The archive’s palette of burgundy, off-white and earth tones with hex values, and Korean and English heading samples at equal size and weight', caption: 'A restrained visual language informed by the paintings, using bilingual type with equivalent hierarchy.', brief: 'See brief G10.' },
          },
        ],
      },
      {
        label: 'Proof',
        heading: 'The live archive',
        blocks: [
          { type: 'p', text: 'The archive as its visitors see it. Switch between Discovery and Archive Mode from any page.' },
          { type: 'embed', src: 'https://hwangyooyup.framer.website/', title: 'Hwang Yoo-Yup archive, live site', kind: 'site', ratio: '16 / 10', href: 'https://hwangyooyup.framer.website/' },
        ],
      },
      {
        label: 'Next',
        heading: 'Live, with the catalogue in progress',
        blocks: [
          { type: 'p', text: 'The full catalogue of works is still being added. I also wrote an exhibition plan for a retrospective in four sections, Formation, Displacement, Labor & Land, and Ritual; it is a proposal, and no exhibition date is set.' },
          { type: 'p', text: 'The estate told me they appreciated the care that went into the site, and that it stands as a testament to their father’s work and honors his legacy.' },
        ],
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
