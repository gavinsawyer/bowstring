import { type PxScalarString }  from "./PxScalarString";
import { type RemScalarString } from "./RemScalarString";


export type PhiScalarString = `calc(${ PxScalarString | RemScalarString } * pow(var(--phi), ${ number }))` | `calc(${ PxScalarString | RemScalarString } + ${ PxScalarString | RemScalarString } * pow(var(--phi), ${ number }))`;
