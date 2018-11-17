/*
  1. Napisati funkciju koja izbacuje duplikate iz niza koristeći `reduce`.

  2. Napisati funkciju koja izbacuje 'null', '0', '""', 'false', 'undefined' i 'NaN' iz niza.

  3. Napisati funkciju koja sortira niz objekata po zadatom ključu.

  4. Napisati funkciju koja vraća nasumično odabran član niza.

  5. Napisati funkciju koja pomera element niza na zadatu poziciju, a element na toj poziciji prebacuje na poziciju pomerenog elementa.

  6. Napisati funkciju koja generiše niz u zadatom rasponu. Probati rešiti sa i bez `for` petlje.

  7. Napisati funkciju koja pronalazi najveći broj u nizu.

  8. Napisati funkciju koja radi “partition” niza na parne i neparne brojeve.

  9. Napisati funkciju koja "meša" niz.

  10. Napisati funkciju koja vraća razliku između dva niza. ( Elemente koje drugi niz ne sadrži )
*/

// 1
function removeDuplicates (arr) {
    return arr.reduce((accumulator, current, index) => {
      if (arr.indexOf(current) === index) {
        accumulator.push(current)
      }

      return accumulator
    }, []);
  }

  const arrWithDuplicates = [1, 2, 3, 2, 3, 1, 5];
  const uniqueElements = removeDuplicates(arrWithDuplicates);

  console.log(uniqueElements) // [1, 2, 3, 5]

  // 2
  function removeFalsyValues (arr) {
    return arr.filter(value => value)
  }

  const arrWithFalsyValues = [1, 'Hello', '', 2, NaN, false, 0, null, 'String', 5, undefined]
  const truthyValues = removeFalsyValues(arrWithFalsyValues)

  console.log(truthyValues) // [1, 'Hello', 2, 'String', 5]

  // 3
  function sortByKey (arr, key) {
    return arr.sort((a, b) => a[key] - b[key]) // Value of the key should be a numeric
  }

  const arrOfObjects = [
    { id: 3, name: 'Jane' },
    { id: 12, name: 'John' },
    { id: 1, name: 'Cate' }
  ]

  const sortedArrOfObjects = sortByKey(arrOfObjects, 'id')

  console.log(sortedArrOfObjects)
  // [{id: 1, name: 'Cate'}, {id: 3, name: 'Jane'}, { id: 12, name: 'John'}]

  // 4
  function getRandomItem (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const someArr = [1, 3, 5, 4, 2]
  const randomItem = getRandomItem(someArr)

  console.log(randomItem) // Some random array element

  // 5
  // If we cannot perform the switch, we'll just return the unmodified array
  function switchArrElement (arr, element, index) {
    if (!arr.length || index < 0 || index >= arr.length) { // Perform some checks
      return arr
    }

    let elementIndex = arr.indexOf(element)

    if (elementIndex !== -1) {// If the element exists in the array
      let tmp = arr[index]
      arr[index] = element
      arr[elementIndex] = tmp
    }

    return arr
  }

  const arr = [1, 3, 5, 4]
  const switchedArr = switchArrElement(arr, 5, 0)

  console.log(switchedArr) // [5, 3, 1, 4]

  // 6
  // This functions expects from and to to be integers
  function generateArrWithFor (from, to) {
    const result = []
    for (let i = from; i <= to; i++) {
      result.push(i)
    }

    return result
  }

  // 6
  // This functions expects from and to to be integers
  function generateArrWithoutFor (from, to) {
    return Array(to - from + 1).fill(from).map((element, index) => element + index );
  }

  console.log(generateArrWithFor(1, 5)) // [1, 2, 3, 4, 5]
  console.log(generateArrWithoutFor(1, 5)) // [1, 2, 3, 4, 5]

  // 7
  function greatestElement (arr) {
    return arr.reduce((accumulator, current) => {
      return current > accumulator ? current : accumulator
    }, Number.MIN_SAFE_INTEGER) // We're using this instead of 0 in order to cover negative numbers
  }

  const arrOfNumbers = [2, 50, 100, 3, 1021, -5]
  console.log(greatestElement(arrOfNumbers)) // 1021

  const arrOfNegativeNumbers = [-1, -6, -4000, -2]
  console.log(greatestElement(arrOfNegativeNumbers)) // -1

  // 8
  function partition (arr) {
    return arr.reduce(([even, odd], current) => {
      if (current % 2 === 0) {
        return [[...even, current], [...odd]]
      }
      return [[...even], [...odd, current]]
    }, [[], []])
  }

  const arrOfEvenAndOdd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [even, odd] = partition(arrOfEvenAndOdd)

  console.log(even) // [2, 4, 6, 8, 10]
  console.log(odd) // [1, 3, 5, 7, 9]

  // 9
  function shuffle (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  const shuffledArr = shuffle([1, 2, 3, 4, 5])
  console.log(shuffledArr) // The array in some random sequence

  // 10
  function arrDifference (arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item))
  }

  const onlyInFirstArr = arrDifference([1, 2, 3, 4], [1, 5, 6, 2])
  console.log(onlyInFirstArr) // [3, 4]
