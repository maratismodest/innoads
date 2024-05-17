import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialCategories: Category[] = [
  {
    id: 1,
    name: 'sell',
    label: 'Продам',
    image: 'https://chamala.tatar/uploads/sell.png',
  },
  {
    id: 2,
    name: 'buy',
    label: 'Куплю',
    image: 'https://chamala.tatar/uploads/buy.png',
  },
  {
    id: 3,
    name: 'services',
    label: 'Услуги',
    image: 'https://chamala.tatar/uploads/services.png',
  },
  {
    id: 5,
    name: 'estate',
    label: 'Недвижимость',
    image: 'https://chamala.tatar/uploads/estate.png',
  },
  {
    id: 6,
    name: 'clothes',
    label: 'Одежда',
    image: 'https://chamala.tatar/uploads/clothes.png',
  },
  {
    id: 7,
    name: 'free',
    label: 'Даром',
    image: 'https://chamala.tatar/uploads/free.png',
  },
];

const seed = async () => {
  await prisma.category.deleteMany();

  for (const category of initialCategories) {
    await prisma.category.create({
      data: category,
    });
  }
};

seed();
