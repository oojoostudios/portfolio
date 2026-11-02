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
    stats: [
      ['18', 'currency pairs, live reference-rate data'],
      ['5 of 5', 'testers completed the send task in the Figma prototype'],
      ['33 of 33', 'AI calls returned without error in the first 30 days of logs'],
      ['83', 'visitors since July 2026, including my own testing'],
    ],
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
          { type: 'p', text: 'My parents have sent money from the US to Korea for decades. Every app they use shows today’s rate, but none says how it compares with recent weeks. To know that, you’d have to track it yourself.' },
          { type: 'p', text: 'The day matters more than it seems. Over the past year, USD/KRW moved an average of 3.7% within each month on central-bank reference rates. On a $2,000 transfer that is about $74. It illustrates how much the rate moves; it is not a saving a sender could lock in, and it excludes provider fees and markups.' },
          { type: 'figure', file: 'fxpress/01-rate-range-chart', alt: 'Bar chart of monthly high and low USD/KRW reference rates from September 2025 to September 2026', caption: 'Monthly high-to-low USD/KRW reference-rate ranges, Sep 2025 to Sep 2026. Reference rates, not executable transfer quotes.', brief: 'Chart from actual date-stamped monthly highs and lows (Frankfurter data). 1600×900. See brief G1.' },
          { type: 'p', text: 'In November 2025 I interviewed four people who send money abroad. Two things came up most: picking a day to send felt like guessing, and what they cared about was how much the recipient would get. Two of the four asked for a forecast, which I decided not to build.' },
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
            why: 'A recommendation implies the product knows what the rate will do next, and it doesn’t. Moving money would bring licensing, custody and compliance obligations well beyond a rate widget. And a monthly transfer takes about 30 seconds, so typing questions would slow it down.',
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
          { type: 'p', text: 'In the first 30 days of logging, all 33 AI calls returned and the server logged no errors. That is a small window and says nothing about whether every sentence was correct; the October meaning error above was found by reading the output. There is an offline fallback, but I didn’t add tracking to it, so I can’t say whether it has been used.' },
        ],
      },
      {
        label: 'Testing',
        heading: 'What testing the prototype showed',
        blocks: [
          { type: 'p', text: 'I ran an unmoderated test in Maze with seven tasks covering sending money, setting a target rate and confirming. It used the high-fidelity Figma prototype, an earlier version in which the product itself moved the money, so completing a task means completing it in the prototype, not making a real transfer. With five people I report counts rather than percentages.' },
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
        heading: 'What the live data showed, and what’s next',
        blocks: [
          { type: 'p', text: 'The 30-day comparison is useful when the rate moves up and down within a range. It’s less useful when the rate moves steadily in one direction. From July to September the won kept strengthening, and 68 of 75 readings said “low.”' },
          { type: 'figure', file: 'fxpress/05-range-reading-charts', alt: 'Two aligned charts: the USD/KRW reference rate falling from July to September 2026, and the widget’s range label reading low for 68 of 75 readings over the same period', caption: 'Observed rate direction versus the widget’s rolling range labels, Jul to Sep 2026. This informed the next design hypothesis; a trend indicator has not shipped.', brief: 'See brief G4.' },
          { type: 'p', text: 'Next I’d show which way the rate has been moving, as well as where it sits. That is a proposal, not a shipped feature.' },
        ],
      },
    ],
    tldr: {
      problem:
        'Money transfer apps show today’s exchange rate but give no context for it. Over the past year USD/KRW moved an average of 3.7% within each month on central-bank reference rates, about $74 on a $2,000 transfer.',
      decision:
        'Show where today’s rate sits in its 30-day range, then hand off to the provider the sender already uses. The code does every calculation; the AI assistant only rewords a sentence the code has already written.',
      result: [
        'Five testers completed the send task in the high-fidelity Figma prototype; four of five completed the target-rate task.',
        'Live across 18 currency pairs. In the first 30 days of logs, all 33 AI calls returned without error.',
      ],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Knowing whether today’s rate is a good one',
        body: [
          'My parents have sent money from the US to Korea for decades. Every app they use shows today’s rate, but none says how it compares with recent weeks. To know that, you’d have to track it yourself.',
          'The day matters more than it seems. Over the past year, USD/KRW moved an average of 3.7% within each month on central-bank reference rates. On a $2,000 transfer that is about $74. It is an illustration of how much the rate moves, not a saving a sender could lock in, and it excludes provider fees and markups.',
        ],
        figure: {
          file: 'fxpress/01-rate-range-chart',
          alt: 'Bar chart of monthly high and low USD/KRW reference rates from September 2025 to September 2026',
          caption: 'Monthly high-to-low USD/KRW reference-rate ranges, Sep 2025 to Sep 2026. Reference rates, not executable transfer quotes.',
          brief: 'Chart from actual date-stamped monthly highs and lows (Frankfurter data). 1600×900. See brief G1.',
        },
      },
      {
        kind: 'text',
        eyebrow: 'Research',
        heading: 'Interviews with four senders',
        body: [
          'In November 2025 I interviewed four people who send money abroad.',
          'Two things came up most. Picking a day to send felt like guessing, and what they cared about was how much the recipient would get. Two of the four asked for a forecast, which I decided not to build.',
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
          ['No financial advice', 'The AI describes the rate. The sender decides.'],
          ['No invented pricing', 'It can’t see a provider’s fee or markup, so it doesn’t estimate them.'],
        ],
      },
      {
        kind: 'options',
        eyebrow: 'Exploring',
        heading: 'Three directions I considered',
        items: [
          ['Auto-router that sends for you', 'Cut', 'Moving money would bring licensing, custody and compliance obligations well beyond a rate widget.'],
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
            figure: {
              file: 'fxpress/02-advice-before-after',
              alt: 'Two phone screens side by side: an earlier Figma concept where the assistant recommends when to send, and the live widget’s neutral rate description',
              caption: 'The assistant shifted from suggesting decisions to explaining recent exchange-rate context. Left: earlier high-fidelity concept. Right: live widget.',
              brief: 'See brief F5. Left must be the real Figma frame with the original advice wording.',
            },
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
            figure: {
              file: 'fxpress/03-fexi-states',
              alt: 'Four Fexi assistant states shown as cards, each with the condition that triggers it and the sentence the assistant is allowed to say',
              caption: 'Fexi’s states and what each is allowed to say. The assessment is computed in code; the assistant only phrases it.',
              brief: 'From the Figma FexiCard component set (node 5628:12733). Confirm which states exist; see brief G2.',
            },
          },
        ],
      },
      {
        kind: 'embed',
        eyebrow: 'Try it',
        heading: 'The live widget',
        intro: 'FXpress as it runs today, with live reference rates. Pick a currency and see where today’s rate sits.',
        embed: { src: 'https://fxpress.netlify.app/', title: 'FXpress live widget', kind: 'phone', href: 'https://fxpress.netlify.app/' },
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
        heading: 'Testing the prototype with five senders',
        intro: 'I ran an unmoderated test in Maze with seven tasks covering sending money, setting a target rate and confirming. It used the high-fidelity Figma prototype, an earlier version in which the product itself moved the money. Completing a task here means completing it in the prototype, not making a real transfer. With five people I report counts rather than percentages.',
        worked: [
          '5 of 5 completed the send task.',
          'All five looked at the recipient’s amount first.',
          '“I actually feel like I understand what this does before I’ve used it.” (cautious sender)',
        ],
        broke: [
          '4 of 5 completed the target-rate task. One stopped at the threshold field because “1,380” had no currency, and another hesitated there.',
          'One tapped Send Now by mistake. Both buttons had the same visual weight.',
        ],
        figure: {
          file: 'fxpress/00-earlier-prototype',
          alt: 'Three phone screens from the earlier high-fidelity Figma prototype: the send screen, the currency picker, and a Set a Rate Trigger dialog',
          caption: 'The earlier high-fidelity prototype that was tested. Send Now and Set Trigger for Best Rate had equal visual weight, and the threshold field showed a bare number.',
        },
        figure2: {
          file: 'fxpress/04-buttons-before-after',
          alt: 'Before and after crops of the action area: equal-weight Send Now and trigger buttons with an unlabelled 1,380 threshold, then a filled primary button, outlined secondary button and a threshold labelled KRW per USD',
          caption: 'Testing exposed ambiguous button priority and a threshold with no currency. The revised hierarchy and labels addressed both; the revision has not been re-tested with users.',
          brief: 'See brief G3. Magnify the action area only.',
        },
        quote: {
          text: 'I don’t know what 1,380 means. Is that dollars, won, or shillings?',
          who: 'Sends money to Kenya, test participant #2',
        },
        changes: [
          'Made Send Now the filled primary button and the target-rate button an outline.',
          'Added the currency to the threshold field, with a line of help text.',
          'Renamed “Set Trigger for Best Rate” to “Save Target Rate,” since the product can’t promise the best rate.',
        ],
        after: 'These changes are in the live widget. I haven’t re-tested them with users.',
      },
      {
        kind: 'text',
        eyebrow: 'Shipped',
        heading: 'What’s live',
        body: [
          'FXpress uses reference-rate data for 18 currency pairs. People can save a target rate, add a calendar reminder, and go to a provider such as Wise, Remitly, Xoom, Chase or their own bank. FXpress itself does not move money.',
          'In the first 30 days of logging, all 33 AI calls returned and the server logged no errors. That is a small window and says nothing about whether every sentence was correct; the October meaning error above was found by reading the output. There is an offline fallback, but I didn’t add tracking to it, so I can’t say whether it has been used.',
        ],
        figure: {
          file: 'fxpress/05-range-reading-charts',
          alt: 'Two aligned charts: the USD/KRW reference rate falling from July to September 2026, and the widget’s range label reading low for 68 of 75 readings over the same period',
          caption: 'Observed rate direction versus the widget’s rolling range labels, Jul to Sep 2026. This informed the next design hypothesis; a trend indicator has not shipped.',
          brief: 'See brief G4. Use the logged readings (68 low of 75) and the actual reference-rate series.',
        },
      },
      {
        kind: 'text',
        eyebrow: 'Reflection',
        heading: 'What the live data showed',
        body: [
          'The 30-day comparison is useful when the rate moves up and down within a range. It’s less useful when the rate moves steadily in one direction. From July to September the won kept strengthening, and 68 of 75 readings said “low.” Next I’d show which way the rate has been moving, as well as where it sits. That is a proposal, not a shipped feature.',
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
    stats: [
      ['5', 'buy-side operators ran the add-on'],
      ['4 of 5', 'finished reconcile, draft and survey'],
      ['4.75 / 5', 'mean ease rating from the four who finished'],
      ['4 of 4', 'named a check they’d make before sending'],
    ],
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
    ],
    context:
      'I worked in buy-side trading operations for eleven years and did this kind of reconciliation myself.',
    tldr: {
      problem:
        'Small operations teams compare internal records against broker files under time pressure. A missing trade can be overlooked when the workflow emphasizes valuation differences.',
      decision:
        'I built a spreadsheet-native prototype that classifies missing-record and value discrepancies with explicit rules. AI drafts dispute communications only after classification; the analyst reviews them.',
      result: [
        'Five buy-side operators tested the add-on on synthetic records; four completed the reconciliation-to-draft flow.',
        'The four who finished rated ease of use 4.75 of 5 on average. All four also named a check they would make before sending; two said they might send the draft as is.',
      ],
    },
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Two files, a cutoff, and exceptions that are easy to miss',
        body: [
          'On a small finance operations desk, reconciliation often starts with two files and a spreadsheet. The analyst compares the firm’s records with the broker’s file, looks into anything that doesn’t match, and resolves it before a settlement or margin cutoff.',
          'It takes time, and mistakes matter. A missed trade or misclassified break can affect a margin call or NAV. After that, the analyst writes similar emails to each counterparty by hand.',
          'I interviewed five people across four buy-side firms: a COO, an operations team lead, two analysts, and an external operational due-diligence consultant.',
        ],
        figure: {
          file: 'reconlayer/01-manual-workbook',
          alt: 'An illustrative reconciliation spreadsheet built from synthetic records, with VLOOKUP formulas, #N/A cells and hand-typed DISPUTE flags',
          caption: 'Illustrative manual reconciliation sheet, built from synthetic records, showing why lookups, unmatched records and hand-entered flags need repeated analyst checks.',
          brief: 'See brief G5. Label inside the asset: ILLUSTRATIVE WORKBOOK · SYNTHETIC DATA. Not a former employer file.',
        },
      },
      {
        kind: 'decisions',
        eyebrow: 'Key decisions',
        heading: 'Three decisions that shaped the product',
        items: [
          {
            title: 'Work inside the spreadsheet, not alongside it',
            considered: 'A standalone reconciliation product.',
            chose: 'An add-on that runs in the spreadsheet the analyst already uses.',
            why: 'I started out planning a product to sell. Research changed that: small desks often outsource this work, a free tool raises due-diligence questions, and larger vendors already cover the core features. A small team doesn’t want another system and login to maintain.',
          },
          {
            title: 'Make missing records visible before ranking differences',
            considered: 'One list ranked by the size of the difference.',
            chose: 'Two groups: value breaks, where both sides have a figure that differs, and population breaks, where one side has no record.',
            why: 'A trade missing from one file has no difference to rank, so it would end up at the bottom of a ranked list. It is often the most important item on the desk.',
            figure: {
              file: 'reconlayer/03-break-rows',
              alt: 'Two exception cards comparing a valuation mismatch, where both records exist but values differ, with a trade present in the broker file only',
              caption: 'A missing-record exception needs a different label and review path from a valuation difference. Example trade values are synthetic.',
              brief: 'See brief F2. Card A: SWP-10620 value break. Card B: SWP-11001 broker file only, missing side shown as “Not present”, never $0.',
            },
          },
          {
            title: 'Keep reconciliation rules separate from AI-generated writing',
            considered: 'AI-based classification; AI handling the easy cases and flagging the hard ones; a library of email templates; sending the draft automatically.',
            chose: 'Fixed rules classify every break first. The AI drafts the counterparty email from the classified data, within fixed limits, and cannot change a classification. The draft is shown for review; ReconLayer has no Send button.',
            why: 'Analysts have to be able to explain each decision. In my words from the project: “An analyst can defend a rule. They can’t defend a hunch.” Templates lost out because the mix of breaks is different every morning. And the analyst is responsible for each dispute, so the analyst sends it.',
            highlight: true,
            figure: {
              file: 'reconlayer/02-ai-boundary-diagram',
              alt: 'Flow diagram in five stages: internal and broker files, reconciliation rules, reviewable exceptions, AI-generated draft, analyst review. The rules and exceptions sit in a deterministic band; only the draft sits in the AI band',
              caption: 'The model can propose wording but cannot change a reconciliation classification or send a dispute.',
              brief: 'See brief F3. Five stages; green DETERMINISTIC CLASSIFICATION band around stages 2–3; dashed indigo AI WRITING BOUNDARY around stage 4 only.',
            },
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Prototype',
        heading: 'From two files to a reviewable dispute draft',
        body: [
          'ReconLayer compares the two files, sets aside valuation differences below a threshold, and sorts what’s left into value breaks and population breaks.',
          'On the synthetic test data: a $50,000 threshold on the absolute valuation difference, 4 value breaks, 2 population breaks, and a net value dispute of $327,500. The net figure sums the four value breaks only; the two missing-record breaks have no difference to net.',
        ],
        figure: {
          file: 'reconlayer/04-sidebar-worklist',
          alt: 'Close-up of the ReconLayer sidebar: the net value dispute, four value-break rows, two population-break rows with the missing side stated, and the Draft dispute email button',
          caption: 'Reconciled synthetic trade records grouped for review. The net value discrepancy is shown separately from unmatched records.',
          brief: 'See brief G6. Native Sheets capture at 100–125% zoom; the sidebar should fill ~850px of a 1600px canvas.',
        },
      },
      {
        kind: 'embed',
        eyebrow: 'Watch it',
        heading: 'ReconLayer running in Google Sheets',
        intro: 'A walkthrough of the working add-on on synthetic data: reconcile, review the classified breaks, and draft the counterparty email.',
        embed: { src: 'https://www.loom.com/embed/f51e32b7800442b48ddb008a916215c6', title: 'ReconLayer demo video', kind: 'video', ratio: '16 / 9', href: 'https://www.loom.com/share/f51e32b7800442b48ddb008a916215c6', hrefLabel: 'Open on Loom' },
      },
      {
        kind: 'iterations',
        eyebrow: 'The AI layer',
        heading: 'Three versions of the email prompt',
        figure: {
          file: 'reconlayer/05-email-draft',
          alt: 'A generated dispute email from the final prompt: subject line, the break ID with internal and broker figures, and a request for confirmation, with annotations noting fixed data fields, no invented causes, and human sign-off outside the tool',
          caption: 'An AI-assisted dispute draft generated from classified synthetic breaks. The analyst remains responsible for verifying and sending it.',
          brief: 'See brief F4. Must be a real generated email from version 3 on synthetic records; verify word count.',
        },
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
        kind: 'testing',
        eyebrow: 'Usability testing',
        heading: 'A usable workflow, but not yet a trusted system',
        intro: 'Five analysts and operators from the institutional buy-side ran the real add-on, unmoderated, on the same synthetic data. Four finished reconciling, drafting and the survey; one stopped after reconciling. Unmoderated testing reached more people but told me less about why. With four survey responses the results are directional, not a benchmark.',
        worked: [
          'The four who finished rated ease of use 4.75 out of 5 on average.',
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
        eyebrow: 'Limitations',
        heading: 'What would need to change for production use',
        items: [
          ['Google Sheets, not Excel', 'Most desks use Excel, but I didn’t have Excel to build or test in.'],
          ['Two break types', 'It handles value and population breaks. Other causes are written up for later.'],
          ['Not ready for real data', 'It runs on a personal Google account with the consumer Gemini API and synthetic data. A production version would need to keep trade data inside the firm. I haven’t built that.'],
          ['No audit trail yet', 'Analysts and compliance teams would need to see what was flagged and why. An audit view is specified but not built.'],
        ],
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
      },
    ],
  },
  {
    slug: 'hwang-yoo-yup',
    color: '#6b2234',
    tags: ['Client work', 'Archive'],
    year: '2026',
    proof: 'Live archive · two navigation modes',
    stats: [
      ['2', 'navigation modes in one site'],
      ['4', 'art-world interviews'],
      ['9 weeks', 'research to launch'],
      ['Live', 'on Framer, catalogue in progress'],
    ],
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
    sections: [
      {
        kind: 'text',
        eyebrow: 'The problem',
        heading: 'Two audiences with different needs',
        body: [
          'First-time visitors often know little about Korean history. Hwang (1916–2010) painted the same subjects for six decades, and without background that can look repetitive.',
          'Scholars and curators come with specific questions. They need dates, exhibition history and a searchable record, and long interpretive text gets in their way.',
        ],
        figure: {
          file: 'hwang-yoo-yup/01-painting',
          alt: 'Hwang Yoo-Yup’s painting Home Return Way (1979), an oil painting of figures on a road in earth tones',
          caption: 'Hwang Yoo-Yup · Home Return Way, 1979 · oil on canvas · private collection.',
          brief: 'See brief G7. Authorized reproduction only; confirm title, year, medium, dimensions and credit with the estate before publishing.',
        },
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
            figure: {
              file: 'hwang-yoo-yup/02-navigation',
              alt: 'Two captures of the same archive page: Discovery navigation with Overview, Journey, Motifs and Exhibition Plan, and Archive Mode navigation with Biography, Works, Bibliography, Exhibitions and Timeline',
              caption: 'The same site offers narrative discovery and structured archive navigation without duplicating content.',
              brief: 'See brief G8. Two live captures of the same page before and after the toggle, same viewport.',
            },
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
            figure: {
              file: 'hwang-yoo-yup/03-artwork-page',
              alt: 'A live artwork page from the archive with callouts pointing to the artwork image, the structured metadata block, and the expandable historical-context section',
              caption: 'Art-first presentation with structured metadata and optional historical context, preserving both research paths.',
              brief: 'See brief G9. Real live page; every callout must point at a visible element.',
            },
          },
          {
            title: 'A quiet visual system',
            chose: 'A dark burgundy background, warm off-white text and earth tones taken from Hwang’s paintings, with Korean and English at equal size.',
            why: 'I wanted the paintings to carry the color, and I checked each visual choice against whether it drew attention to them.',
            figure: {
              file: 'hwang-yoo-yup/04-palette-type',
              alt: 'The archive’s palette of burgundy, off-white and earth tones with hex values, and Korean and English heading samples at equal size and weight',
              caption: 'A restrained visual language informed by the paintings, using bilingual type with equivalent hierarchy.',
              brief: 'See brief G10. Real Framer tokens and live typography; check WCAG AA contrast.',
            },
          },
        ],
      },
      {
        kind: 'embed',
        eyebrow: 'Try it',
        heading: 'The live archive',
        intro: 'The archive as its visitors see it. Switch between Discovery and Archive Mode from any page.',
        embed: { src: 'https://hwangyooyup.framer.website/', title: 'Hwang Yoo-Yup archive, live site', kind: 'site', ratio: '16 / 10', href: 'https://hwangyooyup.framer.website/' },
      },
      {
        kind: 'text',
        eyebrow: 'Next',
        heading: 'Live, with the catalogue in progress',
        body: [
          'The site is live. The full catalogue of works is still being added, and I also wrote an exhibition plan for a retrospective in four sections: Formation, Displacement, Labor & Land, and Ritual. The exhibition plan is a proposal; no exhibition date is set.',
          'The estate told me they appreciated the care that went into the site, and that it stands as a testament to their father’s work and honors his legacy.',
        ],
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
