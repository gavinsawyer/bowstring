import { CurrencyPipe, DecimalPipe, isPlatformBrowser }                                                                                                                                                                                     from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, input, type InputSignal, PLATFORM_ID, signal, type Signal }                                                                                                                    from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                                           from "@angular/core/rxjs-interop";
import { collection, type CollectionReference, collectionSnapshots, Firestore, query, type QueryDocumentSnapshot, where }                                                                                                                   from "@angular/fire/firestore";
import { ReactiveFormsModule }                                                                                                                                                                                                              from "@angular/forms";
import { Title }                                                                                                                                                                                                                            from "@angular/platform-browser";
import { type Route }                                                                                                                                                                                                                       from "@angular/router";
import { title as brandTitle }                                                                                                                                                                                                              from "@bowstring/brand";
import type * as currenciesLib                                                                                                                                                                                                              from "@bowstring/currencies";
import { CURRENCIES }                                                                                                                                                                                                                       from "@bowstring/injection-tokens";
import { type StripePriceDocument, type StripeProductDocument }                                                                                                                                                                             from "@bowstring/interfaces";
import { ExchangeService }                                                                                                                                                                                                                  from "@bowstring/services";
import { map, type Observable, of, startWith, switchMap }                                                                                                                                                                                   from "rxjs";
import { ArticleComponent, AsideComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, routes, SectionComponent, SymbolComponent } from "../../../../../../../";
import { ShopChildRouteComponent }                                                                                                                                                                                                          from "../../../child/ShopChildRouteComponent";


const parentRoute: Route | undefined = routes.find<Route & { path: "shop" }>(
  (route: Route): route is Route & { path: "shop" } => route.path === "shop",
);
const title: string | undefined      = parentRoute?.data?.["title"];

@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ArticleComponent,
      AsideComponent,
      ButtonComponent,
      CurrencyPipe,
      DecimalPipe,
      DividerComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      LabelComponent,
      LinkComponent,
      ReactiveFormsModule,
      SectionComponent,
      SymbolComponent,
    ],
    styleUrl:        "ProductShopChildRouteComponent.sass",
    templateUrl:     "ProductShopChildRouteComponent.html",

    standalone: true,
  },
)
export class ProductShopChildRouteComponent
  extends ShopChildRouteComponent {

  constructor() {
    super();

    effect(
      (): void => {
        const stripeProductDocument: StripeProductDocument | undefined = this.stripeProductDocument$();
        const description: string | undefined                          = stripeProductDocument?.description;

        if (description)
          this.meta.updateTag(
            {
              name:    "description",
              content: description,
            },
          );

        const routeTitle: string | undefined = stripeProductDocument?.name;

        if (routeTitle)
          this.title.setTitle(`${ routeTitle } - ${ brandTitle } ${ title }`);
      },
    );
  }

  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly title: Title                     = inject<Title>(Title);

  protected readonly currencies: typeof currenciesLib                                  = inject<typeof currenciesLib>(CURRENCIES);
  protected readonly exchangeService: ExchangeService                                  = inject<ExchangeService>(ExchangeService);
  protected readonly productPath$: InputSignal<string>                                 = input.required<string>(
    {
      alias: "productPath",
    },
  );
  protected readonly stripeProductDocument$: Signal<StripeProductDocument | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripeProductDocument | undefined>(
    toObservable<string>(this.productPath$).pipe<StripeProductDocument | undefined, StripeProductDocument | undefined>(
      switchMap<string, Observable<StripeProductDocument | undefined>>(
        (productPath: string): Observable<StripeProductDocument | undefined> => collectionSnapshots<StripeProductDocument>(
          query<StripeProductDocument, StripeProductDocument>(
            collection(
              this.firestore,
              "stripeProducts",
            ) as CollectionReference<StripeProductDocument, StripeProductDocument>,
            where(
              "path",
              "==",
              productPath,
            ),
          ),
        ).pipe<StripeProductDocument | undefined>(
          map<QueryDocumentSnapshot<StripeProductDocument>[], StripeProductDocument | undefined>(
            (stripeProductDocumentSnapshots: QueryDocumentSnapshot<StripeProductDocument>[]): StripeProductDocument | undefined => stripeProductDocumentSnapshots.length ? stripeProductDocumentSnapshots.map<StripeProductDocument>(
              (stripeProductDocumentSnapshot: QueryDocumentSnapshot<StripeProductDocument>): StripeProductDocument => stripeProductDocumentSnapshot.data(),
            )[0] : undefined,
          ),
        ),
      ),
      startWith<StripeProductDocument | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);
  protected readonly stripePriceDocument$: Signal<StripePriceDocument | undefined>     = isPlatformBrowser(this.platformId) ? toSignal<StripePriceDocument | undefined>(
    toObservable<StripeProductDocument | undefined>(this.stripeProductDocument$).pipe<StripePriceDocument | undefined, StripePriceDocument | undefined>(
      switchMap<StripeProductDocument | undefined, Observable<StripePriceDocument | undefined>>(
        (stripeProductDocument?: StripeProductDocument): Observable<StripePriceDocument | undefined> => stripeProductDocument && stripeProductDocument.id ? collectionSnapshots<StripePriceDocument>(
          query<StripePriceDocument, StripePriceDocument>(
            collection(
              this.firestore,
              "stripePrices",
            ) as CollectionReference<StripePriceDocument, StripePriceDocument>,
            where(
              "id",
              "==",
              stripeProductDocument.defaultPrice,
            ),
          ),
        ).pipe<StripePriceDocument | undefined>(
          map<QueryDocumentSnapshot<StripePriceDocument>[], StripePriceDocument | undefined>(
            (stripeProductDocumentSnapshots: QueryDocumentSnapshot<StripePriceDocument>[]): StripePriceDocument | undefined => stripeProductDocumentSnapshots.length ? stripeProductDocumentSnapshots.map<StripePriceDocument>(
              (stripeProductDocumentSnapshot: QueryDocumentSnapshot<StripePriceDocument>): StripePriceDocument => stripeProductDocumentSnapshot.data(),
            )[0] : undefined,
          ),
        ) : of<undefined>(undefined),
      ),
      startWith<StripePriceDocument | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);

}
