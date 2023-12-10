<?php

$file = file_get_contents('./input.txt');
$lines = explode("\n", $file);

foreach ($lines as $line) {
    list($card, $bid) = explode(' ', $line);
    $hand = array_count_values(str_split($card));

    $type = type($hand);
    $hands[] = [$hand, $bid, $type];
    $types[$type][] = [$card, $hand, $bid];
}

function type($hand)
{
    switch (true) {
        case array_search(5, $hand):
            return 6; // five
        case array_search(4, $hand):
            return 5; // four
        case array_search(3, $hand) && array_search(2, $hand):
            return 4; // full
        case array_search(3, $hand):
            return 3; // three
        case array_search(2, $hand) && sizeof($hand) === 3:
            return 2; // pairs
        case array_search(2, $hand) && sizeof($hand) === 4:
            return 1; // pair
        default:
            return 0; // high
    }
}

function val($char)
{
    switch ($char) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 11;
        case 'T':
            return 10;
        default:
            return $char;
    }
}

function comp($card1, $card2)
{
    $card1 = $card1[0];
    $card2 = $card2[0];

    $n = 0;
    do {
        $c1 = val($card1[$n]);
        $c2 = val($card2[$n]);

        if ($c1 === $c2) {
            $n++;
        } else {
            break;
        }
    } while ($n < strlen($card1));
    return $c2 <=> $c1;
}

krsort($types);

$ranks = [];
foreach ($types as $key => $type) {
    usort($type, 'comp');
    $ranks[] = $type;
}

$points = sizeof($lines);

$total = 0;

foreach ($ranks as $rank) {
    foreach ($rank as $card) {
        $total += $card[2] * $points;
        $points--;
    }
}

echo $total;