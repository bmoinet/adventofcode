<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);

$sum = 0;

function search_first_num($line, $left2right)
{
    if ($left2right) {
        preg_match('/one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/', $line, $matches);

        $numbers = [
            'one' => 1,
            'two' => 2,
            'three' => 3,
            'four' => 4,
            'five' => 5,
            'six' => 6,
            'seven' => 7,
            'eight' => 8,
            'nine' => 9,
            //
            '1' => 1,
            '2' => 2,
            '3' => 3,
            '4' => 4,
            '5' => 5,
            '6' => 6,
            '7' => 7,
            '8' => 8,
            '9' => 9,
        ];

    } else {
        preg_match('/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|1|2|3|4|5|6|7|8|9/', $line, $matches);

        $numbers = [
            'eno' => 1,
            'owt' => 2,
            'eerht' => 3,
            'ruof' => 4,
            'evif' => 5,
            'xis' => 6,
            'neves' => 7,
            'thgie' => 8,
            'enin' => 9,
            //
            '1' => 1,
            '2' => 2,
            '3' => 3,
            '4' => 4,
            '5' => 5,
            '6' => 6,
            '7' => 7,
            '8' => 8,
            '9' => 9,
        ];
    }

    return $numbers[$matches[0]];
}

$sum = 0;

foreach ($file as $line) {

    $str1 = search_first_num($line, true);
    $str2 = search_first_num(strrev($line), false);

    $val = (int)($str1 . $str2);
    $sum += $val;

}

echo $sum; // 354203