import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Query } from './query';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  //stores the past searches
  private _historySource = new BehaviorSubject<Query[]>([]);
  history$ = this._historySource.asObservable();

  //stores the state for the search page (including results)
  private _searchSource = new BehaviorSubject<SearchResult>({"term": "", "type": "", "sort": "", "range": "", "hits": [], "page": 0, "nbHits": 0});
  search$ = this._searchSource.asObservable();

  constructor() { }

  //adds the most recent search details to the search history
  addToHistory(search: Query) {
    let newState = this._historySource.getValue();
    newState.push(search);
    this._historySource.next(newState);
  }

  //saves the most recent search state for when the user navigates back to component
  lastSearch(search: SearchResult) {
    this._searchSource.next(search);
  }
}
