import { DiscountPipe } from './discount-pipe';

describe('DiscountPipe', () => {
  let pipe: DiscountPipe;

  beforeEach(() => {
    pipe = new DiscountPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform number to discount format', () => {
    expect(pipe.transform(20)).toBe('-20%');
    expect(pipe.transform(50)).toBe('-50%');
    expect(pipe.transform(10)).toBe('-10%');
  });

  it('should handle zero value', () => {
    expect(pipe.transform(0)).toBe('-0%');
  });

  it('should handle decimal values', () => {
    expect(pipe.transform(15.5)).toBe('-15.5%');
    expect(pipe.transform(33.33)).toBe('-33.33%');
  });

  it('should handle large values', () => {
    expect(pipe.transform(100)).toBe('-100%');
  });
});
