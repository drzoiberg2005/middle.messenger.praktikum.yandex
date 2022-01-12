const getResult = (nums, targets) => {
    let integer = 0
    const spent = []
    let s = []
    const func = () => {
        targets.forEach(targetValue => {
            nums.forEach(numValue => {
                const zero = targetValue - numValue
                if (nums.indexOf(zero) !== -1 &&
                    spent.filter(i => i.constructor.name == "Array").filter(i => JSON.stringify(Array.from(new Set(i)).sort()) == JSON.stringify(Array.from(new Set([zero, numValue])).sort())).length === 0
                ) {
                    spent.push([numValue, zero])
                    nums.push(targetValue)
                        ++integer
                    s.push(`|${numValue}---${zero}|`)
                    func()
                }
            })
        })
    }
    func()
    console.log('1: ', integer)
    return integer
}

const getRes = (nums, targets) => {
    let integer = 0
    let length = 0
    length = nums.length

    const find = (target) => {
        const obj = {}
        for (let i = 0; i < nums.length; i++) {
            obj[nums[i]] = i
        }

        for (let i = 0; i < nums.length; i++) {
            const diff = target - nums[i]
            if (obj[diff] && obj[diff] !== i) {
                ++integer
                return target
            }
        }
        return
    }

    const func = () => {
        targets.forEach(target => {
            if (find(target) && nums.indexOf(find(target)) !== -1) {
                nums.push(find(target))
            }
        })
        if (length < nums.length) {
            length = nums.length
            integer = 0
            console.log('RESTART')
            func()
        }
    }

    func()

    console.log('2: ', integer)
    return integer
}


const nums = [4, 10, 14, -1, 1, 0, 24, 35, -5, -10, 16, -40]
const targets = [14, 0, 20, 30]

const nums2 = [1, 5, 7, 3]
const targets2 = [12, 13]

getRes(nums, targets)

getResult(nums, targets)