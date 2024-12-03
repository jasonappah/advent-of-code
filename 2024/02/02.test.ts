import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { part1, part2, verifyLevelDiffDirConsistency } from "./02.ts";

Deno.test("verifyLevelDiffDirConsistency handles skips correctly", () => {
    const sampleFailingReport = "8 6 4 4 1".split(" ").map(Number)
    const output = verifyLevelDiffDirConsistency(sampleFailingReport, "desc")
    assertEquals(output, {result: true, skippedLevelIndex: 3})
})

Deno.test("Part 1 Example Correct", async () => {
    const EXAMPLE_INPUT = await Deno.readTextFile("2024/02/examples/02-p1-example.txt");
    const EXAMPLE_LINES = EXAMPLE_INPUT.split("\n");
    const EXPECTED_OUTPUT = 2;
    const output = part1(EXAMPLE_LINES)
    console.log(output)
    assertEquals(output.count, EXPECTED_OUTPUT);
});

Deno.test("Part 2 Example Correct", async () => {
    const EXAMPLE_INPUT = await Deno.readTextFile("2024/02/examples/02-p1-example.txt");
    const EXAMPLE_LINES = EXAMPLE_INPUT.split("\n");
    const output = part2(EXAMPLE_LINES)
    const EXPECTED_OUTPUT = 4;
    assertEquals(output.safeReportCount, EXPECTED_OUTPUT);
});

Deno.test("Part 1 Real Data", async () => {
    const REAL_INPUT = await Deno.readTextFile("2024/02/inputs/02.txt");
    const REAL_LINES = REAL_INPUT.split("\n");
    const output = part1(REAL_LINES)

    const CORRECT_OUTPUT = 236
    assertEquals(output.count, CORRECT_OUTPUT);
})

// Deno.test("Part 2 Real Data", async () => {
//     const REAL_INPUT = await Deno.readTextFile("2024/02/inputs/02.txt");
//     const REAL_LINES = REAL_INPUT.split("\n");
//     const output = part2(REAL_LINES)
    
//     console.log(output.safeReportCount)
//     console.log(output.unsafeReports)
// })
