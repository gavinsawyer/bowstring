import { CategoryDocument } from "./CategoryDocument";


export interface ProductDocument {
  "category": CategoryDocument | null;
  "categoryId": string | null;
  "descriptionSections": {
    "heading": string | null;
    "paragraph": string;
  }[];
  "id": string;
  "name": string;
  "price": number;
}
