const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { text } = JSON.parse(event.body);
    const apiKey = process.env.API_KEY; // Make sure to set this in your Netlify environment variables

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
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: errorData.error.message })
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ correctedText: data.choices[0].message.content })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
