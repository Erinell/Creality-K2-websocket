import type { IBoxConfig, IBoxInfo, IElapseVideo, IGcodeFileInfo, IHistoric, IPrintObjects, IRequestPayload, IRetMaterial, IStatus, ITemps, IColorMatch } from "./Interfaces";
import { Requests } from "./Requests";

export class Printer {
    ip!: string;
    status!: IStatus;
    nozzleTemp!: number;
    bedTemp!: number;
    chamberTemp!: number;

    private ws!: WebSocket;
    private currentRequestId: string = "";
    private responses: Map<string, (value: string) => void> = new Map();

    constructor(ip: string) {
        this.ip = ip;
    }

    async connect() {
        return new Promise<IStatus>((resolve, reject) => {
            this.ws = new WebSocket(`ws://${this.ip}:9999`);
            this.ws.addEventListener("open", (event) => this.onConnect(event));
            this.ws.addEventListener("message", (event) => this.onReceive(event));
            this.ws.addEventListener("close", (event) => this.onClose(event));

            this.ws.onmessage = (event) => {
                resolve(this.status);
            }

            this.ws.onerror = function (err) {
                reject(err);
            };
        });
    }

    private onConnect(event: Event) { }

    private onReceive(event: MessageEvent) {
        const response = event.data;
        const requestId = this.extractRequestId(response);

        if (requestId === 'TotalLayer') {
            this.status = JSON.parse(response);
            this.nozzleTemp = parseFloat(this.status.nozzleTemp);
            this.bedTemp = parseFloat(this.status.bedTemp0);
            this.chamberTemp = this.status.boxTemp;
        }

        if (requestId === 'nozzleTemp') {
            const temps: ITemps = JSON.parse(response);
            this.nozzleTemp = parseFloat(temps.nozzleTemp);
            this.bedTemp = parseFloat(temps.bedTemp0) || this.bedTemp;
            this.chamberTemp = temps.boxTemp || -1;
        }

        if (this.responses.has(requestId)) {
            const resolveFn = this.responses.get(requestId);
            if (resolveFn) {
                resolveFn(response);
                this.responses.delete(requestId);
            }
        }
    }

    private onClose(event: CloseEvent) {
        console.log("disconnected from the printer.");
    }

    private extractRequestId(response: string): string {
        const parsedResponse = JSON.parse(response);
        return Object.keys(parsedResponse)[0] || "";
    }

    private get(payload: IRequestPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.ws.readyState !== 1) reject();

            this.currentRequestId = payload.id;
            const requestId = this.currentRequestId;

            this.ws.send(payload.value);

            this.responses.set(requestId, resolve);
        });
    }

    private set(payload: IRequestPayload) {
        if (this.ws.readyState !== 1) return;
        this.ws.send(payload.value);
    }

    async getCFSInfos(): Promise<IBoxInfo> {
        const response = await this.get(Requests.boxsInfo);
        return JSON.parse(response)[Requests.boxsInfo.id];
    }

    async getCFSConfig(): Promise<IBoxConfig> {
        const response = await this.get(Requests.boxConfig);
        return JSON.parse(response);
    }

    async getPrintsHistoric(): Promise<IHistoric> {
        const response = await this.get(Requests.reqHistory);
        return JSON.parse(response);
    }

    async getGcodesFiles(): Promise<IGcodeFileInfo[]> {
        const response = await this.get(Requests.reqGcodeFile);
        return JSON.parse(response).retGcodeFileInfo2;
    }

    async getCurrentPrintObjects(): Promise<IPrintObjects> {
        const response = await this.get(Requests.reqPrintObjects);
        return JSON.parse(response);
    }

    async getMaterials(): Promise<IRetMaterial[]> {
        const response = await this.get(Requests.reqMaterials);
        return JSON.parse(response).retMaterials;
    }

    async getVideos() {
        const response = await this.get(Requests.reqElapseVideoList);
        return JSON.parse(response).elapseVideoList;
    }

    refreshSpool(cfsId: Number, slotId: Number) {
        const req = Requests.createRequest('set', { "refreshBox": { "boxId": cfsId, "materialId": slotId } });
        this.set(req);
    }

    setLed(on: boolean) {
        const req = Requests.createRequest('set', { "lightSw": on ? 1 : 0 });
        this.set(req);
    }

    enableFan(on: boolean) {
        const req = Requests.createRequest('set', { "fan": on ? 1 : 0 });
        this.set(req);
    }

    setFan(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        const req = Requests.createRequest('set', { "gcodeCmd": `M106 P0 S${Math.round(percent * 255 / 100)}` });
        this.set(req);
    }

    enableSidesFans(on: boolean) {
        const req = Requests.createRequest('set', { "fanAuxiliary": on ? 1 : 0 });
        this.set(req);
    }

    setSidesFans(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        const req = Requests.createRequest('set', { "gcodeCmd": `M106 P2 S${Math.round(percent * 255 / 100)}` });
        this.set(req);
    }

    enableCaseFans(on: boolean) {
        const req = Requests.createRequest('set', { "fanCase": on ? 1 : 0 });
        this.set(req);
    }

    setCaseFans(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        const req = Requests.createRequest('set', { "gcodeCmd": `M106 P1 S${Math.round(percent * 255 / 100)}` });
        this.set(req);
    }

    setPosition(x: number, y: number, z: number, speed = 3000) {
        const req = Requests.createRequest('set', { "setPosition": `X${x} Y${y} Z${z} F${speed}` });
        this.set(req);
    }

    setHome() {
        const req = Requests.createRequest('set', { "autohome": "X Y Z" });
        this.set(req);
    }

    setFeedrate(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        const req = Requests.createRequest('set', { "setFeedratePct": Math.round(percent) });
        this.set(req);
    }

    setNozzleTemp(temperature: number) {
        temperature = Math.min(temperature, this.status.maxNozzleTemp);
        const req = Requests.createRequest('set', { "nozzleTempControl": temperature });
        this.set(req);
    }

    setBedTemp(temperature: number) {
        temperature = Math.min(temperature, this.status.maxBedTemp);
        const req = Requests.createRequest('set', { "bedTempControl": { "num": 0, "val": temperature } });
        this.set(req);
    }

    setChamberTemp(temperature: number) {
        temperature = Math.min(temperature, this.status.maxBoxTemp);
        const req = Requests.createRequest('set', { "boxTempControl": temperature });
        this.set(req);
    }

    sendGcode(gcode: String) {
        const req = Requests.createRequest('set', { "gcodeCmd": gcode });
        this.set(req);
    }

    getVideoUrl(file: IElapseVideo) {
        return `http://${this.ip}/downloads/video/${file.id}.mp4`;
    }

    getThumbnailUrl(file: IGcodeFileInfo) {
        return `http://${this.ip}/downloads/humbnail/${file.name.split(".")[0]}.png`;
    }

    deleteGcodeFile(filename: string) {
        const req = Requests.createRequest('set', { "opGcodeFile": `deleteprt:/mnt/UDISK/printer_data/gcodes/${filename}.gcode` });
        this.set(req);
    }

    deleteHistoryPrint(id: number) {
        const req = Requests.createRequest('set', { "deleteHistory": [id] });
        this.set(req);
    }

    deleteTimelapse(id: number) {
        const req = Requests.createRequest('set', { "ctrlVideoFiles": { "cmd": "remove", "printId": "", "file": `/mnt/UDISK/creality/userdata/delay_image/video/${id}.mp4` } });
        this.set(req);
    }

    async getColorsMatchFormat(): Promise<IColorMatch[]> {
        const letters = ['A', 'B', 'C', 'D'];
        const cfsInfos = await this.getCFSInfos();

        let slots = [];
        for (let i = 1; i <= this.status.cfsConnect; i++) {
            slots.push(...cfsInfos.materialBoxs[i].materials.map(item => {
                return {
                    "id": `T${i}${letters[item.id]}`,
                    "color": item.color,
                    "type": item.type,
                    "boxId": i,
                    "materialId": item.id
                }
            }));
        }

        return slots;
    }

    multiColorPrint(filename: string, calibration: boolean = false) {
        const req = Requests.createRequest('set', { "multiColorPrint": { "gcode": `/mnt/UDISK/printer_data/gcodes/${filename}.gcode`, "enableSelfTest": calibration ? 1 : 0 } });
        this.set(req);
    }
}