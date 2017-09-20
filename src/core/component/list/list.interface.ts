import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
  IBaseContainer,
} from 'core/component/base';
import { IEntity, IRenderable, ILockable } from 'core/definition.interface';

export interface IListContainerInternalProps extends IBaseContainerInternalProps, IRenderable {
  list: IApplicationListAttributes;
}

export interface IListContainer extends IBaseContainer<IListContainerInternalProps, {}> {
  load(query: string): void;
}

export interface IListInternalProps extends IBaseComponentInternalProps, IRenderable {
  items: IEntity[];
  activeItem?: IEntity;
  onClick?(props: IEntity): void;
}

export interface IApplicationListAttributes extends ILockable {
  progress: boolean;
  data: IEntity[];
  selected: IEntity;
}

export interface IApplicationListState extends IApplicationListAttributes {
}

export interface IApplicationListWrapperState {
  list: IApplicationListState;
}

export const INITIAL_APPLICATION_LIST_STATE: IApplicationListState = {
  progress: false,
  data: null,
  selected: null,
};

export const LIST_LOAD_ACTION_TYPE = 'list.load';
export const LIST_LOAD_DONE_ACTION_TYPE = 'list.load.done';
export const LIST_LOAD_ERROR_ACTION_TYPE = 'list.load.error';
export const LIST_LOCK_ACTION_TYPE = 'list.lock';
export const LIST_DESTROY_ACTION_TYPE = 'list.destroy';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
export const LIST_DESELECT_ACTION_TYPE = 'list.deselect';
export const LIST_UPDATE_ACTION_TYPE = 'list.update';
