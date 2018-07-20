interface WebServiceClientInstance {
    adsState: number;
    adsStateTxt: string;
    deviceState: number;
    dateNames: any;
    maxDropReq: number;
    maxStringLen: number;
    useCheckBounds: boolean;
    dataTypeTableReady: boolean;
    symbolTableReady: boolean;
    handleCacheReady: boolean;
    xmlHttpReqTimeout: number;
    readReq: (ReadRequest) => {};
    writeReq: (WriteRequest) => {};
    sumReadReq: (SumReadRequest) => {};
    sumWriteReq: (SumWriteRequest) => {};

    readArrayOfStruct: any;
    readStruct: any;

    writeArrayOfStruct: any;
    writeStruct: any;

    readBool: (ReadValue) => {};
    readSint: (ReadValue) => {};
    readInt: (ReadValue) => {};
    readDint: (ReadValue) => {};
    readString: (ReadValue) => {};
    readTime: (ReadValue) => {};
    readTod: (ReadValue) => {};
    readDt: (ReadValue) => {};
    readDate: (ReadValue) => {};
    readReal: (ReadValue) => {};

    writeBool: (WriteValue) => {};
    writeSint: (WriteValue) => {};
    writeInt: (WriteValue) => {};
    writeDint: (WriteValue) => {};
    writeString: (WriteValue) => {};
    writeTime: (WriteValue) => {};
    writeTod: (WriteValue) => {};
    writeDt: (WriteValue) => {};
    writeDate: (WriteValue) => {};
    writeReal: (WriteValue) => {};

    getHandles: (Handles) => {};
    releaseHandles: (Handles) => {};
    logHandleCache: () => {};

    logSymbols: () => {};
    getSymbolsAsJSON: () => string;
    setSymbolsFromJSON: (string) => {};

    readAdsState: () => {};

    oc?: () => {};
    ocd?: number;
    oe?: () => {};
}

interface Handles {
    debug?: boolean;
    id?: number;
    symbols: string[];
    oc?: () => {};
    ocd?: number;
    oe?: () => {};
    sync?: boolean;
}

interface ReadRequest {
    addr: string;
    debug?: boolean;
    id?: number;
    items: ReadItem[];
    oc?: () => {};
    ocd?: number;
    oe?: () => {};
    seq?: boolean;
    sync?: boolean;
}

interface WriteRequest {
    addr: string;
    debug?: boolean;
    id?: number;
    items: WriteItem[];
    oc?: () => {};
    ocd?: number;
    oe?: number;
    sync?: boolean;
}

interface ReadItem {
    addr: number;
    type: string;
    jvar: string;
    prefix?: string;
    suffix?: string;
}

interface WriteItem {
    type: string;
    val: boolean | number | string;
}

interface SumReadRequest {
    debug?: boolean;
    id?: number;
    items: SumReadItem[];
    oc?: () => {};
    ocd?: number;
    oe?: number;
    sync?: boolean;
}

interface SumWriteRequest {
    debug?: boolean;
    id?: number;
    items: SumWriteItem[];
    oc?: () => {};
    ocd?: number;
    oe?: () => {};
    sync?: boolean;
}

interface SumReadItem {
    name: string;
    type?: string;
    jvar: string;
    handle?: boolean;
    prefix?: string;
    suffix?: string;
    dp?: number;
    decPlaces?: number;
    def?: any;
    format?: string;
    strlen?: number;
}

interface SumWriteItem {
    name: string;
    type?: string;
    handle?: boolean;
    val: boolean | number | string;
    def?: any;
    format?: string;
    strlen?: number;
}

interface ReadValue {
    addr?: string;
    name: string;
    debug?: boolean;
    id?: number;
    jvar: boolean | number | string;
    handle?: boolean;
    oc?: () => {};
    ocd?: number;
    oe?: () => {};
    prefix?: string;
    suffix?: string;
    sync?: boolean;
    dp?: number;
    decPlaces?: number;
    format?: string;
    strlen?: number;
}

interface WriteValue {
    addr?: string;
    name: string;
    debug?: boolean;
    id?: number;
    handle?: boolean;
    oc?: () => {};
    ocd?: number;
    oe?: () => {};
    val: boolean | number | string;
    sync?: boolean;
    strlen?: number;
}

interface CreateClient {
    serviceURL: string;
    serviceUser?: string;
    configFileUrl?: string;
    amsNetId: string;
    amsPort?: number; // 801 | 802 | 803 | 804
    alignment?: string; // 1 | 4 | 8
    dontFetchSymbols?: boolean;
    skipMissingTypes?: boolean;
    syncXmlHttp?: boolean;
    forceUploadUsage?: boolean;
    useHandles?: boolean;
    servicePassword?: string;
    language?: 'en' | 'ge';
    onReady: () => {};
}

interface WebServiceClient {
    createClient: (CreateClient) => WebServiceClientInstance;
}

interface Tame {
    TAME: {
        version: string;
        weekdShortNames: {
            ge: string[];
            en: string[];
        };
        weekdLongNames: {
            ge: string[];
            en: string[];
        };
        monthsShortNames: {
            ge: string[];
            en: string[];
        };
        monthsLongNames: {
            ge: string[];
            en: string[];
        };
    };
    
    WebServiceClient: WebServiceClient;
    /*
    releaseHandles: any;
    getHandles: any;

    sumReadReq: any;

    readArrayOfStruct: any;
    readStruct: any;

    writeArrayOfStruct: any;
    writeStruct: any;

    readBool: any;
    readSint: any;
    readInt: any;
    readDint: any;
    readString: any;
    readTime: any;
    readTod: any;
    readDt: any;
    readDate: any;
    readReal: any;

    writeBool: any;
    writeSint: any;
    writeInt: any;
    writeDint: any;
    writeString: any;
    writeTime: any;
    writeTod: any;
    writeDt: any;
    writeDate: any;
    writeReal: any;
    */
}

declare module "tame4" {
    export = tame; 
}

declare let tame: Tame;