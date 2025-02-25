import { isPlatformBrowser }                                                         from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                    from "@angular/core/rxjs-interop";
import type * as brandLib                                                            from "@bowstring/brand";
import type * as currenciesLib                                                       from "@bowstring/currencies";
import { BRAND }                                                                     from "@bowstring/injection-tokens";
import { type Currency }                                                             from "@bowstring/types";
import { combineLatestWith, map, type Observable, of, startWith, switchMap }         from "rxjs";
import { webSocket, type WebSocketSubject }                                          from "rxjs/webSocket";


interface ExchangeRateData {
  "price": string;
  "product_id": `BTC-${ Currency }`;
  "type": "ticker";
}

interface ExchangeRateSubscription {
  "channels": {
    "name": "ticker";
    "product_ids": `BTC-${ Currency }`[];
  }[];
  "type": "subscribe";
}

interface ExchangeRateUnsubscription {
  "channels": [
    "ticker",
  ];
  "product_ids": `BTC-${ Currency }`[];
  "type": "unsubscribe";
}

@Injectable(
  {
    providedIn: "root",
  },
)
export class ExchangeService {

  private readonly brand: typeof brandLib           = inject<typeof brandLib>(BRAND);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly userCurrency$: WritableSignal<keyof typeof currenciesLib> = signal<keyof typeof currenciesLib>(this.brand.currency);
  public readonly rate$: Signal<number>                                     = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<keyof typeof currenciesLib>(this.userCurrency$).pipe<number, number>(
      switchMap<keyof typeof currenciesLib, Observable<number>>(
        (userCurrency: keyof typeof currenciesLib): Observable<number> => {
          const brandCurrency: Currency = this.brand.currency;

          return userCurrency === brandCurrency ? of<1>(1) : ((webSocketSubject: WebSocketSubject<ExchangeRateData>): Observable<number> => webSocketSubject.multiplex(
            (): ExchangeRateSubscription => ({
              channels: [
                {
                  name:        "ticker",
                  product_ids: [
                    `BTC-${ brandCurrency }`,
                  ],
                },
              ],
              type:     "subscribe",
            }),
            (): ExchangeRateUnsubscription => ({
              channels:    [
                "ticker",
              ],
              product_ids: [
                `BTC-${ brandCurrency }`,
              ],
              type:        "unsubscribe",
            }),
            (exchangeRateData: ExchangeRateData): exchangeRateData is ExchangeRateData & { product_id: `BTC-${ typeof brandCurrency }` } => exchangeRateData.type === "ticker" && exchangeRateData.product_id === `BTC-${ brandCurrency }`,
          ).pipe<[ ExchangeRateData & { product_id: `BTC-${ typeof brandCurrency }` }, ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` } | null ], number>(
            combineLatestWith<ExchangeRateData & { product_id: `BTC-${ typeof brandCurrency }` }, [ ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` } | null ]>(
              userCurrency === "BTC" ? of<null>(null) : webSocketSubject.multiplex(
                (): ExchangeRateSubscription => ({
                  channels: [
                    {
                      name:        "ticker",
                      product_ids: [
                        `BTC-${ userCurrency }`,
                      ],
                    },
                  ],
                  type:     "subscribe",
                }),
                (): ExchangeRateUnsubscription => ({
                  channels:    [
                    "ticker",
                  ],
                  product_ids: [
                    `BTC-${ userCurrency }`,
                  ],
                  type:        "unsubscribe",
                }),
                (exchangeRateData: ExchangeRateData): exchangeRateData is ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` } => exchangeRateData.type === "ticker" && exchangeRateData.product_id === `BTC-${ userCurrency }`,
              ).pipe<ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` } | null>(
                startWith<ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` }, [ null ]>(null),
              ),
            ),
            map<[ ExchangeRateData & { product_id: `BTC-${ typeof brandCurrency }` }, ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` } | null ], number>(
              ([ { price }, exchangeRateDataUser ]: [ ExchangeRateData & { product_id: `BTC-${ typeof brandCurrency }` }, ExchangeRateData & { product_id: `BTC-${ typeof userCurrency }` } | null ]): number => parseInt(exchangeRateDataUser?.price || "1") / parseInt(price),
            ),
          ))(webSocket<ExchangeRateData>("wss://ws-feed.exchange.coinbase.com"));
        },
      ),
      startWith<number, [ 1 ]>(1),
    ),
    {
      requireSync: true,
    },
  ) : signal<1>(1);

}
