import { PercentageString } from "./PercentageString";
import { PhiScalarString }  from "./PhiScalarString";
import { PxScalarString }   from "./PxScalarString";
import { RemScalarString }  from "./RemScalarString";


export type VariableString = `var(--standard-${ string })` | `calc(${ number | PhiScalarString | PxScalarString | RemScalarString } * var(--standard-${ string }))` | `calc(var(--standard-${ string }) ${ "+" | "-" } ${ PhiScalarString | PxScalarString | RemScalarString })` | `calc(${ number | PhiScalarString | PxScalarString | RemScalarString } * var(--standard-${ string }) ${ "+" | "-" } ${ PercentageString | PhiScalarString | PxScalarString | RemScalarString })`;
