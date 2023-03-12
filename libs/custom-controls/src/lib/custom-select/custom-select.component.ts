import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { BaseInput } from '../base-input';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'pck-containers-custom-select',
  templateUrl: 'custom-select.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomSelectComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent
  extends BaseInput
  implements OnInit, OnDestroy
{
  @Input() options: string[] = [];
  @Input() label = '';

  destroy: Subject<void> = new Subject<void>();

  formControl: FormControl = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy.asObservable()))
      .subscribe((value: string) => this.onChange(value));
  }

  override setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.formControl.disable({ emitEvent: false })
      : this.formControl.enable({ emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
