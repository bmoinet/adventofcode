<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);
$size = sizeof($file);

foreach ($file as $line) {
    preg_match_all('/Card (\d+): (\d +) |( +\d+)+/', $line, $line_matches);

    list($num, $wins, $cards) = $line_matches[0];

    $num = trim($num);

    preg_match_all('/(\d)+/', $wins, $wins_matches);
    $wins = $wins_matches[0];

    preg_match_all('/(\d)+/', $cards, $cards_matches);
    $cards = $cards_matches[0];

    $inter = array_values(array_intersect($wins, $cards));
    //var_dump($num, $wins, $cards, $inter);

    $infos[$num] = [$wins, $cards, $inter];
}
//var_dump($infos); die;

$num = 0;
//$new_infos = [];

$nums = $stack = range(1, $size);
//var_dump($nums); die;

do {
    $num = array_shift($stack);

    $new_num = $size + $num;
    $new_wins = $infos[$num][0];
    $old_inter = $infos[$num][2];

    $new_cards = $num + 1 <= $num + count($old_inter)
        ? range($num + 1, $num + count($old_inter))
        : [];

    //$new_infos[$new_num] = [$new_wins, $new_cards, $old_inter];
    //echo "NUM $num :";
    //var_dump($infos[$new_num]);

    //echo "AVANT : "; var_dump($nums);
    $stack = array_merge($stack, $new_cards);
    $nums = array_merge($nums, $new_cards);
    //echo "APRES : "; var_dump($nums);
    echo "SIZE : ".sizeof($stack)."\n"; //die;

} while(!empty($stack));

//echo "OLD"; var_dump($infos);
//echo "NEW"; var_dump($new_infos);

echo sizeof($nums); // se termine avec example.txt, mais pas avec input.txt :-(