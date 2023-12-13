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

$pnts = array_keys(array_filter($map, function ($key) {
    return strpos($key, 'A', -1) > 0;
}, ARRAY_FILTER_USE_KEY));
$max = sizeof($pnts);

function check($pnts)
{
    return array_reduce($pnts, function ($bool, $p) {
        if (!isset($bool)) $bool = true;
        $check = (strpos($p, 'Z', -1) > 0);
        return $bool && $check;
    });
}

$stop = false;

do {
    if (empty($instr)) $instr = $ref;

    $char = array_shift($instr);
    //echo "\n=== char $char ===\n";
    $dir = ($char == 'L' ? 0 : 1);

    for ($num = 0; $num < $max; $num++) {
        //echo "\nnum $num !\n";

        //echo "from " . $pnts[$num] . ", dir $char ...\n";
        $pnts[$num] = $map[$pnts[$num]][$dir];
        //echo "step $steps, point " . $pnts[$num] . "\n";

        $chk = check($pnts);
        //echo "check: " . ($chk ? 'true' : 'false') . "\n";

        if ($chk) {
            $stop = true;
            break;
        }

        $steps++;
        if ($steps % 10000 === 0) echo ".";
    }
    if ($stop) break;
} while (true);

echo $steps;