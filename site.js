/*
 * Μπάνερ πρόσκλησης της Snappi (από 17/11/2026, εντολή ιδιοκτήτη: «να βγει τελείως
 * η διαφήμιση WorkFactor και να μπει για Snappi»). Το ίδιο αρχείο τρέχει στο
 * misthos2026.gr και στο misthos2027.gr.
 *
 * Η προσφορά, όπως τη γράφει η σελίδα της Snappi (ελέγχθηκε 17/11/2026): ο φίλος
 * που μπαίνει με τον σύνδεσμο παίρνει 10 € στην εφαρμογή, αφού συμπληρώσει τη
 * φόρμα, ανοίξει λογαριασμό και κάνει μία συναλλαγή τουλάχιστον 5 € με τη χρεωστική
 * Snappi Mastercard· όχι αν έχει πάρει ήδη δώρο από άλλη ενέργεια της Snappi.
 * Αν αλλάξει η προσφορά, άλλαξε τα κείμενα εδώ και τον αριθμό ?v= σε όλες τις σελίδες.
 *
 * Μία κάρτα μέσα στη σελίδα, για όλους: κάτω από τα αποτελέσματα στους υπολογιστές,
 * πριν από το δεύτερο κεφάλαιο στα άρθρα. Κανένα πλαίσιο πάνω από το περιεχόμενο,
 * καμία μέτρηση, κανένα εξωτερικό αρχείο. Σημειώνεται ως διαφήμιση και ο σύνδεσμος
 * έχει rel="sponsored". Το «×» την κρύβει για 7 ημέρες.
 */
(function () {
  var REF = "https://refer.snappibank.com/refer-a-friend-referred-gr?referralCode=beqf42o&refSource=copy";
  var TERMS = "https://www.snappibank.com/el/refer-a-friend-referred-oroi/";
  var KEY = "sn-ad-closed";
  var DAY = 24 * 60 * 60 * 1000;

  try {
    if (Date.now() - Number(localStorage.getItem(KEY) || 0) < 7 * DAY) return;
  } catch (e) {}

  /*
   * «&» = .sn-ad.sn-ad: διπλή κλάση, ώστε οι κανόνες των άρθρων (π.χ. .article-card p,
   * a με υπογράμμιση) να μην αλλάζουν χρώματα και μεγέθη μέσα στο μπάνερ.
   * Η διάταξη αλλάζει με το πλάτος του ίδιου του μπάνερ (container query), όχι της οθόνης:
   * μέσα σε άρθρο είναι στενό ακόμη και σε μεγάλη οθόνη.
   */
  var CSS = (
    "&{position:relative;box-sizing:border-box;display:block;max-width:1160px;margin:26px auto 10px;padding:24px 26px 18px;" +
    "border-radius:22px;overflow:hidden;color:#fff;font-family:inherit;font-size:15px;line-height:1.45;text-align:left;" +
    "container-type:inline-size;" +
    "background:radial-gradient(120% 140% at 0% 0%,#2b3a8f 0%,rgba(43,58,143,0) 55%)," +
    "radial-gradient(90% 120% at 100% 100%,#0f766e 0%,rgba(15,118,110,0) 60%),#0b1226;" +
    "box-shadow:0 18px 46px rgba(11,18,38,.28),inset 0 0 0 1px rgba(255,255,255,.08)}" +
    "& *{box-sizing:border-box}" +
    "& p,& ol,& li{margin:0;padding:0;font-family:inherit;line-height:1.4;letter-spacing:normal}" +
    "& .sn-in{display:flex;flex-wrap:wrap;align-items:center;gap:18px 24px}" +
    /* Το κέρμα των 10 € */
    "& .sn-coin{flex:none;position:relative;width:96px;height:96px;border-radius:50%;display:flex;flex-direction:column;" +
    "align-items:center;justify-content:center;color:#3b2500;" +
    "background:radial-gradient(circle at 32% 28%,#fff3b8 0%,#ffd65c 32%,#f2a516 70%,#c97c06 100%);" +
    "box-shadow:inset 0 -6px 0 rgba(0,0,0,.14),inset 0 0 0 5px rgba(255,255,255,.28),0 10px 26px rgba(242,165,22,.45);" +
    "animation:sn-float 3.2s ease-in-out infinite}" +
    "& .sn-coin:before{content:'';position:absolute;inset:9px;border-radius:50%;border:2px dashed rgba(120,72,0,.35)}" +
    "& .sn-coin-amt{font-size:30px;font-weight:900;letter-spacing:-.04em;line-height:1}" +
    "& .sn-coin-lbl{margin-top:3px;font-size:10.5px;font-weight:800;letter-spacing:.14em;line-height:1}" +
    "@keyframes sn-float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-5px) rotate(4deg)}}" +
    /* Κείμενο */
    "& .sn-main{flex:1 1 320px;min-width:0}" +
    "& .sn-tag{margin:0 0 6px;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd}" +
    "& .sn-title{margin:0 0 12px;padding-right:22px;font-size:23px;font-weight:800;letter-spacing:-.02em;line-height:1.2;color:#fff}" +
    "& .sn-title b{color:#ffd65c;font-weight:800}" +
    "& .sn-steps{display:flex;flex-wrap:wrap;gap:8px;list-style:none;counter-reset:sn}" +
    "& .sn-steps li{counter-increment:sn;display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;" +
    "background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);font-size:13.5px;font-weight:600;color:#e2e8f0;" +
    "list-style:none}" +
    "& .sn-steps li:before{content:counter(sn);flex:none;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;" +
    "justify-content:center;background:#ffd65c;color:#3b2500;font-size:12px;font-weight:900}" +
    /* Κουμπί */
    "& .sn-side{flex:0 1 auto;text-align:center}" +
    "& .sn-go{display:inline-block;padding:15px 26px;border-radius:14px;font-size:17px;font-weight:800;line-height:1.2;white-space:nowrap;" +
    "text-decoration:none!important;border:0!important;color:#2a1a00!important;" +
    "background:linear-gradient(180deg,#ffe07a 0%,#f2a516 100%);" +
    "box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 10px 24px rgba(242,165,22,.42);" +
    "transition:transform .12s ease,filter .12s ease;animation:sn-nudge 1.2s ease-in-out 1.5s 2}" +
    "& .sn-go:hover{filter:brightness(1.05);transform:translateY(-1px)}" +
    "& .sn-go:focus-visible{outline:3px solid #fff;outline-offset:3px}" +
    "@keyframes sn-nudge{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}" +
    "& .sn-sub{display:block;margin-top:8px;font-size:12.5px;font-weight:600;color:#a7f3d0}" +
    /* Ψιλά γράμματα */
    "& .sn-fine{flex:1 1 100%;margin:2px 0 0;padding-top:12px;border-top:1px solid rgba(255,255,255,.1);font-size:12px;color:#94a3b8}" +
    "& .sn-fine a{color:#cbd5e1!important;text-decoration:underline!important;border:0!important;font-weight:600}" +
    "& .sn-x{position:absolute;top:10px;right:10px;z-index:1;width:30px;height:30px;padding:0;border:0;border-radius:50%;" +
    "background:transparent;color:#94a3b8;font-size:20px;line-height:1;cursor:pointer;box-shadow:none}" +
    "& .sn-x:hover{background:rgba(255,255,255,.12);color:#fff}" +
    /* Στενό μπάνερ (κινητό, ή μέσα σε άρθρο): όλα το ένα κάτω από το άλλο, στη μέση */
    "@container (max-width:560px){" +
    "& .sn-in{flex-direction:column;align-items:stretch;gap:14px;text-align:center}" +
    "& .sn-coin{align-self:center;width:84px;height:84px}& .sn-coin:before{inset:8px}" +
    "& .sn-coin-amt{font-size:26px}& .sn-coin-lbl{font-size:9.5px}" +
    "& .sn-main{flex:none}& .sn-title{padding:0 6px;font-size:21px}" +
    "& .sn-steps{flex-direction:column;align-items:stretch;text-align:left}" +
    "& .sn-steps li{border-radius:12px;padding:8px 12px 8px 8px}" +
    "& .sn-side{flex:none}& .sn-go{display:block;text-align:center;white-space:normal}" +
    "& .sn-fine{text-align:left}}" +
    "@media(max-width:640px){&{padding:22px 16px 16px;margin-top:22px}}" +
    "@media(prefers-reduced-motion:reduce){& .sn-coin,& .sn-go{animation:none}}"
  ).split("&").join(".sn-ad.sn-ad");

  function build() {
    var box = document.createElement("aside");
    box.className = "sn-ad";
    box.setAttribute("aria-label", "Διαφήμιση: πρόσκληση Snappi");
    box.innerHTML =
      '<button type="button" class="sn-x" aria-label="Κλείσιμο">×</button>' +
      '<div class="sn-in">' +
      '<div class="sn-coin" aria-hidden="true"><span class="sn-coin-amt">10€</span><span class="sn-coin-lbl">ΔΩΡΟ</span></div>' +
      '<div class="sn-main">' +
      '<p class="sn-tag">Διαφήμιση · Πρόσκληση Snappi</p>' +
      '<p class="sn-title">Πάρε <b>10 € δώρο</b> ανοίγοντας λογαριασμό στη Snappi</p>' +
      '<ol class="sn-steps"><li>Συμπλήρωσε τη φόρμα</li><li>Άνοιξε λογαριασμό στην εφαρμογή</li>' +
      "<li>Πλήρωσε 5 € με την κάρτα</li></ol>" +
      "</div>" +
      '<div class="sn-side"><a class="sn-go" href="' + REF + '" target="_blank" rel="sponsored noopener">Θέλω τα 10 € →</a>' +
      '<span class="sn-sub">Από το κινητό, στην εφαρμογή Snappi</span></div>' +
      '<p class="sn-fine">Τα 10 € μπαίνουν στην εφαρμογή μετά την πρώτη συναλλαγή τουλάχιστον 5 € με τη χρεωστική ' +
      "Snappi Mastercard. Ισχύει αν δεν έχεις πάρει ήδη δώρο από άλλη ενέργεια της Snappi. " +
      '<a href="' + TERMS + '" target="_blank" rel="noopener nofollow">Όροι της Snappi</a></p>' +
      "</div>";

    box.querySelector(".sn-x").addEventListener("click", function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
      if (box.parentNode) box.parentNode.removeChild(box);
    });
    return box;
  }

  /* Στους υπολογιστές: κάτω από φόρμα και αποτελέσματα. Στα άρθρα: πριν από το δεύτερο κεφάλαιο. */
  function place(box) {
    var results = document.getElementById("results");
    if (results) {
      var grid = results.closest(".grid") || results.parentNode;
      if (grid && grid.parentNode) return grid.parentNode.insertBefore(box, grid.nextSibling);
    }
    var article = document.querySelector("article");
    if (article) {
      var heads = article.querySelectorAll(":scope > h2");
      var before = heads.length >= 2 ? heads[1] : heads[heads.length - 1];
      if (before) return article.insertBefore(box, before);
      return article.appendChild(box);
    }
    var main = document.querySelector("main");
    if (main) main.appendChild(box);
  }

  function run() {
    if (document.querySelector(".sn-ad")) return;
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    place(build());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
