const fetch = require('node-fetch');

const correctEmailWithAI = async (text) => {
    const apiKey = process.env.API_KEY; // Ensure this is set in your environment variables
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { "role": "user", "content": `Please correct the following email: "${text}"` }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }

        const data = await response.json();
        return data.choices[0].message.content; // Return the corrected text
    } catch (error) {
        throw new Error('Internal Server Error');
    }
};

module.exports = correctEmailWithAI; // Export the function
