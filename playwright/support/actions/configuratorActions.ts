import { Page, expect } from '@playwright/test'

export type ExteriorColor = 'glacier-blue' | 'midnight-black' | 'lunar-white'
export type WheelType = 'aero' | 'sport'
export type OptionalFeature = 'precision-park' | 'flux-capacitor'

export function createConfiguratorActions(page: Page) {

  const totalPrice = page.getByTestId('total-price')
  const carImage = page.getByTestId('car-exterior-image')
  const checkoutButton = page.getByTestId('checkout-button')

  const colorOption = (color: ExteriorColor) => page.getByTestId(`color-option-${color}`)
  const wheelOption = (wheel: WheelType) => page.getByTestId(`wheel-option-${wheel}`)
  const optionalOption = (opt: OptionalFeature) => page.getByTestId(`opt-${opt}`)

  return {

    elements: {
      totalPrice,
      carImage,
      checkoutButton,
      colorOption,
      wheelOption,
      optionalOption,
    },

    async open() {
      await page.goto('/configure')
      await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
    },

    async selectColor(color: ExteriorColor) {
      await colorOption(color).click()
      await expect(carImage).toHaveAttribute('alt', new RegExp(`- ${color} with `))
    },

    async selectWheel(wheel: WheelType) {
      await wheelOption(wheel).click()
      await expect(carImage).toHaveAttribute('alt', new RegExp(` with ${wheel} wheels`))
    },

    async toggleOptional(opt: OptionalFeature) {
      const target = optionalOption(opt)
      const current = await target.getAttribute('data-state')
      const next = current === 'checked' ? 'unchecked' : 'checked'
      await target.click()
      await expect(target).toHaveAttribute('data-state', next)
    },

    async goToCheckout() {
      await checkoutButton.click()
      await expect(page).toHaveURL(/\/order$/)
    },

    async validateTotalPrice(price: string) {
      await expect(totalPrice).toHaveText(price)
    },
  }
}
