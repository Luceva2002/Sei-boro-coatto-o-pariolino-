# 🏛️ Boro, Coatto o Pariolino?

**Scopri il tuo vero archetipo romano e mintalo come NFT!**

Un'app interattiva che ti guida attraverso un quiz divertente per scoprire se sei un **Boro autentico**, un **Pariolino de razza** o un **Coatto leggendario**. Una volta scoperto chi sei, minta il tuo personaggio come NFT unico sulla blockchain!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

---

## ✨ Features

🎯 **Quiz Interattivo Romano**  
5 domande mirate su zona, casa, capelli, cibo per svelare la tua vera essenza romana

🎨 **NFT Personalizzati Pixel Art**  
Ogni archetipo ha la sua immagine pixel art unica: Boro, Pariolino o Coatto

💳 **Multi-Wallet Support**  
MetaMask, WalletConnect, Coinbase Wallet - scegli il tuo preferito

📱 **Mobile-First Design**  
Ottimizzato per smartphone e desktop

🔗 **Farcaster Frame Ready**  
Condividi e gioca direttamente su Farcaster

⛓️ **Arbitrum Sepolia**  
Smart contract su testnet veloce ed economica

🖼️ **Immagini NFT nei Wallet**  
Le tue immagini pixel art appaiono automaticamente su MetaMask e OpenSea

---

## 🚀 Quick Start

### Prerequisiti

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Wallet** (MetaMask, Coinbase Wallet, etc.)
- **ETH su Arbitrum Sepolia** ([Faucet](https://faucet.triangleplatform.com/arbitrum/sepolia))

### Installazione

```bash
# Clona il repository
git clone <repo-url>
cd NFTUrbeApp

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173) e inizia il quiz! 🎉

---

## 🔧 Configurazione

### Setup Base (Obbligatorio)

Crea un file `.env` nella root del progetto:

```env
# URL pubblico della tua app (per produzione)
NEXT_PUBLIC_BASE_URL=https://tuodominio.vercel.app

# Indirizzo del contratto NFT
NEXT_PUBLIC_CONTRACT_ADDRESS=0xfd40710B7D9ef3351Ea3891aA1Aa22BAEF9072B3

# WalletConnect Project ID (opzionale ma consigliato)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=ottieni-project-id-gratuito
```

### Setup Immagini NFT (Per Owner del Contratto)

Se sei l'owner del contratto e vuoi che le immagini appaiano nei wallet:

```bash
# Aggiungi la tua private key al .env
PRIVATE_KEY=tua_chiave_privata_da_metamask

# Esegui lo script di configurazione (solo una volta)
npm run setup-contract
```

**📖 Leggi la guida completa:** [Come configurare le immagini NFT](./scripts/README_SETUP.md)

---

## 🎮 Come Funziona

### 1. **Rispondi al Quiz** 📝
5 domande rapide su:
- De che zona sei? (Centro, Nord, Est, Sud...)
- Casa tua? (Attico, palazzina, palazzoni...)
- Taglio de capelli? (Doppio taglio, ciuffo, er boccia, codino alto, piega liscia...)
- Top magnata? (Cucina romana, sushi, kebab, pizza ar taglio...)

### 2. **Scopri il Tuo Archetipo** 🎭

Il sistema calcola il punteggio e determina chi sei:

**🟤 BORO**  
Diretto, verace e senza filtri. Vivi Roma come un campo da calcetto.

**🔵 PARIOLINO**  
Estetica curata, Spritz sempre pieno. La vita inizia a Ponte Milvio.

**🔴 COATTO**  
Concentrato de romanità e rumore. Parli col cuore.

**🎨 MIX**  
Combinazioni uniche: boro-pariolino, boro-coatto, pariolino-coatto

### 3. **Minta il Tuo NFT** 🎨

- Vedi l'anteprima della tua immagine pixel art
- Connetti il wallet (MetaMask, WalletConnect, etc.)
- Clicca "Minta il tuo NFT"
- Firma la transazione
- Il tuo NFT appare nel wallet in pochi minuti!

### 4. **Mostra al Mondo** 🌍

- Condividi su Farcaster
- Mostra l'NFT su OpenSea
- Sfoggia il tuo archetipo romano!

---

## 📦 Deploy su Vercel

### Deploy Automatico

1. Clicca sul bottone "Deploy with Vercel" in cima
2. Collega il tuo repository GitHub
3. Configura le variabili d'ambiente:
   - `NEXT_PUBLIC_BASE_URL` → Il tuo dominio Vercel (es: `https://tuoapp.vercel.app`)
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` → `0xfd40710B7D9ef3351Ea3891aA1Aa22BAEF9072B3`
4. Deploy! 🚀

### Deploy Manuale

```bash
# Build di produzione
npm run build

# Test in locale
npm start

# Deploy su Vercel
vercel deploy --prod
```

**📖 Guida completa Vercel:** [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) (se esiste)

---

## 🛠️ Struttura del Progetto

```
📁 NFTUrbeApp/
├── 📁 public/
│   ├── Boro.png           # Immagine NFT Boro
│   ├── Pariolino.png      # Immagine NFT Pariolino
│   ├── Coatto.png         # Immagine NFT Coatto
│   └── metamask.png       # Logo MetaMask
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── frame/     # API Farcaster Frame
│   │   │   ├── metadata/  # API Metadati NFT
│   │   │   └── nft/       # API NFT (alternativa)
│   │   ├── frame/         # Pagina Frame
│   │   ├── layout.tsx     # Layout con metadata
│   │   └── page.tsx       # Homepage quiz
│   ├── 📁 components/
│   │   ├── mint-button.tsx      # Mint NFT
│   │   ├── wallet-button.tsx    # Connessione wallet
│   │   ├── step-shell.tsx       # Shell step quiz
│   │   ├── 📁 steps/
│   │   │   ├── StepHero.tsx     # Intro
│   │   │   ├── StepQuestion.tsx # Domande
│   │   │   └── StepMint.tsx     # Mint finale
│   │   └── 📁 ui/               # Componenti UI
│   ├── 📁 lib/
│   │   ├── contract.ts    # Config smart contract
│   │   ├── persona.ts     # Logica quiz e punteggi
│   │   └── nft.ts         # Utils NFT
│   └── 📁 styles/
│       └── globals.css    # Stili globali
├── 📁 contracts/
│   └── RomanPersonaNFT.sol      # Smart contract
├── 📁 scripts/
│   └── setup-contract.js        # Script setup immagini
└── package.json
```

---

## 📊 Smart Contract

### Dettagli Contratto

- **Network:** Arbitrum Sepolia (Testnet)
- **Address:** `0xfd40710B7D9ef3351Ea3891aA1Aa22BAEF9072B3`
- **Standard:** ERC-721
- **Nome:** Roman Persona NFT
- **Symbol:** URBE

### Funzioni Principali

```solidity
// Mint un nuovo NFT (chiunque può chiamarla)
function mint() external returns (uint256 tokenId)

// Ottieni i metadati on-chain (owner)
function setBaseImageURI(string memory uri) external

// Configura nome e descrizione (owner)
function setNamePrefix(string memory p) external
function setDescription(string memory d) external
```

### Esplorare il Contratto

🔍 [Vedi su Arbiscan](https://sepolia.arbiscan.io/address/0xfd40710B7D9ef3351Ea3891aA1Aa22BAEF9072B3)

---

## 🎨 Archetipi e Punteggi

Il sistema usa un algoritmo di scoring per determinare l'archetipo:

### Pesi per Domanda

Ogni risposta dà punti ai 3 archetipi (boro, pariolino, coatto).  
Il sistema è bilanciato per dare risultati vari e interessanti.

**Esempio:**
- **Roma Centro** → boro: 2, pariolino: 1, coatto: 0
- **Palazzina anni '70** → boro: 2, pariolino: 0, coatto: 0
- **Doppio taglio** → boro: 2, pariolino: 0, coatto: 0
- **Pizza ar taglio** → boro: 2, pariolino: 0, coatto: 0

**Totale:** 8 punti boro → Risultato = **BORO PURO** 🟤

### Mix

Se due archetipi hanno punteggi vicini (differenza ≤ 1), il risultato è un **mix**:
- boro-pariolino mix
- boro-coatto mix  
- pariolino-coatto mix

---

## 🧪 Testing

### Test in Locale

```bash
npm run dev
```

1. Apri http://localhost:5173
2. Completa il quiz
3. Connetti wallet (usa MetaMask in modalità testnet)
4. Minta un NFT di test su Arbitrum Sepolia

### Test API Metadati

```bash
# Testa l'endpoint metadati
curl http://localhost:5173/api/nft/1
curl http://localhost:5173/api/nft/2
curl http://localhost:5173/api/nft/3
```

Dovresti vedere JSON con nome, descrizione, immagine e attributi.

---

## 🐛 Troubleshooting

### Le immagini NFT non appaiono su MetaMask

**Problema:** Gli NFT mostrano solo "A" invece dell'immagine.

**Soluzione:**
1. Controlla che il contratto sia configurato con `baseImageURI`
2. Esegui `npm run setup-contract` (se sei l'owner)
3. Aspetta 5-10 minuti per la cache di MetaMask
4. Prova a disconnettere e riconnettere il wallet

**📖 Guida completa:** [scripts/README_SETUP.md](./scripts/README_SETUP.md)

### Errore "Connect Wallet First"

**Problema:** Il bottone mint non funziona.

**Soluzione:**
1. Assicurati di essere su Arbitrum Sepolia
2. Clicca "Connetti Wallet" in basso a destra
3. Approva la connessione su MetaMask

### Errore "Insufficient Funds"

**Problema:** Non hai abbastanza ETH per il gas.

**Soluzione:**
1. Vai su un faucet Arbitrum Sepolia
2. Richiedi ETH di test (gratis)
3. Riprova a mintare

**Faucet consigliati:**
- [Triangle Faucet](https://faucet.triangleplatform.com/arbitrum/sepolia)
- [QuickNode Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

### Wallet non si connette

**Problema:** Errori 403 o timeout.

**Soluzione:**
1. Configura `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` nel `.env`
2. Ottieni un Project ID gratuito su [WalletConnect Cloud](https://cloud.walletconnect.com/)
3. Riavvia il dev server

---

## 🔗 Link Utili

### Documentazione
- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh/)
- [Farcaster Frame Spec](https://docs.farcaster.xyz/developers/frames/spec)
- [Arbitrum Docs](https://docs.arbitrum.io/)

### Tools
- [Arbitrum Sepolia Explorer](https://sepolia.arbiscan.io/)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [OpenSea Testnet](https://testnets.opensea.io/)

### Faucets
- [Triangle Faucet](https://faucet.triangleplatform.com/arbitrum/sepolia)
- [QuickNode Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

---

## 🤝 Contributing

Contributi benvenuti! Per contribuire:

1. Fork il repository
2. Crea un branch (`git checkout -b feature/amazing-feature`)
3. Commit le modifiche (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

---

## 📄 License

MIT License - Vedi [LICENSE](./LICENSE) per dettagli

---

## 👥 Credits

Creato con ❤️ per la comunità romana.

**Tech Stack:**
- [Next.js 14](https://nextjs.org/) - React Framework
- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [Viem](https://viem.sh/) - TypeScript Ethereum Interface
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Arbitrum](https://arbitrum.io/) - Layer 2 Blockchain
- [Farcaster](https://www.farcaster.xyz/) - Decentralized Social

---

## 📞 Support

Problemi o domande?
- 🐛 [Apri una Issue](../../issues)
- 💬 Chiedi nella community

---

**Fatto con 🍕 a Roma**

*Boro, coatto o pariolino? Scoprilo ora!*
