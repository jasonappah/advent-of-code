const REAL_INPUT = await Deno.readTextFile("01.txt");
const REAL_LINES = REAL_INPUT.split("\n");

const part1 = (lines: string[]) => {
  const numbers: number[] = [0];

  for (const line of lines) {
    const digits = Array.from(line)
      .map((char) => Number.parseInt(char))
      .filter((char) => !Number.isNaN(char));
    if (digits.length > 2) {
      digits.splice(1, digits.length - 2);
    } else if (digits.length == 1) {
      digits.push(digits[0]);
    }

    const [digit1, digit2] = digits;
    numbers.push(digit1 * 10 + digit2);
  }

  const out = numbers.reduce((acc, cur) => cur + acc, 0);

  return out;
};

const part2 = (lines: string[]) => {
  const numbers: number[] = [];
  const digitsCollection: number[][] = [] 
  const SPELLED_OUT_NUMBERS_TO_NUMERALS = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  } as const;

  const SPELLED_OUT_NUMBERS = Object.keys(SPELLED_OUT_NUMBERS_TO_NUMERALS);
  const digitMatchingRegex =
    /\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g;

  for (const lineIndex in lines) {
    const line = lines[lineIndex];
    const digits: number[] = [];

    const result = line.match(digitMatchingRegex);
    console.log({line, result})
    for (const match of result || []) {
      let n: number | null = null;
      if (SPELLED_OUT_NUMBERS.includes(match)) {
        n =
          SPELLED_OUT_NUMBERS_TO_NUMERALS[
            match as keyof typeof SPELLED_OUT_NUMBERS_TO_NUMERALS
          ];
      } else {
        n = Number.parseInt(match);
      }

      if (!Number.isInteger(n)) {
        throw new Error(
          `${n} is not an integer, ${JSON.stringify({ line, match })}`
        );
      }

      digits.push(n);
    }

    const digit1 = digits[0]
    let digit2: number | undefined

    if (digits.length >= 2) {
      digit2 = digits[digits.length - 1]
    } else if (digits.length == 1) {
      digit2 = digits[0]
    }
    if (!digit2) {
      throw new Error(`Should have 1 or 2 elements in digits!`);
    }

    digitsCollection.push(digits)

    numbers.push(digit1 * 10 + digit2);
  }

  const out = numbers.reduce((acc, cur) => cur + acc, 0);

  return {numbers, digitsCollection, out};
};

import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

Deno.test("Day 1 Part 1 Example Correct", async () => {
  const EXAMPLE_INPUT = await Deno.readTextFile("01-p1-example.txt");
  const EXAMPLE_LINES = EXAMPLE_INPUT.split("\n");
  const EXPECTED_OUTPUT = 142;
  assertEquals(part1(EXAMPLE_LINES), EXPECTED_OUTPUT);
});

Deno.test("Day 1 Part 2 Example Correct", async () => {
  const EXAMPLE_INPUT = await Deno.readTextFile("01-p2-example.txt");
  const EXAMPLE_LINES = EXAMPLE_INPUT.split("\n");

  const { numbers, out, digitsCollection } = part2(EXAMPLE_LINES)

  assertEquals(numbers.length, 7)
  assertEquals(digitsCollection.length, 7)

  assertEquals(digitsCollection[0], [2, 1, 9])
  assertEquals(digitsCollection[1], [8, 3])
  assertEquals(digitsCollection[2], [1, 2, 3])
  assertEquals(digitsCollection[3], [2, 3, 4])
  assertEquals(digitsCollection[4], [4, 9, 8, 7, 2])
  assertEquals(digitsCollection[5], [1, 2, 3, 4])
  assertEquals(digitsCollection[6], [7, 6])

  assertEquals(numbers, [29, 83, 13, 24, 42, 14, 76])
  assertEquals(out, 281);
});


console.log({ p1: part1(REAL_LINES), p2: part2(REAL_LINES).out });
