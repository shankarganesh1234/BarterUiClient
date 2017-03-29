import {Category} from "../../category/category";
import {Location} from "../../location/location";
import {User} from "../../user/user";
import {ItemImage} from "../../item-image/item-image";
export class ItemDetail {
    title: string;
    description: string;
    itemId: number;
    zipCode: Location;
    userId: User;
    categoryId: Category;
    image_id: ItemImage;
    condition: string;
    numOfReviews: number;
    numOfInterests: number;
    itemStage: string;
    story: string;
    quantity: number;
}