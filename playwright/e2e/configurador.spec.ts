import { test } from '../support/fixtures'

test.describe('CT02 - Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base', () => {

  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve refletir cores e rodas "Sport" corretamente no preço de venda', async ({ app }) => {
    // Passo 1: o preço inicial deve ser R$ 40.000,00 (cor padrão + rodas Aero)
    await app.configurator.validateTotalPrice('R$ 40.000,00')

    // Passo 2: trocar a cor do exterior não altera o preço base
    await app.configurator.selectColor('midnight-black')
    await app.configurator.validateTotalPrice('R$ 40.000,00')

    // Passo 3: rodas "Sport" acrescentam exatamente R$ 2.000,00 (Total R$ 42.000,00)
    await app.configurator.selectWheel('sport')
    await app.configurator.validateTotalPrice('R$ 42.000,00')

    // Passo 4: voltar para "Aero" decrementa R$ 2.000,00 (Total R$ 40.000,00)
    await app.configurator.selectWheel('aero')
    await app.configurator.validateTotalPrice('R$ 40.000,00')
  })
})
