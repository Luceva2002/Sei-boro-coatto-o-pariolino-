import type { Persona } from './persona';

export function buildPrompt({ nome, persona, zona, abitazione, capelli, piatto }: {
    nome: string;
    persona: Persona;
    zona?: string;
    abitazione?: string;
    capelli?: string;
    piatto?: string;
}): string {
	const title = `${nome || 'Anonimo'} — ${persona}`;
	const traits = [
		persona,
		zona?.replace('_',' '),
		abitazione,
		capelli,
		piatto?.replaceAll('_',' ')
	].filter(Boolean).join(', ');
	return `Portrait of a Roman character (${traits}), liquid glass style, minimal, elegant, clean lines, high contrast, color palette bg:#0e1525 fg:#e6ecff accent:#2770ff, centered composition, subtle vignette, high-res.` + ` Title: ${title}`;
}


