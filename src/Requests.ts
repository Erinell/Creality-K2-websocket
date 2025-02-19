import type { IParams, IRequestPayload } from "./Interfaces";

export class Requests {
    static boxsInfo = this.createRequest("get", { "boxsInfo": 1 }, "boxsInfo");
    static boxConfig = this.createRequest("get", { "boxConfig": 1 }, "boxConfig");
    static reqGcodeFile = this.createRequest("get", { "reqGcodeFile": 1 }, "retGcodeFileInfo2");
    static reqHistory = this.createRequest("get", { "reqHistory": 1 }, "totalJob");
    static reqElapseVideoList = this.createRequest("get", { "reqElapseVideoList": 1 }, "elapseVideoList");
    static reqPrintObjects = this.createRequest("get", { "reqPrintObjects": 1 }, "current_object");
    static reqMaterials = this.createRequest("get", { "reqMaterials": 1 }, "retMaterials");

    static createRequest(method: string, params: IParams, id?: string): IRequestPayload {
        const value = JSON.stringify({ method, params })
        id = id ? id : Object.keys(params)[0];
        return { method, params, value, id };
    }
}