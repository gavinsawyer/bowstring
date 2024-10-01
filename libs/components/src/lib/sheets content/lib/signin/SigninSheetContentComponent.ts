import { Component }                                                   from "@angular/core";
import { FormBuilder }                                                 from "@angular/forms";
import { ButtonComponent }                                             from "../../../button/ButtonComponent";
import { HeaderComponent }                                             from "../../../header/HeaderComponent";
import { DividerComponent, FlexboxContainerComponent, LabelComponent } from "../../../layout and organization";
import { SectionComponent }                                            from "../../../section/SectionComponent";
import { TextFieldComponent }                                          from "../../../selection and input";
import { SymbolComponent }                                             from "../../../symbol/SymbolComponent";


@Component(
  {
    imports:     [
      ButtonComponent,
      DividerComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      LabelComponent,
      SymbolComponent,
      SectionComponent,
      TextFieldComponent,
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
