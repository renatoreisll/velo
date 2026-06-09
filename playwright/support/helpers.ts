// Função que gera o OrderCode aleatoriamente
export function generateOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    const suffix = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  
    return `VLO-${suffix}`;
  }

  import { Page } from '@playwright/test'

export async function searchOrder(page: Page, orderNumber: string) {
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
}