import { ChangeDetectionStrategy, Component, inject, input, type InputSignal, type OnInit } from "@angular/core";
import { Meta }                                                                             from "@angular/platform-browser";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:        "",

    standalone: true,
  },
)
export class AccountChildRouteComponent
  implements OnInit {

  private readonly meta: Meta = inject<Meta>(Meta);

  public readonly descriptionInput$: InputSignal<string> = input.required<string>(
    {
      alias: "description",
    },
  );

  public ngOnInit(): void {
    this.meta.updateTag(
      {
        name:    "description",
        content: this.descriptionInput$(),
      },
    );
  }

}
