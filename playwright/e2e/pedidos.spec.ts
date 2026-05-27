import { test, expect } from '@playwright/test'

test('Deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // Checkpoint 1: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  // Checkpoint 2: Clicar no link de consulta de pedidos
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  // Checkpoint 3: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Checkpoint 4: Preencher o campo de busca de pedido
  await page.getByTestId('search-order-id').fill('VLO-RBAQSL')

  //Checkpoint 5: Clicar no botão de busca de pedido
  await page.getByTestId('search-order-button').click()

  //Checkpoint 6: Verificar se o pedido foi encontrado
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-RBAQSL')

  //Checkpoint 7: Verificar se o status do pedido é APROVADO  
  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

}) 