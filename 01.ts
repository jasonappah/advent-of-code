const input = await Deno.readTextFile("01.txt");
const lines = input.split("\n");

const part1 = (() => {
  const numbers: number[] = [0];

  for (const line of lines) {
    let digits = Array.from(line)
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
})();

const part2 = (() => {
  const numbers: number[] = [0];
  const SPELLED_OUT_NUMBERS = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const STRING_NUMERALS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const OPTIONS = [...SPELLED_OUT_NUMBERS, ...STRING_NUMERALS];

  for (const line of lines) {
    let temp = "";

    const possible = (append = "") =>
      OPTIONS.some((o) => o.startsWith(temp + append));

    const digits: number[] = [];

    for (const char of line + " ") {
      let index = STRING_NUMERALS.findIndex((value) => value == temp);
      if (index == -1)
        index = SPELLED_OUT_NUMBERS.findIndex((value) => value == temp);
      
      if (index > -1) {
        digits.push(parseInt(STRING_NUMERALS[index]));
        temp = char;
        if (!possible) temp = ""
      } else if (possible(char)) {
        temp += char;
      } else {
        temp = char
        if (!possible) temp = ""
      }
      
    }

    console.log(JSON.stringify({ line, digits, temp }));

    if (digits.length > 2) {
      digits.splice(1, digits.length - 2);
    } else if (digits.length == 1) {
      digits.push(digits[0]);
    }

    if (digits.length != 2) {
      throw new Error(
        `Should have 2 elements in digits, ${line} | ${digits} | ${temp}`
      );
    }

    const [digit1, digit2] = digits;
    numbers.push(digit1 * 10 + digit2);
  }

  const out = numbers.reduce((acc, cur) => cur + acc, 0);

  return out;
})();

console.log({ part1, part2 });
