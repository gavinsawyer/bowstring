import { ChangeDetectionStrategy, Component, inject, input, type InputSignal } from "@angular/core";
import { ReactiveFormsModule }                                                 from "@angular/forms";
import { AuthenticationService }                                               from "@bowstring/services";
import { HeaderComponent, LabelComponent, SymbolComponent }                    from "../content";
import { DividerComponent, SectionComponent }                                  from "../layout and organization";
import { ButtonComponent }                                                     from "../menus and actions";
import { type SheetComponent }                                                 from "../presentation";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ButtonComponent,
      DividerComponent,
      HeaderComponent,
      LabelComponent,
      ReactiveFormsModule,
      SectionComponent,
      SymbolComponent,
    ],
    selector:        "bowstring--signout",
    styleUrl:        "SignoutComponent.sass",
    templateUrl:     "SignoutComponent.html",

    standalone: true,
  },
)
export class SignoutComponent {

  protected readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);

  public readonly sheetComponentInput$: InputSignal<SheetComponent> = input.required<SheetComponent>(
    {
      alias: "sheetComponent",
    },
  );

}
