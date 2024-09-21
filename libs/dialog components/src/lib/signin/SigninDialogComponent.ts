import { Component }                                                                                   from "@angular/core";
import { ButtonComponent, CardComponent, DialogComponent, FlexboxContainerComponent, HeaderComponent } from "@standard/components";


@Component(
  {
    host:        {
      "[class.extends-standard--dialog]": "true",
    },
    selector:    "standard-dialogs--signin",
    standalone:  true,
    styleUrls:   [
      "SigninDialogComponent.sass",
    ],
    templateUrl: "SigninDialogComponent.html",
    imports: [
      ButtonComponent,
      CardComponent,
      FlexboxContainerComponent,
      HeaderComponent,
    ],
  },
)
export class SigninDialogComponent
  extends DialogComponent {
}
