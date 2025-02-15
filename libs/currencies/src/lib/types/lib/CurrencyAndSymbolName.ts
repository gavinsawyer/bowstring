type CurrencyAndSymbolNames = {
  "Aruban florin": "Florinsign";
  "Australian dollar": "Australiandollarsign";
  "Azerbaijani manat": "Manatsign";
  "Bitcoin": "Bitcoinsign";
  "Brazilian real": "Brazilianrealsign";
  "Chinese yuan": "Chineseyuanrenminbisign";
  "Costa Rican colón": "Coloncurrencysign";
  "Danish krone": "Danishkronesign";
  "Euro": "Eurosign";
  "Georgian lari": "Larisign";
  "Ghanaian cedi": "Cedisign";
  "Indian rupee": "Indianrupeesign";
  "Israeli shekel": "Shekelsign";
  "Japanese yen": "Yensign";
  "Kazakhstani tenge": "Tengesign";
  "Lao kip": "Kipsign";
  "Malaysian ringgit": "Malaysianringgitsign";
  "Mongolian tugrik": "Tugriksign";
  "Nigerian naira": "Nairasign";
  "Norwegian krone": "Norwegiankronesign";
  "Paraguayan guaraní": "Guaranisign";
  "Peruvian sol": "Peruviansolessign";
  "Philippine peso": "Pesosign";
  "Polish złoty": "Polishzlotysign";
  "Russian ruble": "Rublesign";
  "Singapore dollar": "Singaporedollarsign";
  "South Korean won": "Wonsign";
  "Sterling": "Sterlingsign";
  "Swedish krona": "Swedishkronasign";
  "Thai baht": "Bahtsign";
  "Turkish lira": "Turkishlirasign";
  "Ukrainian hryvnia": "Hryvniasign";
  "United States Dollar": "Dollarsign";
  "Vietnamese đồng": "Dongsign";
};

export type CurrencyAndSymbolName = {
  [key in keyof CurrencyAndSymbolNames]: {
    "name": key;
    "symbolName": CurrencyAndSymbolNames[key];
  };
}[keyof CurrencyAndSymbolNames];
