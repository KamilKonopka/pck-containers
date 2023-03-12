import { ControlValueAccessor } from '@angular/forms';

export class BaseInput implements ControlValueAccessor {
  value = '';
  disabled = false;

  onChange(value: string): void {
    // Control Value Accessor interface
  }
  onTouched(): void {
    // Control Value Accessor interface
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
