// app/api/generate-video/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(`Attempting to connect to backend at ${BACKEND_URL}/generate-content/`);

    try {
      const response = await axios.post(`${BACKEND_URL}/generate-content/`, {
        prompt: body.prompt,
        genre: body.genre,
        iterations: body.iterations,
        backgroundType: body.backgroundType,
        musicType: body.musicType,
        voiceType: body.voiceType,
        subtitleColor: body.subtitleColor,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30 * 60 * 1000, // 30 minutes
      });

      return NextResponse.json(response.data);

    } catch (error: any) {
      console.error('Backend fetch error:', error);

      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          {
            error: 'Request timed out after 30 minutes. Video generation is taking too long.',
          },
          { status: 504 }
        );
      }

      return NextResponse.json(
        {
          error: 'Failed to connect to video generation service',
          details: error.message || 'Unknown error',
        },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        error: 'Error processing request',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
