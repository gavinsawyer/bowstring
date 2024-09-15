import { PercentageString } from "./PercentageString";
import { PhiScalarString }  from "./PhiScalarString";
import { PxScalarString }   from "./PxScalarString";
import { RemScalarString }  from "./RemScalarString";
import { VariableString }   from "./VariableString";


export type ScalarString = PercentageString | PhiScalarString | PxScalarString | RemScalarString | VariableString | "0";
