import { test, expect } from '../support/fixtures'

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/order')
    await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
  })

  test.describe('Campos obrigatórios', () => {

    test('deve validar obrigatoriedade de todos os campos em branco', async ({ page, app }) => {
      await app.checkout.submit()

      await app.checkout.alerts.expectName('Nome deve ter pelo menos 2 caracteres')
      await app.checkout.alerts.expectLastName('Sobrenome deve ter pelo menos 2 caracteres')
      await app.checkout.alerts.expectEmail('Email inválido')
      await app.checkout.alerts.expectPhone('Telefone inválido')
      await app.checkout.alerts.expectDocument('CPF inválido')
      await app.checkout.alerts.expectStore('Selecione uma loja')
      await app.checkout.alerts.expectTerms('Aceite os termos')
    })

    test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ page, app }) => {
      await app.checkout.fillPersonalData({
        name: 'A',
        lastname: 'B',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        document: '529.982.247-25'
      })
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      await app.checkout.submit()

      await app.checkout.alerts.expectName('Nome deve ter pelo menos 2 caracteres')
      await app.checkout.alerts.expectLastName('Sobrenome deve ter pelo menos 2 caracteres')
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ page, app }) => {
      await app.checkout.fillPersonalData({
        name: 'João',
        lastname: 'Silva',
        email: 'cliente@.com',
        phone: '(11) 99999-9999',
        document: '529.982.247-25'
      })
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      await app.checkout.submit()

      await app.checkout.alerts.expectEmail('Email inválido')
    })

    test('deve exibir erro para CPF inválido', async ({ page, app }) => {
      await app.checkout.fillPersonalData({
        name: 'João',
        lastname: 'Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        document: '123'
      })
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      await app.checkout.submit()

      await app.checkout.alerts.expectDocument('CPF inválido')
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ page, app }) => {
      await app.checkout.fillPersonalData({
        name: 'João',
        lastname: 'Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        document: '529.982.247-25'
      })
      await app.checkout.selectStore('Velô Paulista')

      // NÃO aceitamos os termos intencionalmente
      await app.checkout.submit()

      await app.checkout.alerts.expectTerms('Aceite os termos')
    })
  })
})