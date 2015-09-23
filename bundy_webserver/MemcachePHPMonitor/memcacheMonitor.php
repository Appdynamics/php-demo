<?php

//https://github.com/facebook/memcached/blob/master/doc/protocol.txt

if (class_exists('Memcached')) {
    $memcache = new \Memcached('monitoringConn');
} else {
    throw new \Exception('Memcache/Memcached class does not exist');
}

if (!include('memcacheConfig.php')) {
    throw new \Exception('Memcache config must be provided via memcacheConfig.php');
}

foreach ($servers as $server) {
    if (!array_key_exists('host', $server) || !array_key_exists('port', $server)) {
        throw new \Exception('Server host or port missing');
    }
    if (!count($memcache->getServerList())) {
        $memcache->addServer($server['host'], $server['port']);
    }
}

$statistics = ($memcache instanceof \Memcache) ? $memcache->getExtendedStats() : $memcache->getStats();

foreach ($statistics as $server => $stats) {
    $server = str_replace(':', '-', $server);
    $trackedValues = array();
    $trackedValues['Current Connections'] = $stats['curr_connections'];
    $trackedValues['Connection Structures'] = $stats['connection_structures'];
    $trackedValues['Get Hit Ratio %'] = ($stats['get_hits'] == FALSE && $stats['get_misses'] == FALSE) ? 0 : round((($stats['get_hits'] / ($stats['get_hits'] + $stats['get_misses'])) * 100));
    $trackedValues['Threads'] = $stats['threads'];
    $trackedValues['Evictions'] = $stats['evictions'];
    $trackedValues['Current Items'] = $stats['curr_items'];
    $trackedValues['Bytes'] = $stats['bytes'];

    foreach ($trackedValues as $key => $value) {
        echo "name=Custom Metrics|Memcache|$server|$key, value=$value\n";
    }
}
?>