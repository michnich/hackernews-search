import { Query } from './query';

export interface SearchResult extends Query{
    hits: Array<any>,
    page: number, 
    nbHits: number
}
