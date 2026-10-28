export const metadata = { title: 'About — Lorraine Kim' };

const timeline = [
  ['Design', [
    ['2024 – now', 'Product Designer, OOJOO Studios', 'Financial tools and client websites, from research through design and build.'],
    ['2023 – 2024', 'UX Academy, DesignLab', 'Design foundations.'],
  ]],
  ['Institutional finance (non-design roles)', [
    ['2020 – 2022', 'AIM Trading Analyst, Bloomberg', 'Vendor-side support for buy-side clients on Bloomberg’s order management system; turned recurring client issues into product requests with Product and Engineering.'],
    ['2009 – 2020', 'AVP, Trading Operations, Mizuho Alternative Investments', 'Buy-side middle office: reconciliation, settlement, and cash forecasting across asset classes; requirements owner through UAT for system upgrades.'],
    ['2007 – 2009', 'Associate Portfolio Manager, AllianceBernstein', 'FX-derivative hedging and risk analytics for institutional equity portfolios.'],
  ]],
];

const tools = ['Figma', 'FigJam', 'Framer', 'Maze', 'Optimal Workshop', 'Cursor', 'Claude Code', 'GitHub', 'Vercel', 'Netlify', 'Umami', 'Notion', 'Jira', 'Linear', 'Lottie'];

export default function About() {
  return (
    <article className="about">
      <h1>About</h1>
      <p className="lede">
        I spent fifteen years in institutional finance: buy-side trading operations, risk, and supporting asset managers on
        Bloomberg’s order management system. I saw where financial software worked well and where important processes
        still ran on spreadsheets, email and manual checks.
      </p>
      <p>
        Now I design and build products for that kind of work, including fintech and AI-assisted tools. I prototype in code
        so I can test ideas with real data.
      </p>
      <p>
        At Bloomberg I worked between clients and the product and engineering teams, logging issues and following them
        through to a fix. It showed me how much a clear spec or bug report helps the people building the fix.
      </p>

      {timeline.map(([group, rows]) => (
        <section key={group}>
          <h2 className="section-label">{group}</h2>
          <ol className="timeline">
            {rows.map(([when, what, detail]) => (
              <li key={what}><span className="when">{when}</span><div><strong>{what}</strong><p>{detail}</p></div></li>
            ))}
          </ol>
        </section>
      ))}

      <section>
        <h2 className="section-label">Tools</h2>
        <p className="tools">{tools.join(' · ')}</p>
      </section>

      <section>
        <h2 className="section-label">Elsewhere</h2>
        <p>
          I’m also an artist, working across mediums on family, culture and history. OOJOO Studios is my independent studio for
          product design, archival work, and projects with artists from the Korean diaspora. Outside work I’m learning my
          mum’s Korean dishes, visiting galleries, doing Where’s Waldo with my niece, and hosting GoStop Club, a Korean
          card-game night in the Bay Area.
        </p>
      </section>
    </article>
  );
}
