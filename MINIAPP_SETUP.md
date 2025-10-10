# 🚀 Guida Setup MiniApp su Base

## Variabili d'Ambiente MiniApp

Aggiungi queste variabili al tuo file `.env.local`:

```bash
# ---- MiniApp (Base Build) ----
# Questi campi saranno generati da Base Build -> Account association tool
ACCOUNT_ASSOC_HEADER=
ACCOUNT_ASSOC_PAYLOAD=
ACCOUNT_ASSOC_SIGNATURE=

# Indirizzi Base Build autorizzati (separati da virgola)
BASE_ALLOWED_ADDRESSES=

# Dati MiniApp opzionali
MINIAPP_NAME=NFT Urbe Roma
MINIAPP_WEBHOOK_URL=
```

## Passaggi per il Deploy MiniApp

### 1. Deploy su Vercel

```bash
# Deploy su Vercel
vercel --prod

# Prendi nota dell'URL: https://tuo-dominio.vercel.app
```

Aggiorna `.env.local` con:
```bash
NEXT_PUBLIC_APP_URL=https://tuo-dominio.vercel.app
```

### 2. Genera Account Association

1. Vai su [Base Build - Account Association](https://www.base.dev/preview?tab=account)
2. Inserisci il tuo dominio (es: `tuo-dominio.vercel.app`)
3. Clicca "Submit" e poi "Verify"
4. Segui le istruzioni per firmare con il tuo Base Account
5. Copia i 3 campi generati:
   - `ACCOUNT_ASSOC_HEADER`
   - `ACCOUNT_ASSOC_PAYLOAD`
   - `ACCOUNT_ASSOC_SIGNATURE`
6. Aggiungili al tuo `.env.local` su Vercel

### 3. Configura Indirizzi Autorizzati

Aggiungi il tuo indirizzo Base Account:
```bash
BASE_ALLOWED_ADDRESSES=0xTuoIndirizzo
```

### 4. Re-deploy

```bash
# Dopo aver aggiornato le variabili su Vercel
vercel --prod
```

### 5. Testa il Manifest

Verifica che il manifest sia accessibile:
```
https://tuo-dominio.vercel.app/.well-known/farcaster.json
```

Dovresti vedere un JSON con tutti i campi compilati.

### 6. Preview su Base Build

1. Vai su [Base Build Preview](https://www.base.dev/preview)
2. Inserisci il tuo URL
3. Verifica che:
   - ✅ L'embed appaia correttamente
   - ✅ Il pulsante "Launch NFT Urbe" funzioni
   - ✅ Account association sia valida (tab Account)
   - ✅ Metadata siano completi (tab Metadata)

### 7. Pubblica su Base App

1. Apri Base App
2. Crea un nuovo post
3. Incolla il tuo URL: `https://tuo-dominio.vercel.app`
4. Il MiniApp apparirà automaticamente con embed interattivo!

## Verifica Locale con ngrok

Per testare localmente prima del deploy:

```bash
# Terminale 1: Avvia l'app
npm run dev

# Terminale 2: Esponi con ngrok
ngrok http 5173

# Usa l'URL https di ngrok come NEXT_PUBLIC_APP_URL
```

## Struttura File MiniApp

### Route Manifest
- **File**: `src/app/.well-known/farcaster.json/route.ts`
- **URL**: `/.well-known/farcaster.json`
- **Uso**: Configurazione MiniApp e account association

### Metadata Embed
- **File**: `src/app/layout.tsx`
- **Campo**: `metadata.other['fc:miniapp']`
- **Uso**: Rich embed quando l'app viene condivisa

### SDK Ready Hook
- **File**: `src/app/page.tsx`
- **Hook**: `sdk.actions.ready()`
- **Uso**: Nasconde splash screen e mostra l'app

## Troubleshooting

### Il manifest ritorna campi vuoti
- Verifica che le variabili d'ambiente siano configurate su Vercel
- Re-deploya dopo averle aggiunte

### Account association non valida
- Rigenera i campi usando il tool di Base Build
- Assicurati di usare lo stesso dominio
- Firma con il Base Account corretto

### L'app non si carica come MiniApp
- Controlla che `sdk.actions.ready()` venga chiamato
- Verifica che l'URL nel manifest corrisponda al dominio
- Testa con Base Build Preview prima di pubblicare

### Embed non appare su Base App
- Verifica che il metadata `fc:miniapp` sia presente
- Controlla che imageUrl e splashImageUrl siano URL validi
- Usa Base Build Preview per debuggare

## Link Utili

- [Base Build](https://www.base.dev/)
- [Base Build Preview](https://www.base.dev/preview)
- [Account Association Tool](https://www.base.dev/preview?tab=account)
- [Farcaster MiniApp Docs](https://docs.farcaster.xyz/developers/miniapps)
- [Documentazione completa](./DEPLOY.md)

