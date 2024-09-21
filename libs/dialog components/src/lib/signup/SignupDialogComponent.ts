import { Component }                                                                                   from "@angular/core";
import { ButtonComponent, CardComponent, DialogComponent, FlexboxContainerComponent, HeaderComponent } from "@standard/components";


@Component(
  {
    host:        {
      "[class.extends-standard--dialog]": "true",
    },
    selector:    "standard-dialogs--signup",
    standalone:  true,
    styleUrls:   [
      "SignupDialogComponent.sass",
    ],
    templateUrl: "SignupDialogComponent.html",
    imports:     [
      ButtonComponent,
      CardComponent,
      FlexboxContainerComponent,
      HeaderComponent,
    ],
  },
)
export class SignupDialogComponent
  extends DialogComponent {
}
