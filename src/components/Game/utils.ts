export function match(name: string) {
  return name.match(/^AFC/g);
}

export function splitString(name: string) {
  return name.split(' ');
}

// export function filterName(name: RegExpMatchArray | null): string[] {
//   if (name) {
//     return name.filter(
//       (word, index) => index === 0 || (index === 1 && word.length < 8)
//     );
//   } else {
//     return ['no match'];
//   }
// }

export function filter(name: string[]) {
  const e = name.map((el, ind) => (el.length > 8 && ind !== 0 ? '' : el));

  return e.map((el, ind) => (e.length > 3 && ind !== 0 ? '' : el));
}

// export function trim(name: string[]): string[] {
//   return name.map((word) => (word === 'United' ? 'Utd' : word));
// }

export function stringify(name: string[]): string {
  return name.join(' ');
}
