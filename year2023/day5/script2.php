<?php

ini_set("memory_limit", "-1");

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

$seeds2 = [];

do {
    $seeds2[] = [(int)$seeds[0], ($seeds[0] + $seeds[1] - 1)];

    array_shift($seeds);
    array_shift($seeds);
} while (sizeof($seeds) > 0);

$paths = [];

foreach ($seeds2 as $seed2) {

    $seed = $seed2[0];
    echo "seed $seed\n";

    while ($seed < $seed2[1]) {
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

        $seed++;
    }
}

echo min($paths);