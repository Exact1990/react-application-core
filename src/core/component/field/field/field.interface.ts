import { Component, InputHTMLAttributes, ClassAttributes, TextareaHTMLAttributes } from 'react';

import {
  AnyT,
  BasicEventT,
  FocusEventT,
  IDisplayValueWrapper,
  IValueWrapper,
  IStepable,
  ChangeEventT,
  IHTMLInputWrapper,
} from '../../../definitions.interface';
import {
  IErrorEntity,
  IFieldEntity,
  IComponent,
} from '../../../entities-definitions.interface';
import {
  IFieldConfiguration,
  IKeyboardHandlersConfiguration,
} from '../../../configurations-definitions.interface';

export type IFieldDisplayValueConverter<TValue> = (value: TValue, scope?: IField) => string;

export type FieldDisplayValueConverterT = IFieldDisplayValueConverter<AnyT>;

export interface IFieldDisplayValueWrapper<TValue> extends IDisplayValueWrapper<string|IFieldDisplayValueConverter<TValue>> {
}

export interface IFieldsOptions { [index: string]: string|IFieldConfiguration; }

export interface IFieldInternalProps extends IFieldConfiguration,
                                             IFieldEntity,
                                             IStepable,
                                             IFieldDisplayValueWrapper<AnyT> {
  inputWrapperClassName?: string; // @stable
  noErrorMessage?: boolean;
  noInfoMessage?: boolean;
  renderCondition?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  validate?: (value: AnyT) => string;
  validationGroup?: string;
  changeForm?(name: string, value: AnyT, validationGroup?: string): void;
  onFocus?(event: FocusEventT): void;
  onBlur?(event: FocusEventT): void;
}

/* @stable - 13.04.2018 */
export interface IFieldInputProps extends InputHTMLAttributes<HTMLInputElement>,
                                          ClassAttributes<HTMLInputElement> {
}

/* @stable - 13.04.2018 */
export interface IFieldTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
                                             ClassAttributes<HTMLTextAreaElement> {
}

export interface IFieldState extends IErrorEntity<string> {
}

/**
 * @stable [09.05.2018]
 */
export interface INativeMaskedInputComponent extends Component {
  inputElement: HTMLInputElement;
}

export interface IBasicField<TValue> extends IValueWrapper<TValue> {
  setFocus?(): void;
  onChange?(event: ChangeEventT): void;
  onChangeManually?(currentRawValue: AnyT, context?: AnyT): void;
}

export interface IField<TInternalProps extends IFieldInternalProps = IFieldInternalProps,
                        TInternalState extends IFieldState = IFieldState>
    extends IKeyboardHandlersConfiguration,
            IBasicField<AnyT>,
            IHTMLInputWrapper,
            IComponent<TInternalProps, TInternalState> {
  resetError(): void;
}
