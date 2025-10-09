export type Zone = 'fuori_gra' | 'nord' | 'sud';
export type Hair = 'ciuffo' | 'doppiotaglio';
export type Persona = 'bori' | 'pariolini' | 'coatti';

function base64Encode(str: string): string {
  // Browser path
  if (typeof globalThis !== 'undefined' && typeof (globalThis as any).btoa === 'function') {
    // Supporta unicode
    return (globalThis as any).btoa(unescape(encodeURIComponent(str)));
  }
  // Node path
  // eslint-disable-next-line no-undef
  return Buffer.from(str, 'utf-8').toString('base64');
}

export function derivePersona(zone: Zone): Persona {
  switch (zone) {
    case 'fuori_gra':
      return 'bori';
    case 'nord':
      return 'pariolini';
    case 'sud':
      return 'coatti';
  }
}

function paletteFor(persona: Persona): { bgTop: string; bgBottom: string; face: string; accent: string } {
  // Palette semplici per ogni archetipo
  if (persona === 'bori') return { bgTop: '#ffe7cc', bgBottom: '#ffd1a1', face: '#f3e1cf', accent: '#b35c1e' };
  if (persona === 'pariolini') return { bgTop: '#d7e6ff', bgBottom: '#b7d3ff', face: '#efe7de', accent: '#1e5ab3' };
  return { bgTop: '#ffd6d6', bgBottom: '#ffb3b3', face: '#f2e6dc', accent: '#b31e1e' }; // coatti
}

function hairShape(hair: Hair, color: string): string {
  if (hair === 'ciuffo') {
    return `<path d='M420 320 C 480 260, 560 260, 620 320 C 560 300, 500 300, 460 340' fill='${color}'/>`;
  }
  // doppiotaglio
  return (
    `<rect x='380' y='320' width='280' height='80' rx='16' fill='${color}'/>` +
    `<rect x='380' y='320' width='40' height='120' fill='#111' opacity='0.2'/>`
  );
}

function renderSVG(name: string, persona: Persona, zone: Zone, hair: Hair): string {
  const pal = paletteFor(persona);
  const subtitle = `${persona.toUpperCase()} · ${zone.replace('_', ' ').toUpperCase()} · ${hair.toUpperCase()}`;
  return (
    `<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='1024' viewBox='0 0 1024 1024'>` +
    `<defs>` +
    `<linearGradient id='bg' x1='0' x2='0' y1='0' y2='1'><stop offset='0%' stop-color='${pal.bgTop}'/><stop offset='100%' stop-color='${pal.bgBottom}'/></linearGradient>` +
    `</defs>` +
    `<rect width='100%' height='100%' fill='url(#bg)'/>` +
    `<g>` +
    `<circle cx='512' cy='520' r='260' fill='${pal.face}' stroke='#222' stroke-width='6'/>` +
    hairShape(hair, pal.accent) +
    // occhi e bocca stilizzati
    `<circle cx='440' cy='520' r='18' fill='#222'/>` +
    `<circle cx='584' cy='520' r='18' fill='#222'/>` +
    `<path d='M430 600 Q 512 640 594 600' stroke='#222' stroke-width='10' fill='none' stroke-linecap='round'/>` +
    `</g>` +
    `<text x='50%' y='180' text-anchor='middle' font-size='48' font-family='monospace' fill='#111'>${name}</text>` +
    `<text x='50%' y='230' text-anchor='middle' font-size='26' font-family='monospace' fill='#333'>${subtitle}</text>` +
    `</svg>`
  );
}

export function generateTokenURI(name: string, zone: Zone, hair: Hair): string {
  const persona = derivePersona(zone);
  const title = `${name || 'Anonimo'} — ${persona}`;
  const description = `Personaggio romano: ${persona} dalla zona ${zone.replace('_', ' ')} con ${hair}.`;
  const svg = renderSVG(name || 'Anonimo', persona, zone, hair);
  const image = `data:image/svg+xml;base64,${base64Encode(svg)}`;
  const json = {
    name: title,
    description,
    image,
    attributes: [
      { trait_type: 'Nome', value: name || 'Anonimo' },
      { trait_type: 'Persona', value: persona },
      { trait_type: 'Zona', value: zone },
      { trait_type: 'Taglio', value: hair }
    ]
  };
  const meta = JSON.stringify(json);
  const base64 = base64Encode(meta);
  return `data:application/json;base64,${base64}`;
}

