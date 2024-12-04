import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

const copyCommand = new Deno.Command('pbcopy', {
    stdin: 'piped'
});

const copy = async (text: string) => {
    const child = copyCommand.spawn()

    const writer = child.stdin.getWriter()
    await writer.write(new TextEncoder().encode(text))
    await writer.close()
    
    await child.output()

}

// inspired by https://github.com/democat3457/AdventOfCode/blob/c3e4738/lib/__init__.py#L72
export const final = async <T extends Record<string | number | symbol, unknown>>(args: {output: T, answerKey: keyof T, expectedAnswer?: T[keyof T]}) => {
    const answer = args.output[args.answerKey]
    if (args.expectedAnswer) {
        assertEquals(answer, args.expectedAnswer)
    }

    await copy(`${answer}`)
    console.log(`Copied '${answer}' to the clipboard!`)

    const output = args.output
    delete output[args.answerKey]
    console.log(output)
}
