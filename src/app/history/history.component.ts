import { Component, OnInit } from '@angular/core';

import { StateService } from './../state.service';
import { NewsService } from './../news.service';
import { Query } from './../query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  queries!: Array<Query>
  sort = "created";
  constructor(private state: StateService, private news: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.state.history$.subscribe(history => {
      this.queries = history;
    })
  }

  clearHistory() {
    this.state.clearHistory();
  }

  changeOrder() {
    this.queries.reverse();
  }

  search(query:Query) {
    //queries the api and saves it as the most recent search state before navigating to search page
    //doesn't save that as a new search
    this.news.search(query).subscribe((data:any) => {
      this.state.lastSearch({...query, "hits": data.hits, "page": 0, "nbHits": data.nbHits });
      this.router.navigate(['/search']);
    });
  }
}
