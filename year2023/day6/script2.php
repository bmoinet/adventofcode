<?php

ini_set("memory_limit", "-1");

$file = file_get_contents('./input.txt');
$lines = explode("\n", $file);

preg_match_all('/^Time:((\s+\d+)+)$/', $lines[0], $matches);
$times = array_values(array_filter(explode(" ", $matches[1][0])));
$time = implode('', $times);

preg_match_all('/^Distance:((\s+\d+)+)$/', $lines[1], $matches);
$dists = array_values(array_filter(explode(" ", $matches[1][0])));
$dist = implode('', $dists);

$dones = [];

for ($step = 1; $step <= $time; $step++) {
    $dones[] = $step * ($time - $step);
}

$max = (int)$dist;
$ways = array_filter($dones, function ($val) use ($max) {
    return $val > $max;
});

$ways = sizeof($ways);

echo $ways;
