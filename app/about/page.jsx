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


    </article>
  );
}
