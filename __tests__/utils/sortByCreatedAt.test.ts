import { describe, expect, it } from '@jest/globals';
import sortByCreatedAt from '@/utils/sortByCreatedAt'; // Adjust the import path as needed

describe('sortByCreatedAt function', () => {
  it('should sort items by createdAt in descending order', () => {
    const items = [
      { createdAt: '2023-11-01T12:00:00' },
      { createdAt: '2023-11-03T08:00:00' },
      { createdAt: '2023-11-02T18:30:00' },
    ];

    const sortedItems = sortByCreatedAt(items);

    expect(sortedItems).toEqual([
      { createdAt: '2023-11-03T08:00:00' },
      { createdAt: '2023-11-02T18:30:00' },
      { createdAt: '2023-11-01T12:00:00' },
    ]);
  });

  it('should handle empty array', () => {
    const items: any[] = [];
    const sortedItems = sortByCreatedAt(items);

    expect(sortedItems).toEqual([]);
  });

  it('should handle array with a single item', () => {
    const items = [{ createdAt: '2023-11-01T12:00:00' }];
    const sortedItems = sortByCreatedAt(items);

    expect(sortedItems).toEqual([{ createdAt: '2023-11-01T12:00:00' }]);
  });

  it('should handle items with the same createdAt date', () => {
    const items = [{ createdAt: '2023-11-01T12:00:00' }, { createdAt: '2023-11-01T12:00:00' }];

    const sortedItems = sortByCreatedAt(items);

    expect(sortedItems).toEqual([
      { createdAt: '2023-11-01T12:00:00' },
      { createdAt: '2023-11-01T12:00:00' },
    ]);
  });
});
