import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const exaApiKey = process.env.EXA_API_KEY;

    if (!exaApiKey) {
      return NextResponse.json(
        { error: 'EXA_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Search with Exa API
    const response = await axios.post(
      'https://api.exa.ai/search',
      {
        query: `${query} personality interests hobbies background story biography`,
        numResults: 10,
        contents: {
          text: { maxCharacters: 1000 },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': exaApiKey,
        },
      }
    );

    return NextResponse.json({
      results: response.data.results || [],
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
      );
  }
}
