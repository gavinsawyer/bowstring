import type project from "../../../../project.json";


export type CloudRegion = typeof project.targets["angular-firebase-deploy"]["options"]["region"];
