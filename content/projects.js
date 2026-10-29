// All case-study content lives here. Anything marked `todo` renders as a
// visible amber placeholder so it can't ship unnoticed. Never replace a todo
// with a number you can't source.
//
// Voice: plain, first person, specific. Headings describe what happened.
// No slogans, no "not X but Y" reveals, no dramatic dashes.

export const projects = [
  {
    slug: 'fxpress',
    tags: ['Consumer fintech', 'AI'],
    year: '2025–26',
    proof: 'Live · 18 currency pairs · 5 of 5 completed the send flow',
    stats: [['18', 'currency pairs live'], ['5 of 5', 'testers completed the send flow'], ['33 of 33', 'AI calls without an error'], ['83', 'visitors since July 2026']],
    title: 'FXpress',
    tagline: 'An exchange-rate widget for people who send money abroad',
    hero: { file: 'fxpress/hero', brief: 'Live widget screenshot (fxpress.netlify.app): corridor picker, today’s rate placed in its 30-day band, recipient amount, and Fexi’s one-line explanation. Phone frame on a plain background.' },
    group: 'work',
    status: 'Live',
    cardSummary:
      'Helps people sending money abroad see whether today’s rate is a good one.',
    meta: [
      ['Role', 'Solo product designer (design and build)'],
      ['Scope', 'Research, product design, AI, build, testing'],
      ['Domain', 'Consumer fintech'],
      ['Timeline', 'Nov 2025 to Oct 2026, live'],
    ],
    links: [{ label: 'Try it live', href: 'https://fxpress.netlify.app' }],
    tldr: {
      problem:
        'Money transfer apps show today’s exchange rate but not whether it’s a good one. Over the past year USD/KRW moved an average of 3.7% within each month, about $74 on a $2,000 transfer.',
      decision:
        'Show where today’s rate sits in its 30-day range. The code does every calculation, and the AI assistant only rewords a sentence the code has already written.',
      rejected:
        'Telling people when or where to send, and showing estimated fees. The product can’t know either.',
      result: [
        'Live across 18 currency pairs',
        '5 of 5 testers completed the send flow',
        'Logging showed where the range reading breaks down, and I changed the copy',
        '83 visitors since July 2026',
      ],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Knowing whether today’s rate is a good one',
        body: [
          'My parents have sent money from the US to Korea for decades. Every app they use shows today’s rate, but none says whether it’s a good one. To know that, you’d have to compare it with the last few weeks yourself.',
          'Over the past year, USD/KRW moved an average of 3.7% within each month. On a $2,000 transfer, that’s about $74.',
        ],
        figure: { file: 'fxpress/01-rate-range-chart', caption: 'Monthly high and low for USD/KRW, Sep 2025 to Sep 2026', brief: 'Bar chart from your case study PDF: one bar per month showing the USD/KRW high–low range.' },
      },
      {
        kind: 'text',
        eyebrow: 'Research',
        heading: 'Interviews with four senders',
        body: [
          'In November 2025 I interviewed four people who send money abroad.',
          'Two things came up most. Picking a day to send felt like guessing, and what they cared about was how much the recipient would get. Two of the four asked for a forecast.',
        ],
        quote: {
          text: 'I usually end up Googling the exchange rate and trying to catch it on a ‘good day,’ which is kind of ridiculous. It feels like I’m managing trades for personal transfers.',
          who: 'Monthly international sender, research participant',
        },
      },
      {
        kind: 'principles',
        eyebrow: 'Constraints',
        heading: 'Three rules I set before designing screens',
        items: [
          ['No forecasting', 'It shows where today’s rate sits compared with recent history and makes no predictions.'],
          ['No financial advice', 'The AI explains the rate. The sender decides.'],
          ['No invented pricing', 'It can’t see a provider’s fee or markup, so it doesn’t estimate them.'],
        ],
      },
      {
        kind: 'options',
        eyebrow: 'Exploring',
        heading: 'Three directions I considered',
        items: [
          ['Auto-router that sends for you', 'Cut', 'Moving money would require a money transmitter license.'],
          ['Chat assistant', 'Cut', 'A monthly transfer takes about 30 seconds. Typing questions would slow it down.'],
          ['Widget with a short explanation', 'Chosen', 'Shows where today’s rate sits in its recent range, then links to the provider the sender already uses.'],
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Decisions about what the product says',
        items: [
          {
            title: 'Describing the rate instead of advising',
            considered: 'An assistant that recommended a provider and a time to send.',
            chose: 'One sentence describing where today’s rate sits, then a link to the sender’s own provider.',
            why: 'A recommendation implies the product knows what the rate will do next, and it doesn’t.',
            figure: { file: 'fxpress/02-advice-before-after', caption: 'Early design that advised, and the live description', brief: 'Two frames side by side: the early hi-fi where the assistant recommends a send time, and the live widget’s neutral one-sentence description.' },
          },
          {
            title: 'Comparing against 30 days of history',
            considered: 'Comparing today’s rate with rates seen during the visitor’s session.',
            chose: 'A 30-day range from central-bank reference rates, split into low, mid and high. With fewer than 10 days of history, it makes no comparison.',
            why: 'My first build called a rate “the best rate you’ve seen this session” on a first visit, when there was nothing to compare it to.',
          },
          {
            title: 'Removing the fee line',
            considered: 'Showing an estimated fee next to the recipient amount.',
            chose: 'Show the amount at today’s rate, with a note that the provider’s fee and markup aren’t included.',
            why: 'FXpress can’t see what providers charge, and an estimate on a money screen would look like a real figure.',
          },
          {
            title: 'Keeping the interpretation in code',
            considered: 'Letting the AI read the data and interpret it, guided by instructions.',
            chose: 'The code works out where the rate sits and writes the sentence. Fexi, the assistant, rewords it, and a check rejects any reply that changes the meaning, adds a number, or reads as advice.',
            why: 'In October 2026 Fexi told a sender that a rate at the low end of the month meant they were getting the most won for their dollar. It meant the opposite. The sentence sounded fine, so a user wouldn’t have noticed.',
            highlight: true,
            figure: { file: 'fxpress/03-fexi-states', caption: 'Fexi’s states', brief: 'Execution exhibit: the Fexi state sheet from Figma (FexiCard set, node 5628:12733), all four states side by side, annotated with what triggers each and what Fexi is allowed to say.' },
          },
        ],
      },
      {
        kind: 'iterations',
        eyebrow: 'The AI layer',
        heading: 'How the assistant’s instructions changed',
        items: [
          {
            label: 'First version (excerpt)',
            text: '…Write ONE short, warm sentence telling them whether now is a good moment to send and why… Do NOT predict the future.',
            outcome: 'Asking it to say “whether now is a good moment to send” is asking for advice, even with the line about not predicting.',
          },
          {
            label: 'Shipped version (excerpt)',
            text: 'You narrate. You never decide. … Never forecast … Never tell the user whether to send. … Never mention fees.',
            outcome: 'It rules out calculating, forecasting and advising. The assessment itself now happens in JavaScript before the model sees anything.',
          },
        ],
        after: [
          'With fewer than 10 days of history, the server replies without calling the model.',
          'I removed a thumbs-up pose from Fexi’s avatar, because the gesture suggested approval of the rate.',
        ],
      },
      {
        kind: 'testing',
        eyebrow: 'Usability testing',
        heading: 'Testing with five senders',
        intro: 'I ran an unmoderated test in Maze with seven tasks covering sending money, setting a target rate and confirming. It used the high-fidelity Figma prototype, an earlier version that still moved money itself. With five people I report counts rather than percentages.',
        worked: [
          '5 of 5 completed the send flow.',
          'All five looked at the recipient’s amount first.',
          '“I actually feel like I understand what this does before I’ve used it.” (cautious sender)',
        ],
        broke: [
          '4 of 5 completed the target-rate flow. One stopped at the threshold field because “1,380” had no currency, and another hesitated there.',
          'One tapped Send Now by mistake. Both buttons had the same visual weight.',
        ],
        figure: { file: 'fxpress/04-buttons-before-after', caption: 'Button hierarchy and threshold field, before and after testing', brief: 'Before: Send Now and the target-rate button with equal weight; threshold field showing a bare “1,380”. After: filled Send Now, outlined Save Target Rate, threshold labelled with its currency and helper text.' },
        quote: {
          text: 'I don’t know what 1,380 means. Is that dollars, won, or shillings?',
          who: 'Sends money to Kenya, test participant #2',
        },
        changes: [
          'Made Send Now the filled primary button and the target-rate button an outline.',
          'Added the currency to the threshold field, with a line of help text.',
          'Renamed “Set Trigger for Best Rate” to “Save Target Rate,” since the product can’t promise the best rate.',
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Shipped',
        heading: 'What’s live',
        body: [
          'FXpress uses reference-rate data for 18 currency pairs. People can save a target rate, add a calendar reminder, and go to a provider such as Wise, Remitly, Xoom, Chase or their own bank.',
          'In the first 30 days, all 33 AI calls succeeded and the server logged no errors. There’s an offline fallback, but I didn’t add tracking to it, so I can’t say whether it has been used.',
        ],
        figure: { file: 'fxpress/05-range-reading-charts', caption: 'USD/KRW and the range reading, Jul to Sep 2026', brief: 'From your Drive deep-dive prep: USD/KRW falling Jul–Sep 2026, and the range position pinned to “low” over the same period.' },
      },
      {
        kind: 'text',
        eyebrow: 'Reflection',
        heading: 'What the live data showed',
        body: [
          'The 30-day comparison is useful when the rate moves up and down within a range. It’s less useful when the rate moves steadily in one direction. From July to September the won kept strengthening, and 68 of 75 readings said “low.” Next I’d show which way the rate has been moving, as well as where it sits.',
        ],
      },
    ],
  },
  {
    slug: 'reconlayer',
    tags: ['B2B fintech', 'AI'],
    year: '2026',
    proof: '5 operators tested · ease 4.75 / 5',
    stats: [['5', 'buy-side operators tested it'], ['4 of 5', 'finished the full flow'], ['4.75 / 5', 'average ease rating'], ['4 of 4', 'named a check before sending']],
    title: 'ReconLayer',
    tagline: 'Reconciliation and break triage for small middle-office teams',
    hero: { file: 'reconlayer/hero', brief: 'ReconLayer sidebar open inside Google Sheets: net dispute +$327,500, 4 value breaks and 2 population breaks pinned, Draft email button visible.' },
    group: 'work',
    status: 'Working prototype',
    cardSummary:
      'Helps small middle-office teams find and resolve trade breaks inside the spreadsheet they already use.',
    meta: [
      ['Role', 'Solo product designer (design and build)'],
      ['Scope', 'Strategy, research, product design, build, testing'],
      ['Domain', 'B2B fintech, middle office'],
      ['Timeline', '12 weeks, Google Sheets add-on'],
    ],
    links: [
      { label: 'Watch it run', href: 'https://www.loom.com/share/f51e32b7800442b48ddb008a916215c6' },
    ],
    context:
      'I worked in buy-side trading operations for eleven years and did this kind of reconciliation myself.',
    tldr: {
      problem:
        'Small desks still reconcile their positions against broker files by hand before settlement and margin cutoffs. A missed or misclassified break can affect a margin call or NAV, and the analyst is responsible for it.',
      decision:
        'An add-on inside the analyst’s existing spreadsheet. Rules classify every break, and AI drafts the counterparty email afterwards for the analyst to review.',
      rejected:
        'A standalone product, AI-based classification, a large template library, and a single list ranked by size.',
      result: [
        '5 operators ran the add-on and 4 finished. Average ease rating: 4.75 of 5',
        'All 4 said they’d check something before sending. Their questions were about the rules, not the AI',
      ],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Reconciling by hand before a cutoff',
        body: [
          'On a small finance operations desk, reconciliation often starts with two files and a spreadsheet. The analyst compares the firm’s records with the broker’s file, looks into anything that doesn’t match, and resolves it before a settlement or margin cutoff.',
          'It takes time, and mistakes matter. A missed trade or misclassified break can affect a margin call or NAV. After that, the analyst writes similar emails to each counterparty by hand.',
          'I interviewed five people across four buy-side firms: a COO, an operations team lead, two analysts, and an external operational due-diligence consultant.',
        ],
        figure: { file: 'reconlayer/01-manual-workbook', caption: 'Manual reconciliation workbook before ReconLayer', brief: 'The “before” spreadsheet: VLOOKUPs, #N/A cells and hand-typed DISPUTE flags.' },
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Five decisions that shaped the product',
        items: [
          {
            title: 'Building inside the spreadsheet',
            considered: 'A standalone reconciliation product.',
            chose: 'An add-on that runs in the spreadsheet the analyst already uses.',
            why: 'I started out planning a product to sell. Research changed that: small desks often outsource this work, a free tool raises due-diligence questions, and larger vendors already cover the core features. A small team doesn’t want another system and login to maintain.',
          },
          {
            title: 'Rules classify, AI drafts',
            considered: 'AI-based classification, or AI handling the easy cases and flagging the hard ones.',
            chose: 'Fixed rules classify every break first. The AI starts after that and can’t change a classification.',
            why: 'Analysts have to be able to explain each decision. In my words from the project: “An analyst can defend a rule. They can’t defend a hunch.”',
            highlight: true,
            figure: { file: 'reconlayer/02-ai-boundary-diagram', caption: 'Where the AI sits in the flow', brief: 'Diagram: Two files → Rules engine → Classified breaks → AI draft → Human, with a dashed AI BOUNDARY box around the drafting step only.' },
          },
          {
            title: 'AI drafts instead of templates',
            considered: 'A library of email templates.',
            chose: 'An AI draft built from the classified breaks, within fixed limits.',
            why: 'The mix of breaks is different every morning, so templates would need a version for every combination.',
          },
          {
            title: 'Review before sending',
            considered: 'Sending the drafted email automatically.',
            chose: 'The draft is shown for review. ReconLayer has no Send button.',
            why: 'The analyst is responsible for each dispute, so they should be the one to send it.',
          },
          {
            title: 'Showing missing trades separately',
            considered: 'One list ranked by the size of the difference.',
            chose: 'Two groups: value breaks, where both sides have a number that differs, and population breaks, where one side is missing.',
            why: 'A trade missing from one file has no difference to rank, so it would end up at the bottom of a ranked list. It’s often the most important item.',
            figure: { file: 'reconlayer/03-break-rows', caption: 'A population break and a value break', brief: 'Execution exhibit: two annotated sidebar rows: a population break showing the missing side explicitly (e.g. “not in broker file”), pinned above a value break showing both values and the variance.' },
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'The flow',
        heading: 'From two files to a list of breaks',
        body: [
          'ReconLayer compares the two files, ignores differences below the tolerance, and sorts what’s left into value breaks and population breaks.',
          'On the test data: a $50,000 tolerance, 4 value breaks, 2 population breaks, and a net dispute of $327,500.',
        ],
        figure: { file: 'reconlayer/04-sidebar-worklist', caption: 'Classified breaks in the sidebar', brief: 'Close-up of the sidebar worklist: value breaks and population breaks in separate groups, each with trade ID and variance.' },
      },
      {
        kind: 'iterations',
        eyebrow: 'The AI layer',
        heading: 'Three versions of the email prompt',
        figure: { file: 'reconlayer/05-email-draft', caption: 'An email from the final prompt', brief: 'One generated dispute email from iteration 3: subject line, discrepancy, internal-vs-broker breakdown, call to action, under 80 words.' },
        items: [
          {
            label: '1. Plain request',
            text: 'Draft a dispute email for trade [ID] with [counterparty] that has a $[X] break.',
            outcome: 'Emails were long and chatty (“I hope this email finds you well”), currency formatting was inconsistent, and some field names were wrong.',
          },
          {
            label: '2. Data in a template',
            text: 'Clean JSON variables injected into a standard prompt.',
            outcome: 'The figures were right, but the model added guesses about why each break happened. A counterparty email shouldn’t speculate about causes.',
          },
          {
            label: '3. Fixed format and limits (excerpt)',
            text: 'Do NOT calculate, alter, or infer any figures … Fixed format: subject line, discrepancy, internal-vs-broker breakdown, call to action. Max 80 words.',
            outcome: 'This is the version in the add-on. Short, consistent, and limited to the data it’s given.',
          },
        ],
      },
      {
        kind: 'principles',
        eyebrow: 'Limits',
        heading: 'What the prototype doesn’t do',
        items: [
          ['Google Sheets, not Excel', 'Most desks use Excel, but I didn’t have Excel to build or test in.'],
          ['Two break types', 'It handles value and population breaks. Other causes are written up for later.'],
          ['Not ready for real data', 'It runs on a personal Google account with the consumer Gemini API and synthetic data. A production version would need to keep trade data inside the firm. I haven’t built that.'],
        ],
      },
      {
        kind: 'testing',
        eyebrow: 'Usability testing',
        heading: 'Testing understanding and trust',
        intro: 'Five analysts and operators from the institutional buy-side ran the real add-on, unmoderated, on the same synthetic data. Four finished reconciling, drafting and the survey; one stopped after reconciling. Unmoderated testing reached more people but told me less about why. The results are directional.',
        worked: [
          'Average ease rating was 4.75 out of 5 across the four who finished.',
          'On the AI draft: 2 would send it as is, 1 would edit it first, and 1 wouldn’t trust it.',
        ],
        broke: [
          'One of four misread “value break” and “population break,” and another was unsure of them. The labels need short explanations.',
          'All four named something they’d check before sending, including the two who’d send as is.',
          'What would stop them using it on a real morning was false positives and missed breaks, rather than the AI.',
        ],
        quote: {
          text: 'I’d at least still double-check the figures and breaks make sense.',
          who: 'Operations analyst, test participant',
        },
      },
      {
        kind: 'principles',
        eyebrow: 'Next',
        heading: 'What I’d change next',
        items: [
          ['Clearer labels', 'Plain-language names with short explanations, and more detail on why each break was flagged.'],
          ['An audit view', 'Show what was flagged and why, so analysts and compliance teams can check the calculation.'],
          ['More file formats', 'Handle different broker file headers and email formats, and work in any workbook.'],
        ],
        todo: 'Design the audit view and show it here instead of describing it.',
      },
    ],
  },
  {
    slug: 'hwang-yoo-yup',
    tags: ['Client work', 'Archive'],
    year: '2026',
    proof: 'Paid client · live archive',
    stats: [['Paid', 'client commission'], ['9 weeks', 'research to launch'], ['4', 'art-world interviews'], ['2', 'audiences served by one site']],
    title: 'Hwang Yoo-Yup Archive',
    tagline: 'An online archive for first-time visitors and scholars',
    hero: { file: 'hwang-yoo-yup/hero', brief: 'Archive home page: dark burgundy ground, a full-bleed painting, and the Discovery / Archive Mode toggle visible in the nav.' },
    group: 'studio',
    status: 'Live',
    cardSummary:
      'Helps first-time visitors and scholars explore a Korean modernist painter’s work in one place.',
    meta: [
      ['Role', 'Solo product designer, paid commission from the artist’s estate'],
      ['Scope', 'Strategy, research, IA, visual design, curatorial writing, Framer build'],
      ['Domain', 'Cultural archive website'],
      ['Timeline', '9 weeks'],
    ],
    links: [{ label: 'Visit the archive', href: 'https://hwangyooyup.framer.website' }],
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Two audiences with different needs',
        body: [
          'First-time visitors often know little about Korean history. Hwang painted the same subjects for six decades, and without background that can look repetitive.',
          'Scholars and curators come with specific questions. They need dates, exhibition history and a searchable record, and long interpretive text gets in their way.',
        ],
        figure: { file: 'hwang-yoo-yup/01-painting', caption: 'Home Return Way, 1979 (private collection)', brief: 'The painting itself, full width, before any UI appears.' },
      },
      {
        kind: 'text',
        eyebrow: 'Research',
        heading: 'What I looked at before designing',
        body: [
          'I went through the estate’s exhibition catalogs, academic texts, institutional records and biographical documents. I looked at how other artist archives handle mixed audiences, and interviewed four people in the art world: an art advisor, a gallery dealer, a museum director and a practicing artist.',
          'Two findings shaped the structure. Newcomers need context first, and that same context slows researchers down.',
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Four decisions',
        items: [
          {
            title: 'One site with two paths',
            considered: 'Two sites: a public exhibition site and a scholarly archive.',
            chose: 'One site. Discovery (Overview, Journey, Motifs, Exhibition Plan) is the default, and Archive Mode (Biography, Works, Bibliography, Exhibitions, Timeline) is one toggle away on every page.',
            why: 'Two sites would have been too much for the estate to maintain. With one site, each audience starts where it makes sense for them and can switch at any point.',
            highlight: true,
            figure: { file: 'hwang-yoo-yup/02-navigation', caption: 'Discovery and Archive Mode navigation', brief: 'Two states of the same page: Discovery nav (Overview, Journey, Motifs, Exhibition Plan) and Archive Mode nav (Biography, Works, Bibliography, Exhibitions, Timeline).' },
          },
          {
            title: 'Themes first, dates in the archive',
            considered: 'Date order, which most artist archives use.',
            chose: 'Discovery is organized by three themes I wrote and a Motifs section. The chronology is in Archive Mode.',
            why: 'Newcomers don’t yet have the background to make sense of a timeline. Themes give them somewhere to start.',
          },
          {
            title: 'Everything about a work on one page',
            chose: 'The full-size image, curatorial text, themes, details and related works, with historical context in an expandable section.',
            why: 'Scholars can skip the context and newcomers can open it.',
            figure: { file: 'hwang-yoo-yup/03-artwork-page', caption: 'Artwork page, annotated', brief: 'Execution exhibit: one artwork page with callouts on the image, curatorial text, theme links, metadata block, related works, and the collapsed historical-context section.' },
          },
          {
            title: 'A quiet visual system',
            chose: 'A dark burgundy background, warm off-white text and earth tones taken from Hwang’s paintings, with Korean and English at equal size.',
            why: 'I wanted the paintings to carry the color, and I checked each visual choice against whether it drew attention to them.',
            figure: { file: 'hwang-yoo-yup/04-palette-type', caption: 'Palette and type', brief: 'Burgundy ground, off-white text and earth-tone swatches, with Korean and English type specimens at equal weight.' },
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Next',
        heading: 'Live, with the catalogue in progress',
        body: [
          'I also wrote an exhibition plan for a retrospective in four sections: Formation, Displacement, Labor & Land, and Ritual.',
          'The estate told me they appreciated the care that went into the site, and that it stands as a testament to their father’s work and honors his legacy.',
        ],
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
