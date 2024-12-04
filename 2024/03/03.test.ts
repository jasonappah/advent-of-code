import { part1, part2 } from "./03.ts";
import { final } from "../../lib.ts";

Deno.test("Part 1 Example Correct", async () => {
    const EXAMPLE_INPUT = await Deno.readTextFile("2024/03/examples/03-p1-example.txt");
    await final({
        output: part1(EXAMPLE_INPUT),
        answerKey: 'sum',
        expectedAnswer: 161
    })
});

Deno.test("Part 1 Real Data", async () => {
    const REAL_INPUT = await Deno.readTextFile("2024/03/inputs/03.txt");
    await final({
        output: part1(REAL_INPUT),
        answerKey: 'sum',
        expectedAnswer: 178794710
    })
})

Deno.test("Part 2 Example Correct", async () => {
    const EXAMPLE_INPUT = await Deno.readTextFile("2024/03/examples/03-p2-example.txt");
    await final({
        output: part2(EXAMPLE_INPUT),
        answerKey: 'sum',
        expectedAnswer: 48
    })
});


Deno.test("Part 2 Real Data", async () => {
    const REAL_INPUT = await Deno.readTextFile("2024/03/inputs/03.txt");
    await final({
        output: part2(REAL_INPUT),
        answerKey: 'sum',
    })
})
