export interface Query {
    term: string,
    type: string, 
    sort: string,
    range: string,
    startDate?: any,
    endDate?: any
}
