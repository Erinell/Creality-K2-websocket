# API

1. Connect your websocket client to `[printer-ip]:9999`
2. Send a request `websocket.send(JSON.stringify(request))`

### GET

<details>
<summary>
<b><code>CFS infos</code></b>&nbsp;<code>{"method":"get","params":{"boxsInfo":1}}</code> </summary>

#### Request
```{"method":"get","params":{"boxsInfo":1}}```

#### Response

```typescript
{
  boxsInfo: {
    same_material: [
       [ "000003", "07a92ac", [
          {
            boxId: 1,
            materialId: 0,
          }
        ], "PETG" ], 
       [ "000001", "0000000", [
          {
            boxId: 1,
            materialId: 1,
          }
        ], "PLA" ],
       [ "000004", "0ffffff", [
          {
            boxId: 1,
            materialId: 2,
          }
        ], "ABS" ],
       [ "000001", "0ba552a", [
          {
            boxId: 1,
            materialId: 3,
          }
        ], "PLA" ]
    ],
    materialBoxs: [
      {
        id: 0,
        state: 0,
        type: 1,
        materials: [
          {
            id: 0,
            vendor: "Generic",
            type: "ABS",
            color: "#0000000",
            name: "Generic ABS",
            minTemp: 240,
            maxTemp: 280,
            selected: 0,
            pressure: 0.06,
            percent: 100,
            editStatus: 1,
            rfid: "00004",
            state: 1,
          }
        ],
      }, {
        id: 1,
        state: 1,
        type: 0,
        temp: 27,
        humidity: 39,
        materials: [
          {
            id: 0,
            vendor: "Generic",
            type: "PETG",
            name: "Generic PETG",
            rfid: "00003",
            color: "#07a92ac",
            minTemp: 220,
            maxTemp: 270,
            pressure: 0.1,
            percent: 100,
            state: 1,
            selected: 0,
            editStatus: 1,
          }, {
            id: 1,
            vendor: "Generic",
            type: "PLA",
            name: "Generic PLA",
            rfid: "00001",
            color: "#0000000",
            minTemp: 0,
            maxTemp: 0,
            pressure: 0.04,
            percent: 100,
            state: 1,
            selected: 0,
            editStatus: 1,
          }, {
            id: 2,
            vendor: "Generic",
            type: "ABS",
            name: "Generic ABS",
            rfid: "00004",
            color: "#0ffffff",
            minTemp: 0,
            maxTemp: 0,
            pressure: 0.04,
            percent: 100,
            state: 1,
            selected: 0,
            editStatus: 1,
          }, {
            id: 3,
            vendor: "Generic",
            type: "PLA",
            name: "Generic PLA",
            rfid: "00001",
            color: "#0ba552a",
            minTemp: 0,
            maxTemp: 0,
            pressure: 0.04,
            percent: 100,
            state: 1,
            selected: 0,
            editStatus: 1,
          }
        ],
      }
    ],
  },
}
```
</details>

<details>
<summary>
<b><code>CFS settings</code></b>&nbsp;<code>{"method":"get","params":{"boxConfig":1}}</code> </summary>

#### Request
```{"method":"get","params":{"boxConfig":1}}```

#### Response

```typescript
{
  boxConfig: {
    autoRefill: 1,
    cAutoFeed: 1,
    cSelfTest: 0,
    cAutoUpdateFilament: 0,
  },
}
```
</details>

<details>
<summary>
<b><code>Prints files</code></b>&nbsp;<code>{"method":"get","params":{"reqGcodeFile":1}}</code> </summary>

#### Request
```{"method":"get","params":{"reqGcodeFile":1}}```

#### Response

```typescript
[
  {
    custom_types: 1,
    type: 8,
    name: "filename.gcode",
    path: "/mnt/UDISK/printer_data/gcodes/filename.gcode",
    file_size: 1470012,
    create_time: 1735904899,
    timeCost: 1961,
    consumables: 7733,
    floorHeight: 24,
    modelX: 0,
    modelY: 0,
    modelZ: 0,
    material: "PLA;PLA;PLA",
    nozzleTemp: 22000,
    bedTemp: 5000,
    software: "Creality",
    thumbnail: "/mnt/UDISK/creality/local_gcode/humbnail/filename.png",
    startPixel: 0,
    endPixel: 0,
    modelHeight: 0,
    layerHeight: 0,
    preview: "/mnt/UDISK/creality/local_gcode/original/filename.png",
    materialColors: "#ffffff;#00ff00;#000000",
    materialIds: "01001;01001;01001",
    filamentWeight: "18.90, 0.71, 3.46",
    match: "T1A=T1D T1B=  T1C=T1B ",
  },
]
```
</details>

<details>
<summary>
<b><code>Prints historic</code></b>&nbsp;<code>{"method":"get","params":{"reqHistory":1}}</code> </summary>

#### Request
```{"method":"get","params":{"reqHistory":1}}```

#### Response

```typescript
{
  totalJob: 47,
  totalUsageTime: 93153,
  totalUsageMaterial: 296632,
  historyList: [
    {
      dateTime: "yyyy-MM-dd hh:mm:ss",
      id: 1738435321,
      filename: "/mnt/UDISK/printer_data/gcodes/filename.gcode",
      size: 377384,
      ctime: 1738431195,
      starttime: 1738435321,
      startway: 1,
      usagetime: 1215,
      usagematerial: 1325.8820699990683,
      printfinish: 1,
      thumbnail: "/mnt/UDISK/creality/userdata/history/humbnail/1738435321.png",
      filemd5: "file_id_md5",
      ismulticolor: true,
    },
  ],
}
```
</details>

<details>
<summary>
<b><code>Timelapses</code></b>&nbsp;<code>{"method":"get","params":{"reqElapseVideoList":1}}</code> </summary>

#### Request
```{"method":"get","params":{"reqElapseVideoList":1}}```

#### Response

```typescript
[
  {
    dateTime: "yyyy-MM-dd hh:mm:ss",
    name: "/mnt/UDISK/printer_data/gcodes/filename.gcode",
    id: 1734346070,
    video: "/mnt/UDISK/creality/userdata/delay_image/video/1734346070.mp4",
    size: 6546371,
    duration: 5,
    cover: "/mnt/UDISK/creality/userdata/delay_image/cover/1734346070.png",
    starttime: 1734346070,
    printtime: 2784,
    location: 0,
    interval: 1,
    render: 15,
    gcodename: "filename.gcode",
    videoname: "1734346070.mp4",
    printId: "print_id_md5",
    upload: 1,
    videoid: "video_id_md5",
  }
]
```
</details>

<details>
<summary>
<b><code>Current print objects</code></b>&nbsp;<code>{"method":"get","params":{"reqPrintObjects":1}}</code> </summary>

#### Request
```{"method":"get","params":{"reqPrintObjects":1}}```

#### Response

```typescript
{    
  current_object: "",
  excluded_objects: "[ ]",
  objects: "[ ]"
}
```
</details>

<details>
<summary>
<b><code>Materials database</code></b>&nbsp;<code>{"method":"get","params":{"reqMaterials":1}}</code> </summary>

#### Request
```{"method":"get","params":{"reqMaterials":1}}```

#### Response

```typescript
{
  "retMaterials": [
    {
      "engineVersion": "3.0.0",
      "printerIntName": "F008",
      "nozzleDiameter": [
        "0.4"
      ],
      "kvParam": {
        "activate_air_filtration": "0",
        "activate_chamber_temp_control": "1",
        "additional_cooling_fan_speed": "80",
        "chamber_temperature": "35",
        "close_fan_the_first_x_layers": "1",
        "compatible_printers": "MyKlipper 0.4 nozzle,MyMarlin 0.4 nozzle",
        "compatible_printers_condition": "",
        "compatible_prints": "",
        "compatible_prints_condition": "",
        "complete_print_exhaust_fan_speed": "80",
        "cool_cds_fan_start_at_height": "0.5",
        "cool_plate_temp": "50",
        "cool_plate_temp_initial_layer": "50",
        "cool_special_cds_fan_speed": "100",
        "default_filament_colour": "#FFFFFF",
        "during_print_exhaust_fan_speed": "60",
        "enable_overhang_bridge_fan": "1",
        "enable_pressure_advance": "0",
        "enable_special_area_additional_cooling_fan": "0",
        "eng_plate_temp": "50",
        "eng_plate_temp_initial_layer": "55",
        "epoxy_resin_plate_temp": "0",
        "epoxy_resin_plate_temp_initial_layer": "0",
        "fan_cooling_layer_time": "100",
        "fan_max_speed": "100",
        "fan_min_speed": "100",
        "filament_cooling_final_speed": "3.4",
        "filament_cooling_initial_speed": "2.2",
        "filament_cooling_moves": "4",
        "filament_cost": "20",
        "filament_density": "1.24",
        "filament_deretraction_speed": "nil",
        "filament_diameter": "1.75",
        "filament_end_gcode": "; filament end gcode \n",
        "filament_flow_ratio": "0.95",
        "filament_is_support": "0",
        "filament_load_time": "0",
        "filament_loading_speed": "28",
        "filament_loading_speed_start": "3",
        "filament_max_volumetric_speed": "23",
        "filament_minimal_purge_on_wipe_tower": "15",
        "filament_multitool_ramming": "0",
        "filament_multitool_ramming_flow": "10",
        "filament_multitool_ramming_volume": "10",
        "filament_notes": "\"\"",
        "filament_ramming_parameters": "120 100 6.6 6.8 7.2 7.6 7.9 8.2 8.7 9.4 9.9 10.0| 0.05 6.6 0.45 6.8 0.95 7.8 1.45 8.3 1.95 9.7 2.45 10 2.95 7.6 3.45 7.6 3.95 7.6 4.45 7.6 4.95 7.6",
        "filament_retract_before_wipe": "nil",
        "filament_retract_lift_above": "nil",
        "filament_retract_lift_below": "nil",
        "filament_retract_lift_enforce": "nil",
        "filament_retract_restart_extra": "nil",
        "filament_retract_when_changing_layer": "nil",
        "filament_retraction_length": "nil",
        "filament_retraction_minimum_travel": "nil",
        "filament_retraction_speed": "nil",
        "filament_shrink": "100%",
        "filament_soluble": "0",
        "filament_start_gcode": "; filament start gcode\n{if (position[2] > first_layer_height) }\nM104 S[nozzle_temperature]\n{else} \nM104 S[first_layer_temperature]\n{endif}\n\n{if(initial_extruder != current_extruder || position[2] > first_layer_height)}\n{if (position[2] +0.4  < printable_height) }\nG2 Z{position[2]  + 0.4} I0.86 J0.86 P1 F10000 ; spiral lift a little from second lift\nG1 X205 Y345 F20000\nG1 Z{position[2] } F1200\n{else}\nG1 X205 Y345 F20000\n{endif}\n{endif}",
        "filament_toolchange_delay": "0",
        "filament_type": "PLA",
        "filament_unload_time": "0",
        "filament_unloading_speed": "90",
        "filament_unloading_speed_start": "100",
        "filament_vendor": "Creality",
        "filament_wipe": "nil",
        "filament_wipe_distance": "nil",
        "filament_z_hop": "nil",
        "filament_z_hop_types": "nil",
        "full_fan_speed_layer": "0",
        "hot_plate_temp": "50",
        "hot_plate_temp_initial_layer": "50",
        "inherits": "My Generic PLA",
        "material_flow_dependent_temperature": "0",
        "material_flow_temp_graph": "[[3.0,210],[10.0,220],[12.0,230]]",
        "nozzle_temperature": "220",
        "nozzle_temperature_initial_layer": "220",
        "nozzle_temperature_range_high": "230",
        "nozzle_temperature_range_low": "190",
        "overhang_fan_speed": "100",
        "overhang_fan_threshold": "50%",
        "pressure_advance": "0.04",
        "reduce_fan_stop_start_freq": "1",
        "required_nozzle_HRC": "0",
        "slow_down_for_layer_cooling": "1",
        "slow_down_layer_time": "6",
        "slow_down_min_speed": "20",
        "support_material_interface_fan_speed": "-1",
        "temperature_vitrification": "60",
        "textured_plate_temp": "50",
        "textured_plate_temp_initial_layer": "50"
      },
      "base": {
        "id": "01001",
        "brand": "Creality",
        "name": "Hyper PLA",
        "meterialType": "PLA",
        "colors": [
          "#ffffff"
        ],
        "density": 1.24,
        "diameter": "1.75",
        "costPerMeter": 0,
        "weightPerMeter": 0,
        "rank": 410,
        "minTemp": 190,
        "maxTemp": 240,
        "isSoluble": false,
        "isSupport": false,
        "shrinkageRate": 0,
        "softeningTemp": 0,
        "dryingTemp": 0,
        "dryingTime": 0
      }
    },
    ...
  ]
}
```
</details>

### SET
<details>
<summary>
<b><code>Switch LED on/off</code></b>&nbsp;<code>{"method":"set","params":{"lightSw":1}}</code> </summary>

#### Params
params    | value | desc
----------|-------|----------
"lightSw" | 0 - 1 | LED state

#### Request
`ON ` ```{"method":"set","params":{"lightSw":1}}```
`OFF` ```{"method":"set","params":{"lightSw":0}}```
</details>

<details>
<summary>
<b><code>Run RFID detection</code></b>&nbsp;<code>{"method":"set","params":{"refreshBox":{"boxId":1,"materialId":0}}}</code> </summary>

#### Params
params       | value | desc
-------------|-------|------------
"boxId"      | 1 - 4 | CFS index
"materialId" | 0-3   | spool index

#### Request
```{"method":"set","params":{"refreshBox":{"boxId":1,"materialId":0}}}```

</details>

<details>
<summary>
<b><code>Nozzle fan</code></b>&nbsp;<code>{"method":"set","params":{"fan":1}}</code> </summary>

#### Params
params | value | desc
-------|-------|----------
"fan"  | 0 - 1 | fan state

#### Request
```{"method":"set","params":{"fan":1}}```

</details>

<details>
<summary>
<b><code>Sides fans</code></b>&nbsp;<code>{"method":"set","params":{"fanAuxiliary":1}}</code> </summary>

#### Params
params         | value | desc
---------------|-------|----------
"fanAuxiliary" | 0 - 1 | fan state

#### Request
```{"method":"set","params":{"fanAuxiliary":1}}```

</details>

<details>
<summary>
<b><code>Case fan</code></b>&nbsp;<code>{"method":"set","params":{"fanCase":1}}</code> </summary>

#### Params
params    | value | desc
----------|-------|----------
"fanCase" | 0 - 1 | fan state

#### Request
```{"method":"set","params":{"fanCase":1}}```

</details>

<details>
<summary>
<b><code>Send Gcode</code></b>&nbsp;<code>{"method":"set","params":{"gcodeCmd":""}}</code> </summary>

#### Params
params     | value    | desc
-----------|----------|--------------
"gcodeCmd" | [string] | gcode command

#### Request
```{"method":"set","params":{"gcodeCmd":"M106 P2 S115"}}```

</details>

<details>
<summary>
<b><code>Position</code></b>&nbsp;<code>{"method":"set","params":{"setPosition":""}}</code> </summary>

#### Params
params        | value    | desc
--------------|----------|-------------------------
"setPosition" | [string] | gcode movement parameter

#### Request
```{"method":"set","params":{"setPosition":"X1 F3000"}}```

</details>

<details>
<summary>
<b><code>Homing</code></b>&nbsp;<code>{"method":"set","params":{"autohome":"X Y Z"}}</code> </summary>

#### Params
params     | value    | desc
-----------|----------|----------
"autohome" | [string] | axis name

#### Request
```{"method":"set","params":{"autohome":"X Y Z"}}```

</details>

<details>
<summary>
<b><code>Speed percentage</code></b>&nbsp;<code>{"method":"set","params":{"setFeedratePct":100}}</code> </summary>

#### Params
params           | value    | desc
-----------------|----------|-----------------
"setFeedratePct" | [number] | speed percentage

#### Request
```{"method":"set","params":{"setFeedratePct":100}}```

</details>

<details>
<summary>
<b><code>Nozzle temperature</code></b>&nbsp;<code>{"method":"set","params":{"nozzleTempControl":200}}</code> </summary>

#### Params
params              | value    | desc
--------------------|----------|------------
"nozzleTempControl" | [number] | temperature

#### Request
```{"method":"set","params":{"nozzleTempControl":200}}```

</details>

<details>
<summary>
<b><code>Bed temperature</code></b>&nbsp;<code>{"method":"set","params":{"bedTempControl":{"num":0,"val":60}}}</code> </summary>

#### Params
params | value    | desc
-------|----------|-----------------------
"num"  | [number] | bed index (default: 0)
"val"  | [number] | temperature


#### Request
```{"method":"set","params":{"bedTempControl":{"num":0,"val":60}}}```

</details>

<details>
<summary>
<b><code>Chamber temperature</code></b>&nbsp;<code>{"method":"set","params":{"boxTempControl":0}}</code> </summary>

#### Params
params           | value    | desc
-----------------|----------|------------
"boxTempControl" | [number] | temperature


#### Request
```{"method":"set","params":{"boxTempControl":0}}```

</details>

<details>
<summary>
<b><code>Delete gode file</code></b>&nbsp;<code>{"method":"set","params":{"opGcodeFile":"deleteprt:/path/filename.gcode"}}</code> </summary>

#### Params
params        | value    | desc
--------------|----------|-------------------------------
"opGcodeFile" | [string] | "deleteprt:" + path + filename


#### Request
```{"method":"set","params":{"opGcodeFile":"deleteprt:/mnt/UDISK/printer_data/gcodes/filename.gcode"}}```

</details>

<details>
<summary>
<b><code>Delete timelapse</code></b>&nbsp;<code>{"method":"set","params":{"ctrlVideoFiles":{"cmd":"remove","printId":"","file":"/path/id.mp4"}}}</code> </summary>

#### Params
params | value    | desc
-------|----------|----------------
"file" | [string] | path + filename


#### Request
```{"method":"set","params":{"ctrlVideoFiles":{"cmd":"remove","printId":"","file":"/mnt/UDISK/creality/userdata/delay_image/video/1738435321.mp4"}}}```

</details>

<details>
<summary>
<b><code>Delete historic</code></b>&nbsp;<code>{"method":"set","params":{"deleteHistory":[1738491492]}}</code> </summary>

#### Params
params          | value          | desc
----------------|----------------|---------------
"deleteHistory" | [string array] | print(s) index


#### Request
```{"method":"set","params":{"deleteHistory":[1738491492]}}```

</details>

<details>
<summary>
<b><code>Filament infos</code></b>&nbsp;<code>{"method":"set","params":{"modifyMaterial":IMaterial}}</code> </summary>

#### Params
params     | value    | desc
-----------|----------|-----------------------------
"boxId"    | 1-4      | CFS index (0 = spool holder)
"id"       | 0-3      | spool index
"rfid"     | [string] | material index
"type"     | [string] | filament type
"vendor"   | [string] | filament brand
"name"     | [string] | filament name
"color"    | [string] | hex color
"minTemp"  | [number] | work only with decimal
"maxTemp"  | [number] | work only with decimal
"pressure" | [number] | pressure advance

#### Request
```{"method":"set","params":{"modifyMaterial":{"boxId":1,"id":3,"rfid":"00001","type":"PLA","vendor":"Creality","name":"CR-PLA","color":"#0ba552a","minTemp":190.0,"maxTemp":240.0,"pressure":0.056}}}```

</details>

<details>
<summary>
<b><code>Print colors binding</code></b>&nbsp;<code>{"method":"set","params":{"colorMatch":{"path":"path/filename.gcode","list":[IColorMatch]}}}</code> </summary>

Send this to bind colors from the cfs to a multicolor print

#### Params
params            | value         | desc
------------------|---------------|----------------------
"colorMatch.path" | [string]      | path + filename
"colormatch.list" | [IColorMatch] | colors for print file

#### Request
```{"method":"set","params":{"colorMatch":{"path":"/mnt/UDISK/printer_data/gcodes/filename.gcode","list":[{"id":"T1A","type":"PLA","color":"#ffffff","boxId":1,"materialId":0}]}}}```

</details>

<details>
<summary>
<b><code>Print gcode file with cfs</code></b>&nbsp;<code>{"method":"set","params":{"multiColorPrint":{"gcode":"path/filename.gcode","enableSelfTest":0}}}</code> </summary>

#### Params
params           | value    | desc
-----------------|----------|-------------------
"gcode"          | [string] | path + filename
"enableSelfTest" | 0 - 1    | enable calibration

#### Request
```{"method":"set","params":{"multiColorPrint":{"gcode":"/mnt/UDISK/printer_data/gcodes/filename.gcode","enableSelfTest":0}}}```

</details>

<details>
<summary>
<b><code>Print gcode file with spool holder</code></b>&nbsp;<code>{"method":"set","params":{ "opGcodeFile": "printprt:/path/filename.gcode", "enableSelfTest": 0 }}</code> </summary>

> [!WARNING]
> Make sure to feed filament in the extruder before sending this request, as it uses the spool holder.
If there is no filament loaded, the print will be cancelled.


#### Params
params           | value    | desc
-----------------|----------|------------------------------
"opGcodeFile"    | [string] | "printprt:" + path + filename
"enableSelfTest" | 0 - 1    | enable calibration

#### Request
```{"method":"set","params":{ "opGcodeFile": "printprt:/mnt/UDISK/printer_data/gcodes/filename.gcode", "enableSelfTest": 0 }}```

</details>

<details>
<summary>
<b><code>Pause / Resume print</code></b>&nbsp;<code>{"method":"set","params":{"pause": 0}}</code> </summary>

#### Params
params  | value | desc
--------|-------|----------------------
"pause" | 0 - 1 | 0 = pause, 1 = resume

#### Request
```{"method":"set","params":{"pause": 0}}```

</details>

<details>
<summary>
<b><code>Stop print</code></b>&nbsp;<code>{"method":"set","params":{"stop": 1}}</code> </summary>

#### Params
params | value | desc
-------|-------|-----
"stop" | 1     |

#### Request
```{"method":"set","params":{"stop": 1}}```

</details>

<details>
<summary>
<b><code>Extrude / Retract filament</code></b>&nbsp;<code>{"method":"set","params":{ "feedInOrOut": { "boxId": 1, "materialId": 0, "isFeed": 1 } }}</code> </summary>

#### Params
params       | value | desc
-------------|-------|-----------------------------
"boxId"      | 0 -4  | CFS index (0 = spool holder)
"materialId" | 0-3   | spool index
"isFeed"     | 0 - 1 | 0 = retract, 1 = extrude

#### Request
```{"method":"set","params":{ "feedInOrOut": { "boxId": 1, "materialId": 0, "isFeed": 1 } }}```

</details>