import { createSwaggerSpec } from 'next-swagger-doc';

const ID = 1;
const USER_ID = '1043273488';
const PRICE = 300;
// const TITLE = 'Title';

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
          Post: {
            type: 'object',
            $ref: '#/components/schemas/Post',
            properties: {
              id: {
                type: 'integer',
                example: ID,
              },
              categoryId: {
                type: 'integer',
                example: ID,
              },
              price: {
                type: 'integer',
                example: PRICE,
              },
              title: {
                type: 'string',
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
                example: 'title-36',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
              },
              published: {
                type: 'boolean',
                default: false,
                example: true,
              },
              userId: {
                type: 'number',
                example: USER_ID,
              },
              messages: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Message',
                },
              },
            },
          },
          Message: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: ID,
              },
              post: {
                $ref: '#/components/schemas/Post',
              },
            },
          },
          User: {
            type: 'object',
            $ref: '#/components/schemas/User',
            properties: {
              id: {
                type: 'string',
                example: USER_ID,
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
              },
              user: {
                $ref: '#/components/schemas/User',
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
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
              },
              slug: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              body: {
                type: 'string',
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
      },
      security: [],
      paths: {},
    },
  });
  return spec;
};
