export type Axis = "boro" | "pariolino" | "coatto";
export type Score = Record<Axis, number>;

export type Risposte = {
	nome: string;
	zona?: string;
	abitazione?: string;
	capelli?: string;
	piatto?: string;
};

export type Question = {
	id: string;
	label: string;
	type: "text" | "select";
	options?: { value: string; label: string; weight: Score }[];
};

export const questions: Question[] = [
	{ id: "nome", label: "Come te chiami?", type: "text" },
	{
		id: "zona",
		label: "Che zona de Roma frequenti?",
		type: "select",
		options: [
			{ value: "centro", label: "Centro storico", weight: { boro: 0, pariolino: 2, coatto: 0 } },
			{ value: "nord", label: "Roma Nord", weight: { boro: 1, pariolino: 3, coatto: 0 } },
			{ value: "est", label: "Tiburtina/Prenestina", weight: { boro: 2, pariolino: 0, coatto: 2 } },
			{ value: "sud", label: "Garbatella/Ostiense", weight: { boro: 1, pariolino: 0, coatto: 2 } },
			{ value: "periferia", label: "Periferia/Anello esterno", weight: { boro: 3, pariolino: 0, coatto: 2 } }
		]
	},
	{
		id: "abitazione",
		label: "Dove abiti?",
		type: "select",
		options: [
			{ value: "attico", label: "Attico vista cupole", weight: { boro: 0, pariolino: 3, coatto: 0 } },
			{ value: "palazzina", label: "Palazzina anni ‘70", weight: { boro: 2, pariolino: 0, coatto: 1 } },
			{ value: "villa", label: "Villino con giardino", weight: { boro: 0, pariolino: 2, coatto: 1 } },
			{ value: "casa_pop", label: "Case popolari", weight: { boro: 3, pariolino: 0, coatto: 2 } }
		]
	},
	{
		id: "capelli",
		label: "Taglio de capelli?",
		type: "select",
		options: [
			{ value: "sfumato", label: "Sfumato barbiere di fiducia", weight: { boro: 2, pariolino: 1, coatto: 2 } },
			{ value: "pulito", label: "Pulito, riga laterale", weight: { boro: 0, pariolino: 3, coatto: 0 } },
			{ value: "ricci", label: "Ricci scomposti", weight: { boro: 1, pariolino: 1, coatto: 1 } },
			{ value: "cresta", label: "Cresta/gel fisso", weight: { boro: 2, pariolino: 0, coatto: 3 } }
		]
	},
	{
		id: "piatto",
		label: "Piatto preferito?",
		type: "select",
		options: [
			{ value: "carbonara", label: "Carbonara", weight: { boro: 2, pariolino: 1, coatto: 2 } },
			{ value: "cacio", label: "Cacio e pepe", weight: { boro: 1, pariolino: 2, coatto: 1 } },
			{ value: "sushi", label: "Sushi", weight: { boro: 0, pariolino: 3, coatto: 0 } },
			{ value: "kebab", label: "Kebab de notte", weight: { boro: 2, pariolino: 0, coatto: 3 } }
		]
	}
];

export function scoreForm(form: Record<string,string>) {
	const s: Score = { boro: 0, pariolino: 0, coatto: 0 };
	questions.forEach(q => {
		const v = form[q.id];
		const opt = q.options?.find(o => o.value === v);
		if (opt) {
			s.boro += opt.weight.boro;
			s.pariolino += opt.weight.pariolino;
			s.coatto += opt.weight.coatto;
		}
	});
	const entries = Object.entries(s).sort((a,b)=>b[1]-a[1]);
	const [first, second] = entries as [ [Axis, number], [Axis, number] | undefined ];
	const label = (second && first[1]-second[1] <= 1)
		? `${first[0]}-${second[0]} mix`
		: first[0];
	return { ...s, label };
}

export const personaCopy: Record<string,string> = {
	"boro": "Boro DOC: cuore grande, zero fronzoli, romano verace.",
	"pariolino": "Pariolino/a chic: linee pulite, gusto fino e aperitivi al tramonto.",
	"coatto": "Coatto/a epico/a: energia a pallettoni, battuta pronta sempre.",
	"boro-pariolino mix": "Mix raro: street + finezza, come la carbonara gourmet.",
	"boro-coatto mix": "Tempra de quartiere con turbo, stile senza filtri.",
	"pariolino-coatto mix": "Elegantemente spinto: mocassino e motorino insieme."
};

// Helpers per accedere alle domande/opzioni
export function getQuestion(id: string): Question | undefined {
	return questions.find(q => q.id === id);
}

export function getOptions(id: string) {
	return getQuestion(id)?.options ?? [];
}

export function calcolaPunteggio(risposte: Risposte) {
	const result = scoreForm(risposte);
	return {
		persona: result.label,
		scores: { boro: result.boro, pariolino: result.pariolino, coatto: result.coatto }
	};
}

// Tipo derivato dalle chiavi possibili del risultato (utile per UI tipizzate)
export type Persona = keyof typeof personaCopy;

