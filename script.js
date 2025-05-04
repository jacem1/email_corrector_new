// Simule une correction d'email (orthographe, grammaire, politesse)
function correctEmail(text) {
    // Exemple de corrections simples (à remplacer par une vraie API ou IA pour production)
    let corrected = text;
    corrected = corrected.replace(/\bim\b/gi, "I'm");
    corrected = corrected.replace(/\bi am\b/gi, "I am");
    corrected = corrected.replace(/\bpls\b/gi, "please");
    corrected = corrected.replace(/\bthx\b/gi, "thanks");
    corrected = corrected.replace(/\bregards\b/gi, "Regards");
    corrected = corrected.replace(/\bi hope this email finds you well\b/gi, "I hope this email finds you well.");
    // Correction de double espaces
    corrected = corrected.replace(/  +/g, ' ');
    // Correction de la majuscule en début de phrase
    corrected = corrected.replace(/(^|[.!?]\s+)([a-z])/g, (m, sep, char) => sep + char.toUpperCase());
    return corrected.trim();
}

document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('emailInput').value;
    const corrected = correctEmail(input);
    document.getElementById('correctedEmail').textContent = corrected;
    document.getElementById('resultSection').style.display = 'block';
});

function copyCorrectedEmail() {
    const text = document.getElementById('correctedEmail').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Corrected email copied to clipboard!');
    });
} 