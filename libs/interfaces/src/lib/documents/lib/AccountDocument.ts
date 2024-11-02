export interface AccountDocument {
  "email": string;
  "payment": {
    "token": string;
  }[] | null;
  "profile": {
    "birthday": Date | null;
    "name": string | null;
  } | null;
  "stripeCustomer": {
    "address": {
      "city": string;
      "country": string;
      "line1": string;
      "line2": string | null;
      "postal_code": string;
      "state": string | null;
    } | null;
    "id": string;
    "name": string | null;
    "payment_method": {
      "billing_details": {
        "address": {
          "city": string;
          "country": string;
          "line1": string;
          "line2": string | null;
          "postal_code": string;
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
