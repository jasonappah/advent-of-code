const input = await Deno.readTextFile("01.txt");
const lines = input.split("\n");

const part1 = (() => {
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
})();

const part2 = (() => {
  const numbers: number[] = [0];
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
  for (const lineIndex in lines) {
    const line = lines[lineIndex]
    const digits: number[] = [0, 0];

    const result = line.match(
      /\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g
    );

    for (const match of (result || [])) {
      let n: number | null = null;
      if (SPELLED_OUT_NUMBERS.includes(match)) {
        n =
        SPELLED_OUT_NUMBERS_TO_NUMERALS[
          match as keyof typeof SPELLED_OUT_NUMBERS_TO_NUMERALS
        ];
      } else {
        n = Number.parseInt(match);
      }
      
      digits.push(n);
    }

    
    // IDK why but the RegExpMatchArray always has 2 extra zero's at the beginning, so here we're getting rid of those and asserting we deleted what we expected
    const [deleted1, deleted2] = digits.splice(0, 2)
    if (deleted2 !== 0 || deleted1 !== 0) {
      throw new Error(`Expected deleted entries to both be zeros, ${{deleted1, deleted2}}`)
    }

    
    if (digits.length > 2) {
      digits.splice(1, digits.length - 2);
    } else if (digits.length == 1) {
      digits.push(digits[0]);
    }
    
    if (digits.length != 2) {
      throw new Error(`Should have 2 elements in digits!`);
    }

    const [digit1, digit2] = digits;
    numbers.push(digit1 * 10 + digit2);
  }

  const out = numbers.reduce((acc, cur) => cur + acc, 0);

  return out;
})();

console.log({ part1, part2 });
