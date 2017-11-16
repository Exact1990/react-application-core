import { EffectsService, IEffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/form';
import { ListActionBuilder } from '../../component/list';
import { IApiEntity } from '../../api';
import { IEntity } from '../../definition.interface';
import { RouterActionBuilder } from '../../router';
import { APPLICATION_SECTIONS } from '../../component/application';

const logger = LoggerFactory.makeLogger('makeSucceedFormEffectsProxy');

export function makeSucceedFormEffectsProxy(config: {
  listSection: string;
  formSection: string;
  listRoute?: string;
}): () => void {
  const {listSection, formSection, listRoute} = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(formSection))
      public $onFormSubmitDone(action: IEffectsAction): IEffectsAction[] {
        const apiEntity = action.initialData as IApiEntity<IEntity>;
        const changes = action.data as IEntity;
        const id = apiEntity.id;

        const connectorConfig = APPLICATION_SECTIONS.get(listSection);
        const listRoute0 = listRoute
            || (connectorConfig ? connectorConfig.routeConfig.path : null);

        if (!listRoute0) {
          logger.warn(`[$Effects][$onFormSubmitDone] The list route is empty for the section ${listSection}`);
        }
        return [
          apiEntity.isNew
              ? ListActionBuilder.buildInsertAction(listSection, {payload: {id, changes}})
              : ListActionBuilder.buildUpdateAction(listSection, {payload: {id, changes}}),
          RouterActionBuilder.buildNavigateAction(listRoute0)
        ];
      }
    }
  };
}
