import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
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

    // Create OpenRouter client using OpenAI SDK
    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: openRouterApiKey,
    });

    // Prepare search context
    const context = searchResults
      .map((result: any, idx: number) => 
        `Source ${idx + 1}: ${result.title}\n${result.text || result.snippet || ''}`
      )
      .join('\n\n');

    // Generate profile using AI
    const { text } = await generateText({
      model: openrouter('openai/gpt-4o'),
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

    // Parse the AI response
    const profile = JSON.parse(text);

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate profile' },
      { status: 500 }
    );
  }
}
