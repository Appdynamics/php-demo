<?php

function printStatus($cacheStatus) {
    foreach ($cacheStatus as $key => $value) {
        if (!is_array($value)) {
            echo "$key : $value <br />\n";
        } else {
            printStatus($value);
        }
    }
}

$cacheStatus = opcache_get_status(false);
printStatus($cacheStatus);
?>