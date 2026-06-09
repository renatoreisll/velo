import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de pedido', () => {

   test.beforeEach(async ({ page }) => {
      // -------------------->  Arrange
      //Verificar se a página de consulta de pedidos está carregada
      await page.goto('http://localhost:5173/')
      await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

      //Clicar no link de consulta de pedidos
      await page.getByRole('link', { name: 'Consultar Pedido' }).click()

      //Verificar se a página de consulta de pedidos está carregada
      await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
   })

   test('Deve consultar um pedido aprovado', async ({ page }) => {

      // Test Data
      const order = {
         number: 'VLO-RBAQSL',
         status: 'APROVADO',
         color: 'Lunar White',
         wheels: 'aero Wheels',
         customer: {
            name: 'Renato Reis',
            email: 'renatoreis@live.com'
         },
         payment: 'À vista'

      }

      // -------------------->  Act
      //Preencher o campo de busca de pedido
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)

      //Clicar no botão de busca de pedido
      await page.getByRole('button', { name: 'Buscar Pedido' }).click()

      // -------------------->  Assert
      //Verificar se o pedido foi encontrado
      await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
         - img
         - paragraph: Pedido
         - paragraph: ${order.number}
         - status:
            - img
            - text: ${order.status}
         - img "Velô Sprint"
         - paragraph: Modelo
         - paragraph: Velô Sprint
         - paragraph: Cor
         - paragraph: ${order.color}
         - paragraph: Interior
         - paragraph: cream
         - paragraph: Rodas
         - paragraph: ${order.wheels}
         - heading "Dados do Cliente" [level=4]
         - paragraph: Nome
         - paragraph: ${order.customer.name}
         - paragraph: Email
         - paragraph: ${order.customer.email}
         - paragraph: Loja de Retirada
         - paragraph
         - paragraph: Data do Pedido
         - paragraph: /\\d+\\/\\d+\\/\\d+/
         - heading "Pagamento" [level=4]
         - paragraph: À Vista
         - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
         `)
      const statusBadge = page.getByRole('status').filter({ hasText: order.status })

      await expect(statusBadge).toHaveClass(/bg-green-100/)
      await expect(statusBadge).toHaveClass(/text-green-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

   })

   test('Deve consultar um pedido reprovado', async ({ page }) => {

      // Test Data
      const order = {
         number: 'VLO-DOW0ZN',
         status: 'REPROVADO',
         color: 'Midnight Black',
         wheels: 'sport Wheels',
         customer: {
            name: 'Maria Aparecida',
            email: 'maria@live.com'
         },
         payment: 'À vista'

      }

      // -------------------->  Act
      //Preencher o campo de busca de pedido
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)

      //Clicar no botão de busca de pedido
      await page.getByRole('button', { name: 'Buscar Pedido' }).click()

      // -------------------->  Assert
      //Verificar se o pedido foi encontrado
      await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
         - img
         - paragraph: Pedido
         - paragraph: ${order.number}
         - status:
            - img
            - text: ${order.status}
         - img "Velô Sprint"
         - paragraph: Modelo
         - paragraph: Velô Sprint
         - paragraph: Cor
         - paragraph: ${order.color}
         - paragraph: Interior
         - paragraph: cream
         - paragraph: Rodas
         - paragraph: ${order.wheels}
         - heading "Dados do Cliente" [level=4]
         - paragraph: Nome
         - paragraph: ${order.customer.name}
         - paragraph: Email
         - paragraph: ${order.customer.email}
         - paragraph: Loja de Retirada
         - paragraph
         - paragraph: Data do Pedido
         - paragraph: /\\d+\\/\\d+\\/\\d+/
         - heading "Pagamento" [level=4]
         - paragraph: À Vista
         - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
         `)

      const statusBadge = page.getByRole('status').filter({ hasText: order.status })

      await expect(statusBadge).toHaveClass(/bg-red-100/)
      await expect(statusBadge).toHaveClass(/text-red-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-x/)

   })

   test('Deve consultar um pedido em análise', async ({ page }) => {

      // Test Data
      const order = {
         number: 'VLO-PWGBSU',
         status: 'EM_ANALISE',
         color: 'Glacier Blue',
         wheels: 'aero Wheels',
         customer: {
            name: 'Andre Reis',
            email: 'andre@live.com'
         },
         payment: 'À vista'

      }

      // -------------------->  Act
      //Preencher o campo de busca de pedido
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)

      //Clicar no botão de busca de pedido
      await page.getByRole('button', { name: 'Buscar Pedido' }).click()

      // -------------------->  Assert
      //Verificar se o pedido foi encontrado
      await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
         - img
         - paragraph: Pedido
         - paragraph: ${order.number}
         - status:
            - img
            - text: ${order.status}
         - img "Velô Sprint"
         - paragraph: Modelo
         - paragraph: Velô Sprint
         - paragraph: Cor
         - paragraph: ${order.color}
         - paragraph: Interior
         - paragraph: cream
         - paragraph: Rodas
         - paragraph: ${order.wheels}
         - heading "Dados do Cliente" [level=4]
         - paragraph: Nome
         - paragraph: ${order.customer.name}
         - paragraph: Email
         - paragraph: ${order.customer.email}
         - paragraph: Loja de Retirada
         - paragraph
         - paragraph: Data do Pedido
         - paragraph: /\\d+\\/\\d+\\/\\d+/
         - heading "Pagamento" [level=4]
         - paragraph: À Vista
         - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
         `)
         const statusBadge = page.getByRole('status').filter({ hasText: order.status })

         await expect(statusBadge).toHaveClass(/bg-amber-100/)
         await expect(statusBadge).toHaveClass(/text-amber-700/)
   
         const statusIcon = statusBadge.locator('svg')
         await expect(statusIcon).toHaveClass(/lucide-clock/)

   })

   test('Deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {
      const order = generateOrderCode()

      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)

      await page.getByRole('button', { name: 'Buscar Pedido' }).click()
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
         - img
         - heading "Pedido não encontrado" [level=3]
         - paragraph: Verifique o número do pedido e tente novamente
         `)
   })

})