import { test } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'

import type { OrderDetails } from '../support/actions/orderLockupActions'

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-RBAQSL',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Renato Reis',
        email: 'renatoreis@live.com'
      },
      payment: 'À Vista'
    }

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-DOW0ZN',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Maria Aparecida',
        email: 'maria@live.com'
      },
      payment: 'À Vista'
    }

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-PWGBSU',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Andre Reis',
        email: 'andre@live.com'
      },
      payment: 'À Vista'
    }

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
})
