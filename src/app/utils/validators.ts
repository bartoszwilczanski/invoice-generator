import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IntegerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    const isInteger = Number.isInteger(Number(control.value));
    return isInteger ? null : { notInteger: true };
  };
}