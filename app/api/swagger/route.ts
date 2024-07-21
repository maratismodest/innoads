import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API with Swagger',
      version: '1.0.0',
      description: 'API documentation for my Next.js app',
    },
  },
  apis: ['./app/api/**/*.ts'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
