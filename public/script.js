async function correctEmailWithAI(text) {
    const response = await fetch('/correctEmail', { // Update the URL to match your Express route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error in API call: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.correctedText; // Access the corrected text
}

document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const input = document.getElementById('emailInput').value;
    
    try {
        const corrected = await correctEmailWithAI(input);
        document.getElementById('correctedEmail').textContent = corrected;
        document.getElementById('resultSection').style.display = 'block';
    } catch (error) {
        console.error('Error correcting email:', error);
        alert('Failed to correct email. Please try again later.');
    }
});

function copyCorrectedEmail() {
    const text = document.getElementById('correctedEmail').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Corrected email copied to clipboard!');
    });
}
