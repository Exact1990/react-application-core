import { BasicEventT } from '../../definition.interface';

export interface IIconConfig {
  type: string;
  disabled?: boolean;
  title?: string;
  classes?: string[];
  onClick?(event: BasicEventT): void;
}

export interface IUIFactory {
  listGroupSubHeader: string;
  listDivider: string;
  listItem: string;
  list: string;
  formField: string;
  checkbox: string;
  textFieldInput: string;
  textFieldFocused: string;
  textFieldHelpText: string;
  textFieldValidationText: string;
  textFieldLabel: string;
  textFieldFocusedLabel: string;
  checkboxInput: string;
  makeIcon(config: IIconConfig|string): JSX.Element;
  makeCheckboxAttachment(): JSX.Element;
}
