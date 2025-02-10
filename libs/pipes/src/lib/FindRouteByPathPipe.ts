import { Pipe, PipeTransform }     from "@angular/core";
import { type Route, type Routes } from "@angular/router";


@Pipe(
  {
    name: "standardFindRouteByPath",

    standalone: true,
  },
)
export class FindRouteByPathPipe
  implements PipeTransform {

  public transform(
    value?: Routes,
    path?: string,
  ): Route | undefined {
    return value && value.find<Route>(
      (route: Route): route is Route => route.path === path,
    ) || undefined;
  }

}
