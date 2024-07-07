import { describe, expect, it } from '@jest/globals';
import hasCurseWords from '@/utils/curseWords'; // Adjust the import path as needed
import { Post } from '@prisma/client';

type Props = Pick<Post, 'title' | 'body' | 'price' | 'categoryId'>;

describe('hasCurseWords function', () => {
  it('should detect curse words in title and body', () => {
    const postWithCurseWords: Props = {
      title: 'Avoiding curse words',
      body: 'This body contains a bad word like онанист',
      price: 100,
      categoryId: 1,
    };

    expect(hasCurseWords(postWithCurseWords)).toBe(true);
  });

  it('should not detect curse words in a clean title and body', () => {
    const cleanPost: Props = {
      title: 'How to write clean code',
      body: 'This is a clean text without any offensive words.',
      price: 0,
      categoryId: 0,
    };

    expect(hasCurseWords(cleanPost)).toBe(false);
  });

  it('should handle empty title and body', () => {
    const emptyPost: Props = {
      title: '',
      body: '',
      price: 0,
      categoryId: 0,
    };

    expect(hasCurseWords(emptyPost)).toBe(false);
  });

  it('should handle title and body with only special characters', () => {
    const specialCharactersPost: Props = {
      title: '!!!',
      body: '###',
      price: 0,
      categoryId: 0,
    };

    expect(hasCurseWords(specialCharactersPost)).toBe(false);
  });

  it('should handle words that are not curse words', () => {
    const goodWordsPost: Props = {
      title: 'No bad words here',
      body: 'This text contains normal and good words like дезмонда',
      price: 0,
      categoryId: 0,
    };

    expect(hasCurseWords(goodWordsPost)).toBe(false);
  });

  // Additional test cases for individual helper functions could be added here
  // to ensure they work as expected
});
