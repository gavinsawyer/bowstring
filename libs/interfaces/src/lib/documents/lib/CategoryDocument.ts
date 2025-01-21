export interface CategoryDocument {
  "descriptionSections": {
    "heading": string | null;
    "paragraph": string;
  }[];
  "id": string;
  "name": string;
  "parentCategories": CategoryDocument[];
  "parentCategoryIds": string[];
}
