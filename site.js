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
  /* Η εικόνα της καμπάνιας (μαύρο φόντο, κόκκινο νέον), όπως την έδωσε ο ιδιοκτήτης 26/11/2026. */
  var IMAGE = "/promo/zenith-black-friday-150.jpg";

  var CSS = (
    "&{position:relative;box-sizing:border-box;display:block;max-width:1160px;margin:22px auto 6px;padding:18px 22px 14px;" +
    "border-radius:20px;overflow:hidden;color:#fff;font-family:inherit;font-size:15px;line-height:1.45;text-align:left;" +
    "container-type:inline-size;border:1px solid rgba(255,45,85,.55);" +
    "background:radial-gradient(80% 70% at 15% 40%,rgba(207,0,61,.32) 0%,rgba(207,0,61,0) 70%)," +
    "radial-gradient(60% 60% at 100% 100%,rgba(255,30,80,.22) 0%,rgba(255,30,80,0) 70%),#07070a;" +
    "box-shadow:0 0 0 1px rgba(255,45,85,.2),0 0 26px rgba(255,20,70,.35),0 16px 40px rgba(0,0,0,.35)," +
    "inset 0 0 30px rgba(255,20,70,.12)}" +
    "& *{box-sizing:border-box}" +
    "& p,& ul,& li{margin:0;padding:0;font-family:inherit;line-height:1.4;letter-spacing:normal}" +
    "& .zn-in{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px}" +
    /* Η εικόνα της καμπάνιας, με σύνδεσμο */
    "& .zn-pic{flex:0 0 230px;display:block;line-height:0;border:0!important;text-decoration:none!important}" +
    "& .zn-pic img{display:block;width:100%;height:auto;border-radius:14px;border:0;" +
    "filter:drop-shadow(0 0 14px rgba(255,20,70,.35));animation:zn-glow 2.6s ease-in-out infinite}" +
    "@keyframes zn-glow{0%,100%{filter:drop-shadow(0 0 10px rgba(255,20,70,.3))}50%{filter:drop-shadow(0 0 22px rgba(255,20,70,.6))}}" +
    /* Κείμενο */
    "& .zn-main{flex:1 1 280px;min-width:0}" +
    "& .zn-tag{display:inline-block;margin:0 0 9px;padding:4px 11px;border-radius:999px;border:1px solid rgba(255,60,100,.7);" +
    "color:#fff;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;" +
    "box-shadow:0 0 10px rgba(255,20,70,.35),inset 0 0 8px rgba(255,20,70,.25)}" +
    "& .zn-tag span{color:#ff4d78;text-shadow:0 0 8px rgba(255,40,90,.8)}" +
    "& .zn-title{margin:0 0 10px;font-size:21px;font-weight:800;letter-spacing:-.015em;line-height:1.25;color:#fff;" +
    "text-shadow:0 0 12px rgba(255,40,90,.35)}" +
    "& .zn-title b{color:#ff4d78;font-weight:900;text-shadow:0 0 6px rgba(255,40,90,.9),0 0 18px rgba(255,20,70,.6)}" +
    "& .zn-list{display:flex;flex-wrap:wrap;gap:6px 16px;list-style:none}" +
    "& .zn-list li{position:relative;padding-left:20px;font-size:13.5px;font-weight:600;color:#f1f1f4;list-style:none}" +
    "& .zn-list li:before{content:'✓';position:absolute;left:0;top:0;font-weight:900;color:#ff4d78;" +
    "text-shadow:0 0 8px rgba(255,40,90,.9)}" +
    /* Κουμπί νέον */
    "& .zn-side{flex:1 1 100%;text-align:center}" +
    "& .zn-go{display:block;padding:15px 24px;border-radius:14px;font-size:17px;font-weight:800;line-height:1.2;" +
    "text-decoration:none!important;border:0!important;color:#fff!important;" +
    "background:linear-gradient(180deg,#ff2d5f 0%,#cf003d 100%);" +
    "box-shadow:0 0 0 1px rgba(255,120,150,.5),0 0 18px rgba(255,20,70,.6),0 10px 24px rgba(0,0,0,.4);" +
    "text-shadow:0 1px 0 rgba(0,0,0,.25);transition:transform .12s ease,box-shadow .12s ease;" +
    "animation:zn-nudge 1.2s ease-in-out 1.5s 2}" +
    "& .zn-go:hover{transform:translateY(-1px);box-shadow:0 0 0 1px rgba(255,150,170,.7),0 0 28px rgba(255,20,70,.8),0 12px 28px rgba(0,0,0,.45)}" +
    "& .zn-go:focus-visible{outline:3px solid #fff;outline-offset:3px}" +
    "@keyframes zn-nudge{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}" +
    /* Ψιλά γράμματα */
    "& .zn-fine{flex:1 1 100%;margin:2px 0 0;padding-top:10px;border-top:1px solid rgba(255,60,100,.28);" +
    "font-size:12px;color:#b9b9c4}" +
    "& .zn-px{position:absolute;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none}" +
    /* Στενό μπάνερ: εικόνα πάνω, κείμενο και κουμπί από κάτω, στη μέση */
    "@container (max-width:560px){" +
    "& .zn-in{flex-direction:column;align-items:stretch;gap:12px;text-align:center}" +
    "& .zn-pic{flex:none;align-self:center;width:100%;max-width:300px}" +
    "& .zn-main{flex:none}& .zn-title{font-size:19.5px}" +
    "& .zn-list{justify-content:center}" +
    "& .zn-fine{text-align:center}}" +
    "@media(max-width:640px){&{padding:16px 14px 12px}}" +
    "@media(prefers-reduced-motion:reduce){& .zn-pic img,& .zn-go{animation:none}}"
  ).split("&").join(".zn-ad.zn-ad");

  function build() {
    var box = document.createElement("aside");
    box.className = "zn-ad";
    box.setAttribute("aria-label", "Διαφήμιση: ZeniΘ Black Friday");
    box.innerHTML =
      '<div class="zn-in">' +
      '<a class="zn-pic" href="' + LINK + '" target="_blank" rel="sponsored noopener">' +
      '<img src="' + IMAGE + '" width="594" height="536" loading="lazy" decoding="async" ' +
      'alt="ZeniΘ Black Friday: κάνε συμβόλαιο online και κέρδισε prepaid κάρτα μέχρι 150€"></a>' +
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
