export type Pasta = 'rigatoni' | 'spaghetti' | 'fusilli';
export type Sugo = 'carbonara' | 'gricia' | 'cacio e pepe' | 'amatriciana';

function pastaColor(pasta: Pasta): string {
  switch (pasta) {
    case 'rigatoni':
      return '#f2c66d';
    case 'spaghetti':
      return '#f5d58a';
    case 'fusilli':
      return '#f1c15c';
  }
}

function sauceColor(sugo: Sugo): string {
  switch (sugo) {
    case 'carbonara':
      return '#ffd26e';
    case 'gricia':
      return '#d9d9d9';
    case 'cacio e pepe':
      return '#cfc6b1';
    case 'amatriciana':
      return '#e25b45';
  }
}

function renderSVG(pasta: Pasta, sugo: Sugo): string {
  const p = pastaColor(pasta);
  const s = sauceColor(sugo);
  const label = `${pasta.toUpperCase()} + ${sugo.toUpperCase()}`;
  return (
    `<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='1024' viewBox='0 0 1024 1024'>` +
    `<defs>` +
    `<linearGradient id='g' x1='0' x2='0' y1='0' y2='1'><stop offset='0%' stop-color='#fff'/><stop offset='100%' stop-color='#f7f7f7'/></linearGradient>` +
    `</defs>` +
    `<rect width='100%' height='100%' fill='url(#g)'/>` +
    `<circle cx='512' cy='600' r='280' fill='#f3f1e8' stroke='#d7d1c1' stroke-width='8'/>` +
    `<g>` +
    Array.from({ length: 18 })
      .map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const x = 512 + Math.cos(angle) * 180;
        const y = 600 + Math.sin(angle) * 120;
        return `<ellipse cx='${x.toFixed(1)}' cy='${y.toFixed(1)}' rx='40' ry='16' fill='${p}' stroke='#b08a3c' stroke-width='3'/>`;
      })
      .join('') +
    `</g>` +
    `<g opacity='0.9'>` +
    `<path d='M260 520 C 420 480, 600 560, 760 520' stroke='${s}' stroke-width='26' fill='none' stroke-linecap='round'/>` +
    `<path d='M240 570 C 420 540, 600 620, 780 570' stroke='${s}' stroke-width='22' fill='none' stroke-linecap='round'/>` +
    `</g>` +
    `<text x='50%' y='200' text-anchor='middle' font-size='48' font-family='monospace' fill='#222'>Pasta Maker</text>` +
    `<text x='50%' y='260' text-anchor='middle' font-size='28' font-family='monospace' fill='#444'>${label}</text>` +
    `</svg>`
  );
}

export function generateTokenURI(pasta: Pasta, sugo: Sugo): string {
  const name = `Pasta: ${pasta} con ${sugo}`;
  const description = `Una prelibatezza on-chain: ${pasta} con ${sugo}.`;
  const svg = renderSVG(pasta, sugo);
  const image = `data:image/svg+xml;base64,${(typeof window === 'undefined' ? Buffer.from(svg, 'utf-8').toString('base64') : btoa(svg))}`;
  const json = {
    name,
    description,
    image,
    attributes: [
      { trait_type: 'Pasta', value: pasta },
      { trait_type: 'Sugo', value: sugo }
    ]
  };
  const meta = JSON.stringify(json);
  const base64 = typeof window === 'undefined' ? Buffer.from(meta).toString('base64') : btoa(meta);
  return `data:application/json;base64,${base64}`;
}

