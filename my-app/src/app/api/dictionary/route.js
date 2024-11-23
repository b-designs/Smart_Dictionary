// src/app/api/dictionary/route.js
import fs from 'fs';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');

    if (!word) {
        return new Response(JSON.stringify({ error: 'Word is required' }), { status: 400 });
    }

    const medicalApiKey = process.env.MEDICAL_API_KEY;
    const medicalURL = `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=${medicalApiKey}`;

    const spanishApiKey = process.env.SPANISH_API_KEY;
    const spanishURL = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${spanishApiKey}`;

    try {
        // Fetch both English and Spanish definitions in parallel
        const [medicalResponse, spanishResponse] = await Promise.all([
            fetch(medicalURL),
            fetch(spanishURL),
        ]);

        const medicalData = await medicalResponse.json()
        const spanishData = await spanishResponse.json()

        if (medicalResponse.ok && spanishResponse.ok) {

            // Combine data
            const combinedData = {
                english: medicalData,
                spanish: spanishData,
            };

            // Save both datasets locally
            const filePath = path.join(process.cwd(), 'src', 'data', `${word}.json`);
            fs.writeFileSync(filePath, JSON.stringify(combinedData, null, 2));

            return new Response(
                JSON.stringify(combinedData), 
                { status: 200 }); // Return both datasets
        } else {
            return new Response(
                JSON.stringify({ error: 'Error fetching dictionary data' }), 
                { status: 400 });
        }
        
    } catch (error) {
        console.error('Error fetching dictionary data:', error);
        return new Response(
            JSON.stringify({ error: 'Server error, please try again later' }), 
            { status: 500 });
    }
}