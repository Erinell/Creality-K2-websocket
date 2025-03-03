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

    refreshSpool(cfsId: number, slotId: number) {
        this.set(Requests.refreshSpool(cfsId, slotId));
    }

    setLed(on: boolean) {
        this.set(Requests.setLed(on));
    }

    enableFan(on: boolean) {
        this.set(Requests.enableFan(on));
    }

    setFan(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        this.set(Requests.setFan(Math.round(percent * 255 / 100)));
    }

    enableSidesFans(on: boolean) {
        this.set(Requests.enableSidesFans(on));
    }

    setSidesFans(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        this.set(Requests.setSidesFans(Math.round(percent * 255 / 100)));
    }

    enableCaseFans(on: boolean) {
        this.set(Requests.enableCaseFans(on));
    }

    setCaseFans(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        this.set(Requests.setCaseFans(Math.round(percent * 255 / 100)));
    }

    setPosition(x: number, y: number, z: number, speed = 3000) {
        this.set(Requests.setPosition(x, y, z, speed));
    }

    setHome() {
        this.set(Requests.setHome());
    }

    setFeedrate(percent: number) {
        percent = Math.min(100, Math.max(0, percent));
        this.set(Requests.setFeedrate(Math.round(percent)));
    }

    setNozzleTemp(temperature: number) {
        temperature = Math.min(temperature, this.status.maxNozzleTemp);
        this.set(Requests.setNozzleTemp(temperature));
    }

    setBedTemp(temperature: number) {
        temperature = Math.min(temperature, this.status.maxBedTemp);
        this.set(Requests.setBedTemp(temperature));
    }

    setChamberTemp(temperature: number) {
        temperature = Math.min(temperature, this.status.maxBoxTemp);
        this.set(Requests.setChamberTemp(temperature));
    }

    sendGcode(command: string) {
        this.set(Requests.sendGcode(command));
    }

    getVideoUrl(file: IElapseVideo) {
        return `http://${this.ip}/downloads/video/${file.id}.mp4`;
    }

    getThumbnailUrl(file: IGcodeFileInfo) {
        return `http://${this.ip}/downloads/humbnail/${file.name.split(".")[0]}.png`;
    }

    deleteGcodeFile(filename: string) {
        filename = filename.replace(".gcode", "");
        this.set(Requests.deleteGcodeFile(filename));
    }

    deleteHistoryPrint(id: number) {
        this.set(Requests.deleteHistoryPrint(id));
    }

    deleteTimelapse(id: number) {
        this.set(Requests.deleteTimelapse(id));
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
        filename = filename.replace(".gcode", "");
        this.set(Requests.multiColorPrint(filename, calibration));
    }

    pause() {
        this.set(Requests.pause());
    }

    resume() {
        this.set(Requests.resume());
    }

    stop() {
        this.set(Requests.stop());
    }
}