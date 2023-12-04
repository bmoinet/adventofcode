<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);
$size = sizeof($file);

$sum = 0;

foreach ($file as $line) {
    preg_match_all('/Card (\d+): (\d +) |( +\d+)+/', $line, $line_matches);

    list($num, $wins, $cards) = $line_matches[0];

    $num = trim($num);

    preg_match_all('/(\d)+/', $wins, $wins_matches);
    $wins = $wins_matches[0];

    preg_match_all('/(\d)+/', $cards, $cards_matches);
    $cards = $cards_matches[0];

    $inter = array_values(array_intersect($wins, $cards));

    $size = sizeof($inter);

    $add = 0;
    if ($size >= 1) {
        $add = 1 * pow(2, ($size - 1));
    }

    $sum += $add;

}

echo $sum; // 18653