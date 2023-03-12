import { ControlValueAccessor } from '@angular/forms';

export class BaseInput implements ControlValueAccessor {
  value = '';
  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange(value: string): void {
    console.log(value);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
