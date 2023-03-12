import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Location, locationFields } from './models/location';
import { CustomSelectComponent } from '../../../../../libs/custom-controls/src/lib';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'pck-containers-search-form',
  templateUrl: 'search-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CustomSelectComponent,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  form: FormGroup = this.getForm();

  destroy: Subject<void> = new Subject<void>();

  voivodeships: string[] = ['Zachodnio-Pomorskie', 'Pomorskie', 'Mazowieckie'];

  ngOnInit(): void {
    this.disableFields(locationFields.slice(1));

    this.listenFormChanges();
    this.listenVoivodeshipChanges();
  }

  listenFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy.asObservable()))
      .subscribe(() => console.log(this.form.getRawValue()));
  }

  listenVoivodeshipChanges(): void {
    this.form
      .get('voivodeship')
      ?.valueChanges.pipe(takeUntil(this.destroy.asObservable()))
      .subscribe((value: string) => {
        this.toggleDisabled(value, 'voivodeship');
      });
  }

  getForm(): FormGroup {
    return new FormGroup<Record<keyof Location, FormControl<string>>>({
      voivodeship: new FormControl(),
      district: new FormControl(),
      area: new FormControl(),
      city: new FormControl(),
      address: new FormControl(),
      id: new FormControl(),
    });
  }

  toggleDisabled(value: string, fieldName: keyof Location): void {
    const fieldIndex = locationFields.indexOf(fieldName);
    const fields = locationFields.slice(fieldIndex + 1, fieldIndex + 2);

    if (value === null) {
      this.disableFields(fields);
      fields.forEach((fieldName: string) => this.clearValue(fieldName));
    } else {
      fields
        .slice(0, 1)
        .forEach((fieldName: string) =>
          this.form.get(fieldName)?.enable({ emitEvent: false })
        );
    }
  }

  clearValue(fieldName: string): void {
    this.form.get(fieldName)?.patchValue(null, { emitEvent: false });
  }

  disableFields(fields: string[]): void {
    fields.forEach((field: string) => this.form.get(field)?.disable());
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
