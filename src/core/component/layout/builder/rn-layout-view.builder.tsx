import * as React from 'react';
import { View } from 'react-native';

import { isDef, isFn } from '../../../util';
import { IKeyValue, AnyT } from '../../../definitions.interface';
import { LayoutBuilderFactorEnum, LayoutBuilderElementT } from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export class RnLayoutViewBuilder implements ILayoutViewBuilder {

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  public buildRowView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element {
    return (
      <View {...props}
            style={{display: 'flex', flexDirection: 'row', flex: this.toFactorStyle(factor)}}>
        {children}
      </View>
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  public buildColumnView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element {
    return (
      <View {...props}
            style={{display: 'flex', flexDirection: 'column', flex: this.toFactorStyle(factor)}}>
        {children}
      </View>
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @returns {JSX.Element}
   */
  public buildSeparatorView(props: IKeyValue): JSX.Element {
    return (
      <View {...props} style={{ flex: .1 }}/>
    );
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {boolean}
   */
  public isReactElement(item: LayoutBuilderElementT): boolean {
    const itemEl = this.toReactElementType(item);
    return (itemEl.type && isDef(itemEl.type.displayName)) || isFn(itemEl.type);
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @param {TProps} props
   * @returns {TProps}
   */
  public toClonedElementProps(item: LayoutBuilderElementT, props: { style?: IKeyValue }): AnyT {
    const itemEl = this.toReactElementType(item);
    return {...props, style: { flex: 1, ...itemEl.props.style }};
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {{type: {displayName?: string}}}
   */
  private toReactElementType(item: LayoutBuilderElementT): { type: { displayName?: string }, props?: IKeyValue } {
    return item as { type: { displayName?: string }, props?: IKeyValue };
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {number}
   */
  private toFactorStyle(factor: LayoutBuilderFactorEnum): number {
    switch (factor) {
      case LayoutBuilderFactorEnum.FACTOR_2:
        return 2;
      case LayoutBuilderFactorEnum.FACTOR_4:
        return 4;
      case LayoutBuilderFactorEnum.FACTOR_8:
        return 8;
      default:
        return 1;
    }
  }
}
