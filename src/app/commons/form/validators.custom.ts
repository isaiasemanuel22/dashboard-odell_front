import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notNullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === null || control.value === undefined
      ? { required: true }
      : null;
  };
}