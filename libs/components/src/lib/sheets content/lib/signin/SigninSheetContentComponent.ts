import { Component }                 from "@angular/core";
import { FormBuilder }               from "@angular/forms";
import { ButtonComponent }           from "../../../button/ButtonComponent";
import { HeaderComponent }           from "../../../header/HeaderComponent";
import { FlexboxContainerComponent } from "../../../layout and organization";
import { TextFieldComponent }        from "../../../selection and input";
import { SymbolComponent }           from "../../../symbol/SymbolComponent";


@Component(
  {
    imports:     [
      FlexboxContainerComponent,
      HeaderComponent,
      TextFieldComponent,
      ButtonComponent,
      SymbolComponent,
    ],
    selector:    "standard--sheet-contents--signin",
    standalone:  true,
    styleUrls:   [
      "SigninSheetContentComponent.sass",
    ],
    templateUrl: "SigninSheetContentComponent.html",
  },
)
export class SigninSheetContentComponent {

  public readonly signInFormGroup = new FormBuilder().nonNullable.group<{ "username": string, "password": string }>(
    {
      "username": "",
      "password": "",
    },
  );

}
