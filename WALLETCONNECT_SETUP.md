# 🔗 Configurazione WalletConnect

## Perché è importante?

Gli errori `403 Forbidden` che vedi in console sono dovuti all'uso di un **Project ID demo** di WalletConnect che non è valido.

**Senza un Project ID valido:**
- ❌ I wallet mobili NON funzioneranno (Trust Wallet, Rainbow, MetaMask Mobile, ecc.)
- ❌ Vedrai errori 403 in console
- ✅ MetaMask desktop e wallet browser iniettati continueranno a funzionare

## Come ottenere un Project ID GRATUITO

### Step 1: Registrati su WalletConnect Cloud

1. Vai su [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Clicca "Sign Up" o "Get Started"
3. Registrati con email o GitHub (è gratuito!)

### Step 2: Crea un nuovo progetto

1. Una volta loggato, clicca "Create New Project"
2. Compila i campi:
   - **Project Name**: `NFT Urbe Roma` (o il nome che preferisci)
   - **Project Homepage URL**: `http://localhost:5173` (in dev) o il tuo dominio
   - **Description**: breve descrizione dell'app

### Step 3: Copia il Project ID

1. Dopo aver creato il progetto, vedrai il **Project ID**
2. Copia questo ID (è una stringa alfanumerica lunga ~32 caratteri)

### Step 4: Configura l'app

Crea un file `.env.local` nella root del progetto:

```bash
# .env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e
NEXT_PUBLIC_APP_URL=http://localhost:5173
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=IL_TUO_PROJECT_ID_QUI
```

**Esempio reale:**
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### Step 5: Riavvia il dev server

```bash
# Ferma il server (Ctrl+C) e riavvia
npm run dev
```

✅ Gli errori 403 dovrebbero sparire!

## Verifica la configurazione

1. Apri l'app su `http://localhost:5173`
2. Clicca "Connetti Wallet"
3. Dovresti vedere ora **WalletConnect** tra le opzioni
4. In console NON dovrebbero più apparire errori `403 Forbidden`

## Troubleshooting

### Gli errori 403 persistono

- Verifica di aver salvato il file `.env.local` nella root del progetto
- Controlla che il Project ID non contenga spazi o caratteri extra
- Riavvia completamente il server dev

### WalletConnect non appare tra le opzioni

- Il codice è configurato per **non caricare WalletConnect** se:
  - Il Project ID è vuoto
  - Il Project ID è `YOUR_PROJECT_ID_HERE` (placeholder)
  - Il Project ID è troppo corto (< 20 caratteri)

### Errori Coinbase Analytics (ERR_BLOCKED_BY_CLIENT)

Questi errori sono **normali** e **non impattano il funzionamento**:
- Sono richieste di analytics bloccate da AdBlock o privacy extensions
- Il componente `DevWarnings` li sopprime automaticamente
- In produzione, se vuoi tenerli, rimuovi l'extension AdBlock sul dominio

## Deploy in Produzione

Quando deployi su Vercel:

1. Vai nelle **Settings** del progetto
2. Sezione **Environment Variables**
3. Aggiungi:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = il_tuo_project_id
   ```
4. Re-deploya l'app

## Limiti del Piano Gratuito

WalletConnect Cloud ha un piano gratuito generoso:
- ✅ 1 milione di richieste al mese
- ✅ Progetti illimitati
- ✅ Supporto per tutte le chain
- ✅ Nessuna carta di credito richiesta

Per la maggior parte delle app è più che sufficiente!

## Link Utili

- [WalletConnect Cloud](https://cloud.walletconnect.com/)
- [WalletConnect Docs](https://docs.walletconnect.com/)
- [Lista wallet supportati](https://explorer.walletconnect.com/)

