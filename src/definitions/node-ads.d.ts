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

interface NodeAds {
    connect: (Options, Callback) => {};
    notify: (Callback) => {};
    read: (Value, Callback) => {};
    multiRead: ([Value], Callback) => {};
}

declare module "node-ads" {
    export = ads; 
}

declare let ads: NodeAds;