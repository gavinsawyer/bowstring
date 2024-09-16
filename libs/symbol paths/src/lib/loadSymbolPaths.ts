import { type SymbolPaths } from "@standard/interfaces";
import { type SymbolName }  from "@standard/types";


export default function loadSymbolPaths(symbolName: SymbolName): Promise<SymbolPaths> {
  return import(`./${ symbolName }SymbolPaths`).then<SymbolPaths>(
    (module): SymbolPaths => module[`_${ symbolName }SymbolPaths`],
  );
}
