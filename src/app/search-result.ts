import { Query } from './query';

export interface SearchResult extends Query{
    // term: string,
    // type: string, 
    // sort: string,
    // range: string,
    hits: Array<any>,
    page: number, 
    nbHits: number
}
