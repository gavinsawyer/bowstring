import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule }                        from "@angular/forms";
import { MasonryChildDirective }                      from "@standard/directives";
import { AccountService }                             from "@standard/services";
import { ImageComponent, MasonryContainerComponent }  from "../../../../../../../";
import { GalleryChildRouteComponent }                 from "../../../child/GalleryChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ImageComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
      ReactiveFormsModule,
    ],
    styleUrl:        "HomeGalleryChildRouteComponent.sass",
    templateUrl:     "HomeGalleryChildRouteComponent.html",

    standalone: true,
  },
)
export class HomeGalleryChildRouteComponent
  extends GalleryChildRouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
