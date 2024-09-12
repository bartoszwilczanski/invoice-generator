import { Pipe, PipeTransform } from '@angular/core';

const REGEX = /\D/g;

@Pipe({
  standalone: true,
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';

    const cleaned = ('' + phoneNumber).replace(REGEX, ''); // zwraca tylko liczby

    if (cleaned.length !== 10) return phoneNumber;

    // Ciecie na fragmenty
    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 6);
    const part3 = cleaned.slice(6, 10);

    return `(${part1}) ${part2}-${part3}`;
  }
}
