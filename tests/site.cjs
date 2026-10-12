const { chromium, devices } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox"],
  });
  let checks = 0;
  for (const [name, device] of [
    ["iPhone SE", devices["iPhone SE"]],
    ["iPhone 13", devices["iPhone 13"]],
    ["Pixel 7", devices["Pixel 7"]],
    ["iPad", devices["iPad (gen 7)"]],
    ["Desktop", { viewport: { width: 1440, height: 1000 } }],
  ]) {
    const context = await browser.newContext({
      ...device,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(process.env.AURA_TEST_URL || "http://localhost:8000");
    await page.waitForTimeout(200);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    checks++;
    await page.locator("#destination-search").fill("suicos");
    await page.locator("#search-form button").click();
    assert.deepEqual(
      await page.locator(".destination-card h3").allTextContents(),
      ["Alpes Suíços"],
    );
    assert.equal(
      await page.locator(".filter-chip").first().textContent(),
      "Busca: suicos",
    );
    checks++;
    await page.locator(".clear-filters").click();
    await page.locator("[data-favorite=paris]").click();
    await page.locator("[data-filter=cultura]").click();
    await page.locator("#catalog-favorites").click();
    assert.equal(
      await page.locator("#catalog-title").textContent(),
      "Seus destinos favoritos",
    );
    assert.equal(await page.locator(".destination-card").count(), 1);
    assert.equal(await page.locator(".filter-chip").count(), 2);
    checks++;
    await page
      .locator('.filter-chip[aria-label="Remover filtro Somente favoritos"]')
      .click();
    assert.equal(await page.locator(".destination-card").count(), 2);
    checks++;
    await page.locator(".clear-filters").click();
    await page
      .locator("#destination-search")
      .fill("<img src=x onerror=alert(1)>");
    await page.locator("#search-form button").click();
    assert.equal(await page.locator(".filter-chip img").count(), 0);
    assert.equal(await page.locator("#empty-results").isVisible(), true);
    await page.locator("#reset-filters").click();
    checks++;
    await page.locator("[data-details=paris]").click();
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() =>
        document.querySelector("dialog").contains(document.activeElement),
      ),
      true,
    );
    await page.locator("#request-quote").click();
    await page.waitForTimeout(200);
    assert.equal(await page.evaluate(() => document.activeElement.id), "name");
    assert.equal(
      await page.locator("#quote-destination").inputValue(),
      "Paris",
    );
    checks++;
    if (device.isMobile && device.viewport.width < 1000) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
      await page.locator("#menu-toggle").click();
      assert.equal(await page.locator("main").evaluate((e) => e.inert), true);
      assert.equal(
        await page.locator("#header-shell").getAttribute("role"),
        "dialog",
      );
      await page.keyboard.press("Shift+Tab");
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "menu-toggle",
      );
      await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(() => document.activeElement.getAttribute("href")),
        "#destinos",
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "menu-toggle",
      );
      assert.equal(await page.locator("main").evaluate((e) => e.inert), false);
      checks++;
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: "/tmp/aura-polish-" + name.replace(/\W/g, "") + ".png",
    });
    assert.deepEqual(errors, []);
    console.log(name + ": passed");
    await context.close();
  }
  const p = await browser.newPage({
    viewport: { width: 720, height: 900 },
    reducedMotion: "reduce",
  });
  await p.goto(process.env.AURA_TEST_URL || "http://localhost:8000");
  await p.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
  checks++;
  console.log("Text enlargement: passed");
  console.log(checks + " check groups passed");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
