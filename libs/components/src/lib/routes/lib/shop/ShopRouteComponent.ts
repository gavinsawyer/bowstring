import { NgTemplateOutlet }                                                                                                                                                        from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, InjectionToken, Injector, type Signal, type TemplateRef, viewChild }                                                          from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                  from "@angular/core/rxjs-interop";
import { RouterOutlet, type Routes }                                                                                                                                               from "@angular/router";
import { FindRouteByPathPipe }                                                                                                                                                     from "@standard/pipes";
import { map, type Observable, of, startWith, switchMap }                                                                                                                          from "rxjs";
import { FlexboxContainerComponent, FooterComponent, HeaderComponent, HeadingGroupComponent, InspectorComponent, LabelComponent, LinkComponent, RouteComponent, SectionComponent } from "../../../../";
import { type ShopChildRouteComponent }                                                                                                                                            from "./child/ShopChildRouteComponent";
import { shopRoutes }                                                                                                                                                              from "./children";


const SHOP_ROUTES: InjectionToken<Routes> = new InjectionToken<Routes>("SHOP_ROUTES");

@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FindRouteByPathPipe,
      FlexboxContainerComponent,
      FooterComponent,
      HeaderComponent,
      HeadingGroupComponent,
      InspectorComponent,
      LabelComponent,
      LinkComponent,
      NgTemplateOutlet,
      RouterOutlet,
      SectionComponent,
    ],
    providers:       [
      {
        provide:  SHOP_ROUTES,
        useValue: shopRoutes,
      },
    ],
    styleUrl:        "ShopRouteComponent.sass",
    templateUrl:     "ShopRouteComponent.html",

    standalone: true,
  },
)
export class ShopRouteComponent
  extends RouteComponent {

  private readonly injector: Injector = inject<Injector>(Injector);

  protected readonly routerOutlet$: Signal<RouterOutlet | undefined>          = viewChild<RouterOutlet>(RouterOutlet);
  protected readonly inspectorTemplateRef$: Signal<TemplateRef<never> | null> = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet | undefined, Observable<TemplateRef<never> | null>>(
        (routerOutlet?: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet ? routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<ShopChildRouteComponent, Observable<TemplateRef<never> | undefined>>(
            ({ inspectorTemplateRef$ }: ShopChildRouteComponent): Observable<TemplateRef<never> | undefined> => toObservable<TemplateRef<never> | undefined>(
              inspectorTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>(routerOutlet?.isActivated ? (routerOutlet.component as ShopChildRouteComponent).inspectorTemplateRef$() : undefined),
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
  protected readonly shopRoutes: Routes                                       = inject<Routes>(SHOP_ROUTES);

}
