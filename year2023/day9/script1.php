<?php

$file = file_get_contents('./example.txt');
$lines = explode("\n", $file);

$dataset = [];
foreach ($lines as $line) {
    $dataset[] = explode(' ', $line);
}

$sequence = [];
//foreach ($dataset as $data) {

    $data = $dataset[0];

$loop = 0;

    $sequence = [];
    $sequence[] = [];
    echo "new sequence : ".print_r($data, true)."\n";
    $value = array_shift($data);
    do {
        var_dump($sequence);
        echo "do size = ".sizeof($data)."\n";

        $value_next = array_shift($data);

        if ($value_next === null) {
            $data = $sequence;
            echo "smaller sequence : ".print_r($data, true)."\n";

            $value = array_shift($data);
            $sequence[] = [];
            //die;
            continue;
        }

        $diff = $value_next - $value;
        $sequence[] = $diff;
        $value = $value_next;

        echo "seq : ".print_r($sequence, true)."\n";

        $loop++;
    } while ($loop < 10);

    var_dump($sequence);
    //die;

//}