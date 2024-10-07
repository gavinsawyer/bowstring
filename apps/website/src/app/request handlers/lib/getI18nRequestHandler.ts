import type express      from "express";
import { join }          from "path";
import project           from "../../../../project.json";
import { type LocaleId } from "../../types";


function getI18nRequestHandler(getRequestHandler: (i18nRequestHandlerResponse: { "localeId": LocaleId, "staticRoot": string }) => express.RequestHandler): express.RequestHandler {
  return (
    request: express.Request,
    response: express.Response,
    nextFunction: express.NextFunction,
  ): void => ((localeId: LocaleId): void => {
    getRequestHandler(
      {
        localeId:   localeId,
        staticRoot: join(
          `${ process.cwd() }/dist/apps/website/browser`,
          request.path.split("/")[1] !== localeId ? localeId : "",
        ),
      },
    )(
      request,
      response,
      nextFunction,
    );
  })(
    ((localeIds: LocaleId[]): LocaleId => localeIds.filter(
      (localeId: LocaleId): boolean => localeId === request.path.split("/")[1] || localeId === request.headers.referer?.split("://")[1]?.split("/")[1],
    )[0] || request.acceptsLanguages(
      localeIds,
    ) || "en-US")(
      [
        "en-US",
        ...Object.keys(
          project.i18n.locales,
        ) as LocaleId[],
      ],
    ),
  );
}

export default getI18nRequestHandler;
