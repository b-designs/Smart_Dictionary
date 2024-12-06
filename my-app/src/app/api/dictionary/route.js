// src/app/api/dictionary/route.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { v2 as Translate } from '@google-cloud/translate';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');

    if (!word) {
        return new Response(JSON.stringify({ error: 'Word is required' }), { status: 400 });
    }

    const medicalApiKey = process.env.MEDICAL_API_KEY;
    const medicalURL = `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=${medicalApiKey}`;

    try {
        // Fetch English definitions
        const medicalResponse = await fetch(medicalURL);
        const medicalData = await medicalResponse.json()

        if (!medicalResponse.ok) {
            const errorText = await medicalResponse.text();
            console.error('Error fetching medical dictionary data:', medicalResponse.status, errorText);
            return new Response(
              JSON.stringify({ error: `Failed to fetch medical data. Status: ${medicalResponse.status}` }),
              { status: medicalResponse.status }
            );
          }
        
        // Initialize Google Cloud Translate client
        const translate = new Translate.Translate();

        // Extract and translate the headword
        const englishHeadword = medicalData[0]?.hwi?.hw || word;
        const [spanishHeadword] = await translate.translate(englishHeadword, 'es');

        // Extract and translate all definitions
        const englishDefinitions = medicalData[0]?.shortdef || [];
        const spanishDefinitions = await Promise.all(
        englishDefinitions.map(async (def) => {
            const [translatedDef] = await translate.translate(def, 'es');
            return translatedDef;
        })
        );

        // Combine data
        const combinedData = {
            english: medicalData,
            spanish: {
                headword: spanishHeadword,
                definitions: spanishDefinitions,
            },
        };   

        // Save combined data locally
        const filePath = path.join(process.cwd(), 'src', 'data', `${word}.json`);
        fs.writeFileSync(filePath, JSON.stringify(combinedData, null, 2));

        return new Response(JSON.stringify(combinedData), { status: 200 });
    } 
    catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Server error, please try again later' }), {
            status: 500,
        });
    }
}