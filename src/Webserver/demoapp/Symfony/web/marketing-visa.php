<?php

$baseDelay = 40000; //40ms
$random = (rand(1,1000) * 100);
$timeOfDayDelay = 0;

$dayOfWeek = date('N');
$hour = date('G');

//increase delay for weekdays, during business hours....
if ($dayOfWeek != 6 && $dayOfWeek != 7) {
    if ($hour > 6 && $hour < 9) {
        $timeOfDayDelay = 60000;
    } else if ($hour > 9 && $hour < 16) {
        $timeOfDayDelay = 90000;
    } else if ($hour > 16 && $hour < 19) {
        $timeOfDayDelay = 40000;
    }
}

$delay = $baseDelay + $random + $timeOfDayDelay;

usleep($delay);
echo "Delay : $delay";
?>