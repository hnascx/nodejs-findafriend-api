export function generateWhatsAppButton(
  whatsapp: string,
  petName: string,
  orgName: string,
): string {
  const message = `Olá ${orgName}, gostaria de saber mais sobre o pet ${petName} disponível para adoção!`
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${whatsapp}?text=${encodedMessage}`
}
