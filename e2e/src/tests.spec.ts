import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
});


test.describe('Perform login: looking for products..', () => {
  test('Produtcs (1), Shopping Cart icon (2), more than 1 product(3) should be displayed', async ({ page }) => {

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
    await expect(page.getByTestId('inventory-item')).toHaveCount(6);  
  });



  test('First product should be added to the cart  ', async ({ page }) => {
 
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('inventory-item')).toHaveCount(1);

    await page.getByTestId('remove-sauce-labs-backpack').click();
    await expect(page.getByTestId('inventory-item')).toHaveCount(0);;
  });

});



