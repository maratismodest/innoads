import { initialArticles } from '@/prisma/seed/seedItems/initialArticles';
import { initialPosts } from '@/prisma/seed/seedItems/initialPosts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.article.deleteMany();

  for (const article of initialArticles) {
    await prisma.article.create({
      data: article,
    });
  }

  // await prisma.category.deleteMany();
  //
  // for (const category of initialCategories) {
  //   await prisma.category.create({
  //     data: category,
  //   });
  // }

  // await prisma.user.deleteMany();
  // for (const user of initialUsers) {
  //   await prisma.user.create({
  //     data: user,
  //   });
  // }
  //

  await prisma.message.deleteMany();

  await prisma.post.deleteMany();
  for (const post of initialPosts) {
    await prisma.post.create({
      data: post,
    });
  }
};

seed().then(() => console.log('seed finished'));
