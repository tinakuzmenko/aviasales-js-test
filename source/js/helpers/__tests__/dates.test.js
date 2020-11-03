import { getTimeFromDate } from '../dates';

describe('getTimeFromDate', () => {
  it('should format dates correctly', () => {
    const date1 = '2020-10-12T11:57:00.000Z';

    expect(getTimeFromDate(date1)).not.toBeUndefined();
    expect(getTimeFromDate(date1)).toBe('13:57');

    const date2 = '2020-10-21T08:33:01.000Z';

    expect(getTimeFromDate(date2)).not.toBeUndefined();
    expect(getTimeFromDate(date2)).toBe('10:33');
  });

  it('should format dates correctly', () => {});
});
