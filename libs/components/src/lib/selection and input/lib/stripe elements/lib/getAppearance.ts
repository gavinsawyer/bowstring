import { Appearance } from "@stripe/stripe-js";


function getAppearance(colorScheme?: "dark" | "light"): Appearance {
  return {
    disableAnimations: true,
    rules:             {
      ".Block":               {
        backgroundColor: colorScheme === "dark" ? "rgba(15, 15, 15, 0.5)" : "rgba(240, 240, 240, 0.5)",
        border:          `0.5px solid ${ colorScheme === "dark" ? "rgba(62, 62, 62, 0.6)" : "rgba(193, 193, 193, 0.6)" }`,
        boxShadow:       `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
      },
      ".BlockDivider":        {
        backgroundColor: colorScheme === "dark" ? "rgba(153, 153, 153, 0.25)" : "rgba(102, 102, 102, 0.25)",
      },
      ".Input":               {
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        border:          "none",
        boxShadow:       `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
        letterSpacing:   "-.0344418538em",
        outline:         "none",
        paddingBottom:   "6.11px",
        paddingLeft:     "9.89px",
        paddingRight:    "9.89px",
        paddingTop:      "6.11px",
        transition:      "box-shadow 200ms cubic-bezier(0.25, 0.175, 0.25, 1.75)",
      },
      ".Input--invalid":      {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
      },
      ".Input::placeholder":  {
        color: "hsl(0, 0%, 50%)",
      },
      ".Input:focus":         {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
      },
      ".Input:hover":         {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
      },
      ".Label":               {
        color:         colorScheme === "dark" ? "rgba(251, 251, 251, 0.875)" : "rgba(4, 4, 4, 0.875)",
        fontSize:      "0.7861513778rem",
        letterSpacing: "-.0344418538em",
        marginBottom:  "3.77px",
      },
      ".Tab":                 {
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        border:          "none",
        boxShadow:       `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
        outline:         "none",
        paddingBottom:   "6.11px",
        paddingLeft:     "9.89px",
        paddingRight:    "9.89px",
        paddingTop:      "6.11px",
        transition:      "box-shadow 200ms cubic-bezier(0.25, 0.175, 0.25, 1.75)",
      },
      ".Tab--selected":       {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 0.944272px 6.111456px -2.334368px`,
      },
      ".Tab--selected:focus": {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
      },
      ".Tab:active":          {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 0.944272px 6.111456px -2.334368px`,
      },
      ".Tab:disabled":        {
        boxShadow: "none",
      },
      ".Tab:focus":           {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
      },
      ".Tab:hover":           {
        boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
      },
      ".TabLabel":            {
        color:         colorScheme === "dark" ? "rgb(204, 204, 204)" : "rgb(36, 36, 36)",
        letterSpacing: "-.0344418538em",
      },
    },
    variables:         {
      borderRadius:         "8px",
      colorPrimary:         colorScheme === "dark" ? "rgb(251, 251, 251)" : "rgb(4, 4, 4)",
      colorText:            colorScheme === "dark" ? "white" : "black",
      fontFamily:           "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif",
      fontLineHeight:       "1.1458980338",
      logoColor:            colorScheme === "dark" ? "dark" : "light",
      tabIconColor:         colorScheme === "dark" ? "rgb(204, 204, 204)" : "rgb(36, 36, 36)",
      tabIconSelectedColor: colorScheme === "dark" ? "rgb(204, 204, 204)" : "rgb(36, 36, 36)",
    },
  };
}

export default getAppearance;
