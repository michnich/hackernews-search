import { Component, OnInit } from '@angular/core';

import { StateService } from './../state.service';
import { Query } from './../query';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  queries!: Array<Query>

  constructor(private state: StateService) { }

  ngOnInit(): void {
    this.state.history$.subscribe(history => {
      this.queries = history;
    })
  }

}
