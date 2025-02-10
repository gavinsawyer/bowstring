import { ChangeDetectionStrategy, Component, inject }               from "@angular/core";
import { ReactiveFormsModule }                                      from "@angular/forms";
import { MusicKitInstanceLoaderService }                            from "@standard/services";
import { BoxComponent, FlexboxContainerComponent, HeaderComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                               from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      BoxComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      ReactiveFormsModule,
    ],
    styleUrl:        "ConnectedAppsAccountChildRouteComponent.sass",
    templateUrl:     "ConnectedAppsAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class ConnectedAppsAccountChildRouteComponent
  extends AccountChildRouteComponent {

  constructor() {
    super();

    this.musicKitLoaderService.load().then<void, never>(
      (musicKitInstance: MusicKit.MusicKitInstance | null): void => {
        console.error(musicKitInstance?.isAuthorized);
      },
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }

  private readonly musicKitLoaderService: MusicKitInstanceLoaderService = inject<MusicKitInstanceLoaderService>(MusicKitInstanceLoaderService);

}
