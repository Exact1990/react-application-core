import * as React from 'react';

import { BaseContainer } from 'core/component/base';
import { SearchToolbar } from 'core/component/toolbar';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_QUERY_ACTION_TYPE,
  FILTER_SECTION,
} from 'core/component/filter';

import { ISearchToolbarContainerInternalProps } from './search-toolbar.interface';

export class SearchToolbarContainer extends BaseContainer<ISearchToolbarContainerInternalProps, {}> {

  constructor(props: ISearchToolbarContainerInternalProps) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onFilterAction = this.onFilterAction.bind(this);
    this.onChangeFilterQuery = this.onChangeFilterQuery.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <SearchToolbar {...props.filter}
                       onSearch={this.onSearch}
                       onFilter={this.onFilter}
                       onChangeQuery={this.onChangeFilterQuery}
                       onFilterAction={this.onFilterAction}>
        </SearchToolbar>
    );
  }

  private onSearch(value: string): void {
    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  }

  private onFilterAction(): void {
    this.dispatch(FILTER_SECTION);
  }

  private onFilter(): void {
    this.dispatch(FILTER_ACTIVATE_ACTION_TYPE);
  }

  private onChangeFilterQuery(value: string): void {
    this.dispatch(FILTER_QUERY_ACTION_TYPE, { query: value });
  }
}