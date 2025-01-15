import * as currencies from "@standard/currencies";


export type Currency = Exclude<keyof typeof currencies, "BTC">;
