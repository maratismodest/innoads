import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InnoAds API with Swagger',
      version: '1.0.1',
      description: 'API documentation for InnoAds app',
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
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            categoryId: {
              type: 'integer',
              example: 1,
            },
            price: {
              type: 'integer',
              example: 100,
            },
            title: {
              type: 'string',
              example: 'Title example',
            },
            body: {
              type: 'string',
            },
            preview: {
              type: 'string',
              example: 'https://innoads.ru/images/og-image.png',
            },
            images: {
              type: 'string',
              example:
                'https://innoads.ru/images/og-image.png||https://innoads.ru/images/og-image.png',
            },
            slug: {
              type: 'string',
              example: 'title-example-67',
            },
            published: {
              type: 'boolean',
              default: false,
              example: true,
            },
            userId: {
              type: 'string',
              example: '1945452',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Message: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            post: {
              $ref: '#/components/schemas/Post',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '1945452',
            },
            username: {
              type: 'string',
            },
            posts: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            bans: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Ban',
              },
            },
            role: {
              type: 'string',
              default: 'USER',
              enum: ['USER', 'ADMIN'],
            },
          },
        },
        Ban: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            userId: {
              type: 'string',
            },
            reason: {
              type: ['string', 'null'],
              default: 'Нарушение правил',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Article: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            slug: {
              type: 'string',
              example: 'inno-ads-slug',
            },
            title: {
              type: 'string',
              example: 'Title',
            },
            body: {
              type: 'string',
              example: '<div>Body</div>',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            label: {
              type: 'string',
            },
            image: {
              type: 'string',
            },
            posts: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
            },
          },
        },
        Log: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            message: {
              type: 'string',
            },
          },
        },
      },
      properties: {
        post: {
          $ref: '#/components/schemas/Post',
        },
        message: {
          $ref: '#/components/schemas/Message',
        },
        user: {
          $ref: '#/components/schemas/User',
        },
        ban: {
          $ref: '#/components/schemas/Ban',
        },
        article: {
          $ref: '#/components/schemas/Article',
        },
        category: {
          $ref: '#/components/schemas/Category',
        },
        log: {
          $ref: '#/components/schemas/Log',
        },
      },
    },
  },
  apis: ['./app/api/**/*.ts'], // Path to the API routes
};

export const getApiDocs = async () => {
  const swaggerSpec = swaggerJsdoc(options);
  return swaggerSpec;
};
