/*******************************
 * Dependencies
 *******************************/

var request = require('request');
var querystring = require('querystring');
var _ = require('lodash');
var winston = require('winston');
var Q = require('q');
var B = require('./beacon.js');
var countries = require('./countries.js');

/*******************************
 * Change Me
 *******************************/

var debugConsole = false;
var logFileLevel = 'error'
var logFilePath = ''; //use trailing slash if used
var beaconHost = process.env.BEACON_HOST;
var beaconHostname = beaconHost.replace('https://','');
var appDKey =  process.env.RUM_KEY;
var cdnHostname = 'cdn.onlineretail.com';
var appHostname = 'http://bundy_web';
// user agent that triggers JS error
errorAgent = [
    'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10',
    'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)'
];
var urls = [
    {url : appHostname + '/', drop : 0, hasError : true},
    {url : appHostname + '/product/search', drop : 10},
    {url : appHostname + '/product/1', drop : 20},
    {url : appHostname + '/product/popular', drop : 5},
    {url : appHostname + '/cart/addToCart?productId=1', drop : 50},
    {url : appHostname  + '/cart/checkout', drop : 50},
];

/*******************************
 * Basic error checking and configuration
 *******************************/
winston.add(winston.transports.File, { filename: logFilePath + 'load.log', level : logFileLevel });
if (!debugConsole) {
    winston.remove(winston.transports.Console);
}
if (!beaconHost || !appDKey) {
    winston.error('Beacon info or appDKey is missing');
}

/*******************************
 * Functions
 *******************************/

var errorSessionTimestamp = Date.now();

session = function(sessionData) {
    if (!sessionData) {
        sessionData = {
            pages : getPages(),
            geo : countries.getGeo(),
            browser : getBrowser(),
            sequenceId : -1,
            userId : getUserId()
        }
        sessionData.apacheIp = getApacheIp(sessionData);
        winston.info(sessionData);

    } else if (sessionData.pages.length === 0) {
        return session();
    }

    var currentPage = sessionData.pages[0];
    sessionData.sequenceId++;
    sessionData.pages.shift();

    if (_.random(1,100) <= currentPage.drop) {

        winston.info('Drop session on page : ' + currentPage.url);
        session();
        return;
    }

    pageRequest(currentPage.url, sessionData).then(function(serverResponse) {
        return {serverInfo : parseHeaders(serverResponse.response.headers), HTMLDownloadTime : serverResponse.time};
    }).then(function(data) {
        var beacon = B.getBeacon(sessionData.browser.support);
        updateUrlParts(beacon, currentPage);
        addErrorEvent(beacon, currentPage, sessionData);
        addServerInfo(beacon, data.serverInfo);
        updateTimestampAndSequence(beacon, sessionData.sequenceId);
        setGeo(beacon, sessionData.geo);
        updateMetrics(beacon, data.HTMLDownloadTime, sessionData);
        addUserData(beacon, currentPage, sessionData);
        useCaseCheck(beacon, currentPage, sessionData);
        return sendBeacon(beacon, sessionData.browser.agent);
    }).then(function(response) {
        if (response.statusCode !== 200) {
            winston.error('Beacon post error : '+ response.statusCode + ' - ' + beaconHost);
        } else {
            winston.info('Beacon post success : '+ response.statusCode + ' - ' + beaconHost);
        }

        session(sessionData);
    }).catch(function(error) {
        winston.error('Error generating beacon', error);
    });
}

var pageRequest = function(url, sessionData) {
    var startTime = Date.now();
    var deferred = Q.defer();
    var options = {
        url : url,
        headers : {
            'User-Agent' : sessionData.browser.agent,
            'Referer' : getReferer(sessionData),
            'X-Forwarded-For' : sessionData.apacheIp
        }
    }
    request(options, function(error, response, body) {
        if (error) {
            return deferred.reject({type : 'page request', err : error});
        }
        deferred.resolve({response : response, body : body, time : Date.now() - startTime});
    });
    return deferred.promise;
}

var getReferer = function(sessionData) {
    var referers = ['https://www.google.com', 'https://www.bing.com', 'https://www.yahoo.com', 'http://en.wikipedia.org', 'http://www.amazon.com'];
    var pages = getPages();
    if (sessionData.sequenceId === 0 || sessionData.sequenceId > pages.length) {
        return referers[_.random(0,(referers.length -1))];
    } else {
        return pages[sessionData.sequenceId - 1].url.replace(appHostname, 'https://www.onlineretail.com');
    }
}

var getApacheIp = function(sessionData) {
    var ips  = {
        'United States' : '209.234.175.',
        'United Kingdom' : '88.150.132.',
        'France' : '62.160.45.',
        'Canada' : '142.0.159.',
        'Span' : '31.44.144.',
        'Portugal' : '46.189.128.',
        'Germany' : '95.119.255.',
        'Italy' : '217.171.160.',
        'Poland' : '5.226.64.',
        'Czech Republic' : '213.168.176.',
        'Greece' : '31.217.160.',
        'Romania' : '194.105.31.',
        'Ireland' : '31.200.128.',
        'Morocco' : '197.153.2.',
        'South Africa' : '168.253.192.',
        'Egypt' : '41.155.128.',
        'Mexico' : '148.205.254.',
        'Panama' : '179.48.64.',
        'Colombia' : '168.176.0.',
        'Chile' : '152.139.120.',
        'Argentina' : '167.252.4.',
        'Peru' : '179.43.80.',
        'Brazil' : '150.162.2.',
        'Russian Federation' : '31.44.80.',
        'China' : '1.4.32.',
        'Japan' : '101.0.16.',
        'India' : '14.102.224.',
        'Australia' : '114.111.128.'
    }

    if (_.has(ips, sessionData.geo.country)) {
        return ips[sessionData.geo.country] + _.random(1,255);
    } else {
        return '208.145.174.56';
    }
}

var sendBeacon = function(beacon, agent) {

    var strBeacon = JSON.stringify(beacon);
    var deferred = Q.defer();
    var options = {
        url : beaconHost + '/eumcollector/beacons/browser/v1/'+appDKey+'/adrum',
        headers : {
            'User-Agent' : agent,
            'Content-Type' : 'text/plain',
            'Content-Length' : strBeacon.length,
            'Accept' : '*/*',
            'Host' : beaconHostname
        },
        body : strBeacon
    }

    request.post(options, function(error, response, body) {
        if (error) {
            return deferred.reject({type : 'beacon request', err : error});
        }
        deferred.resolve(response);
    });
    return deferred.promise;
}

/**
 * PLT - Page Load Time | End User Reponse Time
 * FBT - First Byte Time
 * DRT - HTML Download and DOM Building
 * DOM - DOM Ready
 * PRT - Resource Fetch Time
 * FET - Front End Time (only appears in snapshots for browsers that ????)
 *
 * RAT - Response Available Time -> time for request to be sent to server and first byte back from server
 * DDT - HTML Download Time
 * DPT - DOM Building Time
 *
 * @param beacon default beacon
 * @param HTMLDownloadTime time recorded to download page by script
 * @param sessionData {} session object
 */
var updateMetrics = function(beacon, HTMLDownloadTime, sessionData) {

    var type = sessionData.browser.support;

    beacon.events[0].cookieMetrics.FBT = HTMLDownloadTime;
    beacon.events[0].cookieMetrics.DRT = _.random(100, 250);
    beacon.events[0].cookieMetrics.PRT = _.random(5, 500);

    beacon.events[0].cookieMetrics.DOM = beacon.events[0].cookieMetrics.FBT + beacon.events[0].cookieMetrics.DRT;
    beacon.events[0].cookieMetrics.PLT = beacon.events[0].cookieMetrics.DOM + beacon.events[0].cookieMetrics.PRT;
    beacon.events[0].cookieMetrics.FET = beacon.events[0].cookieMetrics.DRT + beacon.events[0].cookieMetrics.PRT;

    if (type === 'nav' || type === 'resource') {

        beacon.events[0].metrics.FBT = HTMLDownloadTime;
        beacon.events[0].metrics.DRT = beacon.events[0].cookieMetrics.DRT;
        beacon.events[0].metrics.DDT = _.random(2, 10);
        beacon.events[0].metrics.PRT = beacon.events[0].cookieMetrics.PRT

        beacon.events[0].metrics.DPT = beacon.events[0].metrics.DRT - beacon.events[0].metrics.DDT;
        beacon.events[0].metrics.RAT = beacon.events[0].metrics.FBT - beacon.events[0].metrics.SCT;
        beacon.events[0].metrics.DOM = beacon.events[0].metrics.FBT + beacon.events[0].metrics.DRT;
        beacon.events[0].metrics.PLT = beacon.events[0].metrics.DOM + beacon.events[0].metrics.PRT;
        beacon.events[0].metrics.FET = beacon.events[0].metrics.DRT + beacon.events[0].metrics.PRT;
    }

    if (type === 'resource') {
        beacon.events[0].resourceTimingInfo.r.forEach(function(resource, i) {

            if (i === 0) {
                resource.u = beacon.events[0].eventUrl;
                resource.m[10] = beacon.events[0].metrics.RAT + beacon.events[0].metrics.DDT
            } else {
                resource.o += HTMLDownloadTime;
            }
        });
    }
}

var useCaseCheck = function(beacon, currentPage, sessionData) {
    if (sessionData.geo.country === 'United Kingdom') {
        cdnProblem(beacon, sessionData);
    }
}

var cdnProblem = function(beacon, sessionData) {

    var type = sessionData.browser.support;
    var latency = _.random(1500, 8000);
    var cdnHostnameIndex = null;

    beacon.urlParts.forEach(function(value, index) {
        if (value === cdnHostname) {
            cdnHostnameIndex = index;
        }
    });

    beacon.events[0].cookieMetrics.PRT += latency;
    beacon.events[0].cookieMetrics.PLT += latency;
    beacon.events[0].cookieMetrics.FET += latency;

    if (type === 'nav' || type === 'resource') {
        beacon.events[0].metrics.PRT += latency;
        beacon.events[0].metrics.PLT += latency;
        beacon.events[0].metrics.FET += latency;
    }

    if (type === 'resource') {

        var match = '0:\/\/' + cdnHostnameIndex;
        beacon.events[0].resourceTimingInfo.r.forEach(function(resource, i) {
            if (resource.u.indexOf(match) === 0) {
                resource.m[10] += latency;
            }
        });
    }
}

/**
 * Parse the path out of the url and update the beacon
 *
 * This function assumes there will be at a minumium / at the end of the hostname.
 * Otherwise, [1] will throw error, and I am too lazy to check for this...
 *
 * @todo check for array returned from regex, if not, exit function
 * @param beacon {{}}
 * @param currentPage {{}}
 */
var updateUrlParts = function(beacon, currentPage) {
    var pathParts = /^.*?:\/\/.*?(\/.*)$/.exec(currentPage.url)[1].split('/').forEach(function(part) {
        if (part) {
            beacon.events[0].eventUrl += '/' + (beacon.urlParts.push(part) - 1);
        }
    });
}
/**
 * Parse AppD headers out
 *
 * Sample header (note some keys are not required):
 * {
 *  R: '0',
 *  clientRequestGUID: '4baf5806-92dc-418d-86fe-f430329b55ef341',
 *  btId: '1600',
 *  backendSnapshotType: 'f',
 *  hasEntryPointErrors: 'e'
 * }
 *
 * @param headers {[]}
 * @returns {{}}
 */
var parseHeaders = function(headers) {

    var line =  _(headers['set-cookie']).filter(function(value, key) {
        return value.indexOf('ADRUM_BT') > -1;
    }).map(function(value, key) {
        return querystring.unescape(value).split(';')[0].split('=')[1].split('|');
    }).value()[0];

    return _(line).map(function(value, key) {
        return value.split(':');
    }).object().value();
}

var addErrorEvent = function(beacon, currentPage, sessionData) {
    if (currentPage.hasError && errorAgent.indexOf(sessionData.browser.agent) > -1) {
        beacon.events.push(B.getErrorEvent());
        if (errorAgent.indexOf(sessionData.browser.agent) === 0 && Date.now() > (errorSessionTimestamp + (60000 * 30))) {
            errorSessionTimestamp = Date.now();
            sessionData.userId = 'bolton@aol.com';
            sessionData.geo = {country : 'United States', region : 'Washington', city : 'Seattle', localIP : '7a3717be' };
        }
    }
};

var addUserData = function(beacon, currentPage, sessionData) {
    beacon.events[0].userData = {username : sessionData.userId}
};

var getUserId = function()
{
    var firstName = ['rob','kim','tom','candice','pedro','aliyah','maria'];
    var lastName = ['welkar','rabuat','fedotyev','pachenco','smith'];
    var email = ['gmail.com','yahoo.com','msn.com','live.com','hotmail.com'];

    return firstName[_.random(0,(firstName.length -1))] + '.' + lastName[_.random(0,(lastName.length -1))] + '@' + email[_.random(0,(email.length -1))];
};

var addServerInfo = function(beacon, serverInfo) {
    if (serverInfo.clientRequestGUID) {
        beacon.guids.push(serverInfo.clientRequestGUID);
    }
    if (serverInfo.btId) {
        beacon.events[0].serverMetadata.btTime[0].id = serverInfo.btId;
    }
    if (serverInfo.btERT) {
        beacon.events[0].serverMetadata.btTime[0].ert = serverInfo.btERT;
    }
}

var updateTimestampAndSequence = function(beacon, sequenceId) {

    beacon.events.forEach(function(event) {
        event.timestamp = Date.now();
        event.sequenceId = sequenceId;
    });

    if (beacon.events[0].resourceTimingInfo) {
        beacon.events[0].resourceTimingInfo.t = Date.now();
    }
}

var setGeo = function(beacon, geo) {
    beacon.geo = geo;
}
/**
 * Array of pages in a session
 *
 * Drop is percent that abandon at that page
 *
 * @returns {[]}
 */
getPages = function() {
    return urls.slice();
}

/**
 *  Get a user agent
 *
 *  support is either none|nav|resource
 *  none = no support for navigation timing nor resource timing
 *  nav = support for navigation timing only
 *  resource = support for resource and navigation timing
 *
 * @returns {{support, agent}}
 */
getBrowser = function() {
    var userAgents = [
        {support : 'none', agent : 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'},
        {support : 'resource', agent : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/36.0.1985.125 Chrome/36.0.1985.125 Safari/537.36'},
        {support : 'resource', agent : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'},
        {support : 'resource', agent : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0'},
        {support : 'resource', agent : 'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0'},
        {support : 'resource', agent : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'},
        {support : 'resource', agent : 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36'},
        {support : 'resource', agent : 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.3319.102 Safari/537.36'},
        {support : 'resource', agent : 'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'},
        {support : 'resource', agent : 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)'},
        {support : 'nav', agent : 'Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))'},
        {support : 'none', agent : 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; InfoPath.1; SV1; .NET CLR 3.8.36217; WOW64; en-US)'},
        {support : 'none', agent : 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)'},
        {support : 'none', agent : 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25'},
    ];

    return userAgents[_.random(0, (userAgents.length - 1))];
}

session();
