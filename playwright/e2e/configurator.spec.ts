import { test, expect } from '../support/fixtures'

test.describe('Configuração do Veículo', () => {

  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ app }) => {
    await expect(app.configurator.elements.totalPrice).toBeVisible()
    await app.configurator.validateTotalPrice('R$ 40.000,00')

    await app.configurator.selectColor('midnight-black')
    await app.configurator.validateTotalPrice('R$ 40.000,00')
  })

  test('deve atualizar o preço e a imagem ao alterar as rodas e restaurar os valores padrões', async ({ app }) => {
    await app.configurator.validateTotalPrice('R$ 40.000,00')

    await app.configurator.selectWheel('sport')
    await app.configurator.validateTotalPrice('R$ 42.000,00')

    await app.configurator.selectWheel('aero')
    await app.configurator.validateTotalPrice('R$ 40.000,00')
  })

  test('deve atualizar o preço ao marcar/desmarcar opcionais e redirecionar ao checkout', async ({ app }) => {
    await app.configurator.validateTotalPrice('R$ 40.000,00')

    await app.configurator.toggleOptional('precision-park')
    await app.configurator.validateTotalPrice('R$ 45.500,00')

    await app.configurator.toggleOptional('flux-capacitor')
    await app.configurator.validateTotalPrice('R$ 50.500,00')

    await app.configurator.toggleOptional('precision-park')
    await app.configurator.toggleOptional('flux-capacitor')
    await app.configurator.validateTotalPrice('R$ 40.000,00')

    await app.configurator.goToCheckout()
  })
})
