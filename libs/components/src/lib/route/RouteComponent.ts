import { Component, inject, input, type InputSignal, type OnInit } from "@angular/core";
import { Meta }                                                    from "@angular/platform-browser";


@Component(
  {
    standalone: true,
    template:   "",
  },
)
export class RouteComponent
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
