export function getFormErrors(form) {
 return [...form.elements].filter(field => field.willValidate && !field.validity.valid).map(field => {
  const label = field.labels?.[0]?.textContent?.replace(/\*/g, '').trim() || field.getAttribute('aria-label') || field.placeholder || field.name || 'Field';
  return field.validity.valueMissing ? label + ' is required.' : label + ': ' + field.validationMessage;
 }).join(' ');
}
