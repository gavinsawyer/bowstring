import { Component }                      from "@angular/core";
import { CardComponent, HeaderComponent } from "@standard/components";


@Component(
  {
    selector:    "standard-dialog-contents--signin",
    standalone:  true,
    styleUrls:   [
      "SigninDialogContentsComponent.sass",
    ],
    templateUrl: "SigninDialogContentsComponent.html",
    imports:     [
      CardComponent,
      HeaderComponent,
    ],
  },
)
export class SigninDialogContentsComponent {
}
