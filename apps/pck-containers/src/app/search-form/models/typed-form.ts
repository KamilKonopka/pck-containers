import { FormControl } from '@angular/forms';

export type TypedForm<T> = Record<keyof T, FormControl<T[keyof T]>>;
