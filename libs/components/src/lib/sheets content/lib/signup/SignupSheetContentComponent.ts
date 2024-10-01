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
    selector:    "standard--sheet-contents--signup",
    standalone:  true,
    styleUrls:   [
      "SignupSheetContentComponent.sass",
    ],
    templateUrl: "SignupSheetContentComponent.html",
  },
)
export class SignupSheetContentComponent {

  public readonly signUpFormGroup = new FormBuilder().nonNullable.group<{ "username": string, "password": string }>(
    {
      "username": "",
      "password": "",
    },
  );

}
