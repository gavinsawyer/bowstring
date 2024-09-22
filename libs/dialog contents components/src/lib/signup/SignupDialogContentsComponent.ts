import { Component }                      from "@angular/core";
import { CardComponent, HeaderComponent } from "@standard/components";


@Component(
  {
    selector:    "standard-dialog-contents--signup",
    standalone:  true,
    styleUrls:   [
      "SignupDialogContentsComponent.sass",
    ],
    templateUrl: "SignupDialogContentsComponent.html",
    imports:     [
      CardComponent,
      HeaderComponent,
    ],
  },
)
export class SignupDialogContentsComponent {
}
