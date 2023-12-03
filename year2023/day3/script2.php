<?php

$file = file_get_contents('./input.txt');
$file = explode("\n", $file);
$size = sizeof($file);

$sum = 0;

$lines = [];
foreach ($file as $line) {
    $lines[] = str_split($line);
}

$elts = [];
$num_line = 0;
foreach ($file as $line) {
    preg_match_all('/(\d+)/', $line, $matches, PREG_OFFSET_CAPTURE);

    foreach ($matches[0] as $match) {
        $char_start = $match[1];
        $char_stop = $char_start + strlen($match[0]);

        $prev_line = $num_line - 1 >= 0 ? $lines[$num_line - 1] : [];
        $curr_line = $lines[$num_line];
        $next_line = $num_line + 1 < $size ? $lines[$num_line + 1] : [];

        $key = find_around([$prev_line, $curr_line, $next_line], $char_start, $char_stop, $num_line);

        if ($key !== ':') {
            $elts[$key][] = (int)$match[0];
        }
    }

    $num_line++;
}

function find_around($chars_check, $char_start, $char_stop, $num_line)
{
    for ($j = 0; $j <= 2; $j++) {
        if (empty($chars_check[$j])) continue;

        for ($i = $char_start - 1; $i < $char_stop + 1; $i++) {
            if (empty($chars_check[$j][$i])) {
                continue;
            }
            if (is_numeric($chars_check[$j][$i])) {
                continue;
            }
            if ('.' === $chars_check[$j][$i]) {
                continue;
            } else {
                $jj = $num_line - 1 + $j;
                return $jj . ':' . $i;
            }
        }
    }
    return ':';
}

$oks = array_filter($elts, function ($val) {
    return sizeof($val) === 2;
});

$oks2 = [];
foreach ($oks as $ok) {
    $oks2[] = $ok[0] * $ok[1];
}

$sum = array_sum($oks2);
echo $sum;