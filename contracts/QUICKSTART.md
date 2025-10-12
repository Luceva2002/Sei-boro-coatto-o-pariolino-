# ⚡ Quick Start - Deploy in 5 minuti

Guida rapida per deployare RomanPersonaNFT su Base.

## 🚀 Step 1: Setup (2 minuti)

```bash
# Entra nella cartella contracts
cd contracts

# Installa dipendenze
npm install

# Crea file .env
touch .env
```

Aggiungi al file `.env`:
```env
PRIVATE_KEY=tua_private_key_senza_0x
BASE_SEPOLIA_RPC=https://sepolia.base.org
```

## 🧪 Step 2: Deploy su Testnet (1 minuto)

```bash
# Compila
npm run compile

# Deploy su Base Sepolia
npm run deploy:baseSepolia
```

Copia l'indirizzo del contratto dall'output! 📋

## 🔄 Step 3: Aggiorna Frontend (1 minuto)

Modifica `src/lib/contract.ts`:

```typescript
export const CONTRACT_ADDRESS = '0xTUO_INDIRIZZO_QUI' as `0x${string}`;
```

## ✅ Step 4: Test (1 minuto)

```bash
# Torna alla root del progetto
cd ..

# Avvia l'app
npm run dev
```

Apri http://localhost:5173 e testa il mint! 🎉

---

## 🌐 Deploy su Mainnet

Quando sei pronto:

```bash
cd contracts
npm run deploy:base
```

⚠️ **Assicurati di avere ETH reali su Base!**

---

## 🆘 Problemi?

### Error: insufficient funds
Hai bisogno di ETH su Base Sepolia. Usa un faucet.

### Error: invalid private key
Assicurati che la private key nel `.env` sia senza il prefisso `0x`.

### Contratto non funziona
Verifica che `CONTRACT_ADDRESS` sia aggiornato in `src/lib/contract.ts`.

---

## 📚 Documentazione Completa

- [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) - Guida dettagliata
- [CONTRACT_INFO.md](../CONTRACT_INFO.md) - Informazioni sul contratto
- [README.md](./README.md) - Overview tecnico

---

Fatto! Ora vai a mintare NFT romani! 🏛️✨


