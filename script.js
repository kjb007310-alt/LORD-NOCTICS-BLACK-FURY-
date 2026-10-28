
const form = document.getElementById("reportForm");
const phoneInput = document.getElementById("phone");
const authorInput = document.getElementById("author");
const reasonInput = document.getElementById("reason");
const detailsInput = document.getElementById("details");
const reportOutput = document.getElementById("reportOutput");
const statusText = document.getElementById("status");

// Vérifier et préparer le texte du signalement
function prepareReport() {
  const phone = phoneInput.value.trim().replace(/[\s().-]/g, "");
  const author = authorInput.value.trim() || "Non précisé";
  const reason = reasonInput.value;
  const details =
    detailsInput.value.trim() ||
    "Aucun détail supplémentaire fourni.";

  // Vérifier le format du numéro
  if (!/^\+?[0-9]{7,15}$/.test(phone)) {
    statusText.textContent =
      "Vérifie le numéro et son indicatif de pays.";
    phoneInput.focus();
    return false;
  }

  if (!reason) {
    statusText.textContent = "Choisis un motif de signalement.";
    reasonInput.focus();
    return false;
  }

  const date = new Date().toLocaleDateString("fr-FR");

  reportOutput.value =
`Objet : Signalement à examiner — LORD NOCTICS BLACK FURY

Date : ${date}
Numéro concerné : ${phone}
Auteur du signalement : ${author}
Motif déclaré : ${reason}

Description :
${details}

Merci d'examiner ces informations conformément à vos règles.
Les éléments ci-dessus sont fournis pour vérification.`;

  statusText.textContent =
    "Texte préparé. Vérifie les informations avant de l'envoyer.";

  return true;
}

// Préparer le texte au clic sur le bouton principal
form.addEventListener("submit", function (event) {
  event.preventDefault();
  prepareReport();
});

// Copier le texte préparé
document.getElementById("copyBtn").addEventListener("click", async function () {
  if (!reportOutput.value && !prepareReport()) {
    return;
  }

  if (!reportOutput.value) return;

  try {
    await navigator.clipboard.writeText(reportOutput.value);
    statusText.textContent = "Texte copié avec succès.";
  } catch (error) {
    reportOutput.focus();
    reportOutput.select();
    statusText.textContent =
      "Sélectionne le texte et copie-le depuis le menu du téléphone.";
  }
});

// Ouvrir l'application e-mail avec le texte préparé
document.getElementById("emailBtn").addEventListener("click", function () {
  if (!reportOutput.value && !prepareReport()) {
    return;
  }

  if (!reportOutput.value) return;

  const subject = encodeURIComponent(
    "Signalement à examiner — LORD NOCTICS BLACK FURY"
  );

  const body = encodeURIComponent(reportOutput.value);

  window.location.href =
    `mailto:?subject=${subject}&body=${body}`;
});
