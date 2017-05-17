import {Category} from "./category";
import {Location} from "./location";
import {User} from "./user";
import {ItemImage} from "./item-image";
export class ItemDetail {
    title: string;
    description: string;
    itemId: number;
    zipCode: Location;
    userId: User;
    categoryId: Category;
    images: ItemImage[];
    condition: string;
    numOfReviews: number;
    numOfInterests: number;
    itemStage: string;
    story: string;
    quantity: number;
}