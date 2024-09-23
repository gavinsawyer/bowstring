import { Component }       from "@angular/core";
import { HeaderComponent } from "@standard/components";


@Component(
  {
    selector:    "standard-sheet-contents--signin",
    standalone:  true,
    styleUrls:   [
      "SigninSheetContentsComponent.sass",
    ],
    templateUrl: "SigninSheetContentsComponent.html",
    imports:     [
      HeaderComponent,
    ],
  },
)
export class SigninSheetContentsComponent {
}
