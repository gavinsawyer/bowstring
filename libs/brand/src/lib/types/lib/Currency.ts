import * as currencies from "@bowstring/currencies";


export type Currency = Exclude<keyof typeof currencies, "BTC">;
