import * as R from 'ramda';

import { Operation } from '../../operation';
import { IEntity } from '../../definitions.interface';
import { IApiEntity } from '../../entities-definitions.interface';
import { IFieldConfiguration } from '../../configurations-definitions.interface';
import { IFormProps } from './form.interface';

/**
 * @stable - 11.04.2018
 * @param {IEntity} changes
 * @param {IEntity} entity
 * @param {string} operationId
 * @returns {IApiEntity}
 */
export const buildApiEntity = (changes: IEntity, entity?: IEntity, operationId?: string): IApiEntity => {
  const entityId = entity && entity.id;
  const merger = {
    ...entity,
    ...changes,
  };

  const apiEntity: IApiEntity = (
    R.isNil(entityId)
      // You should use formMapper at least (simple form)
      ? { isNew: true, changes: {...changes}, merger, }

      // You should use formMapper and entityMapper at least (editable entity)
      : { isNew: false, changes: {...changes}, entity: {...entity}, merger, id: entityId }
  );
  return {
    operation: Operation.create(operationId),
    ...apiEntity,
  };
};

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @param {IFieldConfiguration} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = (formProps: IFormProps,
                                    fieldProps: IFieldConfiguration): boolean =>
  (R.isNil(fieldProps.readOnly) ? formProps.readOnly : fieldProps.readOnly) === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @param {IFieldConfiguration} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IFieldConfiguration): boolean =>
  R.isNil(fieldProps.disabled)
    ? isFormDisabled(formProps)
    : fieldProps.disabled === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormDisabled = (formProps: IFormProps): boolean =>
  formProps.disabled === true || formProps.form.progress === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormEditable = (formProps: IFormProps): boolean =>
  R.isNil(formProps.editable) || formProps.editable === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormDirty = (formProps: IFormProps): boolean =>
  formProps.alwaysDirty || formProps.form.dirty === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormNewEntity = (formProps: IFormProps): boolean => R.isNil(formProps.entity) || R.isNil(formProps.entity.id);
