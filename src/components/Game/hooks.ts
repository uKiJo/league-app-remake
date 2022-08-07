export function match(name: string) {
  return name.match(/[A-Z,a-z]+/g);
}

export function filterName(name: RegExpMatchArray | null): string[] {
  if (name) {
    return name.filter(
      (word, index) => index === 0 || (index === 1 && word.length < 7)
    );
  } else {
    return ['no match'];
  }
}

export function trim(name: string[]): string[] {
  return name.map((word) => (word === 'United' ? 'Utd' : word));
}

export function stringify(name: string[]): string {
  return name.join(' ');
}
