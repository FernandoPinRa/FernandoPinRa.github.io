import { YearMonthPipe } from './year-month.pipe';

describe('YearMonthPipe', () => {
  const pipe = new YearMonthPipe();

  it('formats in the requested language', () => {
    expect(pipe.transform('2023-08', 'en')).toBe('Aug 2023');
    expect(pipe.transform('2023-08', 'es')).toMatch(/^ago 2023$/);
  });

  it('is not shifted by time zones at month boundaries', () => {
    expect(pipe.transform('2022-01', 'en')).toBe('Jan 2022');
  });
});
