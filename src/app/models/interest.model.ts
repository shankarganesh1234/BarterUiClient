import {ItemDetail} from "./item-detail.model";
export class Interest {
    interestId: number;
    originalItemId: ItemDetail;
    swappableItemId: ItemDetail;
    oneSidedInterestFlag: boolean;
    twoSidedInterestFlag: boolean;
}