import { Component }       from "@angular/core";
import { HeaderComponent } from "@standard/components";


@Component(
  {
    selector:    "standard-sheet-contents--signup",
    standalone:  true,
    styleUrls:   [
      "SignupSheetContentsComponent.sass",
    ],
    templateUrl: "SignupSheetContentsComponent.html",
    imports:     [
      HeaderComponent,
    ],
  },
)
export class SignupSheetContentsComponent {
}
