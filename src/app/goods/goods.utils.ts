import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IntegerValidator } from '../utils/validators';
import { FormValidationLabels } from './goods.constant';

export function createGood(fb: FormBuilder): FormGroup {
  return fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    count: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        IntegerValidator(),
      ],
    ],
    price: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
        IntegerValidator(),
      ],
    ],
  });
}

export function getFieldErrors(goodsForm: FormGroup, field: string): string {
  const currField = goodsForm.get(field);

  if (!(currField?.invalid && currField?.touched)) return '';

  const error = currField?.errors;

  const fieldName =
    field.charAt(0).toUpperCase() + field.slice(1).toLowerCase();

  const errorKey = Object.keys(error || {})[0];

  let errorValue = FormValidationLabels[
    errorKey as keyof typeof FormValidationLabels
  ] as string;

  if (errorValue) {
    errorValue = errorValue.replace('{x}', fieldName);

    if (errorKey === 'required') return errorValue;
    if (error) {
      if (errorKey === 'minlength' || errorKey === 'maxlength') {
        return errorValue.replace(
          '{requiredLength}',
          error[errorKey].requiredLength
        );
      }
      if (errorKey === 'min' || errorKey === 'max') {
        return errorValue.replace(`{${errorKey}}`, error[errorKey][errorKey]);
      }
    }

    return errorValue;
  }

  return '';
}
