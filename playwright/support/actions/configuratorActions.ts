import { Page, expect } from '@playwright/test'

export type ExteriorColor = 'glacier-blue' | 'midnight-black' | 'lunar-white'
export type WheelType = 'aero' | 'sport'

export function createConfiguratorActions(page: Page) {

  const totalPrice = page.getByTestId('total-price')
  const carImage = page.getByTestId('car-exterior-image')
  const checkoutButton = page.getByTestId('checkout-button')

  const colorOption = (color: ExteriorColor) => page.getByTestId(`color-option-${color}`)
  const wheelOption = (wheel: WheelType) => page.getByTestId(`wheel-option-${wheel}`)

  return {

    elements: {
      totalPrice,
      carImage,
      checkoutButton,
      colorOption,
      wheelOption,
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

    async validateTotalPrice(price: string) {
      await expect(totalPrice).toHaveText(price)
    },
  }
}
