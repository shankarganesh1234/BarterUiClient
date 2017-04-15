import {ItemDetail} from "../../item/models/item-detail.model";
export class Interest {
    interestId: number;
    originalItemId: ItemDetail;
    swappableItemId: ItemDetail;
    oneSidedInterestFlag: boolean;
    twoSidedInterestFlag: boolean;
}