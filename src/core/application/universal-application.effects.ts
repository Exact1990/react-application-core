import { injectable } from 'inversify';
import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';
import * as R from 'ramda';

import { AnyT } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationSettings } from '../settings';
import { IStringTokenWrapper } from '../definitions.interface';
import { IRoutesConfiguration } from '../configurations-definitions.interface';
import { APPLICATION_TOKEN_KEY, APPLICATION_UUID_KEY, IApplicationStorage } from '../storage/storage.interface';
import { BaseEffects } from '../store/effects/base.effects';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { DictionariesActionBuilder } from '../dictionary/dictionaries-action.builder';
import { TransportActionBuilder } from '../transport/transport-action.builder';
import { NotificationActionBuilder } from '../notification/notification-action.builder';
import { UserActionBuilder } from '../user/user-action.builder';
import { IUniversalApplicationStoreEntity } from '../entities-definitions.interface';
import { RouterActionBuilder } from '../router/router-action.builder';
import { PermissionsActionBuilder } from '../permissions/permissions-action.builder';
import { IApplicationTransportPayloadAnalyzer, IApplicationTransportFactory } from '../transport/transport.interface';
import { FetchJsonTransportFactory } from '../transport/fetch-json-transport.factory';

@injectable()
export class UniversalApplicationEffects<TApi> extends BaseEffects<TApi> {
  private static logger = LoggerFactory.makeLogger(UniversalApplicationEffects);

  @lazyInject(DI_TYPES.Routes) protected routes: IRoutesConfiguration;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.NotVersionedPersistentStorage) protected notVersionedPersistentStorage: IApplicationStorage;
  @lazyInject(DI_TYPES.NotVersionedSessionStorage) protected notVersionedSessionStorage: IApplicationStorage;
  @lazyInject(DI_TYPES.TransportPayloadAnalyzer) protected transportPayloadAnalyzer: IApplicationTransportPayloadAnalyzer;
  @lazyInject(FetchJsonTransportFactory) protected fetchJsonTransportFactory: IApplicationTransportFactory;

  /**
   * @stable - 25.04.2018
   * @returns {Promise<IEffectsAction[]> | IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildInitActionType())
  public async $onInit(): Promise<IEffectsAction[]> {
    if (this.settings.authorization.isAuthorizationNeeded === false) {
      return [
        ApplicationActionBuilder.buildAuthorizedAction(),
        ApplicationActionBuilder.buildAfterInitAction()
      ];
    }
    const token = await this.notVersionedPersistentStorage.get(APPLICATION_TOKEN_KEY);
    const actions = [];

    if (token) {
      actions.push(ApplicationActionBuilder.buildAuthorizedAction({token}));
      actions.push(TransportActionBuilder.buildUpdateTokenAction({token}));
    }
    const result = actions.concat(ApplicationActionBuilder.buildAfterInitAction());

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onInit] The actions are: ${JSON.stringify(result)}`);
    return result;
  }

  /**
   * @stable - 25.04.2018
   * @returns {IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterInitActionType())
  public async $onAfterInit(_: IEffectsAction, state: IUniversalApplicationStoreEntity): Promise<IEffectsAction[]> {
    const isApplicationAuthorized = state.application.authorized;
    const result: IEffectsAction[] = [
      isApplicationAuthorized
        ? ApplicationActionBuilder.buildPrepareAction()
        : ApplicationActionBuilder.buildReadyAction()
    ];

    const metaFilesJsonUrl = this.settings.metaFilesJsonUrl;
    if (!R.isNil(metaFilesJsonUrl) && !R.isEmpty(metaFilesJsonUrl)) {
      const data = await Promise.all([
        this.notVersionedSessionStorage.get(APPLICATION_UUID_KEY),
        this.fetchJsonTransportFactory.request({url: metaFilesJsonUrl})
      ]);
      const localAppUuid = data[0];
      const remoteAppMetaInfo = data[1];
      const remoteAppUuid = remoteAppMetaInfo.data.result.uuid;

      if (!R.isNil(remoteAppUuid)
        && !R.isEmpty(remoteAppUuid)
        && !R.equals(localAppUuid, remoteAppUuid)) {
        this.notVersionedSessionStorage.set(APPLICATION_UUID_KEY, remoteAppUuid);

        if (isApplicationAuthorized) {
          // After F5 we desire to get a previous saves hash, but it is empty. This means a team had released
          // a new version. To exclude the inconsistent state of App - redirect to initial path

          UniversalApplicationEffects.logger.debug(
            '[$UniversalApplicationEffects][$onAfterInit] Need to redirect to the initial path because of a new release.'
          );
          result.push(RouterActionBuilder.buildRewriteAction(this.routes.home));
        }
      }
    }

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onAfterInit] The result is: ${JSON.stringify(result)}`);
    return result;
  }

  /**
   * @stable - 25.04.2018
   * @returns {Promise<AnyT> | IEffectsAction[] | IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildPrepareActionType())
  public $onPrepare(): Promise<AnyT> | IEffectsAction[] | IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  /**
   * @stable - 25.04.2018
   * @returns {Promise<AnyT> | IEffectsAction[] | IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildPrepareDoneActionType())
  public $onPrepareDone(action: IEffectsAction,
                        state: IUniversalApplicationStoreEntity): Promise<AnyT> | IEffectsAction[] | IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  /**
   * @stable - 25.04.2018
   * @param {IEffectsAction} action
   * @returns {IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildPrepareErrorActionType())
  public $onPrepareError(action: IEffectsAction): IEffectsAction {
    return this.transportPayloadAnalyzer.isAuthErrorPayload(action)
      ? ApplicationActionBuilder.buildReadyAction() // We must show the login page at least
      : null;
  }

  /**
   * @stable - 25.04.2018
   * @returns {IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterLoginActionType())
  public $onAfterLogin(): IEffectsAction[] {
    return [
      ApplicationActionBuilder.buildNotReadyAction(),
      ApplicationActionBuilder.buildAuthorizedAction(),
      ApplicationActionBuilder.buildPrepareAction(),
      RouterActionBuilder.buildNavigateAction(this.routes.home)
    ];
  }

  /**
   * @stable - 25.04.2018
   * @returns {IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType())
  public $onLogout(): IEffectsAction[] {
    return [
      PermissionsActionBuilder.buildDestroyAction(),
      UserActionBuilder.buildDestroyAction(),
      DictionariesActionBuilder.buildDestroyAction(),
      ApplicationActionBuilder.buildUnauthorizedAction(),
      ApplicationActionBuilder.buildAfterLogoutAction()
    ];
  }

  /**
   * @stable - 25.04.2018
   * @returns {IEffectsAction[] | Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType())
  public $onAfterLogout(): IEffectsAction[]|Promise<IEffectsAction[]> {
    return [
      NotificationActionBuilder.buildInfoAction(this.settings.messages.logoutNotificationMessage),
      TransportActionBuilder.buildDestroyTokenAction()
    ];
  }

  /**
   * @stable - 25.04.2018
   * @param {IEffectsAction} action
   * @param {IUniversalApplicationStoreEntity} state
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAuthorizedActionType())
  public async $onAuthorized(action: IEffectsAction, state: IUniversalApplicationStoreEntity): Promise<void> {
    const payload: IStringTokenWrapper = action.data;
    const token = payload && payload.token || state.transport.token;

    await this.notVersionedPersistentStorage.set(APPLICATION_TOKEN_KEY, token);
    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onAuthorized] The storage token has been saved: ${token}.`);
  }

  /**
   * @stable - 25.04.2018
   */
  @EffectsService.effects(ApplicationActionBuilder.buildUnauthorizedActionType())
  public async $onUnauthorized(): Promise<void> {
    await this.notVersionedPersistentStorage.remove(APPLICATION_TOKEN_KEY);
    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onUnauthorized] The storage token has been destroyed.`);
  }
}
