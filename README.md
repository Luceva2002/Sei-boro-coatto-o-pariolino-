## Pasta Maker NFT

Gioco semplice per creare pasta (rigatoni, spaghetti, fusilli) con sughi (carbonara, gricia, cacio e pepe, amatriciana) e mintare un NFT con anteprima SVG on-chain.

### Requisiti
- Node 20+
- Wallet (es. MetaMask)

### Setup
1. Copia `.env.local`:
   - `NEXT_PUBLIC_WC_PROJECT_ID=...` (WalletConnect Project ID)
   - `NEXT_PUBLIC_CONTRACT_ADDRESS=0x...` (contratto su Sepolia)

2. Installa:
```bash
npm install
```

3. Avvia dev server:
```bash
npm run dev
```

Apri `http://localhost:5173`.

### Contratto richiesto
Il frontend chiama `mintWithURI(string tokenURI, bytes seed)`. Fornisci un indirizzo contratto compatibile su Sepolia in `NEXT_PUBLIC_CONTRACT_ADDRESS`.

### Dove modificare
- UI gioco: `src/app/page.tsx`
- Provider web3: `src/components/Providers.tsx`
- Generazione NFT (SVG+metadata): `src/lib/nft.ts`
- Config contratto: `src/lib/contract.ts`



