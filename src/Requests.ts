import type { IParams, IRequestPayload } from "./Interfaces";

export class Requests {
    static boxsInfo = this.createRequest("get", { "boxsInfo": 1 }, "boxsInfo");
    static boxConfig = this.createRequest("get", { "boxConfig": 1 }, "boxConfig");
    static reqGcodeFile = this.createRequest("get", { "reqGcodeFile": 1 }, "retGcodeFileInfo2");
    static reqHistory = this.createRequest("get", { "reqHistory": 1 }, "totalJob");
    static reqElapseVideoList = this.createRequest("get", { "reqElapseVideoList": 1 }, "elapseVideoList");
    static reqPrintObjects = this.createRequest("get", { "reqPrintObjects": 1 }, "current_object");
    static reqMaterials = this.createRequest("get", { "reqMaterials": 1 }, "retMaterials");

    static refreshSpool = (cfsId: number, slotId: number) =>
        this.createRequest("set", { "refreshBox": { "boxId": cfsId, "materialId": slotId } });
    static setLed = (on: boolean) =>
        this.createRequest("set", { "lightSw": on ? 1 : 0 });
    static enableFan = (on: boolean) =>
        this.createRequest("set", { "fan": on ? 1 : 0 });
    static setFan = (percent: number) =>
        this.createRequest("set", { "gcodeCmd": `M106 P0 S${percent}` });
    static enableSidesFans = (on: boolean) =>
        this.createRequest("set", { "fanAuxiliary": on ? 1 : 0 });
    static setSidesFans = (percent: number) =>
        this.createRequest("set", { "gcodeCmd": `M106 P2 S${percent}` });
    static enableCaseFans = (on: boolean) =>
        this.createRequest("set", { "fanCase": on ? 1 : 0 });
    static setCaseFans = (percent: number) =>
        this.createRequest("set", { "gcodeCmd": `M106 P1 S${percent}` });
    static setPosition = (x: number, y: number, z: number, speed: number) =>
        this.createRequest("set", { "setPosition": `X${x} Y${y} Z${z} F${speed}` });
    static setHome = () =>
        this.createRequest("set", { "autohome": "X Y Z" });
    static setFeedrate = (percent: number) =>
        this.createRequest("set", { "setFeedratePct": percent });
    static setNozzleTemp = (temperature: number) =>
        this.createRequest("set", { "nozzleTempControl": temperature });
    static setBedTemp = (temperature: number) =>
        this.createRequest("set", { "bedTempControl": { "num": 0, "val": temperature } });
    static setChamberTemp = (temperature: number) =>
        this.createRequest("set", { "boxTempControl": temperature });
    static sendGcode = (command: string) =>
        this.createRequest("set", { "gcodeCmd": command });
    static deleteGcodeFile = (filename: string) =>
        this.createRequest("set", { "opGcodeFile": `deleteprt:/mnt/UDISK/printer_data/gcodes/${filename}.gcode` })
    static deleteHistoryPrint = (id: number) =>
        this.createRequest("set", { "deleteHistory": [id] });
    static deleteTimelapse = (id: number) =>
        this.createRequest("set", { "ctrlVideoFiles": { "cmd": "remove", "printId": "", "file": `/mnt/UDISK/creality/userdata/delay_image/video/${id}.mp4` } })
    static multiColorPrint = (filename: string, calibration: boolean) =>
        this.createRequest("set", { "multiColorPrint": { "gcode": `/mnt/UDISK/printer_data/gcodes/${filename}.gcode`, "enableSelfTest": calibration ? 1 : 0 } })
    static pause = () => 
        this.createRequest("set", { "pause": 1 });
    static resume = () => 
        this.createRequest("set", { "pause": 0 });
    static stop = () => 
        this.createRequest("set", { "stop": 1 });

    static createRequest(method: string, params: IParams, id?: string): IRequestPayload {
        const value = JSON.stringify({ method, params })
        id = id ? id : Object.keys(params)[0];
        return { method, params, value, id };
    }
}