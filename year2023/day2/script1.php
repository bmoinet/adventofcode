<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);

$sum = 0;

foreach ($file as $line) {

    preg_match_all('/Game (\d+):/', $line, $matches);
    list($items, $number) = $matches;
    $number = (int)$number[0];
    //var_dump('number', $number);

    preg_match_all('/(\d+) (red|blue|green)/', $line, $matches);
    list($items, $values, $colors) = $matches;
    //var_dump($number, $values, $colors); die;

    $status = ['red' => true, 'green' => true, 'blue' => true];

    $maxis = ['red' => 12, 'green' => 13, 'blue' => 14];

    $n = -1;
    foreach ($colors as $color) {
        $value = $values[++$n];
        $status[$color] = $status[$color] && ($value <= $maxis[$color]);
    }

    //var_dump('status', $status);
    //if ($number === 4) die;

    $ok = ($status['red'] && $status['green'] && $status['blue']);

    if ($ok) {
        //echo "$number !\n";
        $sum += $ok ? $number : 0;
    }
}

echo $sum; // 2810