/**
 * Ruled usage gauge.
 *
 * Replaces Polaris's continuous <ProgressBar> for quota display so the quota
 * reads as a measured gauge rather than a loading bar: one solid fill under a
 * ruler of 10% tick marks, with a caret pinned to the exact reading. The whole
 * gauge turns red once the quota is spent.
 *
 * Purely presentational: it takes the same numbers the old bar derived its
 * percentage from, so quota behaviour is unchanged.
 */
export default function UsageMeter({ used = 0, quota = 0 }) {
  const pct = quota > 0 ? Math.min(100, Math.round((used / quota) * 100)) : 0;
  const critical = quota > 0 && used >= quota;

  return (
    <div className={critical ? "opx-meter-wrap is-critical" : "opx-meter-wrap"}>
      <div
        className={critical ? "opx-meter is-critical" : "opx-meter"}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% of the monthly image quota used`}
      >
        {/* Any usage at all should show a sliver of fill, otherwise a merchant
            who has optimized a handful of images sees an empty gauge. */}
        <div
          className="opx-meter-fill"
          style={{ width: pct > 0 ? `${Math.max(1.5, pct)}%` : "0%" }}
        />
        <div className="opx-meter-ticks" aria-hidden="true" />
      </div>
      {/* The caret is decorative — the reading is already on the progressbar. */}
      <span
        className="opx-meter-caret"
        aria-hidden="true"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}
