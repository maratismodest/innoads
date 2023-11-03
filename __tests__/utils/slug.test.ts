import { describe, expect, it } from '@jest/globals';
import slug from '@/utils/slug'; // Adjust the import path as needed

describe('slug function', () => {
  it('should convert Cyrillic characters to Latin equivalents', () => {
    expect(slug('Привет, мир!')).toBe('privet-mir');
  });

  it('should handle uppercase and lowercase characters properly', () => {
    expect(slug('СЛУЖБА')).toBe('sluzhba');
    expect(slug('Россия')).toBe('rossiya');
  });

  it('should handle characters not present in the conversion rules', () => {
    expect(slug('Ceviri')).toBe('ceviri');
  });

  it('should remove special characters except spaces and hyphens', () => {
    expect(slug('Test & Check')).toBe('test-check');
  });

  it('should handle an empty string', () => {
    expect(slug('')).toBe('');
  });

  it('should handle strings with only special characters', () => {
    expect(slug('!@#$%^&*()')).toBe('');
  });
});
