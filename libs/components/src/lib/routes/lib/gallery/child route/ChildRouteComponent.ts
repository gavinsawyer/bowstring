import { ChangeDetectionStrategy, Component, inject, input, type InputSignal, type OnInit, type Signal, TemplateRef, viewChild } from "@angular/core";
import { Meta }                                                                                                                  from "@angular/platform-browser";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:        "",

    standalone: true,
  },
)
export class ChildRouteComponent
  implements OnInit {

  private readonly meta: Meta = inject<Meta>(Meta);

  public readonly inspectorTemplateRef$: Signal<TemplateRef<never> | undefined> = viewChild<TemplateRef<never>>("inspectorTemplate");
  public readonly descriptionInput$: InputSignal<string>                        = input.required<string>(
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
