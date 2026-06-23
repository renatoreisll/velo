import { test, expect } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'

import type { OrderDetails } from '../support/actions/orderLockupActions'

import { seedOrders } from '../support/database/seed'

import ordersData from '../support/fixtures/orders.json' assert { type: 'json' }

test.describe.serial('Consulta de Pedido', () => {

  test.beforeAll(async () => {
    await seedOrders()
  })

  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order = ordersData.aprovado as OrderDetails

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order = ordersData.reprovado as OrderDetails

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order = ordersData.emAnalise as OrderDetails

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()

    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    const orderCode = 'XYZ-999-INVALIDO'

    await app.orderLockup.searchOrder(orderCode)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve manter o botão de busca desabilitado com o campo vazio ou apenas espaços', async ({ app, page }) => {
    const button = app.orderLockup.elements.searchButton
    await expect(app.orderLockup.elements.searchButton).toBeDisabled()

    await app.orderLockup.elements.orderInput.fill('   ')
    await expect(button).toBeDisabled()
  })
})
