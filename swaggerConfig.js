// swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [{
      url:"http://localhost:5000/" 
  },
],
    info: {
      title: 'Trackmeals (CH2-PS338)',
      version: '1.0.0',
      description: '“Your Personalized Nutrition: Seamlessly Track Your Daily Intake”',
    },
  },
  apis: ['./api_swagger.js'], // Sesuaikan dengan struktur folder dan file Anda
};

const specs = swaggerJsdoc(options);

export default specs;
