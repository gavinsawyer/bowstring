import { FieldValue } from "firebase-admin/firestore";


function toDocumentPartial<K extends string | number | symbol, T>(
  valueAsObject: { [key in K]: T | null | undefined },
): { [key in keyof typeof valueAsObject]: T extends { "object": string, "id": string } ? string : T } | object;
function toDocumentPartial<K extends string | number | symbol, T>(
  valueAsObject: { [key in K]: T | null | undefined },
  withFieldValue?: boolean,
): { [key in keyof typeof valueAsObject]: T extends { "object": string, "id": string } ? string : T | FieldValue } | object;
function toDocumentPartial<K extends string | number | symbol, T>(
  valueAsObject: { [key in K]: T | null | undefined },
  withFieldValue?: boolean,
): { [key in keyof typeof valueAsObject]: T extends { "object": string, "id": string } ? string : T | FieldValue } | object {
  const value: T | null | undefined = Object.values<T | null | undefined>(valueAsObject)[0];

  return (typeof value === "boolean" || typeof value === "number" || value) && (!Array.isArray(value) || value.length) && (typeof value !== "object" || Object.keys(value).length) || withFieldValue ? {
    [Object.keys(valueAsObject)[0]]: (typeof value === "boolean" || typeof value === "number" || value) && (!Array.isArray(value) || value.length) && (typeof value !== "object" || Object.keys(value).length) ? (typeof value === "object" && "id" in value && "object" in value) ? value.id as string : value : FieldValue.delete(),
  } : {};
}

export default toDocumentPartial;
