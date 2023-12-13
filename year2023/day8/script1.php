<?php

$file = file_get_contents('./input.txt');
$lines = explode("\n", $file);

$ref = str_split($lines[0]);

array_shift($lines);
array_shift($lines);

$map = [];
foreach ($lines as $line) {
    preg_match('/(\w{3}) = \((\w{3}), (\w{3})\)/', $line, $matches);
    $map[$matches[1]] = [$matches[2], $matches[3]];
}

$instr = $ref;
$steps = 0;

$pnt = 'AAA';

do {
    if (empty($instr)) $instr = $ref;

    $char = array_shift($instr);
    $dir = ($char == 'L' ? 0 : 1);
    //echo "from $pnt, dir $char ... ";

    $pnt = $map[$pnt][$dir];
    $steps++;
    //echo "step $steps, point $pnt\n";

    if ($pnt == 'ZZZ') break;
} while (true);

echo $steps;