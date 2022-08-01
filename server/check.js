const largestSum = (numbers) => {

    //break point
    if (numbers.length == 0) {
        return 0
    }

    listA = remove2elem(numbers)//remove the first two elements
    listB = remove1elem(numbers)//remove the first element

    sum1 = numbers[0] + largestSum(listA)
    sum2 = largestSum(listB)

    var largeSum = sum1 > sum2 ? sum1 : sum2
    return largeSum
}

//remove the first element
const remove1elem = (numbers) => {
    list = []
    for (let i = 1; i < numbers.length; i++) {
        list.push(numbers[i])
    }
    return list
}

//remove the first two elements
const remove2elem = (numbers) => {
    list = []
    for (let i = 2; i < numbers.length; i++) {
        list.push(numbers[i])
    }
    return list
}

//sum = largestSum([2, 4, 6, 2, 5])
//sum = largestSum([5, 1, 1, 5])
//console.log(sum)


bg = '000000'
newBg = 'ffffff'

var colorMap = new Map();
colorMap.set(bg, newBg);

if (!colorMap.has(bg)) {

    console.log('this color not exist in the map')
}
else {
    //use this color
    console.log(colorMap.get(bg))
}



//console.log(colorMap)
//console.log(colorMap.has('000000'))


