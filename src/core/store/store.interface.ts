import { AnyAction } from 'redux';

import { IEntity } from '../definitions.interface';
import { ILayoutEntity } from '../entities-definitions.interface';
import { rootReducer } from '../component/root';
import {
  LAYOUT_UPDATE_ACTION_TYPE,
  LAYOUT_DESTROY_ACTION_TYPE,
  INITIAL_APPLICATION_LAYOUT_STATE,
} from '../component/layout';
import { notificationReducer } from '../notification';
import { dictionariesReducer } from '../dictionary';
import { permissionsReducer } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import { entityReducerFactory } from '../store/store.support';
import { USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE } from '../user/user.interface';

export const defaultReducers = {
  dictionaries: dictionariesReducer,
  permissions: permissionsReducer,
  root: rootReducer,
  user: entityReducerFactory(USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE),
  layout: entityReducerFactory(LAYOUT_UPDATE_ACTION_TYPE,
    LAYOUT_DESTROY_ACTION_TYPE, INITIAL_APPLICATION_LAYOUT_STATE),
  stack: stackReducer,
  notification: notificationReducer,
  ...channelsReducers,
};
