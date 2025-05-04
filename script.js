async function correctEmailWithAI(text) {
    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini", // Ensure the model parameter is included
            messages: [
                { "role": "user", "content": `Please correct the following email: "${text}"` }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error in API call: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.choices[0].message.content; // Access the corrected text
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
