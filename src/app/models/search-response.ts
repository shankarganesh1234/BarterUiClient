import {Item} from "./item.model";

export class SearchResponse {
    start: number = 0;
    limit: number = 8;
    total: number;
    items: Item[];
    search: string;
    zip: number;
    page: number = 1;
}