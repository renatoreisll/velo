import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de pedido', () => {

   test.beforeEach(async ({ page }) => {
      // -------------------->  Arrange
      // Checkpoint 1: Verificar se a página de consulta de pedidos está carregada
      await page.goto('http://localhost:5173/')
      await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

      // Checkpoint 2: Clicar no link de consulta de pedidos
      await page.getByRole('link', { name: 'Consultar Pedido' }).click()

      // Checkpoint 3: Verificar se a página de consulta de pedidos está carregada
      await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
   })

   test('Deve consultar um pedido aprovado', async ({ page }) => {

      // Test Data
      const order = 'VLO-RBAQSL'

      // -------------------->  Act
      //Checkpoint 4: Preencher o campo de busca de pedido
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)

      //Checkpoint 5: Clicar no botão de busca de pedido
      await page.getByRole('button', { name: 'Buscar Pedido' }).click()

      // -------------------->  Assert
      //Checkpoint 6: Verificar se o pedido foi encontrado
      const containerPedido = page.getByRole('paragraph')
         .filter({ hasText: /^Pedido$/ })
         .locator('..') //Sobe pro elemento pai

      await expect(containerPedido).toContainText(order, { timeout: 10_000 })

      //Checkpoint 7: Verificar se o status do pedido é APROVADO  
      await expect(page.getByText('APROVADO')).toBeVisible()

   })


   test('Deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {
      const order = 'generateOrderCode'

      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)

      await page.getByRole('button', { name: 'Buscar Pedido' }).click()
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
         - img
         - heading "Pedido não encontrado" [level=3]
         - paragraph: Verifique o número do pedido e tente novamente
         `)
   })

})

