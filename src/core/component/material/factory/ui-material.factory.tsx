import * as React from 'react';
import { injectable } from 'inversify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTruckMoving,
  faCannabis,
  faQuestion,
  faCubes,
  faTag,
  faHome,
  faExchangeAlt,
  faMapMarkerAlt,
  faFilter,
  faEllipsisV,
  faListOl,
  faShippingFast,
  faSpinner,
  faSync,
  faTimes,
  faAngleLeft,
  faAngleRight,
  faBan,
  faPlus,
  faLock,
  faExclamationTriangle,
  faChevronDown,
  faUnlockAlt,
  faExclamation,
  faCheck,
  faAngleDoubleRight,
  faTabletAlt,
  faAngleDoubleLeft,
  faFileInvoiceDollar,
  faSignOutAlt,
  faSearch,
  faWarehouse,
  faUsers,
  faMoneyBill,
  faUser as faSolidUser,
  faHistory,
  faVideo,
  faPeopleCarry,
  faCommentDots,
  faBriefcase,
  faShieldAlt,
  faCheckDouble,
  faMinus,
  faClipboardCheck,
  faCheckCircle,
  faPen,
  faPhone,
  faEraser,
  faChartPie,
  faPrint,
  faPaperclip,
  faServer,
  IconDefinition,
  faFileDownload,
  faGift,
  faChevronRight,
  faChevronLeft,
  faPlug,
  faKey,
  faInfo,
  faBinoculars,
  faUserPlus,
  faCloud,
  faFileImport,
  faEye,
  faSearchPlus,
  faUserClock,
  faUndo,
  faArrowRight,
  faMapMarkedAlt,
  faExclamationCircle,
  faUserTie,
  faStoreAlt,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faUserShield,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHouzz,
  faCodepen,
  faGratipay,
  faAdversal,
} from '@fortawesome/free-brands-svg-icons';
import {
  faUserCircle,
  faCreditCard,
  faSave,
  faCalendarAlt,
  faUser,
  faEnvelope,
  faQuestionCircle,
  faStopCircle,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faMinusSquare,
  faThumbsUp,
  faPlusSquare,
  faIdCard,
  faClock,
  faAddressCard,
  faTrashAlt,
  faHdd,
  faFileAlt,
  faSmileBeam,
} from '@fortawesome/free-regular-svg-icons';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn, isString, toClassName, uuid } from '../../../util';
import { IUIFactory } from '../../factory';
import { IBasicEvent } from '../../../definitions.interface';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';
import { DI_TYPES, lazyInject } from '../../../di';
import { ApplicationTranslatorT } from '../../../translation';

@injectable()
export class UIMaterialFactory implements IUIFactory {
  public static ICONS_MAP = {
    warehouse: faWarehouse,
    product: faCannabis,
    supplier: faTruckMoving,
    delivery: faShippingFast,
    file: faFileAlt,
    menu: faBars,
    long_arrow_down: faLongArrowAltDown,
    long_arrow_up: faLongArrowAltUp,
    category: faCodepen,
    local_offer: faTag,
    home: faHome,
    timelapse: faSpinner,
    http: faExchangeAlt,
    exchange: faExchangeAlt,
    user_clock: faUserClock,
    tablet: faTabletAlt,
    chart_pie: faChartPie,
    location: faMapMarkerAlt,
    location_on: faMapMarkerAlt,
    search: faSearch,
    more_vert: faEllipsisV,
    save: faSave,
    refresh: faSync,
    clear: faTimes,
    people_carry: faPeopleCarry,
    keyboard_arrow_left: faAngleLeft,
    keyboard_arrow_right: faAngleRight,
    expand_more: faChevronDown,
    attention: faExclamationCircle,
    block: faBan,
    widgets: faCubes,
    times_circle: faTimesCircle,
    spa: faCannabis,
    add: faPlus,
    plus: faPlus,
    lock: faLock,
    warning: faExclamationTriangle,
    close: faTimes,
    lock_open: faUnlockAlt,
    filter_list: faFilter,
    error_outline: faExclamation,
    done: faCheck,
    check: faCheck,
    first_page: faAngleDoubleLeft,
    last_page: faAngleDoubleRight,
    date_range: faCalendarAlt,
    payment: faCreditCard,
    account_circle: faUserCircle,
    shopping_cart: faFileInvoiceDollar,
    exit_to_app: faSignOutAlt,
    group: faUsers,
    people_outline: faUser,
    person_outline: faUser,
    person: faSolidUser,
    loyalty: faGratipay,
    local_atm: faMoneyBill,
    access_time: faHistory,
    history: faHistory,
    sms: faCommentDots,
    work: faBriefcase,
    verified_user: faShieldAlt,
    done_all: faCheckDouble,
    remove: faMinus,
    clock: faClock,
    cancel: faBan,
    playlist_add_check: faClipboardCheck,
    done_outline: faCheckCircle,
    contact_phone: faPhone,
    contact_mail: faEnvelope,
    edit: faPen,
    priority_high: faExclamation,
    format_list_numbered: faListOl,
    attach_file: faPaperclip,
    help_outline: faQuestionCircle,
    question: faQuestion,
    clear_all: faEraser,
    stop: faStopCircle,
    hdd: faHdd,
    forward: faArrowAltCircleRight,
    backward: faArrowAltCircleLeft,
    down: faArrowAltCircleDown,
    up: faArrowAltCircleUp,
    print: faPrint,
    router: faServer,
    error: faExclamationCircle,
    cloud_download: faFileDownload,
    cloud: faCloud,
    card_giftcard: faGift,
    navigate_before: faChevronLeft,
    navigate_next: faChevronRight,
    plug: faPlug,
    info: faInfo,
    binoculars: faBinoculars,
    search_plus: faSearchPlus,
    eye: faEye,
    file_import: faFileImport,
    houzz: faHouzz,
    undo: faUndo,
    user: faUser,
    minus_square: faMinusSquare,
    arrow_right: faArrowRight,
    user_plus: faUserPlus,
    plus_square: faPlusSquare,
    thumbs_up: faThumbsUp,
    id_card: faIdCard,
    map_marked_alt: faMapMarkedAlt,
    address_card: faAddressCard,
    video: faVideo,
    user_tie: faUserTie,
    store: faStoreAlt,
    user_shield: faUserShield,
    key: faKey,
    trash: faTrashAlt,
    smile_beam: faSmileBeam,
    adversal: faAdversal,
  };
  private static logger = LoggerFactory.makeLogger(UIMaterialFactory);

  public snackbar = 'mdc-snackbar';
  public snackbarText = 'mdc-snackbar__text';
  public snackbarActionWrapper = 'mdc-snackbar__action-wrapper';
  public snackbarActionButton = 'mdc-snackbar__action-button';
  public icons = 'material-icons';
  public drawerOpen = 'mdc-drawer--open';
  public drawer = 'mdc-drawer__drawer';
  public drawerPersistent = 'mdc-drawer--persistent';
  public persistentDrawerToolbarSpacer = 'mdc-drawer__toolbar-spacer';
  public toolbar = 'mdc-toolbar';
  public toolbarSection = 'mdc-toolbar__section';
  public toolbarSectionAlignEnd = 'mdc-toolbar__section--align-end';
  public toolbarSectionAlignStart = 'mdc-toolbar__section--align-start';
  public toolbarRow = 'mdc-toolbar__row';
  public toolbarTitle = 'mdc-toolbar__title';
  public toolbarMenuIcon = 'mdc-toolbar__menu-icon';
  public list = 'mdc-list';
  public listTwoLine = 'mdc-list--two-line';
  public listAvatar = 'mdc-list--avatar-list';
  public listNonInteractive = 'mdc-list--non-interactive';
  public tabBarScrollerScrollArea = 'mdc-tab-scroller__scroll-area';
  public tabBarScrollerScrollAreaScroll = 'mdc-tab-scroller__scroll-area--scroll';
  public tabBarScrollerScrollContent = 'mdc-tab-scroller__scroll-content';
  public tabRipple = 'mdc-tab__ripple';
  public tabBar = 'mdc-tab-bar';
  public tab = 'mdc-tab';
  public tabContent = 'mdc-tab__content';
  public tabIcon = 'mdc-tab__icon';
  public tabIconText = 'mdc-tab__icon-text';
  public tabActive = 'mdc-tab--active';
  public tabIndicator = 'mdc-tab-indicator';
  public tabIndicatorActive = 'mdc-tab-indicator--active';
  public tabIndicatorContent = 'mdc-tab-indicator__content';
  public tabIndicatorContentUnderline = 'mdc-tab-indicator__content--underline';
  public tabBarScroller = 'mdc-tab-scroller';
  public button = 'mdc-button';
  public buttonOutlined = 'mdc-button--outlined';
  public buttonRaised = 'mdc-button--raised';
  public listItem = 'mdc-list-item';
  public listItemGraphic = 'mdc-list-item__graphic';
  public listItemMeta = 'mdc-list-item__meta';
  public listItemText = 'mdc-list-item__text';
  public listDivider = 'mdc-list-divider';
  public listGroupSubHeader = 'mdc-list-group__subheader';
  public formField = 'mdc-form-field';
  public textField = 'mdc-text-field';
  public textFieldBox = 'mdc-text-field--box';
  public checkbox = 'mdc-checkbox';
  public textFieldInput = 'mdc-text-field__input';
  public textFieldTextArea = 'mdc-text-field--textarea';
  public textFieldFocused = 'mdc-text-field--focused';
  public textFieldInvalid = 'mdc-text-field--invalid';
  public textFieldUpgraded = 'mdc-text-field--upgraded';
  public textFieldHelpText = 'mdc-text-field-helper-text';
  public textFieldValidationText = 'mdc-text-field-helper-text--validation-msg';
  public textFieldLabel = 'mdc-floating-label';
  public textFieldFocusedLabel = 'mdc-floating-label--float-above';
  public checkboxInput = 'mdc-checkbox__native-control';
  public card = 'mdc-card';
  public cardActions = 'mdc-card__actions';
  public cardActionButtons = 'mdc-card__action-buttons';
  public cardActionIcons = 'mdc-card__action-icons';
  public rippleSurface = 'mdc-ripple-surface';
  public menuAnchor = 'mdc-menu-anchor';
  public menu = 'mdc-menu';
  public menuItems = 'mdc-menu__items';
  public fab = 'mdc-fab';
  public dialog = 'mdc-dialog';
  public dialogSurface = 'mdc-dialog__surface';
  public dialogBody = 'mdc-dialog__body';
  public dialogHeader = 'mdc-dialog__header';
  public dialogHeaderTitle = 'mdc-dialog__header__title';
  public dialogBackdrop = 'mdc-dialog__backdrop';
  public dialogFooter = 'mdc-dialog__footer';
  public dialogFooterButton = 'mdc-dialog__footer__button';
  public dialogFooterButtonCancel = 'mdc-dialog__footer__button--cancel';
  public dialogFooterButtonAccept = 'mdc-dialog__footer__button--accept';

  @lazyInject(DI_TYPES.Translate) private t: ApplicationTranslatorT;

  /**
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {JSX.Element}
   */
  public makeIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    if (!cfg) {
      return null;
    }
    const config = this.toIconConfig(cfg);

    const awIconCtor = UIMaterialFactory.ICONS_MAP[config.type];
    if (!awIconCtor) {
      UIMaterialFactory.logger.warn(
        `[$UIMaterialFactory] The icon ${config.type} is not defined.`
      );
    }

    const iconCtor = awIconCtor || faQuestion;
    const isButton = isFn(config.onClick);

    return (
      <div key={uuid()}
           title={this.t(config.title)}
           className={toClassName(
                        config.className,
                        'rac-flex',
                        'rac-flex-center',
                        'rac-icon',
                        isButton && `rac-action-icon rac-button-${config.type}-icon`,
                        config.disabled && 'rac-disabled-icon',
                      )}
           onClick={(event: IBasicEvent) => {
             if (!config.disabled && isButton) {
               config.onClick(event);
             }
           }}>
        <FontAwesomeIcon icon={iconCtor}/>
      </div>
    );
  }

  /**
   * @stable [18.05.2018]
   * @param {IUIIconConfiguration | string} cfg
   * @returns {JSX.Element}
   */
  public makeListItemMetaIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    const config = this.toIconConfig(cfg);
    return this.makeIcon(
      cfg
        ? {
          ...config,
          className: toClassName(config.className, 'rac-list-item-meta-icon'),
        }
        : cfg
    );
  }

  public makeCheckboxAttachment(): JSX.Element {
    return (
      <div className='mdc-checkbox__background'>
        <svg className='mdc-checkbox__checkmark'
             viewBox='0 0 24 24'>
          <path className='mdc-checkbox__checkmark-path'
                fill='none'
                stroke='white'
                d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
        </svg>
        <div className='mdc-checkbox__mixedmark'/>
      </div>
    );
  }

  /**
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {IUIIconConfiguration}
   */
  private toIconConfig(cfg: IUIIconConfiguration | string): IUIIconConfiguration {
    return (isString(cfg) ? {type: cfg} : cfg)  as IUIIconConfiguration;
  }
}
