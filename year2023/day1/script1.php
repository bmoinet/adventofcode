<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);

$sum = 0;

function search_first_num($cars)
{
    foreach ($cars as $car) {
        if (is_numeric($car)) {
            return $car;
        }
    }
}

$sum = 0;

foreach ($file as $line) {
    $cars = str_split($line);

    $str1 = search_first_num($cars);
    $str2 = search_first_num(array_reverse($cars));

    $val = (int)($str1 . $str2);
    $sum += $val;
}

echo $sum; // 54667