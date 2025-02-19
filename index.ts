
import { Printer } from "./src/Printer";

const printer = new Printer("192.168.1.33");

await printer.connect().then(res => {
    console.log(`Connected to ${res.hostname}`);
}).catch((err) => {
    console.log(err);
    process.exit();
});

if (printer.status.cfsConnect > 0) {
    console.log(`${printer.status.cfsConnect} CFS detected`);
}

printer.setLed(true);

setInterval(async () => {
    console.log(`nozzle temperature: ${printer.nozzleTemp}°C, bed temperature: ${printer.bedTemp}°C`);

    if (printer.status.cfsConnect > 0) {
        let cfs = await printer.getCFSInfos();
        for (let i = 1; i <= printer.status.cfsConnect; i++) {
            console.log(`CFS #${i} humidity: ${cfs.materialBoxs[i].humidity}% RH, temperature: ${cfs.materialBoxs[i].temp}°C`);
        }
    }
}, 1000);