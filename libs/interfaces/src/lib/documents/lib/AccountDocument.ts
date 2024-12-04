export interface AccountDocument {
  "email": string;
  "phone": {
    "countryCode": string;
    "national": string;
  } | null;
  "messages": {
    "newsletter": boolean | null;
    "orderUpdates": boolean | null;
    "promotions": boolean | null;
  } | null;
  "payment": {
    "token": string;
  }[] | null;
  "profile": {
    "birthday": string | null;
    "name": string | null;
  } | null;
  "stripeCustomer": {
    "address": {
      "city": string;
      "country": string;
      "line1": string;
      "line2": string | null;
      "postalCode": string;
      "state": string | null;
    } | null;
    "id": string;
    "name": string | null;
    "paymentMethod": {
      "billingDetails": {
        "address": {
          "city": string;
          "country": string;
          "line1": string;
          "line2": string | null;
          "postalCode": string;
          "state": string | null;
        } | null;
        "email": string;
        "name": string;
        "phone": string;
      };
      "id": string;
      "type": string;
    } | null;
    "phone": string | null;
  } | null;
}
