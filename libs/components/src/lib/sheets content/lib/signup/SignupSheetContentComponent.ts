import { Component }                                                   from "@angular/core";
import { FormBuilder, Validators }                                     from "@angular/forms";
import { ListItemDirective }                                           from "@standard/directives";
import { ButtonComponent }                                             from "../../../button/ButtonComponent";
import { HeaderComponent }                                             from "../../../header/HeaderComponent";
import { DividerComponent, FlexboxContainerComponent, LabelComponent } from "../../../layout and organization";
import { LinkComponent }                                               from "../../../link/LinkComponent";
import { ListComponent }                                               from "../../../list/ListComponent";
import { SectionComponent }                                            from "../../../section/SectionComponent";
import { TextFieldComponent }                                          from "../../../selection and input";
import { SymbolComponent }                                             from "../../../symbol/SymbolComponent";


@Component(
  {
    imports:     [
      HeaderComponent,
      TextFieldComponent,
      ButtonComponent,
      DividerComponent,
      FlexboxContainerComponent,
      LabelComponent,
      LinkComponent,
      ListComponent,
      ListItemDirective,
      SectionComponent,
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

  public readonly signUpWithWebAuthnFormGroup = new FormBuilder().nonNullable.group<{ "username": string }>(
    {
      username: "",
    },
    {
      validators: [
        Validators.required,
      ],
    },
  );
  public readonly signUpFormGroup             = new FormBuilder().nonNullable.group<{ "username": string, "password": string, "passwordConfirmation": string }>(
    {
      username:             "",
      password:             "",
      passwordConfirmation: "",
    },
  );

}
