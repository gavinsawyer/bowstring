import { isPlatformBrowser }                                                         from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                    from "@angular/core/rxjs-interop";
import { BRAND }                                                                     from "@standard/injection-tokens";
import { type Brand, type Currencies }                                               from "@standard/types";
import { combineLatestWith, map, type Observable, of, startWith, switchMap }         from "rxjs";
import { webSocket, type WebSocketSubject }                                          from "rxjs/webSocket";


interface ExchangeRateData {
  "price": string;
  "product_id": `BTC-${ Brand["currency"] }`;
  "type": "ticker";
}

interface ExchangeRateSubscription {
  "channels": {
    "name": "ticker";
    "product_ids": `BTC-${ Brand["currency"] }`[];
  }[];
  "type": "subscribe";
}

interface ExchangeRateUnsubscription {
  "channels": [
    "ticker",
  ];
  "product_ids": `BTC-${ Brand["currency"] }`[];
  "type": "unsubscribe";
}

@Injectable(
  {
    providedIn: "root",
  },
)
export class CurrencyService {

  private readonly brand: Brand                     = inject<Brand>(BRAND);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly userCurrency$: WritableSignal<keyof Currencies> = signal<keyof Currencies>(this.brand.currency);
  public readonly exchangeRate$: Signal<number>                   = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<keyof Currencies>(
      this.userCurrency$,
    ).pipe<number, number>(
      switchMap<keyof Currencies, Observable<number>>(
        (userCurrency: keyof Currencies): Observable<number> => userCurrency === this.brand.currency ? of<1>(1) : ((webSocketSubject: WebSocketSubject<ExchangeRateData>): Observable<number> => webSocketSubject.multiplex(
          (): ExchangeRateSubscription => ({
            channels: [
              {
                name:        "ticker",
                product_ids: [
                  `BTC-${ this.brand.currency }`,
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
              `BTC-${ this.brand.currency }`,
            ],
            type:        "unsubscribe",
          }),
          (exchangeRateData: ExchangeRateData): exchangeRateData is ExchangeRateData => exchangeRateData.type === "ticker" && exchangeRateData.product_id === `BTC-${ this.brand.currency }`,
        ).pipe<[ ExchangeRateData, ExchangeRateData | null ], number>(
          combineLatestWith<ExchangeRateData, [ ExchangeRateData | null ]>(
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
              (exchangeRateData: ExchangeRateData): exchangeRateData is ExchangeRateData => exchangeRateData.type === "ticker" && exchangeRateData.product_id === `BTC-${ userCurrency }`,
            ).pipe<ExchangeRateData | null>(
              startWith<ExchangeRateData, [ ExchangeRateData | null ]>(null),
            ),
          ),
          map<[ ExchangeRateData, ExchangeRateData | null ], number>(
            ([ { price: priceBrand }, exchangeRateDateUser ]: [ ExchangeRateData, ExchangeRateData | null ]): number => parseInt(exchangeRateDateUser?.price || "1") / parseInt(priceBrand),
          ),
        ))(webSocket<ExchangeRateData>("wss://ws-feed.exchange.coinbase.com")),
      ),
      startWith<number, [ 1 ]>(1),
    ),
    {
      requireSync: true,
    },
  ) : signal<1>(1);

}
