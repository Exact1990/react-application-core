import { staticInjector } from '../../di';
import { DateConverter } from './date-converter.service';

const dateConverter = staticInjector(DateConverter);

describe('date-converter.service', () => {
  describe('fromDateToUiDate', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateToUiDate('2036-07-31');               // Moscow, Russia
      expect(value).toEqual('2036-07-31');                                      // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateToUiDate(new Date('2036-07-31'));     // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                      // Los Angeles, USA
    });
  });

  describe('fromDateTimeToUiDate', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateTimeToUiDate('2036-07-31T00:00:00+03:00');               // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                         // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateTimeToUiDate(new Date('2036-07-31T00:00:00+03:00'));     // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                         // Los Angeles, USA
    });
  });

  describe('fromDateTimeToUiDateTime', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateTimeToUiDateTime('2036-07-31T00:00:00+03:00');           // Moscow, Russia
      expect(value).toEqual('2036-07-30 14:00:00');                                                // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateTimeToUiDateTime(new Date('2036-07-31T00:00:00+03:00')); // Moscow, Russia
      expect(value).toEqual('2036-07-30 14:00:00');                                                // Los Angeles, USA
    });
  });

  describe('from30DaysAgoUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.from30DaysAgoUiDateTimeToDateTime();
      expect(value).toEqual('2036-07-31T00:00:00-07:00');
    });
  });

  describe('fromStartUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.fromStartUiDateTimeToDateTime('2018-01-31');
      expect(value).toEqual('2018-01-31T00:00:00-08:00');
    });
    it('test2', () => {
      const value = dateConverter.fromStartUiDateTimeToDateTime('2018-01-31', '21:58:59');
      expect(value).toEqual('2018-01-31T21:58:59-08:00');
    });
  });

  describe('fromEndUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.fromEndUiDateTimeToDateTime('2018-01-31');
      expect(value).toEqual('2018-01-31T23:59:59-08:00');
    });
    it('test2', () => {
      const value = dateConverter.fromEndUiDateTimeToDateTime('2018-01-31', '21:58:59');
      expect(value).toEqual('2018-01-31T21:58:59-08:00');
    });
  });

  describe('getCurrentDate', () => {
    it('test1', () => {
      const value = dateConverter.getCurrentDate();
      expect(value).toEqual(new Date('Aug 30 2036 00:00:00 GMT-0800'));
    });
  });
});
