export interface IParams {
    [key: string]: any;
}

export interface IRequestPayload {
    method: string;
    params: IParams;
    value: string;
    id: string;
}

export interface ITemps {
    nozzleTemp: string;
    bedTemp0: string;
    boxTemp?: number;
}

export interface IStatus {
    TotalLayer: number;
    accelToDecelLimits: number;
    accelerationLimits: number;
    aiDetection: number;
    aiFirstFloor: number;
    aiPausePrint: number;
    aiSw: number;
    autoLevelResult: string;
    autohome: string;
    auxiliaryFanPct: number;
    bedTemp0: string;
    bedTemp1: string;
    bedTemp2: string;
    bedTempAutoPid: number;
    boxTemp: number;
    caseFanPct: number;
    cfsConnect: number;
    connect: number;
    cornerVelocityLimits: number;
    curFeedratePct: number;
    curFlowratePct: number;
    curPosition: string;
    dProgress: number;
    deviceState: number;
    enableSelfTest: number;
    err: IErr;
    fan: number;
    fanAuxiliary: number;
    fanCase: number;
    feedState: number;
    hostname: string;
    layer: number;
    lightSw: number;
    materialDetect: number;
    materialStatus: number;
    maxBedTemp: number;
    maxBoxTemp: number;
    maxNozzleTemp: number;
    model: string;
    modelFanPct: number;
    modelVersion: string;
    nozzleMoveSnapshot: number;
    nozzleTemp: string;
    nozzleTempAutoPid: number;
    powerLoss: number;
    pressureAdvance: string;
    printFileName: string;
    printFileType: number;
    printId: string;
    printJobTime: number;
    printLeftTime: number;
    printProgress: number;
    printStartTime: number;
    realTimeFlow: string;
    realTimeSpeed: string;
    repoPlrStatus: number;
    smoothTime: string;
    state: number;
    targetBedTemp0: number;
    targetBedTemp1: number;
    targetBedTemp2: number;
    targetBoxTemp: number;
    targetNozzleTemp: number;
    tfCard: number;
    upgradeStatus: number;
    usedMaterialLength: number;
    velocityLimits: number;
    video: number;
    video1: number;
    videoElapse: number;
    videoElapseFrame: number;
    videoElapseInterval: number;
    webrtcSupport: number;
    withSelfTest: number;
}

export interface IBoxInfo {
    same_material: (ISameMaterial[] | string)[][];
    materialBoxs: MaterialBox[]; // [0] = holder, [1] = cfs
}

export interface IBoxConfig {
    autoRefill: Number
    cAutoFeed: Number
    cSelfTest: Number
    cAutoUpdateFilament: Number
}

export interface IHistoric {
    totalJob: number;
    totalUsageTime: number;
    totalUsageMaterial: number;
    historyList: IHistoricFile[];
}

export interface IElapseVideo {
    dateTime: string;
    name: string;
    id: number;
    video: string;
    size: number;
    duration: number;
    cover: string;
    starttime: number;
    printtime: number;
    location: number;
    interval: number;
    render: number;
    gcodename: string;
    videoname: string;
    printId: string;
    upload: number;
    videoid: string;
}

export interface IPrintObjects {
    current_object: string;
    excluded_objects: string;
    objects: string;
}

export interface IGcodeFileInfo {
    custom_types: number;
    type: number;
    name: string;
    path: string;
    file_size: number;
    create_time: number;
    timeCost: number;
    consumables: number;
    floorHeight: number;
    modelX: number;
    modelY: number;
    modelZ: number;
    material: string;
    nozzleTemp: number;
    bedTemp: number;
    software: string;
    thumbnail: string;
    startPixel: number;
    endPixel: number;
    modelHeight: number;
    layerHeight: number;
    preview: string;
    materialColors: string;
    materialIds: string;
    filamentWeight: string;
    match: string;
}

interface IErr {
    errcode: number;
    key: number;
    value: string;
}

interface MaterialBox {
    id: number;
    state: number;
    type: number;
    materials: IMaterial[];
    temp?: number;
    humidity?: number;
}

export interface IMaterial {
    id: number;
    vendor: string;
    type: string;
    name: string;
    rfid: string;
    color: string;
    diameter?: number;
    minTemp: number;
    maxTemp: number;
    pressure: number;
    percent: number;
    state: number;
    selected: number;
    editStatus: number;
}

interface ISameMaterial {
    boxId: number;
    materialId: number;
}

interface IHistoricFile {
    dateTime: string;
    id: number;
    filename: string;
    size: number;
    ctime: number;
    starttime: number;
    startway: number;
    usagetime: number;
    usagematerial: number;
    printfinish: number;
    thumbnail: string;
    filemd5: string;
    ismulticolor: boolean;
}

export interface IRetMaterial {
    engineVersion: string;
    printerIntName: string;
    nozzleDiameter: string[];
    kvParam: KvParam;
    base: Base;
}

interface Base {
    id: string;
    brand: string;
    name: string;
    meterialType: string;
    colors: string[];
    density: number;
    diameter: string;
    costPerMeter: number;
    weightPerMeter: number;
    rank: number;
    minTemp: number;
    maxTemp: number;
    isSoluble: boolean;
    isSupport: boolean;
    shrinkageRate: number;
    softeningTemp: number;
    dryingTemp: number;
    dryingTime: number;
}

interface KvParam {
    activate_air_filtration: string;
    activate_chamber_temp_control: string;
    additional_cooling_fan_speed: string;
    chamber_temperature: string;
    close_fan_the_first_x_layers: string;
    compatible_printers: string;
    compatible_printers_condition: string;
    compatible_prints: string;
    compatible_prints_condition: string;
    complete_print_exhaust_fan_speed: string;
    cool_cds_fan_start_at_height: string;
    cool_plate_temp: string;
    cool_plate_temp_initial_layer: string;
    cool_special_cds_fan_speed: string;
    default_filament_colour: string;
    during_print_exhaust_fan_speed: string;
    enable_overhang_bridge_fan: string;
    enable_pressure_advance: string;
    enable_special_area_additional_cooling_fan: string;
    eng_plate_temp: string;
    eng_plate_temp_initial_layer: string;
    epoxy_resin_plate_temp: string;
    epoxy_resin_plate_temp_initial_layer: string;
    fan_cooling_layer_time: string;
    fan_max_speed: string;
    fan_min_speed: string;
    filament_cooling_final_speed: string;
    filament_cooling_initial_speed: string;
    filament_cooling_moves: string;
    filament_cost: string;
    filament_density: string;
    filament_deretraction_speed: string;
    filament_diameter: string;
    filament_end_gcode: string;
    filament_flow_ratio: string;
    filament_is_support: string;
    filament_load_time: string;
    filament_loading_speed: string;
    filament_loading_speed_start: string;
    filament_max_volumetric_speed: string;
    filament_minimal_purge_on_wipe_tower: string;
    filament_multitool_ramming: string;
    filament_multitool_ramming_flow: string;
    filament_multitool_ramming_volume: string;
    filament_notes: string;
    filament_ramming_parameters: string;
    filament_retract_before_wipe: string;
    filament_retract_lift_above: string;
    filament_retract_lift_below: string;
    filament_retract_lift_enforce: string;
    filament_retract_restart_extra: string;
    filament_retract_when_changing_layer: string;
    filament_retraction_length: string;
    filament_retraction_minimum_travel: string;
    filament_retraction_speed: string;
    filament_shrink: string;
    filament_soluble: string;
    filament_start_gcode: string;
    filament_toolchange_delay: string;
    filament_type: string;
    filament_unload_time: string;
    filament_unloading_speed: string;
    filament_unloading_speed_start: string;
    filament_vendor: string;
    filament_wipe: string;
    filament_wipe_distance: string;
    filament_z_hop: string;
    filament_z_hop_types: string;
    full_fan_speed_layer: string;
    hot_plate_temp: string;
    hot_plate_temp_initial_layer: string;
    inherits: string;
    material_flow_dependent_temperature: string;
    material_flow_temp_graph: string;
    nozzle_temperature: string;
    nozzle_temperature_initial_layer: string;
    nozzle_temperature_range_high: string;
    nozzle_temperature_range_low: string;
    overhang_fan_speed: string;
    overhang_fan_threshold: string;
    pressure_advance: string;
    reduce_fan_stop_start_freq: string;
    required_nozzle_HRC: string;
    slow_down_for_layer_cooling: string;
    slow_down_layer_time: string;
    slow_down_min_speed: string;
    support_material_interface_fan_speed: string;
    temperature_vitrification: string;
    textured_plate_temp: string;
    textured_plate_temp_initial_layer: string;
    filament_shrinkage_compensation_z?: string;
}
