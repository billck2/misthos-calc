/*
 * Όταν οι διαφημίσεις του site δεν φορτώνουν (πρόγραμμα αποκλεισμού), στη θέση
 * τους μπαίνει μία πρόταση για το WorkFactor: μια κάρτα μέσα στη σελίδα και,
 * λίγο αργότερα, ένα μικρό πλαίσιο στη γωνία. Αν οι διαφημίσεις φορτώνουν, το
 * αρχείο δεν κάνει τίποτα.
 *
 * ΓΙΑΤΙ ΕΤΣΙ
 *   • Η προσφορά πρώτη («Δωρεάν για όλο το 2026»): το μηδενικό κόστος τραβά
 *     δυσανάλογα περισσότερο από μια χαμηλή τιμή (Shampanier, Mazar & Ariely 2007).
 *   • Πραγματική προθεσμία με ημέρες που απομένουν — όχι ψεύτικο ρολόι: η
 *     δωρεάν περίοδος λήγει όντως 31/12/2026, και μετά από αυτή η γραμμή φεύγει.
 *   • Ένα θερμό κουμπί πάνω σε ψυχρό φόντο: ό,τι διαφέρει από το περιβάλλον του
 *     το βλέπουμε πρώτο (φαινόμενο απομόνωσης). Το μπλε κρατά την εμπιστοσύνη.
 *   • Στον υπολογιστή μισθού, 8 δευτερόλεπτα μετά τον πρώτο υπολογισμό, ένα
 *     μεγάλο πλαίσιο σκεπάζει την οθόνη (απόφαση 06/10/2026: «πιο δραστική»).
 *     Βγαίνει ΜΟΝΟ μετά από πάτημα του επισκέπτη — ποτέ στο άνοιγμα της
 *     σελίδας, που είναι αυτό που τιμωρεί η αναζήτηση της Google στο κινητό —
 *     και το πολύ μία φορά την ημέρα. Τις άλλες φορές, και στα άρθρα, βγαίνει
 *     το μικρό πλαίσιο της γωνίας.
 *   • ΜΟΝΟ όταν οι διαφημίσεις είναι αποκλεισμένες. Πάνω από διαφημίσεις της
 *     Google δεν μπαίνει ποτέ πλαίσιο: το απαγορεύουν οι όροι του AdSense.
 *
 * Όλα είναι μέσα στη σελίδα: κανένα εξωτερικό αρχείο, καμία παρακολούθηση.
 * Ο επισκέπτης κλείνει το καθένα με το «×» (το μεγάλο και με Esc, «Όχι τώρα»
 * ή κλικ έξω από αυτό) και δεν το ξαναβλέπει για ημέρες.
 */
(function () {
  var DAY = 24 * 60 * 60 * 1000;
  var CARD_KEY = "mx-note-closed";
  var TIP_KEY = "mx-tip-closed";
  var FULL_KEY = "mx-full-closed";
  /* Πόσο μετά τον πρώτο υπολογισμό βγαίνει το μεγάλο πλαίσιο. */
  var FULL_DELAY = 8000;
  var BASE = "https://app.workfactor.gr/signup?utm_source=misthos2026&utm_medium=";

  function closedRecently(key, days) {
    try {
      return Date.now() - Number(localStorage.getItem(key) || 0) < days * DAY;
    } catch (e) {
      return false;
    }
  }
  function remember(key) {
    try { localStorage.setItem(key, String(Date.now())); } catch (e) {}
  }

  /*
   * «Κάποιος το είδε»: ένα +1 στους ημερήσιους μετρητές του WorkFactor, για να
   * φαίνεται στην κονσόλα πόσοι είδαν, πόσοι πάτησαν, πόσοι γράφτηκαν. Δεν
   * στέλνεται τίποτα για τον επισκέπτη — μόνο ποιο από τα δύο εμφανίστηκε.
   */
  function seen(place) {
    try {
      fetch("https://app.workfactor.gr/api/note?k=" + place, { method: "POST", mode: "no-cors", keepalive: true }).catch(function () {});
    } catch (e) {}
  }
  /* Μετριέται όταν φαίνεται πράγματι στην οθόνη, όχι όταν απλώς μπήκε στη σελίδα. */
  function seenWhenVisible(el, place) {
    if (!("IntersectionObserver" in window)) return seen(place);
    var watcher = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) return;
        watcher.disconnect();
        seen(place);
      },
      { threshold: 0.5 }
    );
    watcher.observe(el);
  }

  var calcButton = document.getElementById("calcBtn");
  var showCard = !closedRecently(CARD_KEY, 7);
  var showTip = !closedRecently(TIP_KEY, 3);
  /* Το μεγάλο πλαίσιο: μόνο στον υπολογιστή μισθού, το πολύ μία φορά την ημέρα. */
  var showFull = Boolean(calcButton) && !closedRecently(FULL_KEY, 1);
  if (!showCard && !showTip && !showFull) return;

  /* Η δωρεάν περίοδος του WorkFactor λήγει 31/12/2026, ώρα Ελλάδας. */
  var daysFree = Math.ceil((Date.UTC(2026, 11, 31, 21, 59, 59) - Date.now()) / DAY);
  var free = daysFree >= 1;

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

  var FONT = "font-family:Inter,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;";
  var GO =
    "background:linear-gradient(180deg,#ffbe3d 0%,#ff9f0a 100%);color:#1b1400!important;font-weight:800;" +
    "text-decoration:none!important;border-radius:12px;white-space:nowrap;" +
    "box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 22px rgba(255,159,10,.38);transition:transform .12s,filter .12s";

  var CSS =
    /* ── Η κάρτα μέσα στη σελίδα ── */
    ".mx-note{position:relative;margin:26px auto 8px;max-width:1160px;border-radius:20px;padding:26px 28px 24px;overflow:hidden;" +
    "background:linear-gradient(135deg,#0b1220 0%,#13224a 55%,#1e3a8a 100%);color:#fff;" +
    "box-shadow:0 16px 44px rgba(14,23,38,.26);display:flex;flex-wrap:wrap;gap:20px 28px;align-items:center;" +
    FONT + "text-align:left;line-height:1.5}" +
    ".mx-note:before{content:'';position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#ffbe3d,#ff9f0a)}" +
    ".mx-note *{box-sizing:border-box}" +
    ".mx-note-main{flex:1 1 380px;min-width:0}" +
    ".mx-note-top{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 12px}" +
    ".mx-note-free{display:inline-block;background:#ffb020;color:#1b1400;font-size:12px;font-weight:800;letter-spacing:.06em;" +
    "text-transform:uppercase;border-radius:999px;padding:5px 12px}" +
    ".mx-note-brand{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:#c7d2fe}" +
    ".mx-note-brand svg{flex:none;border-radius:6px}" +
    ".mx-note-title{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.22;margin:0 0 8px;color:#fff}" +
    ".mx-note-text{font-size:15px;color:#cbd5e1;margin:0 0 14px;max-width:640px}" +
    ".mx-note-list{display:flex;flex-wrap:wrap;gap:6px 18px;margin:0;padding:0;list-style:none}" +
    ".mx-note-list li{font-size:13.5px;font-weight:600;color:#e2e8f0;padding-left:20px;position:relative}" +
    ".mx-note-list li:before{content:'✓';position:absolute;left:0;top:0;color:#34d399;font-weight:800}" +
    ".mx-note-side{flex:0 1 auto;text-align:center}" +
    ".mx-note-go{display:inline-block;font-size:16.5px;padding:15px 26px;" + GO + "}" +
    ".mx-note-go:hover,.mx-tip-go:hover{filter:brightness(1.06);transform:translateY(-1px)}" +
    ".mx-note-small{display:block;margin-top:10px;font-size:12.5px;font-weight:600;color:#fcd34d}" +
    ".mx-note-x,.mx-tip-x{position:absolute;top:10px;right:10px;width:30px;height:30px;border:0;border-radius:50%;" +
    "background:transparent;color:#94a3b8;font-size:20px;line-height:1;cursor:pointer}" +
    ".mx-note-x:hover,.mx-tip-x:hover{background:rgba(255,255,255,.12);color:#fff}" +
    "@keyframes mx-nudge{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}" +
    ".mx-note-go{animation:mx-nudge 1.1s ease-in-out 1.2s 2}" +
    "@media(max-width:760px){.mx-note{padding:24px 20px 22px;margin-top:22px}.mx-note-title{font-size:21px;padding-right:20px}" +
    ".mx-note-side{flex:1 1 100%}.mx-note-go{display:block;text-align:center}}" +
    /* ── Το πλαίσιο της γωνίας ── */
    ".mx-tip{position:fixed;right:20px;bottom:20px;z-index:2147483000;width:340px;max-width:calc(100vw - 20px);" +
    "border-radius:16px;padding:16px 18px 16px;background:linear-gradient(135deg,#0b1220 0%,#16285a 100%);color:#fff;" +
    "box-shadow:0 18px 50px rgba(14,23,38,.38);border-top:4px solid #ffb020;" + FONT + "line-height:1.45;text-align:left;" +
    "transform:translateY(140%);opacity:0;transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .3s}" +
    ".mx-tip.mx-in{transform:none;opacity:1}" +
    ".mx-tip *{box-sizing:border-box}" +
    ".mx-tip-free{font-size:17px;font-weight:800;letter-spacing:-.01em;margin:0 26px 4px 0;color:#fff}" +
    ".mx-tip-free b{color:#ffbe3d}" +
    ".mx-tip-text{font-size:13.5px;color:#cbd5e1;margin:0 0 12px}" +
    ".mx-tip-row{display:flex;align-items:center;gap:12px}" +
    ".mx-tip-go{display:inline-block;font-size:14.5px;padding:10px 16px;" + GO + "}" +
    ".mx-tip-small{font-size:12px;font-weight:600;color:#fcd34d}" +
    "@media(max-width:560px){.mx-tip{left:10px;right:10px;bottom:10px;width:auto;padding:14px 16px}}" +
    /* ── Το μεγάλο πλαίσιο που σκεπάζει την οθόνη ── */
    ".mx-full{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483600;display:flex;align-items:center;" +
    "justify-content:center;padding:16px;background:rgba(8,13,26,.8);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);" +
    FONT + "line-height:1.5;opacity:0;transition:opacity .25s}" +
    ".mx-full.mx-in{opacity:1}" +
    ".mx-full *{box-sizing:border-box}" +
    ".mx-full-box{position:relative;width:100%;max-width:540px;max-height:100%;overflow:auto;border-radius:22px;" +
    "padding:34px 30px 20px;text-align:center;color:#fff;outline:0;" +
    "background:linear-gradient(160deg,#0b1220 0%,#13224a 55%,#1e3a8a 100%);border-top:5px solid #ffb020;" +
    "box-shadow:0 30px 90px rgba(0,0,0,.55);transform:translateY(18px) scale(.97);transition:transform .32s cubic-bezier(.2,.8,.2,1)}" +
    ".mx-full.mx-in .mx-full-box{transform:none}" +
    ".mx-full-x{position:absolute;top:10px;right:10px;width:40px;height:40px;border:0;border-radius:50%;" +
    "background:rgba(255,255,255,.1);color:#e2e8f0;font-size:24px;line-height:1;cursor:pointer}" +
    ".mx-full-x:hover{background:rgba(255,255,255,.2);color:#fff}" +
    ".mx-full-brand{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 0 14px;font-size:15px;font-weight:700;color:#c7d2fe}" +
    ".mx-full-brand svg{flex:none;border-radius:6px}" +
    ".mx-full-top{margin:0 0 14px}" +
    ".mx-full-free{display:inline-block;background:#ffb020;color:#1b1400;font-size:13px;font-weight:800;letter-spacing:.05em;" +
    "text-transform:uppercase;border-radius:999px;padding:7px 16px}" +
    ".mx-full-title{font-size:28px;font-weight:800;letter-spacing:-.02em;line-height:1.2;margin:0 0 10px;color:#fff}" +
    ".mx-full-text{font-size:16px;color:#cbd5e1;margin:0 auto 16px;max-width:440px}" +
    ".mx-full-list{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 18px;margin:0 0 22px;padding:0;list-style:none}" +
    ".mx-full-list li{font-size:14px;font-weight:600;color:#e2e8f0;padding-left:20px;position:relative}" +
    ".mx-full-list li:before{content:'✓';position:absolute;left:0;top:0;color:#34d399;font-weight:800}" +
    ".mx-full-go{display:block;font-size:19px;padding:17px 24px;" + GO + "}" +
    ".mx-full-go:hover{filter:brightness(1.06);transform:translateY(-1px)}" +
    ".mx-full-small{margin:12px 0 0;font-size:13.5px;font-weight:600;color:#fcd34d}" +
    ".mx-full-no{display:inline-block;margin:12px 0 0;padding:8px 14px;border:0;background:transparent;color:#94a3b8;" +
    "font:inherit;font-size:14px;text-decoration:underline;cursor:pointer}" +
    ".mx-full-no:hover{color:#fff}" +
    "@media(max-width:560px){.mx-full{padding:12px}.mx-full-box{padding:30px 20px 16px}.mx-full-title{font-size:23px}" +
    ".mx-full-text{font-size:15px}.mx-full-free{font-size:11.5px;padding:6px 12px}.mx-full-go{font-size:17px;padding:15px 18px}}" +
    "@media(prefers-reduced-motion:reduce){.mx-note-go{animation:none}.mx-tip,.mx-full,.mx-full-box{transition:none}}";

  var MARK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="22" height="22" aria-hidden="true">' +
    '<rect width="64" height="64" rx="16" fill="#fff" fill-opacity=".14"/>' +
    '<path d="M14 22 L23 44 L32 24" fill="none" stroke="#fff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M32 18 L41 40 L50 18" fill="none" stroke="#7c93ff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var LEFT = daysFree === 1 ? "Τελευταία ημέρα δωρεάν" : "Απομένουν " + daysFree + " ημέρες δωρεάν";

  function buildCard() {
    var box = document.createElement("aside");
    box.className = "mx-note";
    box.setAttribute("aria-label", "WorkFactor");
    box.innerHTML =
      '<button type="button" class="mx-note-x" aria-label="Κλείσιμο">×</button>' +
      '<div class="mx-note-main">' +
      '<p class="mx-note-top"><span class="mx-note-free">' + (free ? "Δωρεάν για όλο το 2026 · πληρωμή το 2027" : "Από 29,99 € τον χρόνο") + "</span>" +
      '<span class="mx-note-brand">' + MARK + "WorkFactor</span></p>" +
      '<p class="mx-note-title">Πρόγραμμα για την ψηφιακή κάρτα εργασίας</p>' +
      '<p class="mx-note-text">Έχεις επιχείρηση; Οι εργαζόμενοι χτυπούν από το κινητό και κάθε κίνηση φεύγει αυτόματα στην ΕΡΓΑΝΗ. ' +
      "Άμεσες αλλαγές ωραρίου.</p>" +
      '<ul class="mx-note-list"><li>Χωρίς κάρτα πληρωμής</li><li>Έτοιμο σε 3 λεπτά</li>' +
      (free ? "<li>Μετά από 29,99 € τον χρόνο</li>" : "<li>Από τον browser, χωρίς εγκατάσταση</li>") + "</ul>" +
      "</div>" +
      '<div class="mx-note-side"><a class="mx-note-go" href="' + BASE + 'card" target="_blank" rel="noopener">' +
      (free ? "Ξεκίνα δωρεάν →" : "Δες το WorkFactor →") + "</a>" +
      (free ? '<span class="mx-note-small">' + LEFT + "</span>" : "") + "</div>";

    box.querySelector(".mx-note-x").addEventListener("click", function () {
      remember(CARD_KEY);
      box.parentNode && box.parentNode.removeChild(box);
    });
    return box;
  }

  /* Στον υπολογιστή: κάτω από τα αποτελέσματα, εκεί που κοιτά όποιος μόλις υπολόγισε. Στα άρθρα: νωρίς στο κείμενο. */
  function placeCard(box) {
    var results = document.getElementById("results");
    if (results && results.parentNode) return results.parentNode.appendChild(box);

    var article = document.querySelector("article");
    if (article) {
      var heads = article.querySelectorAll("h2");
      var before = heads.length >= 2 ? heads[1] : heads[heads.length - 1];
      if (before && before.parentNode === article) return article.insertBefore(box, before);
      return article.appendChild(box);
    }
    var main = document.querySelector("main");
    if (main) main.appendChild(box);
  }

  function inView(el) {
    if (!el || !el.parentNode) return false;
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);
  }

  /* Το πλαίσιο της γωνίας: μετά τον υπολογισμό ή όταν ο αναγνώστης έχει προχωρήσει, και όχι μαζί με την κάρτα. */
  function armTip(card) {
    var tip = document.createElement("aside");
    tip.className = "mx-tip";
    tip.setAttribute("aria-label", "WorkFactor");
    tip.innerHTML =
      '<button type="button" class="mx-tip-x" aria-label="Κλείσιμο">×</button>' +
      '<p class="mx-tip-free">' + (free ? "<b>Δωρεάν</b> για όλο το 2026" : "Από <b>29,99 €</b> τον χρόνο") + "</p>" +
      '<p class="mx-tip-text">Πρόγραμμα για την ψηφιακή κάρτα εργασίας' + (free ? ". Πληρωμή το 2027." : ", με αυτόματη δήλωση στην ΕΡΓΑΝΗ.") + "</p>" +
      '<div class="mx-tip-row"><a class="mx-tip-go" href="' + BASE + 'popup" target="_blank" rel="noopener">' +
      (free ? "Ξεκίνα δωρεάν →" : "Δες το →") + "</a>" +
      (free ? '<span class="mx-tip-small">' + LEFT + "</span>" : "") + "</div>";

    var shown = false;
    var wanted = false;
    function show() {
      if (shown) return;
      if (inView(card)) return; /* η κάρτα φαίνεται ήδη: θα ξαναδοκιμάσει στην επόμενη κύλιση */
      shown = true;
      window.removeEventListener("scroll", onScroll);
      document.body.appendChild(tip);
      seen("popup");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { tip.classList.add("mx-in"); });
      });
    }
    function want() { wanted = true; show(); }
    function onScroll() {
      var doc = document.documentElement;
      var depth = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      if (wanted || depth > 0.55) want();
    }

    tip.querySelector(".mx-tip-x").addEventListener("click", function () {
      remember(TIP_KEY);
      tip.parentNode && tip.parentNode.removeChild(tip);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    var calc = document.getElementById("calcBtn");
    if (calc) calc.addEventListener("click", function () { setTimeout(want, 1800); });
    setTimeout(want, calc ? 25000 : 18000);
  }

  // ── Το μεγάλο πλαίσιο ──────────────────────────────────────────

  /* null όσο δεν ξέρουμε ακόμη αν οι διαφημίσεις είναι αποκλεισμένες. */
  var adsBlocked = null;
  var fullDue = false;
  var fullShown = false;
  /* Πάτησε ήδη κάποιο κουμπί προς το WorkFactor: δεν του το ξαναδείχνουμε. */
  var went = false;

  function openFull() {
    fullShown = true;
    var layer = document.createElement("div");
    layer.className = "mx-full";
    layer.setAttribute("role", "dialog");
    layer.setAttribute("aria-modal", "true");
    layer.setAttribute("aria-label", "WorkFactor");
    layer.innerHTML =
      '<div class="mx-full-box" tabindex="-1">' +
      '<button type="button" class="mx-full-x" aria-label="Κλείσιμο">×</button>' +
      '<p class="mx-full-brand">' + MARK + "WorkFactor</p>" +
      '<p class="mx-full-top"><span class="mx-full-free">' + (free ? "Δωρεάν για όλο το 2026 · πληρωμή το 2027" : "Από 29,99 € τον χρόνο") + "</span></p>" +
      '<p class="mx-full-title">Πρόγραμμα για την ψηφιακή κάρτα εργασίας</p>' +
      '<p class="mx-full-text">Έχεις επιχείρηση; Οι εργαζόμενοι χτυπούν από το κινητό και κάθε κίνηση φεύγει αυτόματα στην ΕΡΓΑΝΗ. ' +
      "Άμεσες αλλαγές ωραρίου.</p>" +
      '<ul class="mx-full-list"><li>Χωρίς κάρτα πληρωμής</li><li>Έτοιμο σε 3 λεπτά</li>' +
      (free ? "<li>Μετά από 29,99 € τον χρόνο</li>" : "<li>Από τον browser, χωρίς εγκατάσταση</li>") + "</ul>" +
      '<a class="mx-full-go" href="' + BASE + 'modal" target="_blank" rel="noopener">' +
      (free ? "Ξεκίνα δωρεάν →" : "Δες το WorkFactor →") + "</a>" +
      (free ? '<p class="mx-full-small">' + LEFT + "</p>" : "") +
      '<button type="button" class="mx-full-no">Όχι τώρα</button>' +
      "</div>";

    var root = document.documentElement;
    var overflowBefore = root.style.overflow;
    var focusBefore = document.activeElement;
    var closed = false;

    /* Κλείνει πάντα και με κάθε τρόπο: «×», «Όχι τώρα», Esc, κλικ έξω. Η σελίδα ξαναγίνεται όπως ήταν. */
    function close() {
      if (closed) return;
      closed = true;
      remember(FULL_KEY);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = overflowBefore;
      if (layer.parentNode) layer.parentNode.removeChild(layer);
      try { if (focusBefore && focusBefore.focus) focusBefore.focus({ preventScroll: true }); } catch (e) {}
    }
    function onKey(event) {
      if (event.key === "Escape" || event.keyCode === 27) return close();
      if (event.key !== "Tab") return;
      /* Το Tab μένει μέσα στο πλαίσιο όσο είναι ανοιχτό. */
      var stops = layer.querySelectorAll("button, a[href]");
      var first = stops[0];
      var last = stops[stops.length - 1];
      if (!layer.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    layer.addEventListener("click", function (event) { if (event.target === layer) close(); });
    layer.querySelector(".mx-full-x").addEventListener("click", close);
    layer.querySelector(".mx-full-no").addEventListener("click", close);
    /* Όποιος πάτησε το κουμπί βρίσκει τη σελίδα καθαρή όταν γυρίσει. */
    layer.querySelector(".mx-full-go").addEventListener("click", function () { setTimeout(close, 300); });
    document.addEventListener("keydown", onKey);

    root.style.overflow = "hidden";
    document.body.appendChild(layer);
    seen("modal");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { layer.classList.add("mx-in"); });
    });
    try { layer.querySelector(".mx-full-box").focus({ preventScroll: true }); } catch (e) {}
  }

  /* Ανοίγει μόνο όταν ισχύουν και τα τρία: πέρασαν τα δευτερόλεπτα, οι διαφημίσεις είναι αποκλεισμένες, δεν έχει ήδη φανεί. */
  function maybeFull() {
    if (showFull && fullDue && adsBlocked === true && !fullShown && !went) openFull();
  }

  if (showFull) {
    var onFirstCalc = function () {
      calcButton.removeEventListener("click", onFirstCalc);
      setTimeout(function () { fullDue = true; maybeFull(); }, FULL_DELAY);
    };
    calcButton.addEventListener("click", onFirstCalc);
  }

  function run() {
    setTimeout(function () {
      blocked(function (yes) {
        adsBlocked = yes;
        if (!yes) return;
        var style = document.createElement("style");
        style.textContent = CSS;
        document.head.appendChild(style);

        var card = null;
        if (showCard) {
          card = buildCard();
          placeCard(card);
          seenWhenVisible(card, "card");
          card.querySelector(".mx-note-go").addEventListener("click", function () { went = true; });
        }
        /* Στον υπολογιστή, τη μέρα που θα βγει το μεγάλο πλαίσιο, το μικρό της γωνίας δεν χρειάζεται. */
        if (showTip && !showFull) armTip(card);
        maybeFull();
      });
    }, 1100);
  }

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);
})();
