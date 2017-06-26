import {ItemDetail} from "./item-detail.model";
import {User} from "./user";
export class Interest {
    interestId: number;
    originalItemId: ItemDetail;
    swappableItemId: ItemDetail;
    originalUser: User;
    interestedUser: User;
    oneSidedInterestFlag: boolean;
    twoSidedInterestFlag: boolean;
    unreadInterest:boolean = false;
    unreadChat:boolean = false;
}