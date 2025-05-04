import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion api adoption pets',
            version: '1.0.0',
            description: 'API documentation for my application',
        },
     
       
    },
    apis:["./src/docs/**/*.yaml"],
}

   
export const specs = swaggerJsDoc(swaggerOptions);