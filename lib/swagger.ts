import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'InnoAds Swagger API',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          Article: {
            type: 'object',
            required: ['id', 'slug', 'title', 'description'],
            properties: {
              id: {
                type: 'number',
                example: 1,
              },
              slug: {
                type: 'string',
                example: 'article-slug',
              },
              title: {
                type: 'string',
                example: 'Title',
              },
              description: {
                type: 'string',
                example: 'Description',
              },
            },
          },
        },
      },
      security: [],
      paths: {},
    },
  });
  return spec;
};
