module.exports = async (page, scenario, viewport, isReference, browser, config) => {
  await page.setExtraHTTPHeaders({
    'Deterrence-Bypass': '1',
  });
};
