// All case-study content lives here. Anything marked `todo` renders as a
// visible amber placeholder so it can't ship unnoticed. Never replace a todo
// with a number you can't source.

export const projects = [
  {
    slug: 'fxpress',
    title: 'FXpress',
    tagline: 'A live exchange-rate co-pilot for people who send money abroad',
    hero: { brief: 'Live widget screenshot (fxpress.netlify.app): corridor picker, today’s rate placed in its 30-day band, recipient amount, and Fexi’s one-line explanation. Phone frame on a plain background.' },
    group: 'work',
    status: 'Live',
    cardSummary:
      'Shows where today’s rate sits against the last 30 days. Code does the math; the AI only explains it.',
    meta: [
      ['Role', 'Solo product designer (design + build)'],
      ['Scope', 'Research · Product design · AI · Build · Testing'],
      ['Domain', 'Consumer fintech'],
      ['Timeline', 'Nov 2025 – Oct 2026 · live'],
    ],
    links: [{ label: 'Try it live', href: 'https://fxpress.netlify.app' }],
    tldr: {
      problem:
        'Remittance apps show today’s rate but never whether it’s a good one. USD/KRW moved an average of 3.7% within each month over the past year — about $74 on a $2,000 transfer.',
      decision:
        'Describe where today’s rate sits against the last 30 days. Code does every calculation; the AI assistant only rewords a sentence the code has already verified.',
      rejected:
        'Recommending when or where to send, and showing estimated fees. Both are promises the product can’t keep.',
      result: [
        'Live across 18 currency pairs on reference-rate data',
        '5 of 5 testers completed the send flow',
        'My own logs caught a flaw in my design — and I fixed what I could',
      ],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Today’s rate doesn’t tell you if it’s a good one',
        body: [
          'I’ve sent money from the US to Korea for years. Every app shows today’s rate, but none tell you whether it’s good. You’d have to compare it with the last few weeks, and I rarely had time.',
          'It matters more than it seems. Over the past year, USD/KRW moved an average of 3.7% within each month — about $74 on a $2,000 transfer.',
        ],
        todo: 'Opening line: confirm you personally send money abroad. If not, use your July observer version (your parents have sent money for decades).',
        figure: { caption: 'Monthly high–low for USD/KRW, Sep 2025 – Sep 2026', brief: 'Bar chart from your case study PDF: one bar per month showing the USD/KRW high–low range.' },
      },
      {
        kind: 'text',
        eyebrow: 'Research',
        heading: 'What four senders told me',
        body: [
          'In November 2025 I interviewed four people who send money abroad: a marketing coordinator sending to Manila, a software engineer sending to Korea, a warehouse supervisor sending to El Salvador, and a freelance designer paying people in Latin America and Africa.',
          'Two things stood out: choosing a day felt like guessing, and what they cared about most was how much the recipient would get. Two of the four asked for a forecast — which I decided not to build.',
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
          ['No forecasting', 'It shows where today’s rate sits compared with recent history. It never predicts.'],
          ['No financial advice', 'The AI explains the rate. The decision stays with the sender.'],
          ['No invented pricing', 'If it can’t see a provider’s fee or markup, it doesn’t guess.'],
        ],
      },
      {
        kind: 'options',
        eyebrow: 'Exploring',
        heading: 'Five product shapes I weighed',
        items: [
          ['Forecast dashboard', 'Cut', 'Two of four interviewees asked for one. But no one forecasts rates reliably, and a wrong forecast costs the sender money.'],
          ['Auto-router that sends for you', 'Cut', 'Moving money means becoming a licensed money transmitter, with custody and exposure to the sender’s bank.'],
          ['Chat assistant', 'Cut', 'Wrong interaction for a 30-second monthly task — typing questions makes it slower.'],
          ['Threshold alerts', 'Kept, reduced', 'Became “Save Target Rate” with a calendar reminder, not an automatic send.'],
          ['Co-pilot widget', 'Chosen', 'Places today’s rate in its recent range, then hands off to the provider the sender already uses.'],
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Three decisions about what the product is allowed to say',
        items: [
          {
            title: 'Describe the rate. Don’t advise.',
            considered: 'An assistant that recommended a provider and a time to send.',
            chose: 'A one-sentence description of where today’s rate sits, then a hand-off to the provider the sender already uses.',
            why: 'A recommendation is a promise the product can’t keep. Moving money would also have required a money-transmitter license, and a monthly transfer takes ~30 seconds — typing questions to a chatbot would make it slower.',
            figure: { caption: 'Before → after: “advises to send” became a description', brief: 'Two frames side by side: the early hi-fi where the assistant recommends a send time, and the live widget’s neutral one-sentence description.' },
          },
          {
            title: 'Compare against 30 days, not this session.',
            considered: 'Comparing today’s rate with rates seen during the visitor’s session.',
            chose: 'A 30-day range from central-bank reference rates, split into low / mid / high — and no claim at all with fewer than 10 days of history.',
            why: 'My first build called a rate “the best rate you’ve seen this session” on a first visit, with nothing to compare it to.',
          },
          {
            title: 'Remove the fee line.',
            considered: 'Showing an estimated fee next to the recipient amount.',
            chose: 'Show the amount at today’s rate, with a note that fees and markup vary by provider.',
            why: 'FXpress can’t see what providers charge. An estimated number on a money screen reads as a fact.',
          },
          {
            title: 'Move the meaning into code.',
            considered: 'Letting the model read the data and interpret it, guided by instructions.',
            chose: 'Code computes where the rate sits and writes the correct sentence. Fexi, the assistant, only rewords it — and a check blocks any reply that changes the meaning, adds a number, or sounds like advice.',
            why: 'In October 2026 Fexi told a sender that a rate at the low end of the month meant they were getting the most won for their dollar. It’s the opposite. The error was fluent and confident — exactly the kind a user won’t catch.',
            highlight: true,
            figure: { caption: 'Fexi’s states', brief: 'Execution exhibit: the Fexi state sheet from Figma (FexiCard set, node 5628:12733) — all four states side by side, annotated with what triggers each and what Fexi is allowed to say.' },
          },
        ],
      },
      {
        kind: 'iterations',
        eyebrow: 'The AI layer',
        heading: 'My first prompt handed the AI the decision without my noticing',
        items: [
          {
            label: 'Before',
            text: 'You are Fexi, a friendly FX assistant. The user is sending USD to {country} ({code}). {situation}. Write ONE short, warm sentence telling them whether now is a good moment to send and why, based ONLY on the situation above. Do NOT predict the future. Do NOT invent numbers beyond what is stated.',
            outcome: '“Telling them whether now is a good moment to send” asks for advice. The “do not predict” line couldn’t undo the framing.',
          },
          {
            label: 'Shipped',
            text: 'You are Fexi, the co-pilot inside FXpress. You narrate. You never decide. Every number in your reply must appear verbatim in the FACTS block — never compute, re-round, or invent a figure. Never forecast: do not say a rate will rise, fall, recover, revert, or hold. Never tell the user whether to send. Range position is a fact about the past 30 days and implies nothing about tomorrow. Never mention fees. One or two sentences, warm and plain.',
            outcome: 'Forbids three behaviors: computing, forecasting, and saying whether to send. The judgment itself moved into JavaScript, so the model receives a finished conclusion.',
          },
        ],
        after: [
          'When there are fewer than 10 days of history, the server answers without calling the model at all — there’s nothing for it to embellish.',
          'I removed a thumbs-up pose from Fexi’s avatar. The words avoided advice, but the gesture endorsed the rate anyway.',
        ],
      },
      {
        kind: 'testing',
        eyebrow: 'Usability testing',
        heading: 'Five people, from cautious first-time senders to power users',
        intro: 'Unmoderated in Maze, seven tasks across sending money, setting a target rate, and confirming. I tested the high-fidelity Figma prototype — an earlier version that still moved money itself, not the live widget. With a group this small I report counts, not percentages.',
        worked: [
          '5 of 5 completed the send flow.',
          'All five looked at the recipient-side amount before anything else on the screen.',
          '“I actually feel like I understand what this does before I’ve used it.” — cautious sender',
        ],
        broke: [
          '4 of 5 completed the target-rate flow. One gave up at the threshold field because “1,380” had no currency; another hesitated there.',
          'One tapped Send Now by mistake — both buttons had equal visual weight.',
        ],
        figure: { caption: 'Button hierarchy and threshold field, before and after testing', brief: 'Before: Send Now and the target-rate button with equal weight; threshold field showing a bare “1,380”. After: filled Send Now, outlined Save Target Rate, threshold labelled with its currency and helper text.' },
        quote: {
          text: 'I don’t know what 1,380 means. Is that dollars, won, or shillings?',
          who: 'Sends money to Kenya, test participant #2',
        },
        changes: [
          'Send Now became the clear primary action; the target-rate CTA moved to an outlined secondary style.',
          'The threshold input now names the currency, with helper text explaining the value.',
          'Renamed “Set Trigger for Best Rate” to “Save Target Rate” — the product can’t promise the best rate.',
        ],
        after: 'I haven’t re-tested these changes on the live widget yet.',
        todo: 'Target-rate flow: 4 of 5 here, an older debrief says 3 of 5. Confirm from the Maze report.',
      },
      {
        kind: 'text',
        eyebrow: 'Shipped',
        heading: 'What’s live',
        body: [
          'FXpress runs on real reference-rate data across 18 currency pairs, lets users save a target rate and create a calendar reminder, and hands the transfer off to providers such as Wise, Remitly, Xoom, Chase, or the user’s bank.',
          'In its first 30 days: 33 of 33 AI calls returned cleanly with zero server errors. The offline fallback was designed and tested, but I never instrumented it, so I can’t show whether it has fired.',
          'Usage is small: 83 visitors from July to October 2026. In the July–September export, about half of the 43 sessions were mine.',
          'I chose cookie-free analytics so I couldn’t track anyone. The tradeoff: it can’t cleanly separate strangers from my own testing.',
        ],
        figure: { caption: 'Two reflection charts', brief: 'From your Drive deep-dive prep: USD/KRW falling Jul–Sep 2026, and the range position pinned to “low” over the same period.' },
      },
      {
        kind: 'text',
        eyebrow: 'Reflection',
        heading: 'What the live data showed — and what I’d do next',
        body: [
          'The 30-day comparison works when the rate moves within a range, but not when it trends. From July to September the won kept strengthening, so 68 of 75 readings said “low.” The next version should show which way the rate is moving, not just where it sits.',
          'A UX hiring manager who reviewed it said FXpress made the rate quicker to read but didn’t meet a deeper need. I explored large, deadline-bound payments, but Wise and currency brokers already cover most of it, and without a forecast the product can’t improve the outcome. I’d interview people paying those bills before building anything.',
          'The lesson I’m keeping: put the judgment in code, where I can see when it fails.',
        ],
      },
    ],
  },
  {
    slug: 'reconlayer',
    title: 'ReconLayer',
    tagline: 'Reconciliation and exception triage for lean middle-office teams',
    hero: { brief: 'ReconLayer sidebar open inside Google Sheets: net dispute +$327,500, 4 value breaks and 2 population breaks pinned, Draft email button visible.' },
    group: 'work',
    status: 'Working prototype',
    cardSummary:
      'A spreadsheet add-on where rules find the break and AI only drafts the counterparty email.',
    meta: [
      ['Role', 'Solo product designer (design + build)'],
      ['Scope', 'Strategy · Research · Product design · Build · Testing'],
      ['Domain', 'B2B fintech · middle office'],
      ['Timeline', '12 weeks · Google Sheets add-on'],
    ],
    links: [
      { label: 'Watch it run', href: '#', todo: 'Demo video URL (the MP4 on the Framer page — upload to Loom/YouTube or send me the file)' },
    ],
    context:
      'Before design, I spent eleven years in buy-side trading operations doing this reconciliation myself. That told me where to look; testing with analysts told me what to change.',
    tldr: {
      problem:
        'Small desks still reconcile internal positions against broker files by hand before settlement and margin cutoffs. A missed or misclassified break can hit a margin call or NAV — and the analyst is accountable.',
      decision:
        'An add-on inside the analyst’s existing spreadsheet. Rules classify every break deterministically; AI only drafts the counterparty email afterwards.',
      rejected:
        'A standalone product (adoption friction), LLM-based classification, a large template library, and a single variance-ranked list.',
      result: [
        '5 operators ran the real add-on; 4 finished, rating ease 4.75 of 5',
        '4 of 4 said they’d check something before sending — testers doubted the rules, not the AI',
      ],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'A manual workflow with very little room for error',
        body: [
          'On a lean finance-operations desk, reconciliation often still starts with two files and a spreadsheet. The analyst compares the firm’s internal book against a broker file, investigates anything that doesn’t match, and resolves the exceptions before a settlement or margin cutoff.',
          'The problem isn’t only time. A missed trade or misclassified break can affect a margin call or NAV, and the analyst is accountable for the decision. Then they write the same counterparty emails by hand.',
          'I interviewed five practitioners across four buy-side firms — a COO, an operations team lead, two analysts, and an external operational due-diligence consultant.',
        ],
        figure: { caption: 'Manual reconciliation workbook — before ReconLayer', brief: 'The “before” spreadsheet: VLOOKUPs, #N/A cells and hand-typed DISPUTE flags.' },
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Four decisions that shaped the product',
        items: [
          {
            title: 'Layer on top. Don’t rip and replace.',
            considered: 'A standalone reconciliation product.',
            chose: 'An add-on that runs inside the spreadsheet the analyst already uses.',
            why: 'I started out intending to build a sellable product. Market research ended that: small desks often outsource this work, a free tool reads as a diligence risk, and incumbents already own every core capability. For a lean team, a new product adds what they don’t need — another system, login, and workflow.',
          },
          {
            title: 'Rules find the break. AI explains it.',
            considered: 'LLM-based classification, and a middle path where the AI makes the easy calls and flags the hard ones.',
            chose: 'Deterministic rules classify every break first. Generation only starts after that, and never changes a classification.',
            why: 'On a desk, someone’s name is on every decision. An analyst can defend a rule; they can’t defend a hunch. The AI can help write the message — it doesn’t decide what the numbers mean.',
            highlight: true,
            figure: { caption: 'System boundary: the model never decides whether a break exists', brief: 'Diagram: Two files → Rules engine → Classified breaks → AI draft → Human, with a dashed AI BOUNDARY box around the drafting step only.' },
          },
          {
            title: 'Constrained drafting over templates.',
            considered: 'A large library of email templates.',
            chose: 'A constrained AI draft built from the already-classified break.',
            why: 'Every morning’s break mix is different, so templates would need a branch for every combination. Drafting was the one step where generation reduced work without giving the model decision authority.',
          },
          {
            title: 'A review gate, not a Send button.',
            considered: 'Sending the drafted email automatically.',
            chose: 'The draft lands for review. There is no Send button in ReconLayer.',
            why: 'The analyst’s name is on every dispute. The tool can prepare the work; it can’t take the accountability.',
          },
          {
            title: 'A missing value isn’t a zero.',
            considered: 'A single list ranked by variance.',
            chose: 'Separate value breaks (both sides present, numbers differ) from population breaks (one side missing).',
            why: 'The most important exception was the easiest to hide: with no value on one side there’s no variance to rank, so it would sink to the bottom. The missing side is itself the signal.',
            figure: { caption: 'A population break vs a value break', brief: 'Execution exhibit: two annotated sidebar rows — a population break showing the missing side explicitly (e.g. “not in broker file”), pinned above a value break showing both values and the variance.' },
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'The flow',
        heading: 'From two files to a worklist',
        body: [
          'ReconLayer compares the internal and broker books, filters out differences below tolerance, and splits the remaining exceptions into value breaks and population breaks — pinned and ordered around the analyst’s next decision.',
          'On the test dataset: a $50,000 tolerance, 4 value breaks and 2 population breaks, and a net dispute of +$327,500.',
        ],
        figure: { caption: 'Classified breaks pinned in the sidebar', brief: 'Close-up of the sidebar worklist: value breaks and population breaks in separate groups, each with trade ID and variance.' },
      },
      {
        kind: 'iterations',
        eyebrow: 'The AI layer',
        heading: 'Three prompt iterations to keep the AI out of judgment',
        figure: { caption: 'The shipped draft', brief: 'One generated dispute email from iteration 3: subject line, discrepancy, internal-vs-broker breakdown, call to action, under 80 words.' },
        items: [
          {
            label: '1 · Plain language',
            text: 'Draft a dispute email for trade [ID] with [counterparty] that has a $[X] break.',
            outcome: 'Failed. Conversational filler (“I hope this email finds you well”), inconsistent currency formatting, wrong field names. A margin desk ignores long, chatty emails.',
          },
          {
            label: '2 · Data in a template',
            text: 'Clean JSON variables injected into a standard prompt.',
            outcome: 'Accurate figures — but the model added speculation about why each break happened. In a compliance context, an AI guessing at cause is a real risk. Accurate and still wrong.',
          },
          {
            label: '3 · Structural constraints',
            text: 'Do NOT calculate, alter, or infer any figures — use ONLY the JSON payload. Direct, telegraphic tone; no conversational openings. Fixed format: subject line, discrepancy, internal-vs-broker breakdown, call to action. Max 80 words.',
            outcome: 'Shipped. The fix wasn’t a better model; it was a tighter boundary — the same call as the architecture.',
          },
        ],
      },
      {
        kind: 'principles',
        eyebrow: 'Tradeoffs I accepted',
        heading: 'A prototype that proves the pattern, honest about what it isn’t',
        items: [
          ['Google Sheets, not Excel', 'A constraint, not a choice: Excel is where this work happens, but I didn’t have Excel to build or test in.'],
          ['Two break types first', 'Value and population breaks only. The other causes are specified and deferred, to prove the core loop first.'],
          ['Not production-grade on data', 'It runs server-side on a personal Google account with the consumer Gemini API, on synthetic data only. A production version would match locally and send only minimal break summaries to a zero-retention endpoint — not built.'],
        ],
      },
      {
        kind: 'testing',
        eyebrow: 'Usability testing',
        heading: 'I tested for trust and comprehension, not clicks',
        intro: 'Unmoderated, on the real add-on, with the same synthetic dataset for everyone so results were comparable. Five analysts and operators from the institutional buy-side ran it; four finished reconcile, draft and survey; one stopped at reconcile. Unmoderated gave me reach and real behavior, at the cost of hearing why. Directional, not statistical.',
        worked: [
          'Median time to reconcile: about 4 seconds.',
          'Ease: 4.75 out of 5 across the four who finished.',
          'On the AI draft: 2 would send as-is, 1 would edit first, 1 wouldn’t trust it.',
          'One tester changed a value to test the logic, and their confidence went from 3 to 5.',
        ],
        broke: [
          'Terminology: one of four clearly misread “value break” vs “population break”; a second read them imprecisely. Standard terms still need inline explanation.',
          'Trust: all four named a check they’d do before sending — including both who’d send as-is.',
          'Rule logic: their “Monday morning” blockers were false positives and missed breaks, not the AI.',
        ],
        quote: {
          text: 'I’d at least still double-check the figures and breaks make sense.',
          who: 'Operations analyst, test participant',
        },
      },
      {
        kind: 'principles',
        eyebrow: 'What I’d change next',
        heading: 'The next trust problem isn’t the AI — it’s the rules engine',
        items: [
          ['Clearer classification', 'Plain-language labels with inline explanations, and more of the reasoning behind each break.'],
          ['An audit view', 'Show what was flagged and why, so analysts — and Compliance — can verify the calculation themselves.'],
          ['Normalize in place', 'Flexible broker-file headers, broker-specific email formats, and support for any workbook.'],
        ],
        todo: 'Strongest upgrade: design the audit view and show it here instead of describing it.',
      },
    ],
  },
  {
    slug: 'hwang-yoo-yup',
    title: 'Hwang Yoo-Yup Archive',
    tagline: 'One archive for two audiences: first-time visitors and scholars',
    hero: { brief: 'Archive home page: dark burgundy ground, a full-bleed painting, and the Discovery / Archive Mode toggle visible in the nav.' },
    group: 'studio',
    status: 'Live',
    cardSummary:
      'Client work for an artist’s estate: one structure with two paths, so newcomers and scholars never walk through each other’s route.',
    meta: [
      ['Role', 'Solo product designer · paid commission from the artist’s estate'],
      ['Scope', 'Strategy · Research · IA · Visual design · Curatorial writing · Framer build'],
      ['Domain', 'Cultural archive website'],
      ['Timeline', 'Dec 2025 – present'],
    ],
    links: [{ label: 'Visit the archive', href: 'https://hwangyooyup.framer.website' }],
    tldr: {
      problem:
        'Hwang Yoo-Yup (1916–2010), a Korean modernist painter, had work spread across catalogs, institutions, and family archives. Newcomers need context first; scholars need direct access. Each slows the other down.',
      decision:
        'One site with two paths — a thematic Discovery path by default and an Archive Mode for researchers — switchable from every page.',
      rejected:
        'Two separate sites, and a date-ordered default that serves historians but loses newcomers.',
      result: ['Live, with the catalogue in progress', { todo: 'Client feedback or one usage signal' }],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Two audiences, one body of work',
        body: [
          'A first-time visitor usually knows little about Korean history. Hwang returned to the same subjects for six decades, and without context that repetition reads as a limit.',
          'A scholar or curator arrives with a specific question and needs dates, exhibition history, and a searchable record. An interpretive layer slows them down.',
        ],
        todo: 'Timeline: the old page said “9 weeks”, your Oct blueprint says Dec 2025 – present. Confirm which.',
        figure: { caption: 'Home Return Way, 1979 (private collection)', brief: 'The painting itself, full width — it sets the tone before any UI appears.' },
      },
      {
        kind: 'text',
        eyebrow: 'Research',
        heading: 'What I looked at before designing',
        body: [
          'I reviewed the estate’s exhibition catalogs, academic texts, institutional records, and biographical documents; compared how peer artist archives serve mixed audiences; and interviewed four art-industry peers — an art advisor, a gallery dealer, a museum director, and a practicing artist.',
          'Two findings shaped the structure: newcomers need context first, and the context that helps a newcomer gets in a researcher’s way.',
          'I haven’t tested with real visitors yet. I walked both paths myself against the two visitor types — that’s a design check, not validation.',
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Four decisions',
        items: [
          {
            title: 'One site, two paths.',
            considered: 'Two sites: a public exhibition site and a scholarly archive.',
            chose: 'One structure. Discovery (Overview, Journey, Motifs, Exhibition Plan) is the default; Archive Mode (Biography, Works, Bibliography, Exhibitions, Timeline) is one toggle away on every page.',
            why: 'A toggle lets each audience start in the right place without walking through the other’s path.',
            todo: 'Confirm your reason for rejecting two sites (draft: two content sets to maintain; visitors would have to switch sites).',
            highlight: true,
            figure: { caption: 'Dual navigation and the path into Archive Mode', brief: 'Two states of the same page: Discovery nav (Overview, Journey, Motifs, Exhibition Plan) and Archive Mode nav (Biography, Works, Bibliography, Exhibitions, Timeline).' },
          },
          {
            title: 'Themes first, dates in the archive.',
            considered: 'Date order, the default for artist archives.',
            chose: 'Discovery is organized by three themes I wrote and a Motifs section; chronology lives in Archive Mode.',
            why: 'Newcomers don’t yet know what a sequence means. Themes give them a way in.',
          },
          {
            title: 'Everything about a work on one page.',
            chose: 'Full-size image, curatorial text, themes, structured metadata, related works — with historical context in an expandable section.',
            why: 'A scholar can skip the context; a newcomer can open it.',
            figure: { caption: 'Artwork page, annotated', brief: 'Execution exhibit: one artwork page with callouts on the image, curatorial text, theme links, metadata block, related works, and the collapsed historical-context section.' },
          },
          {
            title: 'A quiet frame so the paintings lead.',
            chose: 'Dark burgundy ground, warm off-white text, earth-tone accents from Hwang’s surfaces; Korean and English at equal weight.',
            why: 'Every visual choice was tested against one question: does it pull attention toward the paintings or away from them?',
            figure: { caption: 'Palette and type board', brief: 'Burgundy ground, off-white text and earth-tone swatches, with Korean and English type specimens at equal weight.' },
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Next',
        heading: 'Live, with the catalogue in progress',
        body: [
          'I also wrote an exhibition plan organizing a retrospective into four zones: Formation, Displacement, Labor & Land, and Ritual.',
        ],
        todo: 'Add one moment where the estate pushed back and what you changed — it’s your best evidence of working with a stakeholder.',
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
