# Advent of Code

Welcome to my [Advent of Code](https://adventofcode.com) repo.

- Year 2023 in PHP: https://github.com/bmoinet/adventofcode/year2022
- Year 2022 in JS: https://github.com/bmoinet/adventofcode/year2022
- Year 2021 in JS: https://github.com/bmoinet/adventofcode/year2022

## How to run

- Clone this repo

```bash
git clone https://github.com/bmoinet/adventofcode.git
cd adventofcode
```

### PHP projects

- Running with PHP

```bash
cd year2023/day01
php script1.php
```

- Running with Docker

```bash
winpty docker run --rm -it -v /$(pwd):/app -w //app \
  php:8-alpine sh -c "cd year2023/day1 ; php script1.php"
```

### JS projects

- Running with Node

```bash
cd year2021/day01
node script1.php
```

- Running with Docker

```bash
winpty docker run --rm -it -v /$(pwd):/app -w //app \
  node:20-alpine sh -c "cd year2022/day01 ; node script1.js"
```
