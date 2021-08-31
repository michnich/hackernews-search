import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _historySource = new BehaviorSubject<any[]>([]);
  history$ = this._historySource.asObservable();

  private _searchSource = new BehaviorSubject<any>({});
  search$ = this._searchSource.asObservable();

  constructor() { }

  //adds the most recent search details to the search history
  addToHistory(search: any) {
    let newState = this._historySource.getValue();
    newState.push(search);
    this._historySource.next(newState);
  }

  //saves the most recent search state for when the user navigates back to component
  lastSearch(search: any) {
    this._searchSource.next(search);
  }
}
