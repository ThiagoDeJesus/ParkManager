export function validateCNPJ(CNPJ: string) {
  const newCNPJ = CNPJ.replace(/[^\d]+/g, '');

  if (newCNPJ === '') return false;

  if (newCNPJ.length !== 14) return false;

  if (
    newCNPJ === '00000000000000' ||
    newCNPJ === '11111111111111' ||
    newCNPJ === '22222222222222' ||
    newCNPJ === '33333333333333' ||
    newCNPJ === '44444444444444' ||
    newCNPJ === '55555555555555' ||
    newCNPJ === '66666666666666' ||
    newCNPJ === '77777777777777' ||
    newCNPJ === '88888888888888' ||
    newCNPJ === '99999999999999'
  )
    return false;

  let size = newCNPJ.length - 2;
  let numbers = newCNPJ.substring(0, size);
  const digits = newCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(0))) return false;

  size += 1;
  numbers = newCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(1))) return false;

  return true;
}