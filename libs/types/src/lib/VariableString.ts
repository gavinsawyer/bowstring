import { type PercentageString } from "./PercentageString";
import { type PhiScalarString }  from "./PhiScalarString";
import { type PxScalarString }   from "./PxScalarString";
import { type RemScalarString }  from "./RemScalarString";


export type VariableString = `var(--standard-${ string })` | `calc(${ number | PhiScalarString | PxScalarString | RemScalarString } * var(--standard-${ string }))` | `calc(var(--standard-${ string }) ${ "+" | "-" } ${ PhiScalarString | PxScalarString | RemScalarString })` | `calc(${ number | PhiScalarString | PxScalarString | RemScalarString } * var(--standard-${ string }) ${ "+" | "-" } ${ PercentageString | PhiScalarString | PxScalarString | RemScalarString })`;
