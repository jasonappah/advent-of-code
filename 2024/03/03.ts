export type Instruction = {
    type: 'mul',
    str: string 
    args: [number, number],
} | {
    type: 'do'
    str: string 
} | {
    type: 'don\'t'
    str: string 
}

export const getInstructionsFromMemory = (line: string) => {
    const instructions: Instruction[] = []
    const matches = line.matchAll(/(mul|do|don't)\((?:(\d+)\,(\d+))?\)/g)
    for (const match of matches) {
        const [fullInstruction, ...segments] = match
        const [command, ...args] = segments
        if (command === 'mul') {
            instructions.push({
                type: 'mul',
                args: [Number(args[0]), Number(args[1])],
                str: fullInstruction
            })
        } else if (command === 'don\'t') {
            instructions.push({
                type: 'don\'t',
                str: fullInstruction
            })
        } else if (command === 'do') {
            instructions.push({
                type: 'do',
                str: fullInstruction
            })
        }
    }
    return instructions
}

export const part1 = (line: string) => {
    const instructions = getInstructionsFromMemory(line)
    let sum = 0
    for (const instruction of instructions) {
        switch (instruction.type) {
            case 'mul': {
                const [a, b] = instruction.args
                sum += a * b
                break
            }
        }
    }
    return {sum, instructions}
}

export const part2 = (line: string) => {
    const instructions = getInstructionsFromMemory(line)
    let sum = 0
    let enableMulInstructions = true
    for (const instruction of instructions) {
        switch (instruction.type) {
            case 'mul': {
                if (!enableMulInstructions) continue
                const [a, b] = instruction.args
                sum += a * b
                break
            }
            case "do":
                enableMulInstructions = true
                break
            case "don't":
                enableMulInstructions = false
                break
        }
    }
    return {sum, instructions}

}

