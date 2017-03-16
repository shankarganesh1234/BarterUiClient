import {Item} from "../item/item";

export class SearchResponse {
    start: number = 0;
    limit: number = 8;
    total: number;
    items: Item[];
    search: string;
    zip: number
    page: number = 1;
}