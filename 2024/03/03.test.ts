import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { part1, part2 } from "./03.ts";

Deno.test("Part 1 Example Correct", async () => {
    const EXAMPLE_INPUT = await Deno.readTextFile("2024/03/examples/03-p1-example.txt");
    const EXPECTED_OUTPUT = 161;

    const output = part1(EXAMPLE_INPUT)
    console.log(output)
    assertEquals(output.sum, EXPECTED_OUTPUT);
});


Deno.test("Part 1 Real Data", async () => {
    const REAL_INPUT = await Deno.readTextFile("2024/03/inputs/03.txt");
    const output = part1(REAL_INPUT)
    console.log(output)

    const CORRECT_OUTPUT = 178794710
    assertEquals(output.sum, CORRECT_OUTPUT);
})

Deno.test("Part 2 Example Correct", async () => {
    const EXAMPLE_INPUT = await Deno.readTextFile("2024/03/examples/03-p2-example.txt");
    const EXPECTED_OUTPUT = 48;

    const output = part2(EXAMPLE_INPUT)
    console.log(output)
    assertEquals(output.sum, EXPECTED_OUTPUT);
});


Deno.test("Part 2 Real Data", async () => {
    const REAL_INPUT = await Deno.readTextFile("2024/03/inputs/03.txt");
    const output = part2(REAL_INPUT)
    console.log(output)
})
