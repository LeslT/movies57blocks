// src/setupTests.js
global.importMetaEnv = {
    VITE_API_URL: 'http://localhost:4000/'  // Cambia esto al valor que necesites para tus pruebas
  };
  
  Object.defineProperty(global, 'import.meta', {
    value: { env: global.importMetaEnv },
  });