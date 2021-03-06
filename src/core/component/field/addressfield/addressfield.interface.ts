import { IBasicTextFieldState } from '../textfield';
import {
  IPlaceWrapper,
  ILatWrapper,
  ILngWrapper,
  IOnChangePlaceWrapper,
  IPlaceIdWrapper,
  INotUsePlaceActionWrapper,
  IUseZipCodeWrapper,
  IPlaceEntityWrapper,
  INotUseCustomValidatorWrapper,
} from '../../../definitions.interface';
import { IBasicTextFieldProps } from '../textfield';
import { IPlaceEntity } from '../../../entities-definitions.interface';

/**
 * @stable [30.07.2018]
 */
export enum AddressMapMarkerActionEnum {
  PUT_MARKER_HERE,
}

/**
 * @stable [01.08.2018]
 */
export interface IAddressFieldChangePlacePayload extends ILatWrapper,
                                                         ILngWrapper,
                                                         IPlaceIdWrapper,
                                                         IPlaceEntityWrapper<IPlaceEntity> {
}

/**
 * @stable [29.07.2018]
 */
export interface IAddressFieldProps extends IBasicTextFieldProps,
                                            IUseZipCodeWrapper,
                                            INotUseCustomValidatorWrapper,
                                            INotUsePlaceActionWrapper,
                                            IOnChangePlaceWrapper<IAddressFieldChangePlacePayload>,
                                            ILatWrapper,
                                            ILngWrapper {
}

/**
 * @stable [30.07.2018]
 */
export interface IAddressFieldState extends IBasicTextFieldState,
                                            IPlaceWrapper<number | string> {
}
