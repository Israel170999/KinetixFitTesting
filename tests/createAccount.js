const { test, expect } = require('@playwright/test');

test('Happy Path: Creación de cuenta', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Registro' }).click();

  // Captura antes de llenar el form
  const bufferAntes = await page.screenshot();
  await testInfo.attach('Estado Inicial', { body: bufferAntes, contentType: 'image/png' });
  
  
  await page.getByRole('textbox', { name: 'Nombre'}).fill('Israel');
  await page.getByRole('textbox', { name: 'Apellido'}).fill('Espinosa');
  await page.getByRole('textbox', { name: 'Teléfono'}).fill('5521236589');
  await page.getByRole('textbox', { name: 'Correo Electrónico'}).fill('israel@gmail.com');
  await page.locator('input[type="password"]').first().fill('Hola123!');
  await page.getByPlaceholder('Confirmar contraseña').fill('Hola123!');
  await page.getByRole('button', { name: 'CREAR CUENTA' }).click();

  // Captura después de loguearse

  const bufferDespues = await page.screenshot();
  await testInfo.attach('Tras el Login', { body: bufferDespues, contentType: 'image/png' });

  await expect(page).toHaveURL(/.*login/);
  // Al final del test, después de loguear o crear la cuenta
  await page.context().storageState({ path: '.auth/user.json' });
});