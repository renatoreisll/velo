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

  test.describe('Fluxo de Sucesso', () => {

    const validPersonalData = {
      name: 'João',
      lastname: 'Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      document: '529.982.247-25'
    }

    test('CT05 - Checkout e Confirmação - Pagamento à Vista', async ({ page, app }) => {
      // Step 1: Preencher o formulário com dados válidos e selecionar a loja
      await app.checkout.fillPersonalData(validPersonalData)
      await app.checkout.selectStore('Velô Paulista')

      // Verificar que não há erros de validação
      await expect(page.getByTestId('error-name')).not.toBeVisible()
      await expect(page.getByTestId('error-lastname')).not.toBeVisible()
      await expect(page.getByTestId('error-email')).not.toBeVisible()
      await expect(page.getByTestId('error-phone')).not.toBeVisible()
      await expect(page.getByTestId('error-document')).not.toBeVisible()
      await expect(page.getByTestId('error-store')).not.toBeVisible()

      // Step 2: Selecionar a aba "À Vista" na Forma de Pagamento
      await app.checkout.selectPaymentAvista()

      // O valor total de "Resumo" e "À Vista" exibem R$ 40.000,00
      const priceRegex = /R\$\s*40\.000,00/
      await app.checkout.expectSummaryTotal(priceRegex)
      await app.checkout.expectPaymentAvistaTotal(priceRegex)

      // Step 3: Marcar o aceite dos termos de uso e clicar em "Confirmar Pedido"
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // O botão mostra status de carregamento e o pedido é direcionado para a página de Confirmação (/success)
      await expect(page.getByRole('button', { name: 'Processando...' })).toBeVisible()
      await expect(page).toHaveURL(/\/success/)
    })
  })
})