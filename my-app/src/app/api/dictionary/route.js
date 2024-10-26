// src/app/api/dictionary/route.js
import fs from 'fs';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');

    if (!word) {
        return new Response(JSON.stringify({ error: 'Word is required' }), { status: 400 });
    }

    const apiKey = process.env.SPANISH_API_KEY; // Use the correct env variable
    const url = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Saves the file locally
            const filePath = path.join(process.cwd(), 'src', 'data', `${word}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            return new Response(JSON.stringify(data), { status: 200 }); // Request is successfully received
        }
        else {
            return new Response(JSON.stringify({ error: 'Error fetching dictionary data' }), { status: 400 });
        }
        
    } catch (error) {
        console.error('Error fetching dictionary data:', error);
        return new Response(JSON.stringify({ error: 'Server error, please try again later' }), { status: 500 });
    }
}