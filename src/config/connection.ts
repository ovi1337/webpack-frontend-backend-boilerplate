
export const settings: ConnectionSettings = {
    //The IP or hostname of the target machine
    host: "192.168.1.174",
    //The NetId of the target machine
    amsNetIdTarget: "10.0.0.105.1.1",
    //The NetId of the source machine.
    //You can choose anything in the form of x.x.x.x.x.x,
    //but on the target machine this must be added as a route.
    amsNetIdSource: "192.168.137.50.1.1",
    verbose: true,

    //OPTIONAL: (These are set by default)
    //The tcp destination port
    //port: 48898
    //The ams source port
    //amsPortSource: 32905
    //The ams target port
    //amsPortTarget: 801
}