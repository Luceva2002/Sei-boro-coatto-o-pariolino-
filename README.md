# 🏛️ NFT Urbe Roma

App interattiva per scoprire il tuo archetipo romano (Boro, Pariolino o Coatto) e mintare un NFT personalizzato su blockchain.

## ✨ Features

- 🎯 **Quiz interattivo** per scoprire il tuo tipo di romano
- 🎨 **NFT personalizzati** generati dinamicamente
- 💳 **Multi-wallet support**: MetaMask, WalletConnect, Coinbase Wallet
- 📱 **Mobile-friendly**: funziona su desktop e smartphone
- 🔗 **Farcaster Frame**: condivisibile direttamente su Farcaster
- 🚀 **Base MiniApp**: lanciabile come MiniApp nativa su Base
- ⛓️ **Arbitrum Sepolia**: smart contract su testnet

## 🚀 Quick Start

### Requisiti
- Node 20+ 
- Wallet (MetaMask, Coinbase Wallet, etc.)
- ETH su Arbitrum Sepolia ([faucet](https://faucet.quicknode.com/arbitrum/sepolia))

### Installazione

```bash
# Clona il repository
git clone <repo-url>
cd NFTUrbeApp

# Installa le dipendenze
npm install

# Crea il file .env.local
cp .env.example .env.local
# Modifica .env.local con i tuoi valori

# Avvia il dev server
npm run dev
```

Apri `http://localhost:5173`

## 🔧 Configurazione

Crea un file `.env.local` nella root del progetto:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e
NEXT_PUBLIC_APP_URL=http://localhost:5173
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=ottieni-project-id-gratuito
```

⚠️ **Importante**: Per usare wallet mobili, devi ottenere un **Project ID gratuito** da WalletConnect.
Senza questo, vedrai errori 403 in console. Leggi la guida: [WALLETCONNECT_SETUP.md](./WALLETCONNECT_SETUP.md)

## 📦 Deploy

### Farcaster Frame
Per il deploy classico su Vercel e Farcaster Frame: [DEPLOY.md](./DEPLOY.md)

### Base MiniApp 🆕
Per deployare come MiniApp su Base Build: [MINIAPP_SETUP.md](./MINIAPP_SETUP.md)

**Quick Deploy su Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 🛠️ Struttura del Progetto

```
src/
├── app/
│   ├── api/frame/          # API per Farcaster Frame
│   ├── frame/              # Pagina dedicata al Frame
│   ├── layout.tsx          # Layout principale con metadata
│   └── page.tsx            # Homepage con quiz
├── components/
│   ├── mint-button.tsx     # Pulsante mint con wagmi
│   ├── wallet-button.tsx   # Connessione multi-wallet
│   ├── steps/              # Step del quiz
│   └── ui/                 # Componenti UI
├── lib/
│   ├── contract.ts         # Config smart contract
│   ├── nft.ts              # Generazione SVG NFT
│   └── persona.ts          # Logica quiz e archetypes
└── styles/
    └── globals.css         # Stili globali
```

## 🎮 Come Funziona

1. **Quiz**: L'utente risponde a 5 domande su Roma, stile di vita e preferenze
2. **Archetipo**: Il sistema calcola il punteggio e determina l'archetipo (Boro/Pariolino/Coatto)
3. **Preview**: Viene generata un'anteprima SVG del NFT personalizzato
4. **Mint**: L'utente connette il wallet e minta il NFT su Arbitrum Sepolia
5. **Share**: L'app può essere condivisa su Farcaster come Frame o lanciata come MiniApp su Base

## 🔗 Link Utili

### Guide Setup
- [Setup WalletConnect](./WALLETCONNECT_SETUP.md) - Come ottenere il Project ID gratuito
- [Setup MiniApp](./MINIAPP_SETUP.md) - Deploy come MiniApp su Base Build

### Documentazione Esterna
- [Documentazione Farcaster Frames](https://docs.farcaster.xyz/developers/frames/spec)
- [Farcaster MiniApp Docs](https://docs.farcaster.xyz/developers/miniapps)
- [Base Build](https://www.base.dev/)
- [Base Build Preview Tool](https://www.base.dev/preview)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
- [Arbitrum Sepolia Explorer](https://sepolia.arbiscan.io/)
- [Vercel Documentation](https://vercel.com/docs)

## 📝 Smart Contract

Il contratto NFT è deployato su Arbitrum Sepolia e implementa:
- Mint di NFT con metadata personalizzati
- Storage di `pastaType` e `sauce` per ogni token
- Standard ERC-721

Indirizzo: `0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e`

## 🤝 Contributing

Contributi benvenuti! Apri una PR o una issue.

## 📄 License

MIT



