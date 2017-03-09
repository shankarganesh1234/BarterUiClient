import { Item } from './item';

export class SearchResponse {
  start: number;
  limit: number;
  total : number;
  items: Item[];
}