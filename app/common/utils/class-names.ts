interface ClassDictionary {
  [key: string]: boolean | undefined | null;
}
type ClassArray = ClassValue[];

type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassDictionary
  | ClassArray;

export function classNames(...args: ClassValue[]) {
  return args
    .flatMap((arg) => {
      if (typeof arg === "string") return [arg];
      if (typeof arg === "object" && arg !== null) {
        return Object.entries(arg)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}
