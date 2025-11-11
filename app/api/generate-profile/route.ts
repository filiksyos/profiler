import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export async function POST(req: NextRequest) {
  let text: string | undefined;
  
  try {
    const { name, searchResults } = await req.json();

    if (!name || !searchResults) {
      return NextResponse.json(
        { error: 'Name and search results are required' },
        { status: 400 }
      );
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Create OpenRouter client
    const openrouter = createOpenRouter({
      apiKey: openRouterApiKey,
    });

    // Prepare search context
    const context = searchResults
      .map((result: any, idx: number) => 
        `Source ${idx + 1}: ${result.title}\n${result.text || result.snippet || ''}`
      )
      .join('\n\n');

    // Generate profile using AI
    const result = await generateText({
      model: openrouter.chat('openai/gpt-4o'),
      prompt: `You are creating a fandom wiki-style profile page for a person named "${name}". Based on the following web search results, generate a detailed, engaging profile.

Search Results:
${context}

Create a comprehensive profile in JSON format with these sections:
- name: The person's full name
- summary: A brief 2-3 sentence summary
- info: Key biographical information (birth date, location, occupation, etc.) as key-value pairs
- personality: Detailed description of their personality traits and characteristics (markdown format)
- interests: Their hobbies, interests, and passions (markdown format)
- story: Their background story, journey, or biography (markdown format)
- abilities: Skills, talents, or notable abilities (markdown format)
- trivia: Interesting facts and trivia (markdown format as bullet points)
- imageUrl: A placeholder or relevant image URL if found

Make it engaging and wiki-like. Use markdown formatting for lists, bold text, and structure. Return ONLY valid JSON, no additional text.`,
    });

    text = result.text;

    // Extract JSON from response (might be wrapped in markdown code blocks)
    let jsonText = text.trim();
    
    // Remove markdown code block markers if present
    jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    
    // Try to find JSON object in the text if it's not pure JSON
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    // Parse the JSON response
    const profile = JSON.parse(jsonText);

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile generation error:', error);
    console.error('Response text:', text?.substring(0, 500));
    return NextResponse.json(
      { error: 'Failed to generate profile', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
