export function formatPhoneNumber(phone: string): string {

  if (!phone) {
    return phone
  }

  const cleaned = phone.replace(/\D/g, "");

  // Verifica o tamanho do número
  if (cleaned.length === 11) {
    // Formato: (XX) XXXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (cleaned.length === 10) {
    // Formato: (XX) XXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    // Retorna o número original se não for válido
    return phone;
  }
}
