export function entry(props: string[], data: any) {
  const obj: any = {};

  props.forEach((element, index) => {
    obj[element] = data[index];
  });

  return obj;
}
