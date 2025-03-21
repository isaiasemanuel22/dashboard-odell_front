import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notNullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.value);
    return control.value === null || control.value === undefined
      ? { required: true }
      : null;
  };
}