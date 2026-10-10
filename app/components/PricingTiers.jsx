import { PLAN_TIERS } from "../planCatalog";

// 4-tier pricing comparison used by both the standalone pricing page and the
// in-app pricing wall. Presentational only: every plan CTA is a real top-frame
// link (`target="_top"`) to Shopify's hosted managed-pricing page, where the
// actual price/cycle live and are picked. A direct anchor is used (rather than a
// form POST + reauthorize-header redirect) because a user click is a reliable
// user-activation that can navigate the top frame out of the embedded iframe —
// the POST-based redirect intermittently failed during initial setup and looped
// the merchant back to the app index.
//
// NOTE: we intentionally do NOT show prices here. Prices are owned by the
// Partner Dashboard plans and can be changed there without a code deploy;
// rendering them in-app would risk showing a stale amount. The merchant sees the
// real price on Shopify's pricing page after clicking through.
//
// Design (Cobalt Slate): hard-edged cards on a light blueprint wash, each lifted
// by a solid offset shadow rather than a blur. The recommended tier is a
// COBALT-FILLED card — not an inverted ink one — and its ribbon is a square tab
// that sits flush in the card's top-right corner, so the recommendation reads at
// a glance without shifting the grid's baseline (which made a lifted card's
// badge collide with the heading).
export default function PricingTiers({ pricingUrl }) {
  return (
    <div style={s.page}>
      <div style={s.inner}>
        <header style={s.head}>
          <span style={s.tag}>
            <span style={s.tagSquare} aria-hidden="true" />
            Optivexa
          </span>
          <h1 style={s.heading}>Pricing that scales with your catalog.</h1>
          <p style={s.subheading}>
            Compress images, lift your page speed, and rank higher — start free and
            move up whenever your catalog does.
          </p>
        </header>

        <div style={s.grid}>
          {PLAN_TIERS.map((tier) => {
            const hot = Boolean(tier.popular);
            return (
              <div key={tier.name} style={hot ? s.cardHot : s.card}>
                {hot && <span style={s.ribbon}>Recommended</span>}
                <div style={s.cardBody}>
                  <p style={hot ? s.tierNameHot : s.tierName}>{tier.name}</p>
                  <p style={hot ? s.taglineHot : s.tagline}>{tier.tagline}</p>

                  <div style={hot ? s.quotaBoxHot : s.quotaBox}>
                    <span style={hot ? s.quotaNumHot : s.quotaNum}>{tier.images}</span>
                    <span style={hot ? s.quotaUnitHot : s.quotaUnit}>images / month</span>
                  </div>

                  <div style={s.featureList}>
                    {tier.features.map((f, i) => (
                      <div key={i} style={s.featureRow}>
                        <span style={hot ? s.markHot : s.mark} aria-hidden="true" />
                        <span style={hot ? s.featureTextHot : s.featureText}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={pricingUrl}
                    target="_top"
                    style={{
                      ...(hot ? s.ctaHot : s.cta),
                      display: "block",
                      textAlign: "center",
                      textDecoration: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    {tier.price === 0 ? "Start free" : "Choose plan"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p style={s.disclaimer}>Secure billing through Shopify · Change or cancel anytime</p>
      </div>
    </div>
  );
}

const INK = "#0f172a";
const BLUE = "#2563eb";
const NAVY = "#1e3a8a";
const NAVY_DEEP = "#172554";
const MUTED = "#64748b";
const LINE = "#dbe3f0";

// The clipped top-right corner used on every badge in the app.
const NOTCH = "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%)";

const s = {
  page: {
    minHeight: "100vh",
    // Light blueprint crosshatch over a cobalt-tinted wash — the same motif as
    // the slate panels, inverted for a light surface.
    backgroundColor: "#f5f8ff",
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(37,99,235,0.045) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(37,99,235,0.045) 0 1px, transparent 1px 26px)",
    display: "flex",
    justifyContent: "center",
    padding: "48px 24px 56px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif",
    boxSizing: "border-box",
  },
  inner: { width: "100%", maxWidth: 1120 },
  head: { maxWidth: 680, marginBottom: 32 },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: NAVY,
    background: "#eaf1ff",
    border: "1px solid #c3d4f2",
    borderRadius: 2,
    padding: "5px 11px",
    marginBottom: 18,
  },
  tagSquare: { width: 7, height: 7, background: BLUE, flexShrink: 0 },
  heading: {
    fontSize: 38,
    fontWeight: 700,
    color: INK,
    margin: "0 0 10px 0",
    letterSpacing: "-0.025em",
    lineHeight: 1.1,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 1.6,
    color: MUTED,
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(234px, 1fr))",
    gap: 16,
    width: "100%",
    alignItems: "stretch",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    borderRadius: 4,
    border: `1px solid ${LINE}`,
    // Hard offset lift, zero blur (design rule 1).
    boxShadow: "4px 4px 0 rgba(30,58,138,0.1)",
  },
  cardHot: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(170deg, #2563eb 0%, #1e3a8a 100%)",
    borderRadius: 4,
    border: `1px solid ${NAVY_DEEP}`,
    boxShadow: "6px 6px 0 rgba(23,37,84,0.26)",
  },
  // A square tab flush in the card's top-right corner, clipped to match.
  ribbon: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: NAVY_DEEP,
    background: "#ffffff",
    padding: "5px 9px",
    whiteSpace: "nowrap",
    clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: 13,
    padding: "22px 20px 20px",
    flex: 1,
  },
  tierName: { fontSize: 17, fontWeight: 700, color: INK, margin: 0, letterSpacing: "-0.01em" },
  tierNameHot: { fontSize: 17, fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: "-0.01em" },
  tagline: { fontSize: 12.5, color: MUTED, margin: "-7px 0 0 0" },
  taglineHot: { fontSize: 12.5, color: "rgba(219,234,254,0.76)", margin: "-7px 0 0 0" },
  // Quota reads as a figure with a rule under it, matching .opx-figure in-app.
  quotaBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 11,
    borderBottom: `2px solid ${BLUE}`,
  },
  quotaBoxHot: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 11,
    borderBottom: "2px solid #ffffff",
  },
  quotaNum: {
    fontSize: 25,
    fontWeight: 700,
    color: INK,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  quotaNumHot: {
    fontSize: 25,
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  quotaUnit: {
    fontSize: 10.5,
    color: MUTED,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  quotaUnitHot: {
    fontSize: 10.5,
    color: "rgba(219,234,254,0.72)",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  featureList: { display: "flex", flexDirection: "column", gap: 9, flex: 1 },
  featureRow: { display: "flex", alignItems: "flex-start", gap: 9 },
  // A small cobalt square — not a rotated diamond, not a check glyph.
  mark: { width: 7, height: 7, marginTop: 5, background: BLUE, flexShrink: 0 },
  markHot: { width: 7, height: 7, marginTop: 5, background: "#ffffff", flexShrink: 0 },
  featureText: { fontSize: 12.5, color: "#334155", lineHeight: "18px" },
  featureTextHot: { fontSize: 12.5, color: "rgba(219,234,254,0.88)", lineHeight: "18px" },
  // CTAs use the same "physical key" treatment as the app's primary buttons:
  // a solid bottom edge rather than a shadow.
  cta: {
    width: "100%",
    padding: "10px 12px",
    background: "#ffffff",
    color: NAVY,
    border: "1px solid #c3d4f2",
    borderBottom: "2px solid #93b4fd",
    borderRadius: 4,
    fontSize: 13.5,
    fontWeight: 700,
    clipPath: NOTCH,
  },
  ctaHot: {
    width: "100%",
    padding: "10px 12px",
    background: "#ffffff",
    color: NAVY_DEEP,
    border: "1px solid #ffffff",
    borderBottom: "2px solid #bfdbfe",
    borderRadius: 4,
    fontSize: 13.5,
    fontWeight: 700,
    clipPath: NOTCH,
  },
  disclaimer: { fontSize: 12, color: MUTED, marginTop: 28 },
};
