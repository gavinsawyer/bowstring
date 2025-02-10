import { DOCUMENT, isPlatformBrowser }                                  from "@angular/common";
import { HttpClient }                                                   from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from "@angular/core";
import { ENVIRONMENT }                                                  from "@standard/injection-tokens";
import { type Environment }                                             from "@standard/interfaces";
import { take }                                                         from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class MusicKitInstanceLoaderService {

  private readonly document: Document                 = inject<Document>(DOCUMENT);
  private readonly environment: Environment           = inject<Environment>(ENVIRONMENT);
  private readonly httpClient: HttpClient             = inject<HttpClient>(HttpClient);
  private readonly platformId: NonNullable<unknown>   = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly rendererFactory2: RendererFactory2 = inject<RendererFactory2>(RendererFactory2);

  private musicKitInstance?: MusicKit.MusicKitInstance;
  private musicKitInstancePromise?: Promise<MusicKit.MusicKitInstance>;
  private renderer2?: Renderer2;

  public async load(): Promise<MusicKit.MusicKitInstance | null> {
    if (!isPlatformBrowser(this.platformId))
      return null;

    return this.musicKitInstance || this.musicKitInstancePromise || ((): Promise<MusicKit.MusicKitInstance> => {
      this.musicKitInstancePromise = new Promise<MusicKit.MusicKitInstance>(
        (
          resolve: (value: MusicKit.MusicKitInstance) => void,
          reject: (reason: unknown) => void,
        ): void => {
          this.httpClient.get(
            "https://js-cdn.music.apple.com/musickit/v3/musickit.js",
            {
              responseType: "blob",
            },
          ).pipe<Blob>(
            take<Blob>(1),
          ).subscribe(
            {
              error: (error: unknown): void => reject(error),
              next:  (musicKitJsBlob: Blob): void => {
                this.renderer2 = this.rendererFactory2.createRenderer(
                  this.document.head,
                  null,
                );

                const htmlScriptElement: HTMLScriptElement = this.renderer2.createElement("script");
                const musicKitJsSrc: string                = URL.createObjectURL(musicKitJsBlob);

                this.renderer2.setAttribute(
                  htmlScriptElement,
                  "src",
                  musicKitJsSrc,
                );
                this.renderer2.setAttribute(
                  htmlScriptElement,
                  "type",
                  "text/javascript",
                );
                this.renderer2.listen(
                  htmlScriptElement,
                  "load",
                  (): void => this.document.addEventListener(
                    "musickitloaded",
                    (): void => {
                      URL.revokeObjectURL(musicKitJsSrc);

                      const musicKit: typeof MusicKit | undefined = this.document.defaultView ? this.document.defaultView.MusicKit : undefined;

                      if (musicKit) {
                        try {
                          resolve(
                            musicKit.configure(
                              {
                                developerToken: this.environment.apis.appleMusic.developerToken,
                                bitrate:        musicKit.PlaybackBitrate.HIGH,
                              },
                            ),
                          );
                        } catch (error: unknown) {
                          reject(error);
                        }
                      } else
                        reject("Something went wrong.");
                    },
                  ),
                );
                this.renderer2.appendChild(
                  this.document.head,
                  htmlScriptElement,
                );
              },
            },
          );
        },
      );

      return this.musicKitInstancePromise;
    })();
  }

}
