// Hides the OneTrust cookie banner only when the extension or the review skill supplied the page:
//  - inside this extension's review panes (review.html is the page's immediate parent), or
//  - on a docs or multidev link carrying ?pantheon_review=1, which the extension adds to the tabs it
//    opens and the review skill adds to the Multidev and Live links it prints.
// A normal visit to the docs site keeps its banner. This only hides the banner: it doesn't click
// Accept and sets no consent cookie. On those same pages it also keeps an anchored section in view.
const inReviewPane = location.ancestorOrigins && location.ancestorOrigins[0] === `chrome-extension://${chrome.runtime.id}`;
if (inReviewPane || new URLSearchParams(location.search).has("pantheon_review")) {
  const style = document.createElement("style");
  style.textContent = "#onetrust-consent-sdk, #onetrust-banner-sdk, #onetrust-pc-sdk, .onetrust-pc-dark-filter { display: none !important; }";
  (document.head || document.documentElement).append(style);

  // Content above an anchored section can finish loading after the browser has scrolled to it, which
  // leaves the section well below the top (about half of fresh loads of one docs page in testing).
  // Re-scroll a few times after load, and stop as soon as the reviewer scrolls or clicks.
  //
  // The site's cookie script treats any scroll as acceptance. A scroll we make ourselves must not
  // count, so our own scroll events are stopped before the page's listeners see them. The reviewer's
  // own scrolling is untouched.
  const id = decodeURIComponent(location.hash.slice(1));
  if (id) {
    let handsOn = false;
    let ourScroll = false;
    addEventListener("scroll", (event) => { if (ourScroll) event.stopImmediatePropagation(); }, { capture: true });
    for (const type of ["wheel", "touchstart", "keydown", "mousedown"]) {
      addEventListener(type, () => { handsOn = true; }, { once: true, passive: true });
    }
    const settle = () => {
      const target = document.getElementById(id);
      if (handsOn || !target || Math.abs(target.getBoundingClientRect().top) <= 40) return;
      ourScroll = true;
      target.scrollIntoView({ behavior: "instant" });
      setTimeout(() => { ourScroll = false; }, 400);
    };
    addEventListener("load", settle);
    [1000, 2500, 5000].forEach((delay) => setTimeout(settle, delay));
  }
}
