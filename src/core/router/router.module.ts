import { appContainer, DI_TYPES } from '../di';

import './router.effects';
import { DYNAMIC_ROUTES } from './router.interface';
import { IDefaultConnectorConfiguration } from '../configurations-definitions.interface';
import { IComponentClassEntity } from '../entities-definitions.interface';

/* @stable - 15.04.2018 */
appContainer.bind<Map<IComponentClassEntity, IDefaultConnectorConfiguration>>(DI_TYPES.DynamicRoutes)
    .toConstantValue(DYNAMIC_ROUTES);
