import { ChangeDetectionStrategy, Component, inject, input, type InputSignal, type OnInit, type Signal, type TemplateRef, viewChild } from "@angular/core";
import { Meta }                                                                                                                       from "@angular/platform-browser";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:        "",

    standalone: true,
  },
)
export class GalleryChildRouteComponent
  implements OnInit {

  private readonly meta: Meta = inject<Meta>(Meta);

  public readonly descriptionInput$: InputSignal<string>                        = input.required<string>(
    {
      alias: "description",
    },
  );
  public readonly inspectorTemplateRef$: Signal<TemplateRef<never> | undefined> = viewChild<TemplateRef<never>>("inspectorTemplate");

  public ngOnInit(): void {
    this.meta.updateTag(
      {
        name:    "description",
        content: this.descriptionInput$(),
      },
    );
  }

}
