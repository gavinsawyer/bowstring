import { NgTemplateOutlet }                                                                                                                                           from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Injector, type Signal, type TemplateRef, viewChild }                                                             from "@angular/core";
import { toObservable, toSignal }                                                                                                                                     from "@angular/core/rxjs-interop";
import { RouterOutlet }                                                                                                                                               from "@angular/router";
import { MasonryChildDirective }                                                                                                                                      from "@standard/directives";
import { map, type Observable, of, startWith, switchMap }                                                                                                             from "rxjs";
import { FlexboxContainerComponent, HeaderComponent, ImageComponent, InspectorComponent, LinkComponent, MasonryContainerComponent, RouteComponent, SectionComponent } from "../../../../";
import { type ChildRouteComponent }                                                                                                                                   from "./child/ChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FlexboxContainerComponent,
      HeaderComponent,
      ImageComponent,
      InspectorComponent,
      LinkComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
      NgTemplateOutlet,
      RouterOutlet,
      SectionComponent,
    ],
    styleUrls:       [
      "GalleryRouteComponent.sass",
    ],
    templateUrl:     "GalleryRouteComponent.html",

    standalone: true,
  },
)
export class GalleryRouteComponent
  extends RouteComponent {

  private readonly injector: Injector = inject<Injector>(Injector);

  protected readonly routerOutlet$: Signal<RouterOutlet | undefined>          = viewChild<RouterOutlet>(RouterOutlet);
  protected readonly inspectorTemplateRef$: Signal<TemplateRef<never> | null> = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet | undefined, Observable<TemplateRef<never> | null>>(
        (routerOutlet?: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet ? routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<ChildRouteComponent, Observable<TemplateRef<never> | undefined>>(
            ({ inspectorTemplateRef$ }: ChildRouteComponent): Observable<TemplateRef<never> | undefined> => toObservable<TemplateRef<never> | undefined>(
              inspectorTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>(routerOutlet?.isActivated ? (routerOutlet.component as ChildRouteComponent).inspectorTemplateRef$() : undefined),
          map<TemplateRef<never> | undefined, TemplateRef<never> | null>(
            (templateRef?: TemplateRef<never>): TemplateRef<never> | null => templateRef || null,
          ),
        ) : of<null>(null),
      ),
      startWith<TemplateRef<never> | null, [ null ]>(null),
    ),
    {
      requireSync: true,
    },
  );

}
