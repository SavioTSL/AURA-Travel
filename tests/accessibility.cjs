const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox"],
  });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(process.env.AURA_TEST_URL || "http://localhost:8000");
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.evaluate(() => document.documentElement.classList.remove("motion"));
  await p.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  for (const state of ["desktop", "modal", "mobile", "menu"]) {
    if (state === "modal") await p.locator("[data-details=paris]").click();
    if (state === "mobile") {
      await p.keyboard.press("Escape");
      await p.setViewportSize({ width: 375, height: 812 });
    }
    if (state === "menu") {
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(300);
      await p.locator("#menu-toggle").click();
      await p.waitForTimeout(300);
    }
    const r = await p.evaluate(() =>
      axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"],
        },
      }),
    );
    if (r.violations.length) process.exitCode = 1;
    console.log(
      JSON.stringify({
        state,
        violations: r.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        incomplete: r.incomplete.map((x) => x.id),
      }),
    );
  }
  await b.close();
})();
