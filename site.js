/*
 * Όταν οι διαφημίσεις του site δεν φορτώνουν (πρόγραμμα αποκλεισμού), στη θέση
 * τους μπαίνει μία δική μας πρόταση για το WorkFactor. Αν φορτώνουν κανονικά,
 * το αρχείο δεν κάνει τίποτα.
 *
 * Όλα είναι δικά μας και μέσα στη σελίδα: κανένα εξωτερικό αρχείο, καμία
 * παρακολούθηση. Ο επισκέπτης το κλείνει με το «×» και δεν το ξαναβλέπει για
 * μία εβδομάδα.
 */
(function () {
  var KEY = "mx-note-closed";
  var WEEK = 7 * 24 * 60 * 60 * 1000;
  var LINK = "https://app.workfactor.gr/signup?utm_source=misthos2026&utm_medium=site";

  try {
    if (Date.now() - Number(localStorage.getItem(KEY) || 0) < WEEK) return;
  } catch (e) {}

  /*
   * Φορτώνουν οι διαφημίσεις; Δύο ενδείξεις.
   *
   * Το `adsbygoogle.loaded` ΔΕΝ είναι ένδειξη: τα προγράμματα αποκλεισμού
   * βάζουν στη θέση της βιβλιοθήκης ένα άδειο αντίγραφο που το δηλώνει true.
   * Και η απόκρυψη στοιχείων εφαρμόζεται λίγο ΜΕΤΑ την εμφάνισή τους, άρα το
   * δοκιμαστικό πλαίσιο μετριέται με μικρή καθυστέρηση, όχι αμέσως.
   */
  function blocked(done) {
    var probe = document.createElement("div");
    probe.className = "adsbox ad-banner ad-placement textads";
    probe.style.cssText = "position:absolute;left:-9999px;top:0;width:10px;height:10px";
    document.body.appendChild(probe);

    setTimeout(function () {
      var hidden = probe.offsetHeight === 0 || getComputedStyle(probe).display === "none";
      document.body.removeChild(probe);
      if (hidden) return done(true);

      if (!window.fetch) return done(false);
      fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: "HEAD", mode: "no-cors" }).then(
        function () { done(false); },
        /* Χωρίς σύνδεση αποτυγχάνουν όλα: δεν είναι αποκλεισμός. */
        function () { done(navigator.onLine !== false); }
      );
    }, 400);
  }

  var CSS =
    ".mx-note{position:relative;margin:28px auto 8px;max-width:1160px;border-radius:20px;padding:26px 28px;" +
    "background:linear-gradient(135deg,#0e1726 0%,#17233b 60%,#1d2f5c 100%);color:#fff;" +
    "box-shadow:0 14px 40px rgba(14,23,38,.22);display:flex;gap:26px;align-items:center;" +
    "font-family:Inter,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;text-align:left;line-height:1.5}" +
    ".mx-note *{box-sizing:border-box}" +
    ".mx-note-main{flex:1;min-width:0}" +
    ".mx-note-kick{display:flex;align-items:center;gap:9px;font-size:11.5px;font-weight:700;letter-spacing:.08em;" +
    "text-transform:uppercase;color:#9fb0ff;margin:0 0 10px}" +
    ".mx-note-kick svg{flex:none;border-radius:7px}" +
    ".mx-note-title{font-size:23px;font-weight:800;letter-spacing:-.02em;line-height:1.25;margin:0 0 8px;color:#fff}" +
    ".mx-note-text{font-size:15px;color:#cbd5e1;margin:0 0 14px;max-width:640px}" +
    ".mx-note-list{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}" +
    ".mx-note-list li{font-size:13px;font-weight:600;color:#e2e8f0;background:rgba(255,255,255,.09);" +
    "border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:5px 12px}" +
    ".mx-note-side{flex:none;text-align:center}" +
    ".mx-note-go{display:inline-block;background:#ffb020;color:#1b1400!important;font-size:16px;font-weight:800;" +
    "text-decoration:none!important;border-radius:12px;padding:14px 24px;white-space:nowrap;" +
    "box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 6px 18px rgba(255,176,32,.28);transition:transform .12s,background .12s}" +
    ".mx-note-go:hover{background:#ffc247;transform:translateY(-1px)}" +
    ".mx-note-small{display:block;margin-top:9px;font-size:12px;color:#94a3b8}" +
    ".mx-note-x{position:absolute;top:10px;right:12px;width:30px;height:30px;border:0;border-radius:50%;" +
    "background:transparent;color:#94a3b8;font-size:20px;line-height:1;cursor:pointer}" +
    ".mx-note-x:hover{background:rgba(255,255,255,.1);color:#fff}" +
    "@media(max-width:760px){.mx-note{flex-direction:column;align-items:stretch;gap:18px;padding:24px 20px 22px;margin-top:22px}" +
    ".mx-note-title{font-size:20px;padding-right:22px}.mx-note-go{display:block;text-align:center}}";

  var MARK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">' +
    '<rect width="64" height="64" rx="16" fill="#fff" fill-opacity=".12"/>' +
    '<path d="M14 22 L23 44 L32 24" fill="none" stroke="#fff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M32 18 L41 40 L50 18" fill="none" stroke="#4F6BFF" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function build() {
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var box = document.createElement("aside");
    box.className = "mx-note";
    box.setAttribute("aria-label", "WorkFactor");
    box.innerHTML =
      '<button type="button" class="mx-note-x" aria-label="Κλείσιμο">×</button>' +
      '<div class="mx-note-main">' +
      '<p class="mx-note-kick">' + MARK + "<span>WorkFactor · από την ομάδα του misthos2026</span></p>" +
      '<p class="mx-note-title">Έχεις επιχείρηση; Η κάρτα εργασίας δηλώνεται μόνη της.</p>' +
      '<p class="mx-note-text">Οι εργαζόμενοι χτυπούν από το κινητό και κάθε κίνηση φεύγει αυτόματα στην ΕΡΓΑΝΗ. ' +
      "Ωράρια, άδειες και μισθοδοσία στο ίδιο σημείο, με τον ίδιο υπολογισμό μισθού που βλέπεις εδώ.</p>" +
      '<ul class="mx-note-list"><li>Δωρεάν όλο το 2026</li><li>Μετά από 29,99 € τον χρόνο</li>' +
      "<li>Έτοιμο σε λίγα λεπτά, με τους κωδικούς ΕΡΓΑΝΗ</li></ul>" +
      "</div>" +
      '<div class="mx-note-side"><a class="mx-note-go" href="' + LINK + '" target="_blank" rel="noopener">Δοκίμασέ το δωρεάν →</a>' +
      '<span class="mx-note-small">Από τον browser, χωρίς εγκατάσταση</span></div>';

    box.querySelector(".mx-note-x").addEventListener("click", function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
      box.parentNode && box.parentNode.removeChild(box);
    });
    return box;
  }

  /* Κάτω από τον υπολογιστή· στα άρθρα, στη μέση του κειμένου. */
  function place(box) {
    var article = document.querySelector("article");
    if (article) {
      var heads = article.querySelectorAll("h2");
      var before = heads.length >= 3 ? heads[2] : heads[heads.length - 1];
      if (before && before.parentNode === article) return article.insertBefore(box, before);
      return article.appendChild(box);
    }
    var main = document.querySelector("main");
    if (main) main.appendChild(box);
  }

  function run() {
    setTimeout(function () {
      blocked(function (yes) {
        if (yes) place(build());
      });
    }, 1500);
  }

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);
})();
