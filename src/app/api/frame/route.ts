import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;
    const buttonIndex = untrustedData?.buttonIndex || 1;

    // Base URL dell'app
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nfturbe.app';

    // Step 1: Hero/Start
    if (buttonIndex === 1) {
      return new NextResponse(
        `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/frame/image?step=nome" />
    <meta property="fc:frame:button:1" content="Inizia il quiz" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
  </head>
</html>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Step 2: Risultato finale con mint
    if (buttonIndex === 2) {
      return new NextResponse(
        `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/frame/image?step=result" />
    <meta property="fc:frame:button:1" content="🎨 Mint NFT" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${baseUrl}" />
    <meta property="fc:frame:button:2" content="🔄 Ricomincia" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
  </head>
</html>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Default: mostra l'immagine hero
    return new NextResponse(
      `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/frame/image?step=hero" />
    <meta property="fc:frame:button:1" content="🚀 Inizia" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
  </head>
</html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nfturbe.app';
  
  return new NextResponse(
    `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/frame/image?step=hero" />
    <meta property="fc:frame:button:1" content="🚀 Scopri il tuo archetipo romano" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
    <meta property="og:title" content="NFT Urbe Roma" />
    <meta property="og:description" content="Scopri che romano sei e minta il tuo NFT!" />
    <meta property="og:image" content="${baseUrl}/sfondo.png" />
  </head>
  <body>
    <h1>NFT Urbe Roma - Farcaster Frame</h1>
    <p>Usa questo frame su Farcaster per mintare il tuo NFT romano!</p>
  </body>
</html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}

