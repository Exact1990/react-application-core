import { History } from 'history';

import { BaseContainerT } from '../component/base';
import { IContainerWrapperCtor } from '../component/application';
import { IRootContainerAttributes } from '../component/root';
import { IConnectorConfig, ConnectorConfigT } from '../component/connector';
import { IApplicationState } from '../store';
import { IApplicationAccessConfig, IApplicationPermissionsState } from '../permission';
import { IApplicationDictionariesState } from '../dictionary';

export interface IRoutes {
  profile: string;
  home: string;
  login: string;
  logout: string;
  accessDenied: string;
}

export interface IRouter extends History {
  basename?: string;
}

export interface IRouterComputedMatch {
  params: any;
  path: string;
  url: string;
  isExact: boolean;
}

export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

export interface IRouteComponentConfig extends IRootContainerAttributes {
  type: ContainerVisibilityTypeEnum;
}

export type RouteContainerT = BaseContainerT|IContainerWrapperCtor;
export const DYNAMIC_ROUTES = new Map<RouteContainerT, ConnectorConfigT>();

export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_BACK = 'back';
