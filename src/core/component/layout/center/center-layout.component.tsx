import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';

export class CenterLayout extends BaseComponent<CenterLayout> {

  /**
   * @stable [14.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
        <div className={toClassName(
                            'rac-flex',
                            'rac-flex-full',
                            'rac-flex-center',
                            this.props.className,
                        )}>
          {this.props.children}
        </div>
    );
  }
}
