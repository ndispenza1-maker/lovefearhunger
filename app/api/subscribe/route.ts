import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, tier } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error('Missing Beehiiv credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Subscribe to Beehiiv
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'lovefearhunger',
          utm_medium: 'website',
          utm_campaign: tier === 'broad' ? 'broad_waitlist' : 'free_tier',
          referring_site: 'lovefearhunger.com',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: tier === 'broad' 
        ? 'You\'re on the waitlist. We\'ll be in touch soon.'
        : 'Welcome! Check your email for next steps.',
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
