export interface SearchResult {
    term: string,
    type: string, 
    sort: string,
    range: string,
    hits: Array<any>,
    page: number, 
    nbHits: number
}
