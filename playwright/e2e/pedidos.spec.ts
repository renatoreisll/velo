import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { Navbar } from '../support/components/Navbar'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage'

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
    orderLockupPage.validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {
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

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
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

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {
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

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {
    const orderCode = 'XYZ-999-INVALIDO'

    await orderLockupPage.searchOrder(orderCode)
    await orderLockupPage.validateOrderNotFound()
  })
})