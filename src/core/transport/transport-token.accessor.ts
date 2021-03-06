import { Store } from 'redux';
import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../di';
import { IApplicationTransportTokenAccessor } from './transport.interface';
import { IApplicationStoreEntity } from '../entities-definitions.interface';

@injectable()
export class TransportTokenAccessor implements IApplicationTransportTokenAccessor {

  @lazyInject(DI_TYPES.Store) private store: Store<IApplicationStoreEntity>;

  public get token(): string {
    return this.store.getState().transport.token;
  }
}
