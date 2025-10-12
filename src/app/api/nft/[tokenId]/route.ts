import { NextRequest, NextResponse } from 'next/server';

// Mappa le immagini per persona
function getPersonaData(tokenId: number): { name: string; image: string; description: string } {
  const personas = [
    {
      name: 'Boro',
      image: '/Boro.png',
      description: 'Boro autentico: diretto, verace e senza filtri. Vive Roma come un campo da calcetto.'
    },
    {
      name: 'Pariolino',
      image: '/Pariolino.png',
      description: 'Pariolino di razza: estetica curata, Spritz sempre pieno e convinzione che la vita inizi a Ponte Milvio.'
    },
    {
      name: 'Coatto',
      image: '/Coatto.png',
      description: 'Coatto leggendario: un concentrato de romanita e rumore. Parla col cuore.'
    }
  ];
  
  const index = (tokenId - 1) % 3;
  return personas[index];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  try {
    const tokenId = parseInt(params.tokenId);
    
    if (isNaN(tokenId) || tokenId < 1) {
      return NextResponse.json(
        { error: 'Token ID non valido' },
        { status: 400 }
      );
    }

    const persona = getPersonaData(tokenId);
    
    // Costruisci l'URL assoluto per l'immagine
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || request.nextUrl.host;
    const baseUrl = `${protocol}://${host}`;
    const imageUrl = `${baseUrl}${persona.image}`;

    // Metadati nel formato standard OpenSea/NFT
    const metadata = {
      name: `Roman Persona #${tokenId} - ${persona.name}`,
      description: persona.description,
      image: imageUrl,
      external_url: baseUrl,
      attributes: [
        {
          trait_type: 'Persona',
          value: persona.name
        },
        {
          trait_type: 'Type',
          value: 'Roman Character'
        },
        {
          trait_type: 'Token ID',
          display_type: 'number',
          value: tokenId
        }
      ]
    };

    return NextResponse.json(metadata, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return NextResponse.json(
      { error: 'Errore nella generazione dei metadati' },
      { status: 500 }
    );
  }
}

