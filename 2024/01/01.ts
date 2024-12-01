const REAL_INPUT = await Deno.readTextFile("2024/01/inputs/01.txt");
const REAL_LINES = REAL_INPUT.split("\n");

const getSortedLocations = (lines: string[]) => {
    const [l, r] = lines.reduce((acc, curr) => {
        const [leftList, rightList] = acc
        const [left, right] = curr.split("   ").map(Number)

        return [
            [...leftList, left],
            [...rightList, right]
        ]
    }, [[], []] as [number[], number[]])

    l.sort()
    r.sort()
    return {l, r}
}


const part1 = (lines: string[]) => {
    const {l, r} = getSortedLocations(lines)

    const distances = l.map((leftValue, index) => {
        const rightValue = r[index]
        const distance = Math.abs(leftValue - rightValue)
        return distance
    })

    const sumOfDistances = distances.reduce((acc, curr) => curr + acc, 0)

    return sumOfDistances
}

function countInstancesInList<T>(item: T, list: T[]) {
    const filteredList = list.filter((value) => value === item)
    return filteredList.length
}

const part2 = (lines: string[]) => {
    const { l, r } = getSortedLocations(lines)
    
    const uniqueNumbersInLeftList = new Set(l)

    const similarityScore = Array.from(uniqueNumbersInLeftList).reduce((acc, curr) => {
        const instancesInRightList = countInstancesInList(curr, r)
        const incScore = instancesInRightList * curr
        return acc + incScore
    }, 0) 

    return similarityScore
}


console.log({ p1: part1(REAL_LINES), p2: part2(REAL_LINES) });