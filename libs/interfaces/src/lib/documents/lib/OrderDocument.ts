import { AccountDocument } from "./AccountDocument";
import { ProductDocument } from "./ProductDocument";


export interface OrderDocument {
  "account": AccountDocument | null;
  "accountId": string;
  "contents": {
    "product": ProductDocument | null;
    "productId": string;
    "quantity": number;
  }[];
  "id": string;
}
