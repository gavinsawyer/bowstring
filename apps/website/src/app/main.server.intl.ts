import                              "@angular/compiler";
import { enableProdMode }      from "@angular/core";
import                              "@angular/localize/init";
import express                 from "express";
import { Dirent, readdirSync } from "fs";
import                               "zone.js/node";
import { environment }         from "../environment";


environment
  .production && enableProdMode();

express()
  .set(
    "view engine",
    "html",
  )
  .set(
    "views",
    process.cwd() + "/dist/apps/website/browser",
  )
  .get(
    "*.*",
    express.static(
      process.cwd() + "/dist/apps/website/browser",
      {
        maxAge: "1y",
      },
    ),
  )
  .get(
    "*",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => ((locales: string[]): Promise<void> => ((locale: string): Promise<void> => require(process.cwd() + "/dist/apps/website/server/" + locale + "/main.js")["requestHandler"](
      req,
      res,
      next,
    ))(
      [
        "en-US",
        ...locales,
      ].filter(
        (locale: string): boolean => locale === req.path.split("/")[1],
      )[0] || req.acceptsLanguages(
        [
          "en-US",
          ...locales,
        ],
      ) || "en-US",
    ))(
      readdirSync(
        process.cwd() + "/dist/apps/website/browser",
        {
          withFileTypes: true,
        },
      ).filter<Dirent>(
        (dirent: Dirent): dirent is Dirent => dirent.isDirectory(),
      ).map<string>(
        (dirent: Dirent): string => dirent.name,
      ),
    ),
  )
  .listen(
    process.env["PORT"] || 4000,
    (): void => console.log(`Node Express server listening on http://localhost:${process.env["PORT"] || 4000}`),
  );
