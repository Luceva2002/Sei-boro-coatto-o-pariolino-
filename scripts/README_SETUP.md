# 🖼️ Setup Immagini NFT - Guida Completa

## Problema

Gli NFT mintati mostrano solo una lettera "A" su MetaMask invece dell'immagine pixel art del personaggio (Boro, Pariolino o Coatto).

**Perché?** Il contratto smart contract non sa ancora dove trovare le immagini.

---

## Soluzione Rapida (3 Step)

### 1️⃣ Ottieni la Private Key da MetaMask

1. Apri **MetaMask** nel browser
2. Clicca sui **3 puntini** → **Account details**
3. Clicca **"Show private key"**
4. Inserisci la **password di MetaMask**
5. **Copia** la chiave (con o senza `0x` va bene)

### 2️⃣ Crea il file `.env`

Nella **root del progetto**, crea un file `.env`:

```env
PRIVATE_KEY=abc123def456789abc123def456789abc123def456789abc123def456789abc
NEXT_PUBLIC_BASE_URL=https://tuodominio.vercel.app
```

**⚠️ Note importanti:**
- La private key deve essere quella del wallet che ha **deployato** il contratto (l'owner)
- Puoi usarla con o senza `0x`, lo script gestisce entrambi i formati
- NO virgolette, NO spazi
- Il `BASE_URL` è il dominio dove è hostata la tua app

### 3️⃣ Esegui lo Script

```bash
npm run setup-contract
```

Lo script configurerà automaticamente:
- ✅ `baseImageURI` → punta alle tue API metadati
- ✅ `namePrefix` → "Roman Persona"
- ✅ `description` → descrizione del progetto

**Fatto!** Aspetta 5-10 minuti e le immagini appariranno nei wallet! 🎉

---

## Output Atteso

Se tutto va bene, vedrai:

```
🚀 Setup del contratto Roman Persona NFT

🌐 Connessione a: https://sepolia-rollup.arbitrum.io/rpc
👛 Wallet connesso: 0x3Ec869...45C455D9
📄 Contratto: 0xfd4071...BAEF9072B3
✅ Sei l'owner del contratto

📝 Impostazione baseImageURI: https://tuodominio.com/api/nft/
⏳ Transazione inviata: 0xabc123...
✅ baseImageURI impostato!

✅ namePrefix impostato!
✅ description impostata!

✅ Setup completato con successo!
```

---

## Verifica che Funzioni

### 1. Test API Metadati

Apri nel browser:
```
https://tuodominio.com/api/nft/1
https://tuodominio.com/api/nft/2
https://tuodominio.com/api/nft/3
```

Dovresti vedere un JSON tipo:
```json
{
  "name": "Roman Persona #1 - Boro",
  "description": "Boro autentico: diretto, verace...",
  "image": "https://tuodominio.com/Boro.png",
  "attributes": [
    { "trait_type": "Persona", "value": "Boro" },
    { "trait_type": "Type", "value": "Roman Character" }
  ]
}
```

### 2. Verifica Immagini

Apri nel browser:
```
https://tuodominio.com/Boro.png
https://tuodominio.com/Pariolino.png
https://tuodominio.com/Coatto.png
```

Dovresti vedere le immagini pixel art.

### 3. Controlla MetaMask

1. Apri MetaMask
2. Vai su **NFTs**
3. Aspetta 5-10 minuti
4. Le immagini dovrebbero apparire!

Se non appaiono subito:
- Disconnetti e riconnetti il wallet
- Chiudi e riapri MetaMask
- Aspetta fino a 30 minuti (cache)

---

## Errori Comuni

### ❌ "invalid private key"

**Causa:** Private key non valida o mal formattata.

**Soluzione:**
1. La chiave deve essere **64 caratteri** esadecimali (0-9, a-f)
2. NO spazi prima/dopo
3. NO virgolette `"` o apici `'`
4. Puoi usarla con o senza `0x`

**✅ Formato corretto:**
```env
PRIVATE_KEY=abc123def456789abc123def456789abc123def456789abc123def456789abc
```

**❌ Formato sbagliato:**
```env
PRIVATE_KEY="abc123..."  ❌ (NO virgolette)
PRIVATE_KEY= abc123...   ❌ (NO spazi)
PRIVATE_KEY=0xabc        ❌ (troppo corta)
```

### ❌ "PRIVATE_KEY non trovata"

**Causa:** Il file `.env` non esiste o è nel posto sbagliato.

**Soluzione:**
1. Crea il file `.env` nella **root** del progetto (dove c'è `package.json`)
2. Non chiamarlo `.env.txt` o altro
3. Su Mac/Linux: usa `nano .env` o un editor

### ❌ "Not owner"

**Causa:** Stai usando la private key sbagliata.

**Soluzione:**
1. Usa la private key del wallet che ha **deployato** il contratto
2. Verifica l'owner su [Arbiscan](https://sepolia.arbiscan.io/address/0xfd40710B7D9ef3351Ea3891aA1Aa22BAEF9072B3)

### ❌ "Insufficient funds"

**Causa:** Il wallet non ha abbastanza ETH per le gas fees.

**Soluzione:**
1. Vai su un faucet: [Triangle Faucet](https://faucet.triangleplatform.com/arbitrum/sepolia)
2. Richiedi ETH di test (gratis)
3. Riprova

### ❌ "Network error"

**Causa:** Problemi di connessione RPC.

**Soluzione:**
Prova un RPC alternativo nel `.env`:
```env
ARBITRUM_SEPOLIA_RPC=https://arbitrum-sepolia.blockpi.network/v1/rpc/public
```

---

## Come Funziona (Dettagli Tecnici)

### 1. Struttura Metadati

Il contratto chiama `baseImageURI + tokenId` per ottenere i metadati.

Esempio:
- Token #1 → `https://tuodominio.com/api/nft/1`
- Token #2 → `https://tuodominio.com/api/nft/2`

### 2. API Response

L'API ritorna JSON nel formato standard OpenSea:

```json
{
  "name": "Roman Persona #1 - Boro",
  "description": "...",
  "image": "https://tuodominio.com/Boro.png",
  "external_url": "https://tuodominio.com",
  "attributes": [...]
}
```

### 3. Mapping Token → Immagine

L'API mappa ciclicamente i tokenId alle 3 immagini:
- Token 1, 4, 7, 10... → **Boro.png**
- Token 2, 5, 8, 11... → **Pariolino.png**
- Token 3, 6, 9, 12... → **Coatto.png**

### 4. Cache

I wallet e marketplace cachano i metadati:
- **MetaMask:** 5-30 minuti
- **OpenSea:** fino a 24 ore
- Puoi forzare il refresh su OpenSea: 3 puntini → "Refresh metadata"

---

## Sicurezza

### 🔒 Best Practices

- ⚠️ **MAI** condividere la private key
- ⚠️ **MAI** commitare il `.env` su Git
- ⚠️ Usa un wallet di test con pochi fondi
- ✅ Il `.env` è già nel `.gitignore`
- ✅ Dopo il setup, puoi rimuovere la `PRIVATE_KEY` dal `.env`

### 🗑️ Rimuovere la Private Key

Dopo aver eseguito lo script (serve solo una volta), puoi rimuovere la `PRIVATE_KEY`:

```env
# PRIVATE_KEY=... ← commenta o elimina
NEXT_PUBLIC_BASE_URL=https://tuodominio.com
```

Il setup è permanente, non serve più la private key!

---

## FAQ

### ❓ Devo eseguire lo script ogni volta?

**No!** Lo script va eseguito **una sola volta**. La configurazione è salvata on-chain.

### ❓ Posso cambiare le immagini dopo?

**Sì!** Basta sostituire i file `Boro.png`, `Pariolino.png`, `Coatto.png` nella cartella `public/` e fare il redeploy.

### ❓ Come faccio a testare senza deployare?

Usa `npm run dev` e testa in locale su `http://localhost:5173/api/nft/1`

### ❓ Le immagini funzionano anche su OpenSea?

**Sì!** Una volta configurato, funzionano su:
- MetaMask
- OpenSea
- Rarible
- Qualsiasi marketplace che supporta ERC-721

### ❓ Posso usare il contratto su mainnet?

**Sì!** Cambia il `CONTRACT_ADDRESS` e assicurati di:
1. Deployare su mainnet
2. Configurare `baseImageURI` su mainnet
3. Usare ETH reale (non testnet)

---

## 🆘 Serve Aiuto?

1. Controlla gli errori comuni sopra
2. Verifica che il file `.env` sia nella root
3. Testa l'API nel browser
4. Aspetta 30 minuti per la cache

Se il problema persiste:
- 🐛 [Apri una Issue](../../issues)
- 📖 Leggi il README principale

---

**Setup fatto una volta = Immagini NFT per sempre! 🎨**

