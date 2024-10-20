/// <reference types="@angular/localize" />

import { Injectable }            from "@angular/core";
import { InputComponentOptions } from "@standard/types";


@Injectable(
  {
    providedIn: "root",
  },
)
export class InputService {

  public readonly addressCountryInputComponentOptions: InputComponentOptions   = {
    "United States": "United States",
  };
  public readonly addressLevel1InputComponentOptions: InputComponentOptions    = {
    "Alabama":        "AL",
    "Alaska":         "AK",
    "Arizona":        "AZ",
    "Arkansas":       "AR",
    "California":     "CA",
    "Colorado":       "CO",
    "Connecticut":    "CT",
    "Delaware":       "DE",
    "Florida":        "FL",
    "Georgia":        "GA",
    "Hawaii":         "HI",
    "Idaho":          "ID",
    "Illinois":       "IL",
    "Indiana":        "IN",
    "Iowa":           "IA",
    "Kansas":         "KS",
    "Kentucky":       "KY",
    "Louisiana":      "LA",
    "Maine":          "ME",
    "Maryland":       "MD",
    "Massachusetts":  "MA",
    "Michigan":       "MI",
    "Minnesota":      "MN",
    "Mississippi":    "MS",
    "Missouri":       "MO",
    "Montana":        "MT",
    "Nebraska":       "NE",
    "Nevada":         "NV",
    "New Hampshire":  "NH",
    "New Jersey":     "NJ",
    "New Mexico":     "NM",
    "New York":       "NY",
    "North Carolina": "NC",
    "North Dakota":   "ND",
    "Ohio":           "OH",
    "Oklahoma":       "OK",
    "Oregon":         "OR",
    "Pennsylvania":   "PA",
    "Rhode Island":   "RI",
    "South Carolina": "SC",
    "South Dakota":   "SD",
    "Tennessee":      "TN",
    "Texas":          "TX",
    "Utah":           "UT",
    "Vermont":        "VT",
    "Virginia":       "VA",
    "Washington":     "WA",
    "West Virginia":  "WV",
    "Wisconsin":      "WI",
    "Wyoming":        "WY",
  };
  public readonly namePrefixInputComponentOptions: InputComponentOptions       = {
    "Dr.":  "Dr.",
    "Miss": "Miss",
    "Mr.":  "Mr.",
    "Mrs.": "Mrs.",
    "Ms.":  "Ms.",
    "Mx.":  "Mx.",
  };
  public readonly phoneCountryCodeInputComponentOptions: InputComponentOptions = {
    "ABW": "297",
    "AFG": "93",
    "AGO": "244",
    "ALB": "355",
    "AND": "376",
    "ANT": "599",
    "ARE": "971",
    "ARG": "54",
    "ARM": "374",
    "AUS": "61",
    "AUT": "43",
    "AZE": "994",
    "BDI": "257",
    "BEL": "32",
    "BEN": "229",
    "BFA": "226",
    "BGD": "880",
    "BGR": "359",
    "BHR": "973",
    "BIH": "387",
    "BLR": "375",
    "BLZ": "501",
    "BOL": "591",
    "BRA": "55",
    "BRN": "673",
    "BTN": "975",
    "BWA": "267",
    "CAF": "236",
    "CAN": "1",
    "CHE": "41",
    "CHL": "56",
    "CHN": "86",
    "CIV": "225",
    "CMR": "237",
    "COD": "243",
    "COG": "242",
    "COK": "682",
    "COL": "57",
    "COM": "269",
    "CPV": "238",
    "CRI": "506",
    "CUB": "53",
    "CUW": "599",
    "CYP": "357",
    "CZE": "420",
    "DEU": "49",
    "DJI": "253",
    "DNK": "45",
    "DZA": "213",
    "ECU": "593",
    "EGY": "20",
    "ERI": "291",
    "ESP": "34",
    "EST": "372",
    "ETH": "251",
    "FIN": "358",
    "FJI": "679",
    "FRA": "33",
    "FSM": "691",
    "GAB": "241",
    "GBR": "44",
    "GEO": "995",
    "GHA": "233",
    "GIB": "350",
    "GIN": "224",
    "GMB": "220",
    "GNB": "245",
    "GNQ": "240",
    "GRC": "30",
    "GRL": "299",
    "GTM": "502",
    "GUF": "594",
    "GUY": "592",
    "HKG": "852",
    "HND": "504",
    "HRV": "385",
    "HTI": "509",
    "HUN": "36",
    "IDN": "62",
    "IND": "91",
    "IRL": "353",
    "IRN": "98",
    "IRQ": "964",
    "ISL": "354",
    "ISR": "972",
    "ITA": "39",
    "JOR": "962",
    "JPN": "81",
    "KAZ": "7",
    "KEN": "254",
    "KGZ": "996",
    "KHM": "855",
    "KIR": "686",
    "KOR": "82",
    "KWT": "965",
    "LAO": "856",
    "LBN": "961",
    "LBR": "231",
    "LBY": "218",
    "LIE": "423",
    "LKA": "94",
    "LSO": "266",
    "LTU": "370",
    "LUX": "352",
    "LVA": "371",
    "MAR": "212",
    "MCO": "377",
    "MDA": "373",
    "MDG": "261",
    "MDV": "960",
    "MEX": "52",
    "MHL": "692",
    "MKD": "389",
    "MLI": "223",
    "MLT": "356",
    "MMR": "95",
    "MNE": "382",
    "MNG": "976",
    "MOZ": "258",
    "MRT": "222",
    "MUS": "230",
    "MWI": "265",
    "MYS": "60",
    "NAM": "264",
    "NCL": "687",
    "NER": "227",
    "NGA": "234",
    "NIC": "505",
    "NLD": "31",
    "NOR": "47",
    "NPL": "977",
    "NRU": "674",
    "NZL": "64",
    "OMN": "968",
    "PAK": "92",
    "PAN": "507",
    "PER": "51",
    "PHL": "63",
    "PLW": "680",
    "PNG": "675",
    "POL": "48",
    "PRT": "351",
    "PRY": "595",
    "PSE": "970",
    "QAT": "974",
    "ROU": "40",
    "RUS": "7",
    "RWA": "250",
    "SAU": "966",
    "SDN": "249",
    "SEN": "221",
    "SGP": "65",
    "SLB": "677",
    "SLE": "232",
    "SLV": "503",
    "SMR": "378",
    "SOM": "252",
    "SRB": "381",
    "SSD": "211",
    "STP": "239",
    "SUR": "597",
    "SVK": "421",
    "SVN": "386",
    "SWE": "46",
    "SWZ": "268",
    "SYC": "248",
    "SYR": "963",
    "TCD": "235",
    "TGO": "228",
    "THA": "66",
    "TJK": "992",
    "TKM": "993",
    "TLS": "670",
    "TON": "676",
    "TUN": "216",
    "TUR": "90",
    "TUV": "688",
    "TWN": "886",
    "TZA": "255",
    "UGA": "256",
    "UKR": "380",
    "URY": "598",
    "USA": "1",
    "UZB": "998",
    "VEN": "58",
    "VNM": "84",
    "VUT": "678",
    "WSM": "685",
    "YEM": "967",
    "ZAF": "27",
    "ZMB": "260",
    "ZWE": "263",
  };

  public getPhoneNationalMask(countryCode?: string): string | undefined {
    switch (countryCode) {
      case "1":
        return "(000) 000-0000";
      case "7":
        return "000 000-00-00";
      case "20":
        return "00 000 000 000";
      case "27":
        return "00 000 000 0000";
      case "30":
        return "000 000 0000";
      case "31":
        return "00 000 0000";
      case "32":
        return "000 00 00 00";
      case "33":
        return "00 00 00 00 00";
      case "34":
        return "000 000 000";
      case "36":
        return "00 000 0000";
      case "39":
        return "00 000 000 0000";
      case "40":
        return "00 000 000 000";
      case "41":
        return "000 000 00 00";
      case "43":
        return "0000 000000";
      case "44":
        return "00000 000000";
      case "45":
        return "00 00 00 00";
      case "46":
        return "000 000 00000";
      case "47":
        return "000 00 000";
      case "48":
        return "000 000 000";
      case "49":
        return "0000 0000000";
      case "51":
        return "00 000 0000";
      case "52":
        return "00 0000 0000";
      case "53":
        return "00 000 0000";
      case "54":
        return "000 0000 0000";
      case "55":
        return "00 0000 0000";
      case "56":
        return "0 0000 0000";
      case "57":
        return "000 000 0000";
      case "58":
        return "00 0000 000000";
      case "60":
        return "000 000 0000";
      case "61":
        return "00 0000 0000";
      case "62":
        return "0000 0000 0000";
      case "63":
        return "0000 000 0000";
      case "64":
        return "00 000 0000";
      case "65":
        return "0000 0000";
      case "66":
        return "00 0000 0000";
      case "81":
        return "00 0000 0000";
      case "82":
        return "00 0000 0000";
      case "84":
        return "00 000 000 000";
      case "86":
        return "000 0000 0000";
      case "90":
        return "00 000 000 0000";
      case "91":
        return "00000 00000";
      case "92":
        return "0000 000000";
      case "93":
        return "000 000 0000";
      case "94":
        return "00 000 0000";
      case "95":
        return "00 000 0000";
      case "98":
        return "00 0000 0000";
      case "212":
        return "00 0000 00000";
      case "213":
        return "00 000 00 00 00";
      case "216":
        return "00 000 000";
      case "218":
        return "00 000 000000";
      case "220":
        return "000 0000";
      case "221":
        return "00 000 00 00";
      case "222":
        return "00 00 00 00";
      case "223":
        return "00 00 00 00";
      case "224":
        return "00 000 000";
      case "225":
        return "00 00 00 00";
      case "226":
        return "00 00 00 00";
      case "227":
        return "00 00 00 00";
      case "228":
        return "00 00 00 00";
      case "229":
        return "00 00 00 00";
      case "230":
        return "000 0000";
      case "231":
        return "00 000 000";
      case "232":
        return "00 000000";
      case "233":
        return "00 000 000 000";
      case "234":
        return "00 000 000 0000";
      case "235":
        return "00 00 00 00";
      case "236":
        return "00 00 00 00";
      case "237":
        return "000 000 000";
      case "238":
        return "000 00 00";
      case "239":
        return "00 000000";
      case "240":
        return "00 000 0000";
      case "241":
        return "00 00 00 00";
      case "242":
        return "00 000 0000";
      case "243":
        return "000 000 000";
      case "244":
        return "000 000 000";
      case "245":
        return "000 0000";
      case "248":
        return "00 000 000";
      case "249":
        return "00 000 000 000";
      case "250":
        return "0000 00000";
      case "251":
        return "00 00 000 0000";
      case "252":
        return "00 000 000";
      case "253":
        return "00 00 00 00";
      case "254":
        return "000 000000";
      case "255":
        return "00 000 000 000";
      case "256":
        return "0000 000000";
      case "257":
        return "00 00 0000";
      case "258":
        return "00 000 0000";
      case "260":
        return "000 0000000";
      case "261":
        return "00 00 000 00";
      case "263":
        return "00 000 000 000";
      case "264":
        return "00 000 0000";
      case "265":
        return "00 0000 000";
      case "266":
        return "00 000 0000";
      case "267":
        return "00 000 0000";
      case "268":
        return "00 00 00 00";
      case "269":
        return "00 000 00 00";
      case "291":
        return "00 000 000";
      case "297":
        return "000 0000";
      case "299":
        return "00 00 00";
      case "350":
        return "00000";
      case "351":
        return "000 000 000";
      case "352":
        return "0000 0000";
      case "353":
        return "000 000 0000";
      case "354":
        return "000 0000";
      case "355":
        return "000 000 000";
      case "356":
        return "0000 0000";
      case "357":
        return "00 000000";
      case "358":
        return "000 0000000";
      case "359":
        return "000 000 000";
      case "370":
        return "00 000 00000";
      case "371":
        return "00 000 000";
      case "372":
        return "0000 0000";
      case "373":
        return "00 000 000";
      case "374":
        return "000 000 000";
      case "375":
        return "000 000 00 00";
      case "376":
        return "000 000";
      case "377":
        return "00 00 00 00";
      case "378":
        return "0000 000000";
      case "380":
        return "00 000 000 00 00";
      case "381":
        return "00 000 00000";
      case "382":
        return "00 000 000";
      case "385":
        return "00 000 0000";
      case "386":
        return "00 000 00 00";
      case "387":
        return "00 000 000";
      case "389":
        return "00 000 000";
      case "420":
        return "000 000 000";
      case "421":
        return "00 000 000 000";
      case "423":
        return "000 0000";
      case "501":
        return "000-0000";
      case "502":
        return "0000 0000";
      case "503":
        return "0000 0000";
      case "504":
        return "0000 0000";
      case "505":
        return "0000 0000";
      case "506":
        return "0000 0000";
      case "507":
        return "0000 0000";
      case "509":
        return "00 00 0000";
      case "591":
        return "00 000 0000";
      case "592":
        return "000 0000";
      case "593":
        return "00 0000 000";
      case "594":
        return "0000 000000";
      case "595":
        return "000 000 000";
      case "597":
        return "000 0000";
      case "598":
        return "00 0000 0000";
      case "599":
        return "000 0000";
      case "670":
        return "000 0000";
      case "673":
        return "000-0000";
      case "674":
        return "000 0000";
      case "675":
        return "0000 0000";
      case "676":
        return "00000";
      case "677":
        return "00000";
      case "678":
        return "00000";
      case "679":
        return "000 0000";
      case "680":
        return "000 0000";
      case "682":
        return "00 000";
      case "685":
        return "00 00000";
      case "686":
        return "00000";
      case "687":
        return "00 00 00";
      case "688":
        return "00000";
      case "691":
        return "000 0000";
      case "692":
        return "000 0000";
      case "852":
        return "0000 0000";
      case "855":
        return "00 000 000";
      case "856":
        return "00 00 00 000";
      case "880":
        return "00000 000000";
      case "886":
        return "00 0000 0000";
      case "960":
        return "000 0000";
      case "961":
        return "00 000 000";
      case "962":
        return "00 0000 0000";
      case "963":
        return "00 0000 0000";
      case "964":
        return "00 0000 0000";
      case "965":
        return "0000 0000";
      case "966":
        return "00 000 0000";
      case "967":
        return "00 000 000";
      case "968":
        return "00 000 000";
      case "970":
        return "00 000 000 000";
      case "971":
        return "00 000 0000";
      case "972":
        return "00 000 0000";
      case "973":
        return "0000 0000";
      case "974":
        return "0000 0000";
      case "975":
        return "00 00 00 00";
      case "976":
        return "00 00 0000";
      case "977":
        return "00 00000000";
      case "992":
        return "00 000 000 000";
      case "993":
        return "00 0000000";
      case "994":
        return "000 000 00 00";
      case "995":
        return "000 00 00 00";
      case "996":
        return "000 000 000";
      case "998":
        return "00 000 000 00 00";
      default:
        return undefined;
    }
  }

}
