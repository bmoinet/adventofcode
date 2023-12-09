<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);
$size = sizeof($file);

$maps = [];

foreach ($file as $line) {

    if (preg_match_all('/^(seeds:)((\s+\d+)+)/', $line, $matches)) {
        $seeds = explode(' ', trim($matches[2][0]));
        continue;
    }

    if (preg_match_all('/^(\w*-\w*-\w*)/', $line, $matches)) {
        $key = $matches[0][0];
        $maps[$key] = [];
        continue;
    }

    if (preg_match_all('/(?!seeds)(\d)+/', $line, $matches)) {
        $nums = $matches[0];
        $item = ['src' => $nums[1], 'dst' => $nums[0], 'len' => $nums[2]];
        $maps[$key][] = $item;
    }
}

$paths = [];

foreach ($seeds as $seed) {
    $paths[$seed] = $seed;

    foreach ($maps as $key => $map) {

        foreach ($map as $line) {
            if ($line['src'] <= $paths[$seed] && $paths[$seed] <= $line['src'] + $line['len'] - 1) {
                $delta = $line['dst'] - $line['src'];
                $paths[$seed] += $delta;
                break;
            }
        }
    }
}

echo min($paths);