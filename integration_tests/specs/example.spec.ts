import { expect, test } from '@playwright/test'
import manageAResidentApi from '../mockApis/manageAResidentApi'

import { login, resetStubs } from '../testUtils'
import ExamplePage from '../pages/examplePage'

test.describe('Example', () => {
  test.afterEach(async () => {
    await resetStubs()
  })

  test('The message from hello-world endpoint in MAR API is visible on page', async ({ page }) => {
    await manageAResidentApi.stubHelloWorld()
    await login(page)

    const examplePage = await ExamplePage.verifyOnPage(page)

    expect(examplePage.message).toHaveText('Hello World!')
  })

  test('MAR API failure shows error page', async ({ page }) => {
    await manageAResidentApi.stubHelloWorld500()

    await login(page)

    await expect(page.locator('h1', { hasText: 'Internal Server Error' })).toBeVisible()
  })
})
