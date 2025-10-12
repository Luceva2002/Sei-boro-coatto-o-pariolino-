"use client";
import * as React from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useState, useMemo } from 'react';
import { StepShell } from '../components/step-shell';
import { StepHero } from '../components/steps/StepHero';
import { StepQuestion } from '../components/steps/StepQuestion';
import { StepMint } from '../components/steps/StepMint';
import { calcolaPunteggio, type Risposte, questions } from '../lib/persona';

export default function Page() {
  React.useEffect(() => {
    // Notifica al MiniApp container che la UI è pronta
    try { sdk.actions.ready(); } catch {}
  }, []);
  const total = 1 /*hero*/ + questions.length /*nome+4*/ + 1 /*mint*/;
  const [step, setStep] = useState(0);
  const [risposte, setRisposte] = useState<Risposte>({ nome: '' });

  const { persona, scores } = useMemo(() => calcolaPunteggio(risposte), [risposte]);

  function next() { setStep(s => Math.min(total-1, s+1)); }
  function back() { setStep(s => Math.max(0, s-1)); }

  return (
    <main className="mx-auto max-w-5xl py-10">
      {step === 0 ? (
        <StepShell title="" step={0} total={total}>
          <StepHero onStart={next} />
        </StepShell>
      ) : null}

      {step >= 1 && step <= questions.length ? (
        <StepShell title={questions[step-1].label} step={step} total={total} onBack={back} onNext={next}>
          <StepQuestion id={questions[step-1].id} value={(risposte as any)[questions[step-1].id]} onChange={(v)=>setRisposte(p=>({ ...p, [questions[step-1].id]: v }))} />
        </StepShell>
      ) : null}

      {step === (1 + questions.length) ? (
        <StepShell title="Immagine & Mint" step={step} total={total} onBack={back} showWallet={true}>
          <StepMint risposte={risposte} persona={persona} />
        </StepShell>
      ) : null}
    </main>
  );
}


