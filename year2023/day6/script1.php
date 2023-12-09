<?php

$file = file_get_contents('./input.txt');
$lines = explode("\n", $file);

preg_match_all('/^Time:((\s+\d+)+)$/', $lines[0], $matches);
$times = array_values(array_filter(explode(" ", $matches[1][0])));

preg_match_all('/^Distance:((\s+\d+)+)$/', $lines[1], $matches);
$dists = array_values(array_filter(explode(" ", $matches[1][0])));

$num = 0;
$dones = [];

foreach ($times as $time) {
    for ($step = 1; $step <= $time; $step++) {
        $dones[$num][] = $step * ($time - $step);
    }

    $max = (int)$dists[$num];
    $ways[$num] = array_filter($dones[$num], function ($val) use ($max) {
        return $val > $max;
    });

    $ways[$num] = sizeof($ways[$num]);
    $num++;
}

echo array_product($ways);
