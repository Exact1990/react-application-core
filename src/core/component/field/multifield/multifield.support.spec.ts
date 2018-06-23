import {
  toEntityIds,
  toMultiItemEntities,
  toActualMultiItemEntitiesLength,
  buildMultiEditItemEntityPayload,
} from './multifield.support';
import { UNDEF } from '../../../definitions.interface';

describe('multifield.support', () => {

  describe('buildMultiEditItemEntityPayload', () => {
    it('test1', () => {
      const entity = Object.freeze({id: 1, count: 100});
      const result = buildMultiEditItemEntityPayload(
        'count',
        [entity],
        (itm) => itm.id === entity.id,
        (itm) => entity.count + 1
      );
      expect(result).toEqual({id: 1, value: 101, name: 'count', rawData: {id: 1, count: 100}});
    });

    it('test2', () => {
      const entity = Object.freeze({id: 1, count: 100});
      const result = buildMultiEditItemEntityPayload(
        'count',
        {
          add: [],
          remove: [],
          edit: [{id: entity.id, name: 'count', value: 101, rawData: entity}],
          source: [entity],
        },
        (itm) => itm.id === entity.id,
        (itm) => itm.value + 1
      );
      expect(result).toEqual({id: 1, value: 102, name: 'count', rawData: {id: 1, count: 100}});
    });
  });

  describe('toMultiItemEntities', function () {
    it('test1', function () {
      var ids = toMultiItemEntities(1);
      expect(ids).toEqual([{ id: 1 }]);
    });

    it('test2', function () {
      var ids = toMultiItemEntities([{ id: 1 }]);
      expect(ids).toEqual([{ id: 1 }]);
    });
  });

  describe('toActualMultiItemEntitiesLength', function () {
    it('test1', function () {
      var length = toActualMultiItemEntitiesLength(1);
      expect(length).toEqual(1);
    });

    it('test2', function () {
      var length = toActualMultiItemEntitiesLength('1');
      expect(length).toEqual(1);
    });

    it('test3', function () {
      var length = toActualMultiItemEntitiesLength([{ id: 1 }, { id: 2 }]);
      expect(length).toEqual(2);
    });

    it('test4', function () {
      var length = toActualMultiItemEntitiesLength(UNDEF);
      expect(length).toEqual(0);
    });

    it('test5', function () {
      var length = toActualMultiItemEntitiesLength({
        add: [{ id: 1 }],
        remove: [{ id: 2 }],
        edit: [],
        source: [{ id: 3 }],
      });
      expect(length).toEqual(2);
    });

    it('test6', function () {
      var length = toActualMultiItemEntitiesLength({
        add: [{ id: 1 }],
        remove: [{ id: 2 }],
        edit: [],
      });
      expect(length).toEqual(1);
    });

    it('test7', function () {
      var length = toActualMultiItemEntitiesLength({
        add: [{ id: 1 }, { id: 3 }],
        remove: [{ id: 2 }],
        edit: [],
      });
      expect(length).toEqual(2);
    });

    it('test8', function () {
      var length = toActualMultiItemEntitiesLength({
        add: [],
        remove: [{ id: 1 }],
        edit: [],
      });
      expect(length).toEqual(0);
    });

    it('test9', function () {
      var length = toActualMultiItemEntitiesLength({
        add: [],
        remove: [{ id: 1 }],
        edit: [],
        source: [{ id: 2 }],
      });
      expect(length).toEqual(1);
    });
  });

  describe('toEntityIds', function () {
    it('test1', function () {
      var ids = toEntityIds({
        add: [],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([]);
    });

    it('test2', function () {
      var ids = toEntityIds({
        add: [],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([]);
    });

    it('test3', function () {
      var ids = toEntityIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test4', function () {
      var ids = toEntityIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test5', function () {
      var ids = toEntityIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test6', function () {
      var ids = toEntityIds({
        add: [{id: 1}, {id: 2}],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test7', function () {
      var ids = toEntityIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([]);
    });

    it('test8', function () {
      var ids = toEntityIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}, {id: 4}],
      });
      expect(ids).toEqual([4]);
    });

    it('test9', function () {
      var ids = toEntityIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [{id: 2}, {id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test10', function () {
      var ids = toEntityIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test11', function () {
      var ids = toEntityIds([{id: 1}, {id: 2}]);
      expect(ids).toEqual([1, 2]);
    });

    it('test12', function () {
      expect(toEntityIds(UNDEF)).toEqual(UNDEF);
    });
  });
});
