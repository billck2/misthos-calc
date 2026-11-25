/*
 * Μπάνερ της ZeniΘ για τη Black Friday (από 26/11/2026, εντολή ιδιοκτήτη: «βγάλε τελείως τη Snappi
 * και βάλε αυτό», «απλά σε καλά σημεία ορατά»). Ο σύνδεσμος και το εικονοστοιχείο μέτρησης
 * είναι του Linkwise, όπως τα έδωσε ο ιδιοκτήτης (καμπάνια 14029-267, CD28335). Το ίδιο αρχείο
 * τρέχει στο misthos2026.gr και στο misthos2027.gr.
 *
 * Η προσφορά, όπως τη γράφει η σελίδα της ZeniΘ (ελέγχθηκε 26/11/2026): «Black Friday Digital
 * Offer: Δώρο Prepaid Κάρτα μέχρι 150€» για ρεύμα και φυσικό αέριο μαζί (Dual Energy, σύμβαση
 * 24 μηνών), 75 € ή 40 € για μεμονωμένα προϊόντα, με ειδικούς όρους. Η λήξη δεν γράφεται· όταν
 * τελειώσει η Black Friday, το μπάνερ πρέπει να βγει ή να αλλάξει.
 *
 * Μία κάρτα ανά σελίδα, μέσα στο περιεχόμενο: στους υπολογιστές στο κάτω μέρος της κάρτας των
 * αποτελεσμάτων, στα άρθρα αμέσως μετά το «Με λίγα λόγια». Σημειώνεται ως διαφήμιση και ο
 * σύνδεσμος έχει rel="sponsored". Χωρίς πλαίσιο πάνω από το περιεχόμενο.
 */
(function () {
  var LINK = "https://go.linkwi.se/z/14029-267/CD28335/?";
  var PIXEL = "https://go.linkwi.se/delivery/cr.php?an=CD28335&cn=14029-267&";
  var TEXT = "Κάνε το νέο σου συμβόλαιο online στη ZeniΘ και κέρδισε prepaid κάρτα μέχρι 150€ αυτή τη Black Friday!";

  /*
   * «&» = .zn-ad.zn-ad: διπλή κλάση, ώστε οι κανόνες των σελίδων (π.χ. .article-card p, a με
   * υπογράμμιση) να μην αλλάζουν τίποτα μέσα στο μπάνερ. Η διάταξη αλλάζει με το πλάτος του
   * ίδιου του μπάνερ (container query): στην κάρτα των αποτελεσμάτων και στα άρθρα είναι στενό.
   */
  var CSS = (
    "&{position:relative;box-sizing:border-box;display:block;max-width:1160px;margin:22px auto 6px;padding:22px 24px 16px;" +
    "border-radius:20px;overflow:hidden;color:#fff;font-family:inherit;font-size:15px;line-height:1.45;text-align:left;" +
    "container-type:inline-size;" +
    "background:radial-gradient(70% 120% at 100% 0%,rgba(255,255,255,.18) 0%,rgba(255,255,255,0) 60%)," +
    "linear-gradient(135deg,#e0154f 0%,#cf003d 45%,#9d002e 100%);" +
    "box-shadow:0 16px 40px rgba(207,0,61,.32),inset 0 0 0 1px rgba(255,255,255,.14)}" +
    "& *{box-sizing:border-box}" +
    "& p,& ul,& li{margin:0;padding:0;font-family:inherit;line-height:1.4;letter-spacing:normal}" +
    "& .zn-in{display:flex;flex-wrap:wrap;align-items:center;gap:16px 24px}" +
    /* Η prepaid κάρτα */
    "& .zn-card{flex:none;position:relative;width:132px;height:84px;border-radius:12px;padding:10px 12px;color:#fff;" +
    "background:linear-gradient(135deg,#2b2b2b 0%,#0d0d0d 100%);transform:rotate(-7deg);" +
    "box-shadow:0 12px 26px rgba(0,0,0,.38),inset 0 0 0 1px rgba(255,255,255,.12);animation:zn-tilt 3.4s ease-in-out infinite}" +
    "& .zn-chip{display:block;width:22px;height:16px;border-radius:4px;background:linear-gradient(135deg,#f6d77a,#c99a2e)}" +
    "& .zn-card-lbl{position:absolute;right:11px;top:10px;font-size:9px;font-weight:800;letter-spacing:.16em;color:rgba(255,255,255,.7)}" +
    "& .zn-card-amt{position:absolute;left:12px;bottom:9px;font-size:13px;font-weight:600;color:rgba(255,255,255,.75)}" +
    "& .zn-card-amt b{display:block;font-size:24px;font-weight:900;letter-spacing:-.03em;line-height:1;color:#fff}" +
    "@keyframes zn-tilt{0%,100%{transform:rotate(-7deg) translateY(0)}50%{transform:rotate(-3deg) translateY(-4px)}}" +
    /* Κείμενο */
    "& .zn-main{flex:1 1 300px;min-width:0}" +
    "& .zn-tag{display:inline-block;margin:0 0 8px;padding:4px 10px;border-radius:999px;background:#111;color:#fff;" +
    "font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}" +
    "& .zn-tag span{color:#ff8fae}" +
    "& .zn-title{margin:0 0 10px;font-size:20px;font-weight:800;letter-spacing:-.015em;line-height:1.25;color:#fff}" +
    "& .zn-title b{display:inline;padding:1px 6px;border-radius:6px;background:#fff;color:#cf003d;font-weight:900;" +
    "-webkit-box-decoration-break:clone;box-decoration-break:clone}" +
    "& .zn-list{display:flex;flex-wrap:wrap;gap:6px 16px;list-style:none}" +
    "& .zn-list li{position:relative;padding-left:20px;font-size:13.5px;font-weight:600;color:#fff;list-style:none}" +
    "& .zn-list li:before{content:'✓';position:absolute;left:0;top:0;font-weight:900;color:#fff}" +
    /* Κουμπί */
    "& .zn-side{flex:0 1 auto;text-align:center}" +
    "& .zn-go{display:inline-block;padding:14px 24px;border-radius:12px;font-size:16.5px;font-weight:800;line-height:1.2;" +
    "white-space:nowrap;text-decoration:none!important;border:0!important;color:#cf003d!important;background:#fff;" +
    "box-shadow:0 10px 22px rgba(0,0,0,.22);transition:transform .12s ease,box-shadow .12s ease;" +
    "animation:zn-nudge 1.2s ease-in-out 1.5s 2}" +
    "& .zn-go:hover{transform:translateY(-1px);box-shadow:0 14px 28px rgba(0,0,0,.28)}" +
    "& .zn-go:focus-visible{outline:3px solid #111;outline-offset:3px}" +
    "@keyframes zn-nudge{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}" +
    /* Ψιλά γράμματα */
    "& .zn-fine{flex:1 1 100%;margin:2px 0 0;padding-top:10px;border-top:1px solid rgba(255,255,255,.28);" +
    "font-size:12px;color:rgba(255,255,255,.9)}" +
    "& .zn-px{position:absolute;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none}" +
    /* Στενό μπάνερ: κάρτα πάνω, κείμενο και κουμπί από κάτω, στη μέση */
    "@container (max-width:560px){" +
    "& .zn-in{flex-direction:column;align-items:stretch;gap:14px;text-align:center}" +
    "& .zn-card{align-self:center}" +
    "& .zn-main{flex:none}& .zn-title{font-size:19px}" +
    "& .zn-list{justify-content:center}" +
    "& .zn-side{flex:none}& .zn-go{display:block;white-space:normal}" +
    "& .zn-fine{text-align:center}}" +
    "@media(max-width:640px){&{padding:20px 16px 14px}}" +
    "@media(prefers-reduced-motion:reduce){& .zn-card,& .zn-go{animation:none}}"
  ).split("&").join(".zn-ad.zn-ad");

  function build() {
    var box = document.createElement("aside");
    box.className = "zn-ad";
    box.setAttribute("aria-label", "Διαφήμιση: ZeniΘ Black Friday");
    box.innerHTML =
      '<div class="zn-in">' +
      '<div class="zn-card" aria-hidden="true"><span class="zn-chip"></span><span class="zn-card-lbl">PREPAID</span>' +
      '<span class="zn-card-amt">έως<b>150€</b></span></div>' +
      '<div class="zn-main">' +
      '<p class="zn-tag">Διαφήμιση · <span>Black Friday</span></p>' +
      '<p class="zn-title">Κάνε το νέο σου συμβόλαιο online στη ZeniΘ και κέρδισε <b>prepaid κάρτα μέχρι 150€</b> αυτή τη Black Friday!</p>' +
      '<ul class="zn-list"><li>Ρεύμα και φυσικό αέριο</li><li>Συμβόλαιο online</li><li>Δώρο prepaid κάρτα</li></ul>' +
      "</div>" +
      '<div class="zn-side"><a class="zn-go" href="' + LINK + '" target="_blank" rel="sponsored noopener">Θέλω την προσφορά →</a></div>' +
      '<p class="zn-fine">Έως 150 € με ρεύμα και φυσικό αέριο μαζί (Dual Energy). Ισχύουν οι ειδικοί όροι της Black Friday προσφοράς της ZeniΘ.</p>' +
      "</div>" +
      '<img class="zn-px" src="' + PIXEL + '" alt="" width="1" height="1">';
    box.querySelector(".zn-go").setAttribute("title", TEXT);
    return box;
  }

  /* Ορατά σημεία: η κάρτα των αποτελεσμάτων, η αρχή του άρθρου, κάτω από την κεφαλίδα κάθε άλλης σελίδας. */
  function place(box) {
    var results = document.getElementById("results");
    if (results && results.parentNode) return results.parentNode.appendChild(box);

    var article = document.querySelector("article");
    if (article) {
      var tldr = article.querySelector(".tldr");
      if (tldr && tldr.parentNode) return tldr.parentNode.insertBefore(box, tldr.nextSibling);
      var heads = article.querySelectorAll(":scope > h2");
      var before = heads.length >= 2 ? heads[1] : heads[0];
      if (before) return article.insertBefore(box, before);
      return article.appendChild(box);
    }

    var anchor = document.querySelector(".kpis, .page-hero");
    if (anchor && anchor.parentNode) return anchor.parentNode.insertBefore(box, anchor.nextSibling);
    var main = document.querySelector("main");
    if (main) main.insertBefore(box, main.firstChild);
  }

  function run() {
    if (document.querySelector(".zn-ad")) return;
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    place(build());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
