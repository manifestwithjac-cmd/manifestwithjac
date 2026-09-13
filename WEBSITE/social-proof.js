/*
  Social proof notifications — Manifest With Jac

  Every name in buyers.js is a real customer from the ThriveCart export.
  No timestamps: the list is a roster of real buyers, not a live purchase feed,
  and it shouldn't pretend otherwise.

  Embed (order matters):
    <script src="/buyers.js" defer></script>
    <script src="/social-proof.js" defer></script>

  Colours and font come from CSS custom properties — see the README.
*/

(function () {
  "use strict";

  // ── Settings you'll actually want to change ──────────────────────────
  var VERB = "joined"; // "joined" | "is inside" | "has"
  var FIRST_DELAY = 8000; // before the first card
  var VISIBLE_FOR = 6500; // how long each card stays
  var GAP_MIN = 25000; // shortest wait between cards
  var GAP_MAX = 45000; // longest wait between cards
  // ─────────────────────────────────────────────────────────────────────

  var buyers = window.SP_BUYERS;
  if (!Array.isArray(buyers) || buyers.length === 0) return;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  injectStyles();

  var root = document.createElement("div");
  root.className = "sp-root";
  root.setAttribute("aria-live", "polite");
  root.setAttribute("aria-atomic", "true");
  document.body.appendChild(root);

  // Fresh shuffle every page load, then walk the deck in order so nobody
  // repeats until all 102 have shown.
  var deck = shuffle(buyers.slice());
  var cursor = 0;

  setTimeout(function run() {
    if (cursor >= deck.length) {
      deck = shuffle(deck);
      cursor = 0;
    }
    show(deck[cursor++]);
    setTimeout(run, GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN));
  }, FIRST_DELAY);

  function show(buyer) {
    var card = document.createElement("div");
    card.className = "sp-card";

    var who = document.createElement("p");
    who.className = "sp-who";
    who.textContent = buyer.name + " in " + buyer.place;

    var what = document.createElement("p");
    what.className = "sp-what";
    what.textContent = VERB + " " + buyer.product;

    card.appendChild(who);
    card.appendChild(what);
    root.appendChild(card);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add("is-in");
      });
    });

    setTimeout(function () {
      card.classList.remove("is-in");
      setTimeout(
        function () {
          if (card.parentNode) card.parentNode.removeChild(card);
        },
        reduceMotion ? 0 : 400
      );
    }, VISIBLE_FOR);
  }

  // Fisher-Yates
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function injectStyles() {
    var css = [
      ".sp-root{position:fixed;left:20px;bottom:20px;z-index:9998;",
      "display:flex;flex-direction:column;gap:10px;pointer-events:none;",
      "font-family:var(--sp-font,'Inter',system-ui,sans-serif)}",

      ".sp-card{background:var(--sp-surface,#fff);color:var(--sp-ink,#1a1a1a);",
      "max-width:300px;padding:15px 18px 15px 20px;border-radius:4px;",
      "border-left:3px solid var(--sp-accent,#1a1a1a);",
      "box-shadow:0 6px 28px rgba(0,0,0,.09);opacity:0;transform:translateY(10px);",
      "transition:opacity .35s ease,transform .35s cubic-bezier(.2,.8,.2,1)}",
      ".sp-card.is-in{opacity:1;transform:translateY(0)}",

      ".sp-who{margin:0;font-size:14px;font-weight:600;line-height:1.35}",
      ".sp-what{margin:3px 0 0;font-size:13px;font-weight:400;line-height:1.45;",
      "color:var(--sp-muted,rgba(26,26,26,.62))}",

      "@media (max-width:520px){.sp-root{left:12px;right:12px;bottom:12px}",
      ".sp-card{max-width:none}}",

      "@media (prefers-reduced-motion:reduce){",
      ".sp-card{transition:opacity .01ms;transform:none}}",
    ].join("");

    var tag = document.createElement("style");
    tag.textContent = css;
    document.head.appendChild(tag);
  }
})();
