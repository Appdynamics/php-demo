var exports = module.exports = {};

exports.getBeacon = function(type) {
    if (type === 'none') {
        return {
            "ver": "4.1.2.2",
            "dataType": "R",
            "rootGUID": "0",
            "events": [
                {
                    "eventGUID": "0",
                    "eventUrl": "0:\/\/1",
                    "eventType": 0,
                    "cookieMetrics": {
                        "PLT": 383,
                        "FBT": 94,
                        "FET": 289,
                        "DRT": 260,
                        "PRT": 29,
                        "DOM": 354,
                        "PLC": 1
                    },
                    "pageReferrer": "0:\/\/1\/",
                    "serverMetadata": {
                        "clientRequestGUID": "0",
                        "btTime": [
                            {
                                "id": "1601",
                                "duration": -1,
                                "ert": -1
                            }
                        ]
                    },
                    "sequenceId": 0,
                    "timestamp": 1442530760102
                }
            ],
            "clientId": "f112263d_40bc_c69f_57f4_36f9162249b1",
            "guids": [],
            "urlParts": [
                "http",
                "www.onlineretail.com"
            ]
        }
    } else if (type === 'nav') {
        return {
            "ver": "4.1.2.2",
            "dataType": "R",
            "rootGUID": "0",
            "events": [
            {
                "eventGUID": "0",
                "eventUrl": "0:\/\/1",
                "eventType": 0,
                "cookieMetrics": {
                    "PLT": 411,
                    "FBT": 120,
                    "FET": 291,
                    "DRT": 165,
                    "PRT": 126,
                    "DOM": 285,
                    "PLC": 1,
                    "EPM": 1
                },
                "metrics": {
                    "PLT": 384,
                    "FBT": 70,
                    "SCT": 1,
                    "DLT": 0,
                    "TCP": 0,
                    "RAT": 69,
                    "FET": 314,
                    "DRT": 204,
                    "DDT": 3,
                    "DPT": 201,
                    "PRT": 110,
                    "DOM": 274,
                    "PLC": 1,
                    "EPM": 1
                },
                "serverMetadata": {
                    "clientRequestGUID": "0",
                    "btTime": [
                        {
                            "id": "1600",
                            "duration": -1,
                            "ert": -1
                        }
                    ],
                    "hasEntryPointErrors": "e"
                },
                "sequenceId": 658,
                "timestamp": 1442594261444
            }
        ],
            "clientId": "5ac682c5_d88e_b912_7f60_ab6c54aa47b5",
            "guids": [],
            "urlParts": [
            "http",
            "www.onlineretail.com"
        ]
        }
    } else if (type === 'resource') {
        return {
            "ver": "4.1.2.2",
            "dataType": "R",
            "rootGUID": "0",
            "events": [
            {
                "eventGUID": "0",
                "eventUrl": "0:\/\/1",
                "eventType": 0,
                "cookieMetrics": {
                    "PLT": 411,
                    "FBT": 120,
                    "FET": 291,
                    "DRT": 165,
                    "PRT": 126,
                    "DOM": 285,
                    "PLC": 1,
                    "EPM": 1
                },
                "metrics": {
                    "PLT": 384,
                    "FBT": 70,
                    "SCT": 1,
                    "DLT": 0,
                    "TCP": 0,
                    "RAT": 69,
                    "FET": 314,
                    "DRT": 204,
                    "DDT": 3,
                    "DPT": 201,
                    "PRT": 110,
                    "DOM": 274,
                    "PLC": 1,
                    "EPM": 1
                },
                "serverMetadata": {
                    "clientRequestGUID": "0",
                    "btTime": [
                        {
                            "id": "1600",
                            "duration": -1,
                            "ert": -1
                        }
                    ],
                    "hasEntryPointErrors": "e"
                },
                "resourceTimingInfo": {
                    "v": 2,
                    "ic": {
                        "other": 1,
                        "script": 3,
                        "link": 2,
                        "img": 1,
                        "iframe": 1,
                        "css": 3
                    },
                    "it": {
                        "other": 1,
                        "script": 2,
                        "link": 3,
                        "img": 4,
                        "iframe": 5,
                        "css": 6
                    },
                    "rc": {
                        "other": 5,
                        "script": 3,
                        "css": 1,
                        "img": 1,
                        "html": 1
                    },
                    "rt": {
                        "other": 1,
                        "script": 2,
                        "css": 3,
                        "img": 4,
                        "html": 5
                    },
                    "f": {
                        "1": [
                            "startTime",
                            "redirectStart",
                            "redirectEnd",
                            "fetchStart",
                            "dnsLookupStart",
                            "dnsLookupEnd",
                            "connectStart",
                            "connectEnd",
                            "requestStart",
                            "responseStart",
                            "responseEnd"
                        ],
                        "2": [
                            "startTime",
                            "fetchStart",
                            "responseEnd"
                        ]
                    },
                    "t": 1442594260016,
                    "r": [
                        {
                            "u": "0:\/\/1",
                            "i": 1,
                            "r": 1,
                            "f": 1,
                            "o": 1,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                1,
                                70,
                                73
                            ]
                        },
                        {
                            "u": "0:\/\/1\/2\/3",
                            "i": 2,
                            "r": 2,
                            "f": 1,
                            "o": 10,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                2,
                                14,
                                15
                            ]
                        },
                        {
                            "u": "0:\/\/4\/5?6",
                            "i": 3,
                            "r": 1,
                            "f": 1,
                            "o": 10,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                6,
                                29,
                                29,
                                64,
                                64,
                                95,
                                97
                            ]
                        },
                        {
                            "u": "0:\/\/21\/5\/7",
                            "i": 3,
                            "r": 3,
                            "f": 1,
                            "o": 10,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                7,
                                7,
                                7,
                                9,
                                9,
                                17,
                                19
                            ]
                        },
                        {
                            "u": "0:\/\/21\/8\/9",
                            "i": 4,
                            "r": 4,
                            "f": 1,
                            "o": 11,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                6,
                                6,
                                6,
                                8,
                                9,
                                18,
                                20
                            ]
                        },
                        {
                            "u": "0:\/\/10\/11",
                            "i": 2,
                            "r": 2,
                            "f": 2,
                            "o": 11,
                            "m": [
                                0,
                                0,
                                92
                            ]
                        },
                        {
                            "u": "0:\/\/21\/2\/12",
                            "i": 2,
                            "r": 2,
                            "f": 1,
                            "o": 11,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                5,
                                5,
                                5,
                                7,
                                8,
                                16,
                                18
                            ]
                        },
                        {
                            "u": "0:\/\/1\/13",
                            "i": 5,
                            "r": 5,
                            "f": 1,
                            "o": 64,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                1,
                                6,
                                7
                            ]
                        },
                        {
                            "u": "0:\/\/14\/15\/16\/17\/18",
                            "i": 6,
                            "r": 1,
                            "f": 1,
                            "o": 87,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                2,
                                25,
                                25,
                                49,
                                49,
                                73,
                                76
                            ]
                        },
                        {
                            "u": "0:\/\/14\/15\/16\/17\/19",
                            "i": 6,
                            "r": 1,
                            "f": 1,
                            "o": 177,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                2,
                                25,
                                25,
                                49,
                                49,
                                80,
                                103
                            ]
                        },
                        {
                            "u": "0:\/\/14\/15\/16\/17\/20",
                            "i": 6,
                            "r": 1,
                            "f": 1,
                            "o": 177,
                            "m": [
                                0,
                                -1,
                                -1,
                                0,
                                2,
                                25,
                                25,
                                49,
                                49,
                                76,
                                80
                            ]
                        }
                    ]
                },
                "sequenceId": 658,
                "timestamp": 1442594261444
            }
        ],
            "clientId": "5ac682c5_d88e_b912_7f60_ab6c54aa47b5",
            "guids": [],
            "urlParts": [
            "http",
            "www.onlineretail.com",
            "js",
            "adrum.js",
            "fonts.googleapis.com",
            "css",
            "family=Merriweather:400,90...",
            "main.css",
            "images",
            "bundy.jpeg",
            "code.jquery.com",
            "jquery-2.1.4.min.js",
            "main.js",
            "heroAd.html",
            "fonts.gstatic.com",
            "s",
            "merriweather",
            "v8",
            "ZvcMqxEw...K9Q.woff2",
            "ZvcMqxEw...X_g.woff2",
            "RFda8w1V...3Vs.woff2",
                "cdn.onlineretail.com"
        ]
        }
    }
};

exports.getErrorEvent = function() {
    return {
     "eventGUID": "1",
     "eventUrl": "0:\/\/1",
     "eventType": 4,
     "parentGUID": "0",
     "parentUrl": "0:\/\/1",
     "parentType": 0,
     "message": "Uncaught ReferenceError: Worker is not defined",
     "line": 42,
     "stack": "ReferenceError: Worker is not defined 42:7",
     "sequenceId": 1,
     "timestamp": 1442594260440
     };

}