import express  from "express";
import { i18n } from "../../project.json";


express()
  .set(
    "view engine",
    "html",
  )
  .set(
    "views",
    `${ process.cwd() }/`,
  )
  .get(
    "*.*",
    express.static(
      `${ process.cwd() }/dist/apps/website/browser`,
      {
        maxAge: "1y",
      },
    ),
  )
  .get(
    "*",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => ((localeId: keyof typeof i18n.locales | "en-US"): Promise<void> => require(
      `${process.cwd()}/dist/apps/website/server/${ localeId }/main.js`,
    )["requestHandler"](
      req,
      res,
      next,
    ))(
      ([
        "en-US",
        ...Object.keys(
          i18n.locales,
        ),
      ] as (keyof typeof i18n.locales | "en-US")[]).filter(
        (localeId: keyof typeof i18n.locales | "en-US"): boolean => localeId === req.path.split("/")[1],
      )[0] || req.acceptsLanguages(
        [
          "en-US",
          ...Object.keys(
            i18n.locales,
          ) as (keyof typeof i18n.locales)[],
        ],
      ) || "en-US",
    ),
  )
  .listen(
    process.env["PORT"] || 4000,
    (): void => console.log(`Node Express server listening on http://localhost:${ process.env["PORT"] || 4000 }`),
  );
