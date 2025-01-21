import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule }                        from "@angular/forms";
import { AccountService }                             from "@standard/services";
import { AccountChildRouteComponent }                 from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ReactiveFormsModule,
    ],
    styleUrls:       [
      "HomeAccountChildRouteComponent.sass",
    ],
    templateUrl:     "HomeAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class HomeAccountChildRouteComponent
  extends AccountChildRouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
