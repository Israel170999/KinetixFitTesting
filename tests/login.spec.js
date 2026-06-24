const { test, expect } = require('@playwright/test');

test('Happy Path: Inicio de sesión con capturas', async ({ page }, testInfo) => {
  await page.goto('/login');

  // Captura antes de llenar el form
  const bufferAntes = await page.screenshot();
  await testInfo.attach('Estado Inicial', { body: bufferAntes, contentType: 'image/png' });

  await page.getByLabel('Usuario o Correo').fill('Israel');
  await page.getByLabel('Contraseña').fill('Hola123!');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Captura después de loguearse
  const bufferDespues = await page.screenshot();
  await testInfo.attach('Tras el Login', { body: bufferDespues, contentType: 'image/png' });

  await expect(page).toHaveURL(/.index/);
});