import { ChangeDetectionStrategy, Component, effect, inject }                                                                                                                   from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators }                                                                                                              from "@angular/forms";
import { type AccountDocument }                                                                                                                                                 from "@standard/interfaces";
import { AccountService }                                                                                                                                                       from "@standard/services";
import { BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, LabelComponent, SymbolComponent, TextFieldInputComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                                                                                                  from "../../../child route/ChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      BoxComponent,
      ButtonComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      LabelComponent,
      ReactiveFormsModule,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    styleUrls:       [
      "SecurityChildRouteComponent.sass",
    ],
    templateUrl:     "SecurityChildRouteComponent.html",

    standalone: true,
  },
)
export class SecurityChildRouteComponent
  extends ChildRouteComponent {

  constructor() {
    super();

    this.passkeyFormGroup.disable();

    effect(
      (): void => {
        const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

        if (accountDocument) {
          this.passkeyFormGroup.reset(
            {
              email: accountDocument.email,
            },
          );
        }
      },
    );
  }

  protected readonly accountService: AccountService                                = inject<AccountService>(AccountService);
  protected readonly passkeyFormGroup: FormGroup<{ "email": FormControl<string> }> = new FormGroup<{ "email": FormControl<string> }>(
    {
      email: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
    },
  );

}
