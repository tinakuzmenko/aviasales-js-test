import { getTimeFromDate } from '../dates';

describe('getTimeFromDate', () => {
  it('should work correctly', () => {
    const date = '2020-10-12T11:57:00.000Z';

    expect(getTimeFromDate(date)).not.toBeUndefined();
  });
});
