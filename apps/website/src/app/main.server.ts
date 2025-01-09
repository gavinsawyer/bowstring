import { APP_BASE_HREF }                          from "@angular/common";
import { LOCALE_ID }                              from "@angular/core";
import { CommonEngine }                           from "@angular/ssr";
import compression                                from "compression";
import express                                    from "express";
import { existsSync }                             from "fs";
import { environment }                            from "../environment";
import { WebsiteServerModule as AppServerModule } from "./modules";
import { getI18nRequestHandler }                  from "./request handlers";
import { type LocaleId }                          from "./types";
import "zone.js/node";


function getAppRequestHandler(localeId: LocaleId): express.RequestHandler {
  return (
    request: express.Request,
    response: express.Response,
    nextFunction: express.NextFunction,
  ): Promise<void> => new CommonEngine(
    {
      bootstrap:                 AppServerModule,
      enablePerformanceProfiler: !environment.production,
      providers:                 [
        {
          provide:  APP_BASE_HREF,
          useValue: `/${ String(localeId) }`,
        },
        {
          provide:  LOCALE_ID,
          useValue: localeId,
        },
      ],
    },
  ).render(
    {
      documentFilePath: `${ process.cwd() }/dist/apps/website/browser/${ String(localeId) }/${ existsSync(`${ process.cwd() }/dist/apps/website/browser/${ localeId }/index.original.html`) ? "index.original.html" : "index.html" }`,
      publicPath:       `${ process.cwd() }/dist/apps/website/browser/${ String(localeId) }`,
      url:              `${ request.protocol }://${ request.headers.host }${ request.originalUrl }`,
    },
  ).then<void, never>(
    (html: string): void => {
      response.send(html);
    },
    (error: unknown): never => {
      nextFunction(error);

      throw error;
    },
  );
}


export {
  AppServerModule,
  getAppRequestHandler,
};


declare const __non_webpack_require__: NodeRequire;

if (((moduleFilename: string): boolean => moduleFilename === __filename || moduleFilename.includes("iisnode"))(((mainModule?: NodeJS.Module): string => mainModule?.filename || "")(__non_webpack_require__.main)))
  express().use(
    compression(),
  ).set(
    "view engine",
    "html",
  ).set(
    "views",
    `${ process.cwd() }/dist/apps/website/browser`,
  ).get(
    "*.*",
    getI18nRequestHandler(
      ({ staticRoot }: { staticRoot: string }): express.RequestHandler => express.static(
        staticRoot,
        {
          maxAge: "1y",
        },
      ),
    ),
  ).get(
    "*",
    getI18nRequestHandler(
      ({ localeId }: { localeId: LocaleId }): express.RequestHandler => getAppRequestHandler(localeId),
    ),
  ).listen(
    process.env["PORT"] || 4000,
    (): void => console.log(`Node Express server listening on http://localhost:${ process.env["PORT"] || 4000 }`),
  );
