// src/setupTests.js
global.importMetaEnv = {
    VITE_API_URL: 'http://your-mock-api-url.com'  // Cambia esto al valor que necesites para tus pruebas
  };
  
  Object.defineProperty(global, 'import.meta', {
    value: { env: global.importMetaEnv },
  });