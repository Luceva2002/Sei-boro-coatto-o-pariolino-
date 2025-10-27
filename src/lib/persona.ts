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
		label: "De che zona sei?",
		type: "select",
		options: [
			{ value: "roma_centro", label: "Roma Centro", weight: { boro: 2, pariolino: 1, coatto: 0 } },
			{ value: "roma_nord", label: "Roma Nord", weight: { boro: 0, pariolino: 2, coatto: 0 } },
			{ value: "roma_ovest", label: "Roma Ovest e dintorni", weight: { boro: 2, pariolino: 1, coatto: 0 } },
			{ value: "roma_est", label: "Da Pignetown a Anagnina", weight: { boro: 1, pariolino: 0, coatto: 2 } },
			{ value: "roma_sud", label: "Eur Garba e zone lì", weight: { boro: 0, pariolino: 0, coatto: 2 } },
			{ value: "fuori_gra", label: "Fuori dar gra", weight: { boro: 2, pariolino: 0, coatto: 0 } }
		]
	},
	{
		id: "abitazione",
		label: "Casa tua:",
		type: "select",
		options: [
			{ value: "attico_naamio", label: "Attico naamio", weight: { boro: 0, pariolino: 2, coatto: 0 } },
			{ value: "palazzina_70", label: "Classico condominio", weight: { boro: 2, pariolino: 0, coatto: 0 } },
			{ value: "villino_giardino", label: "Villino con giardino", weight: { boro: 1, pariolino: 2, coatto: 0 } },
			{ value: "palazzoni", label: "Lotti", weight: { boro: 0, pariolino: 0, coatto: 2 } },
			{ value: "casa_popolare", label: "Casa popolare", weight: { boro: 0, pariolino: 0, coatto: 2 } }
		]
	},
	{
		id: "capelli",
		label: "Taglio de capelli?",
		type: "select",
		options: [
			{ value: "doppio_taglio", label: "Doppio taglio", weight: { boro: 2, pariolino: 0, coatto: 0 } },
			{ value: "ciuffo", label: "Ciuffo", weight: { boro: 0, pariolino: 2, coatto: 0 } },
			{ value: "er_boccia", label: "Sei er boccia", weight: { boro: 2, pariolino: 0, coatto: 1 } },
			{ value: "isolotto", label: "Isolotto", weight: { boro: 0, pariolino: 0, coatto: 2 } },
			{ value: "codino_alto", label: "Ricci scomposti", weight: { boro: 1, pariolino: 0, coatto: 2 } },
			{ value: "piega_liscia", label: "Piega liscia", weight: { boro: 0, pariolino: 2, coatto: 0 } }
		]
	},
	{
		id: "piatto",
		label: "Top magnata?",
		type: "select",
		options: [
			{ value: "cucina_romana", label: "Osteria romana", weight: { boro: 2, pariolino: 0, coatto: 1 } },
			{ value: "ape", label: "Ape", weight: { boro: 1, pariolino: 2, coatto: 0 } },
			{ value: "sushi", label: "Sushi", weight: { boro: 0, pariolino: 2, coatto: 0 } },
			{ value: "kebab_notte", label: "Kebab de notte", weight: { boro: 0, pariolino: 0, coatto: 2 } },
			{ value: "pizza_trancio", label: "Pizza ar taglio", weight: { boro: 2, pariolino: 0, coatto: 0 } }
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

export const personaCopy: Record<string, string> = {
	"boro": "Boro autentico: diretto, verace e senza filtri. Vivi Roma come un campo da calcetto e l’amicizia come un sacramento.",
	"pariolino": "Pariolino di razza: estetica curata, Spritz sempre pieno e convinzione che la vita inizi a Ponte Milvio.",
	"coatto": "Coatto leggendario: un concentrato de romanità e rumore. Parli col cuore e cammini come se stessi sempre girando un video musicale.",
	"boro-pariolino mix": "Pariolino col cuore da boro: scarpe lucide ma battuta pronta. C’hai classe e panino con la porchetta insieme.",
	"boro-coatto mix": "Coatto zen: te scazzi con chiunque ma poi mediti sul raccordo. Sei caos organizzato e pace interiore in tuta Adidas.",
	"pariolino-coatto mix": "Boro soft-touch: sembri tranquillo, ma bastano due battute e diventi un meme vivente. L’equilibrio perfetto tra eleganza e casino."
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

