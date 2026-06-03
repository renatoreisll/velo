// Função que gera o OrderCode aleatoriamente
export function generateOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    const suffix = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  
    return `VLO-${suffix}`;
  }