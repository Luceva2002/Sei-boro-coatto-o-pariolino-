import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const step = searchParams.get('step') || 'hero';

  const backgrounds: Record<string, string> = {
    hero: '#1a1a2e',
    nome: '#16213e',
    result: '#0f3460',
  };

  const titles: Record<string, string> = {
    hero: '🏛️ NFT Urbe Roma',
    nome: '📝 Come te chiami?',
    result: '🎨 Il tuo NFT è pronto!',
  };

  const subtitles: Record<string, string> = {
    hero: 'Scopri che romano sei e minta il tuo NFT personale',
    nome: 'Completa il quiz sul sito per scoprire il tuo archetipo',
    result: 'Clicca "Mint NFT" per completare la creazione',
  };

  const bg = backgrounds[step] || backgrounds.hero;
  const title = titles[step] || titles.hero;
  const subtitle = subtitles[step] || subtitles.hero;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bg,
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '30px',
              textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '900px',
              lineHeight: 1.4,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {subtitle}
          </p>
          {step === 'hero' && (
            <div
              style={{
                display: 'flex',
                marginTop: '40px',
                fontSize: '48px',
                gap: '30px',
              }}
            >
              🏛️ 🍝 ⚡
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

