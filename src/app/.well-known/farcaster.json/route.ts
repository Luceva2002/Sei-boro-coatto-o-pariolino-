export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nfturbe.app';

  const manifest = {
    accountAssociation: {
      "header": "eyJmaWQiOjEzNzQ5MjIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg5MEQ1N0M5ODkxODQ5YTFlMWMzMTY1NDY0MTljNzhCODYyMDQ1REEwIn0",
      "payload": "eyJkb21haW4iOiJuZnQtdXJiZS52ZXJjZWwuYXBwIn0",
      "signature": "MHg5ZDhmOGFkMDc5NjRmOTRiMWJlZTE1NDcyYjNmMzQ3NjJhMjgzZWFiMTllZTkzZWZkMmE4YjM2NzdkZmU2YTlkNGU1MWNkYmNiZWE0MzM3ZDQ3OTliNTIyMGViZThkMTNkN2VjY2Y2YWJhNGQxMzlmNWIyNmI5ZjA5ZDViZDk4YTFj"
     },
    baseBuilder: {
      allowedAddresses: (process.env.BASE_ALLOWED_ADDRESSES || '').split(',').filter(Boolean)
    },
    miniapp: {
      version: '1',
      name: process.env.MINIAPP_NAME || 'NFT Urbe Roma',
      homeUrl: baseUrl,
      iconUrl: `${baseUrl}/metamask.png`,
      splashImageUrl: `${baseUrl}/sfondo1.png`,
      splashBackgroundColor: '#000000',
      webhookUrl: process.env.MINIAPP_WEBHOOK_URL || undefined,
      subtitle: 'Scopri che romano sei',
      description: 'Quiz divertente per scoprire il tuo archetipo romano e mintare il tuo NFT.',
      screenshotUrls: [
        `${baseUrl}/sfondo.png`
      ],
      primaryCategory: 'social',
      tags: ['nft', 'roma', 'miniapp', 'baseapp'],
      heroImageUrl: `${baseUrl}/sfondo.png`,
      tagline: 'Play instantly',
      ogTitle: 'NFT Urbe Roma',
      ogDescription: 'Scopri il tuo archetipo romano e mintalo come NFT',
      ogImageUrl: `${baseUrl}/sfondo.png`,
      noindex: true
    }
  };

  return Response.json(manifest);
}


