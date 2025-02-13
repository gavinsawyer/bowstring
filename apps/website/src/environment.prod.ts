import { type Environment } from "@bowstring/interfaces";


export const environment: Environment = {
  app:        "website",
  apis:       {
    appleMusic: {
      developerToken: "",
    },
    firebase:   {
      apiKey:            "AIzaSyBRD3zmnjKjPnPyzgDwGsmX5CEpj42WIRY",
      appId:             "1:343836520956:web:c2aed087ae5be2fce84279",
      authDomain:        "standard-3eac7.firebaseapp.com",
      databaseURL:       "https://standard-3eac7-default-rtdb.firebaseio.com",
      measurementId:     "G-LWGLZPSZ8W",
      messagingSenderId: "343836520956",
      projectId:         "standard-3eac7",
      storageBucket:     "standard-3eac7.firebasestorage.app",
    },
    recaptcha:  {
      siteKey: "6LdUnL8nAAAAAGxCWDCrFYMIHwhXD3gg0yj30POI",
    },
    stripe:     {
      publishableKey: "pk_test_51QCNXBPkYnhegMwG95aQaPMDGNAMHl5r812Wnx7is2BxK6ZjGq3dQRWqoPDKv6tNYPGCoamPnMNt2TvPXi0CzGso00FG1mKmUT",
    },
  },
  production: true,
};
