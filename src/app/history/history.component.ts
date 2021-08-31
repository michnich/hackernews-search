import { Component, OnInit } from '@angular/core';

import { StateService } from './../state.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history!: Array<any>

  constructor(private state: StateService) { }

  ngOnInit(): void {
    this.state.history$.subscribe(history => {
      this.history = history;
    })
  }

}
