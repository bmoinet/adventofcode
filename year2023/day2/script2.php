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
    //var_dump($number, $values, $colors); //die;

    $maxis = ['red' => 0, 'green' => 0, 'blue' => 0];

    $n = -1;
    foreach ($colors as $color) {
        $value = $values[++$n];
        $maxis[$color] = ($value > $maxis[$color]) ? $value : $maxis[$color];
    }

    //var_dump('$maxis', $maxis);
    //if ($number === 1) die;

    $power = ($maxis['red'] * $maxis['green'] * $maxis['blue']);
    //var_dump('$power', $power);

    $sum += $power;
}

echo $sum; // 69110