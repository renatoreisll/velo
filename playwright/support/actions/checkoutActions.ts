import { Page, expect } from "@playwright/test";

export function createCheckoutActions(page: Page) {
    return {
        async expectLoaded() {
            await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
        },
        async expectSummaryTotal(price: string) {
            await expect(page.getByTestId('summary-total-price')).toHaveText(price)
        },
        async fillPersonalData(data: {
            name: string
            lastname: string
            email: string
            phone: string
            document: string
        }) {
            await page.getByTestId('checkout-name').fill(data.name)
            await page.getByTestId('checkout-lastname').fill(data.lastname)
            await page.getByTestId('checkout-email').fill(data.email)
            await page.getByTestId('checkout-phone').fill(data.phone)
            await page.getByTestId('checkout-document').fill(data.document)
        },

        async selectStore(storeName: string) {
            await page.getByTestId('checkout-store').click()
            await page.getByRole('option', { name: storeName }).click()
        },

        async acceptTerms() {
            await page.getByTestId('checkout-terms').check()
        },

        async submit() {
            await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
        },

        alerts: {
            async expectName(message: string) {
                await expect(page.getByTestId('error-name')).toHaveText(message)
            },
            async expectLastName(message: string) {
                await expect(page.getByTestId('error-lastname')).toHaveText(message)
            },
            async expectEmail(message: string) {
                await expect(page.getByTestId('error-email')).toHaveText(message)
            },
            async expectPhone(message: string) {
                await expect(page.getByTestId('error-phone')).toHaveText(message)
            },
            async expectDocument(message: string) {
                await expect(page.getByTestId('error-document')).toHaveText(message)
            },
            async expectStore(message: string) {
                await expect(page.getByTestId('error-store')).toHaveText(message)
            },
            async expectTerms(message: string) {
                await expect(page.getByTestId('error-terms')).toHaveText(message)
            }
        }
    }
}