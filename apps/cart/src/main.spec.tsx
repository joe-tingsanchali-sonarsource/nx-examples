// Mock ReactDOM and the DOM before importing main
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

// Create a mock root element
const mockRoot = document.createElement('div');
mockRoot.id = 'root';
document.body.appendChild(mockRoot);

import { checkEqual } from './main';

describe('checkEqual', () => {
  describe('when values are strictly equal', () => {
    it('should return "Equal" for identical numbers', () => {
      expect(checkEqual(5, 5)).toBe('Equal');
    });

    it('should return "Equal" for identical strings', () => {
      expect(checkEqual('hello', 'hello')).toBe('Equal');
    });

    it('should return "Equal" for identical booleans', () => {
      expect(checkEqual(true, true)).toBe('Equal');
      expect(checkEqual(false, false)).toBe('Equal');
    });

    it('should return "Equal" for same object reference', () => {
      const obj = { name: 'test' };
      expect(checkEqual(obj, obj)).toBe('Equal');
    });
  });

  describe('when values are not equal', () => {
    it('should return "Not equal" for different numbers', () => {
      expect(checkEqual(5, 10)).toBe('Not equal');
    });

    it('should return "Not equal" for different strings', () => {
      expect(checkEqual('hello', 'world')).toBe('Not equal');
    });

    it('should return "Not equal" for different booleans', () => {
      expect(checkEqual(true, false)).toBe('Not equal');
    });

    it('should return "Not equal" for different object references', () => {
      expect(checkEqual({ name: 'test' }, { name: 'test' })).toBe('Not equal');
    });
  });

  describe('when using loose equality (type coercion)', () => {
    it('should return "Equal" for number and string with same value', () => {
      // This demonstrates the issue with using == instead of ===
      expect(checkEqual(5, '5')).toBe('Equal');
    });

    it('should return "Equal" for 0 and empty string', () => {
      // This demonstrates the issue with using == instead of ===
      expect(checkEqual(0, '')).toBe('Equal');
    });

    it('should return "Equal" for false and 0', () => {
      // This demonstrates the issue with using == instead of ===
      expect(checkEqual(false, 0)).toBe('Equal');
    });

    it('should return "Equal" for null and undefined', () => {
      // This demonstrates the issue with using == instead of ===
      expect(checkEqual(null, undefined)).toBe('Equal');
    });

    it('should return "Equal" for true and 1', () => {
      // This demonstrates the issue with using == instead of ===
      expect(checkEqual(true, 1)).toBe('Equal');
    });

    it('should return "Equal" for empty array and empty string', () => {
      // This demonstrates the issue with using == instead of ===
      expect(checkEqual([], '')).toBe('Equal');
    });
  });

  describe('edge cases', () => {
    it('should handle NaN comparison', () => {
      // NaN is never equal to anything, including itself
      expect(checkEqual(NaN, NaN)).toBe('Not equal');
    });

    it('should handle positive and negative zero', () => {
      expect(checkEqual(0, -0)).toBe('Equal');
    });

    it('should handle undefined values', () => {
      expect(checkEqual(undefined, undefined)).toBe('Equal');
    });

    it('should handle null values', () => {
      expect(checkEqual(null, null)).toBe('Equal');
    });
  });
});

