import { APP_BASE_HREF }       from "@angular/common";
import { LOCALE_ID }           from "@angular/core";
import { CommonEngine }        from "@angular/ssr";
import * as express            from "express";
import { existsSync }          from "fs";
import { join }                from "path";
import "zone.js/node";
import project                 from "../../project.json";
import { WebsiteServerModule } from "./modules";


declare const __non_webpack_require__: NodeRequire;

const mainModule: NodeJS.Module | undefined = __non_webpack_require__
  .main;
const moduleFilename: string = mainModule && mainModule
  .filename || "";
const requestHandler: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void> = (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => ((localeId: keyof typeof project.i18n.locales | "en-US"): Promise<void> => new CommonEngine().render(
  {
    bootstrap:        WebsiteServerModule,
    documentFilePath: join(
      process.cwd(),
      "dist/apps/website/browser",
      localeId,
      existsSync(
        join(
          process.cwd(),
          "dist/apps/website/browser",
          localeId,
          "index.original.html",
        ),
      ) ? "index.original.html" : "index.html",
    ),
    url:              `${ req.protocol }://${ req.headers.host }${ req.originalUrl }`,
    publicPath:       join(
      process.cwd(),
      "dist/apps/website/browser",
      localeId,
    ),
    providers:        [
      {
        provide:  APP_BASE_HREF,
        useValue: `/${ localeId }`,
      },
      {
        provide:  LOCALE_ID,
        useValue: localeId,
      },
    ],
  },
).then<void>(
  (html: string): void => res.send(html) && void (0),
).catch<void>(
  (err): void => next(err),
))(
  ([
    "en-US",
    ...Object.keys(
      project.i18n.locales,
    ),
  ] as (keyof typeof project.i18n.locales | "en-US")[]).filter(
    (localeId: keyof typeof project.i18n.locales | "en-US"): boolean => localeId === req.path.split("/")[1],
  )[0] || req.acceptsLanguages(
    [
      "en-US",
      ...Object.keys(
        project.i18n.locales,
      ),
    ],
  ) as keyof typeof project.i18n.locales | "en-US" | false || "en-US",
);

(moduleFilename === __filename || moduleFilename.includes("iisnode")) && express()
  .set(
    "view engine",
    "html",
  )
  .set(
    "views",
    join(
      process.cwd(),
      "dist/apps/website/browser",
    ),
  )
  .get(
    "*.*",
    express.static(
      join(
        process.cwd(),
        "dist/apps/website/browser",
      ),
      {
        maxAge: "1y",
      },
    ),
  )
  .get(
    "*",
    requestHandler,
  )
  .listen(
    process.env["PORT"] || 4000,
    (): void => console.log(`Node Express server listening on http://localhost:${ process.env["PORT"] || 4000 }`),
  );

// noinspection JSUnusedGlobalSymbols
export {
  requestHandler,
  WebsiteServerModule as AppServerModule,
};
