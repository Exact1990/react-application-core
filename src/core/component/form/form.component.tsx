import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { cloneNodes, isString, isUndef, defValuesFilter, orNull, toClassName, orUndef } from '../../util';
import { AnyT, BasicEventT, ReactElementT } from '../../definition.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { lazyInject, DI_TYPES } from '../../di';
import { IApiEntity, ApiEntityT } from '../../api';
import { Operation } from '../../operation';
import {
  Field,
  IFieldInternalProps,
  FieldT,
  IFieldOptions,
  IFieldsOptions,
} from '../field';

import {
  IFormPureComponent,
  FormInternalPropsT,
  INITIAL_APPLICATION_FORM_STATE,
  IForm,
} from './form.interface';
import { IFormConfiguration } from '../../configurations-definitions.interface';

export class Form extends BaseComponent<IForm, FormInternalPropsT, {}> implements IForm {

  public static defaultProps: FormInternalPropsT = {
    form: INITIAL_APPLICATION_FORM_STATE,
    formConfiguration: {},
  };
  private static logger = LoggerFactory.makeLogger(Form);

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsOptions;
  private childrenMap: Map<ReactElementT, string> = new Map<ReactElementT, string>();

  constructor(props: FormInternalPropsT) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): JSX.Element {
    const formProps = this.props;
    const { form, formConfiguration } = formProps;

    return (
        <form ref='self'
              autoComplete='off'
              onReset={this.onReset}
              onSubmit={this.onSubmit}
              className={toClassName(
                            'rac-form',
                            'rac-flex',
                            'rac-flex-column',
                            'rac-flex-full',
                            formConfiguration.className
                        )}>
          <fieldset disabled={this.isFormDisabled}
                    className='rac-fieldset rac-flex-full'>
            <section className='rac-section'>
              {
                cloneNodes<IFieldInternalProps>(
                    this,
                    (field: FieldT) => {
                      const fieldProps = field.props;
                      const predefinedOptions = this.getFieldPredefinedOptions(field);

                      return defValuesFilter<IFieldInternalProps, IFieldInternalProps>(
                          {
                            value: this.getFieldValue(field),
                            originalValue: this.getFieldOriginalValue(field),
                            displayValue: this.getFieldDisplayValue(field, predefinedOptions),
                            readOnly: this.isFieldReadOnly(field),
                            disabled: this.isFieldDisabled(field),
                            changeForm: this.onChange,

                            // Dynamic linked dictionary callbacks
                            onEmptyDictionary: orUndef<() => void>(
                              fieldProps.bindToDictionary || fieldProps.onEmptyDictionary,
                              () => fieldProps.onEmptyDictionary || (() => this.onEmptyDictionary(field))
                            ),
                            onLoadDictionary: orUndef<(items: AnyT) => void>(
                              fieldProps.bindToDictionary || fieldProps.onLoadDictionary,
                              (items) => fieldProps.onLoadDictionary || ((items0) => this.onLoadDictionary(field, items0))
                            ),

                            // Predefined options
                            ...predefinedOptions,

                            // The fields props have a higher priority
                            ...defValuesFilter<IFieldOptions, IFieldOptions>({
                              label: fieldProps.label,
                              type: fieldProps.type,
                              placeholder: fieldProps.placeholder,
                              prefixLabel: fieldProps.prefixLabel,
                            }),
                          }
                      );
                    },
                    (child) => Field.isPrototypeOf(child.type),
                    this.childrenMap,
                    (child) => (child.props as IFieldInternalProps).renderCondition,
                )
              }
            </section>
          </fieldset>
          {
            orNull(
                !formConfiguration.notUseActions,
                () => (
                    <section className={toClassName('rac-form-actions', this.uiFactory.cardActions)}>
                      {orNull(
                          formConfiguration.useResetButton,
                          () => (
                              <Button type='reset'
                                      icon='clear_all'
                                      raised={true}
                                      disabled={!form.dirty}>
                                {this.t(formConfiguration.resetText || 'Reset')}
                              </Button>
                          )
                      )}
                      <Button type='submit'
                              icon={this.isFormValid
                                  ? (formConfiguration.actionIcon || 'save')
                                  : 'error_outline'}
                              accent={true}
                              raised={true}
                              disabled={!this.canSubmit}
                              progress={form.progress}
                              error={!R.isNil(form.error)}>
                        {this.t(formConfiguration.actionText || (this.apiEntity.isNew ? 'Create' : 'Save'))}
                      </Button>
                    </section>
                )
            )
          }
        </form>
    );
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.propsOnValid();
  }

  public componentWillUpdate(nextProps: Readonly<FormInternalPropsT>, nextState: Readonly<{}>, nextContext: {}): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);
    this.childrenMap.clear();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.childrenMap.clear();
  }

  public submit(): void {
    const props = this.props;

    if (props.onSubmit) {
      props.onSubmit(this.apiEntity);
    }
  }

  public get apiEntity(): ApiEntityT {
    const { props } = this;
    const { entity } = props;
    const { changes } = props.form;
    const entityId = orNull(entity, () => entity.id);
    const merger = {
      ...entity,
      ...changes,
    };

    const apiEntity0: ApiEntityT = (R.isNil(entityId)
            // You should use formMapper at least (simple form)
            ? { isNew: true, changes: {...changes}, merger, }

            // You should use formMapper and entityMapper at least (editable entity)
            : { isNew: false, changes: {...changes}, entity: {...entity}, merger, id: entityId }
    );
    return {
      operation: Operation.create(),
      ...apiEntity0,
    };
  }

  private onChange(name: string, value: AnyT, validationGroup: string): void {
    this.resetGroupFieldsErrors(name, validationGroup);
    if (this.props.onChange) {
      this.props.onChange(name, value);
    }
    this.propsOnValid();
  }

  private onEmptyDictionary(field: FieldT): void {
    const props = this.props;
    const fieldProps = field.props;

    if (props.onEmptyDictionary) {
      props.onEmptyDictionary(fieldProps.bindToDictionary);
    }
  }

  private onLoadDictionary(field: FieldT, items: AnyT): void {
    const props = this.props;
    const fieldProps = field.props;

    if (props.onLoadDictionary) {
      props.onLoadDictionary(items, fieldProps.bindToDictionary);
    }
  }

  private propsOnValid(): void {
    if (this.props.onValid) {
      this.props.onValid((this.refs.self as IFormPureComponent).checkValidity());
    }
  }

  private onSubmit(event: BasicEventT): void {
    const props = this.props;

    this.stopEvent(event);

    if (props.onBeforeSubmit) {
      props.onBeforeSubmit(this.apiEntity);
    } else {
      this.submit();
    }
  }

  private onReset(event: BasicEventT): void {
    this.stopEvent(event);

    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  private resetGroupFieldsErrors(name: string, validationGroup: string): void {
    if (!validationGroup) {
      return;
    }
    this.childrenMap.forEach((uuidRef, child) => {
      const childProps = child.props as IFieldInternalProps;
      const groupName = childProps.validationGroup;
      const fieldName = childProps.name;

      if (groupName === validationGroup && fieldName !== name) {
        const otherFieldInstanceAtTheSameGroup = this.refs[uuidRef] as FieldT;
        if (otherFieldInstanceAtTheSameGroup) {
          otherFieldInstanceAtTheSameGroup.resetError();
        } else {
          Form.logger.warn(`[$Form] The ref is not defined to the field with ${fieldName} name.`);
        }
      }
    });
  }

  private get isFormReadOnly(): boolean {
    const formOptions = this.props.formConfiguration;
    return formOptions && formOptions.readOnly === true;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get isFormDisabled(): boolean {
    return this.formConfiguration.disabled === true || this.props.form.progress;
  }

  private get isFormValid(): boolean {
    const form = this.props.form;
    return R.isNil(form.valid) || form.valid;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get isFormDirty(): boolean {
    return this.formConfiguration.alwaysDirty || this.props.form.dirty === true;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get isFormSubmittable(): boolean {
    return R.isNil(this.formConfiguration.submittable) || this.formConfiguration.submittable === true;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get canSubmit(): boolean {
    return this.isFormValid
        && this.isFormSubmittable
        && this.isFormDirty
        && !this.isFormDisabled;
  }

  private isFieldReadOnly(field: FieldT): boolean {
    const fieldProps = field.props;

    return R.isNil(fieldProps.readOnly)
        ? this.isFormReadOnly
        : fieldProps.readOnly;
  }

  private isFieldDisabled(field: FieldT): boolean {
    const fieldProps = field.props;

    return R.isNil(fieldProps.disabled)
        ? this.isFormDisabled
        : fieldProps.disabled;
  }

  private getFieldValue(field: FieldT): AnyT {
    const {form, entity} = this.props;
    const {changes} = form;
    const fieldProps = field.props;

    return isUndef(fieldProps.value) && fieldProps.name
        ? Reflect.get(entity || changes, fieldProps.name)
        : fieldProps.value;
  }

  private getFieldOriginalValue(field: FieldT): AnyT {
    const {originalEntity} = this.props;
    const fieldProps = field.props;
    return fieldProps.name && originalEntity ? Reflect.get(originalEntity, fieldProps.name) : undefined;
  }

  private getFieldDisplayValue(field: FieldT, fieldOptions: IFieldOptions): string {
    const {form, entity} = this.props;
    const {changes} = form;
    const fieldProps = field.props;

    const fieldDisplayName = fieldProps.displayName
        || (fieldOptions ? fieldOptions.displayName : null);

    return isUndef(fieldProps.displayValue) && fieldDisplayName
        ? Reflect.get(entity || changes, fieldDisplayName)
        : fieldProps.displayValue;
  }

  private getFieldPredefinedOptions(field: FieldT): IFieldOptions {
    const fieldProps = field.props;
    const fieldOptionsOrLabel = this.fieldsOptions[fieldProps.name];

    let fieldOptions: IFieldOptions;
    if (isString(fieldOptionsOrLabel)) {
      // typings !
      fieldOptions = {label: fieldOptionsOrLabel as string};
    } else {
      fieldOptions = fieldOptionsOrLabel as IFieldOptions;
    }
    return fieldOptions;
  }

  /**
   * @stable - 31.03.2018
   * @returns {IFormConfiguration}
   */
  private get formConfiguration(): IFormConfiguration {
    return this.props.formConfiguration || {};
  }
}
