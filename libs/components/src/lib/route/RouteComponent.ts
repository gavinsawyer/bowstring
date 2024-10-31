import { Component, inject, input, type InputSignal, type OnInit, type Signal, TemplateRef, viewChild } from "@angular/core";
import { Meta }                                                                                         from "@angular/platform-browser";


@Component(
  {
    standalone: true,
    template:   "",
  },
)
export class RouteComponent
  implements OnInit {

  private readonly meta: Meta = inject<Meta>(Meta);

  public readonly aboveTemplateRef$: Signal<TemplateRef<never> | undefined> = viewChild<TemplateRef<never>>("aboveTemplate");
  public readonly belowTemplateRef$: Signal<TemplateRef<never> | undefined> = viewChild<TemplateRef<never>>("belowTemplate");
  public readonly descriptionInput$: InputSignal<string>                    = input.required<string>(
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
