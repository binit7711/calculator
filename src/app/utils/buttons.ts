import { TypeOfKey } from '../types/enums';
import { Key } from '../types/key';

export const buttons: Key[] = [
  ...Array(10).map((_, i) => ({
    label: i.toString(),
    operation: TypeOfKey.Number,
  })),
];
