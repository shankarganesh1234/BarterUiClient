import {Item} from "../item/item";

export class SearchResponse {
    start: number;
    limit: number;
    total: number;
    items: Item[];
}