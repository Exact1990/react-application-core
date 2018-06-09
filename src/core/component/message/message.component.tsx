import * as React from 'react';

import { CenterLayout } from '../layout';
import { ProgressLabel } from '../progress';
import { UniversalMessage } from './universal-message.component';

export class Message extends UniversalMessage<Message> {

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getProgressLabel(): JSX.Element {
    return <ProgressLabel/>;
  }

  /**
   * @stable [09.06.2018]
   * @param {React.ReactNode} message
   * @param {React.ReactNode} node
   * @returns {JSX.Element}
   */
  protected getMessageWrapper(message: React.ReactNode, node: React.ReactNode): JSX.Element {
    return (
      <CenterLayout>
        {message}
        {node}
      </CenterLayout>
    );
  }
}
