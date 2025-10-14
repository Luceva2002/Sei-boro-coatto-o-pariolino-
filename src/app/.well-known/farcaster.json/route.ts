export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nfturbe.app';

  const manifest = {
    accountAssociation: {
      "header": "eyJmaWQiOjEzNzQ5MjIsInR5cGUiOiJhdXRoIiwia2V5IjoiMHhFNDJkNzUyODI1NjVCYUU3QTdhYkFCOWVBRmNlODU4MDI0RjU1MDljIn0",
      "payload": "eyJkb21haW4iOiJib3JvLWNvYXR0by1wYXJpb2xpbm8udmVyY2VsLmFwcCJ9",
      "signature": "OmKUUhGPY6TOnJUrcMbcl1NEz8Bb1EetMgUf6fioYEM18c2H0Ps7trJnq+HBd6QhlWfs3EVSWUyOtmNpyeDF+hs="
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


