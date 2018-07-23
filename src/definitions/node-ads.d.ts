interface Options {
    host: string;
    amsNetIdTarget: string;
    amsNetIdSource: string;
    port?: number;
    amsPortSource?: number;
    amsPortTarget?: number;
}

interface Value {
    symname: string;
    bytelength: any;
}

interface Callback {
    (error: Error, handle: any): void;
}

interface AdsType {
    length: number;
    name: string;
}

interface Symbol {
    indexGroup: number;
    indexOffset: number;
    name: string;
    type: string;
    comment: string;
}

interface NodeAds {
    connect: (Options, Callback) => {};
    end: (Callback) => {};
    readDeviceInfo: (Callback) => {};
    read: (Value, Callback) => {};
    write: (Value, Callback) => {};
    notify: (Callback) => {};
    writeRead: (Value, Callback) => {};
    getSymbols: (Callback) => {};
    multiRead: ([Value], Callback) => {};

    BOOL: number;
    BYTE: number;
    WORD: number;
    DWORD: number;
    SINT: number;
    USINT: number;
    INT: number;
    UINT: number;
    DINT: number;
    UDINT: number;
    LINT: number;
    ULINT: number;
    REAL: number;
    LREAL: number;
    TIME: number;
    TIME_OF_DAY: number;
    TOD: number;
    DATE: number;
    DATE_AND_TIME: number;
    DT: number;
    STRING: number;
}

declare module "node-ads" {
    export = ads;
}

declare let ads: NodeAds; 
