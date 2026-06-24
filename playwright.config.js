// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'], 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  use: {
    baseURL: 'https://kinetixsports.netlify.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
  },

    projects: [
    // Proyecto 1: Crear la cuenta y guardar el estado
    {
      name: 'setup',
      testMatch: /createAccount\.spec\.js/,
    },
    // Proyecto 2: Ejecutar los tests usando el estado guardado
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Asegúrate de que esta ruta coincida exactamente con donde guardarás el archivo
        storageState: '.auth/user.json', 
      
      dependencies: ['setup'], // Esto asegura que primero se ejecute el setup
    
     },
    },
  ],
});