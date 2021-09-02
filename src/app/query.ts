import { Moment } from 'moment';

export interface Query {
    term: string,
    type: string, 
    sort: string,
    range: string,
    startDate?: Moment,
    endDate?: Moment
}
