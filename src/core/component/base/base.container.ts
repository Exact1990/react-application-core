import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { lazyInject, DI_TYPES } from '../../di';
import { AnyT } from '../../definitions.interface';
import { DictionariesActionBuilder } from '../../dictionary';
import { IPermissionsService } from '../../permissions';
import { NOTIFICATION_INFO_ACTION_TYPE } from '../../notification';
import { UniversalContainer } from './universal.container';
import { IContainer } from '../../entities-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IUniversalDialog } from '../dialog';

export class BaseContainer<TProps extends IContainerProps = IContainerProps, TState = {}>
    extends UniversalContainer<TProps, TState>
    implements IContainer<TProps, TState> {

  @lazyInject(DI_TYPES.Permission) protected permissionService: IPermissionsService;

  constructor(props: TProps) {
    super(props);
    this.activateFormDialog = this.activateFormDialog.bind(this);
  }

  // Dictionary service method (DRY)
  protected dispatchLoadDictionary(section: string, payload?: AnyT): void {
    this.dispatchCustomType(DictionariesActionBuilder.buildLoadActionType(section), { section, payload });
  }

  // Notification service method (DRY)
  protected dispatchNotification(info: string): void {
    this.dispatchCustomType(NOTIFICATION_INFO_ACTION_TYPE, { info });
  }

  // Service method (DRY)
  protected isPermissionAccessible<TApplicationAccessConfig>(checkedObject: TApplicationAccessConfig): boolean {
    return this.permissionService.isAccessible(checkedObject);
  }

  // Service method (DRY)
  protected activateFormDialog(): void {
    (this.refs.formDialog as IUniversalDialog).activate();
  }
}
