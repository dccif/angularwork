function reverseNumber(n) {
    let digit, result = 0
    while (n) {
        digit = n % 10
        result = (result * 10) + digit
        n = n / 10 | 0
    }
    return result
}

console.log(reverseNumber(12390))

function checkPalindrome(s) {
    let len = Math.floor(s.length / 2)
    for (let i = 0; i < len; i++) {
        if (s[i] !== s[s.length - i - 1]) {
            return false
        }
    }
    return true
}

console.log(checkPalindrome("aba"))

function possibleCombinations(s) {
    let combinations = []
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j < s.length + 1; j++) {
            combinations.push(s.slice(i, j))
        }
    }
    return combinations
}

console.log(possibleCombinations("dog"))

function alphabeticalOrder(s) {
    return [...s].sort((a, b) => a.localeCompare(b)).join("")
}

console.log(alphabeticalOrder("webmaster"))

function covertUpper(s) {
    return s.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase()
    })
}

console.log(covertUpper("the quick brown fox"))

function longestWord(s) {
    return s.split(" ").reduce((a, b) => (b.length > a.length) ? b : a)
}

console.log(longestWord("Web Development Tutorial"))

function countVowel(s) {
    return s.match(/[aeiou]/gi).length
}

console.log(countVowel("The quick brown fox"))

function checkPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false
    return num !== 1 && num !== 0
}

console.log(checkPrime(1))

function argumentType(arg) {
    let out
    if (arguments.length <= 1) return typeof arg
    else {
        return Array.from(arguments).map(x => typeof x)
    }
}

console.log(argumentType("43"))

function constructIdentity(num) {
    let res = []
    for (let i = 0; i < num; i++) {
        if (!res[i]) {
            res[i] = []
        }
        for (let j = 0; j < num; j++) {
            if (i === j) {
                res[i][j] = 1
            } else {
                res[i][j] = 0
            }
        }
    }
    return res
}

console.log(constructIdentity(5))

function secondNum(arr) {
    if (arr.length < 2) return ""
    else {
        let sortArr = arr.sort()
        return `${sortArr[1]},${sortArr.at(-2)}`
    }
}

console.log(secondNum([1, 2, 3, 4, 5]))

function is_perfect(number) {
    var temp = 0
    for (var i = 1; i <= number / 2; i++) {
        if (number % i === 0) {
            temp += i
        }
    }

    return temp === number && temp !== 0
}

console.log(is_perfect(6))

function factors(n) {
    let num_factors = [], i

    for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
        if (n % i === 0) {
            num_factors.push(i)
            if (n / i !== i)
                num_factors.push(n / i)
        }
    num_factors.sort(function (x, y) {
        return x - y
    })  // numeric sort
    return num_factors
}

console.log(factors(16))

function amountTocoins(amount, coins) {
    if (amount === 0) {
        return []
    } else {
        if (amount >= coins[0]) {
            left = (amount - coins[0])
            return [coins[0]].concat(amountTocoins(left, coins))
        } else {
            coins.shift()
            return amountTocoins(amount, coins)
        }
    }
}

console.log(amountTocoins(46, [25, 10, 5, 2, 1]))

function exp(b, n) {
    let ans = 1
    for (let i = 1; i <= n; i++) {
        ans = b * ans
    }
    return ans
}

console.log(exp(2, 10))

function uniqueChar(s) {
    return [...s].reduce((acc, curr) => acc.includes(curr) ? acc : acc + curr, "")
}

console.log(uniqueChar("thequickbrownfoxjumpsoverthelazydog"))

function countletter(string) {
    return string.split("").reduce(
        (acc, el) => {
            if (acc.hasOwnProperty(el))
                acc[el]++
            else
                acc[el] = 1
            return acc
        }, {}
    )
}

console.log(countletter("theragfegasegf"))

function binaryS(arr, x, start, end) {
    if (start > end) return false
    let mid = start + Math.floor((end - start) / 2)
    if (arr[mid] === x) return true
    if (arr[mid] > x)
        return binaryS(arr, x, start, mid - 1)
    else
        return binaryS(arr, x, mid + 1, end)
}

function largerThan(arr, n) {
    return arr.filter(x => x > n)
}

function makeid(l) {
    var text = ""
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < l; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length))
    }
    return text
}

console.log(makeid(8))

function subset(arra, arra_size) {
    let result_set = [],
        result

    for (let x = 0; x < Math.pow(2, arra.length); x++) {
        result = []
        i = arra.length - 1
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(arra[i])
            }
        } while (i--)

        if (result.length >= arra_size) {
            result_set.push(result)
        }
    }

    return result_set
}

console.log(subset([1, 2, 3], 2))

function char_count(str, letter) {
    let letter_Count = 0
    for (let position = 0; position < str.length; position++) {
        if (str.charAt(position) === letter) {
            letter_Count += 1
        }
    }
    return letter_Count
}

console.log(char_count('microsoft.com', 'o'))

function find_FirstNotRepeatedChar(str) {
    const arra1 = str.split('')
    let result = ''
    let ctr = 0

    for (let x = 0; x < arra1.length; x++) {
        ctr = 0

        for (let y = 0; y < arra1.length; y++) {
            if (arra1[x] === arra1[y]) {
                ctr += 1
            }
        }

        if (ctr < 2) {
            result = arra1[x]
            break
        }
    }
    return result
}

console.log(find_FirstNotRepeatedChar("abacddbec"))

function bblSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        // Last i elements are already in place
        for (let j = 0; j < (arr.length - i - 1); j++) {
            // Checking if the item at present iteration
            // is greater than the next iteration
            if (arr[j] > arr[j + 1]) {
                // If the condition is true then swap them
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    // Print the sorted array
    return arr
}

console.log(bblSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]))

function Longest_Country_Name(country_name) {
    return country_name.reduce(function (lname, country) {
        return lname.length > country.length ? lname : country
    }, "")
}

console.log(Longest_Country_Name(["Australia", "Germany", "United States of America"]))

function lengthOfLongestSubstring(s) {
    // Initialise an array to store the running characters and a longest string length variable
    let currentString = []
    let longestStringLength = 0

    // Loop through the provided string
    for (let i = 0; i < s.length; i++) {
        // Attempt to get the current character's position in the current string
        const currentCharacterPosition = currentString.indexOf(s[i])

        // Check if the current character exists in the current string
        if (currentCharacterPosition !== -1) {
            // Chop the array off after the occurence of the character
            currentString.splice(0, currentCharacterPosition + 1)
        }

        // Add the current character to the array
        currentString.push(s[i])

        // Store the current string length if bigger than the existing record
        longestStringLength = Math.max(
            longestStringLength,
            currentString.length
        )
    }

    return longestStringLength
}

console.log(lengthOfLongestSubstring("dvdf")) // 3

function is_Palindrome(str1) {
    const rev = str1.split("").reverse().join("")
    return str1 === rev
}

function longest_palindrome(str1) {

    let max_length = 0,
        maxp = ''

    for (let i = 0; i < str1.length; i++) {
        const subs = str1.slice(i, str1.length)

        for (let j = subs.length; j >= 0; j--) {
            const sub_subs_str = subs.slice(0, j)
            if (sub_subs_str.length <= 1)
                continue

            if (is_Palindrome(sub_subs_str)) {
                if (sub_subs_str.length > max_length) {
                    max_length = sub_subs_str.length
                    maxp = sub_subs_str
                }
            }
        }
    }

    return maxp
}

console.log(longest_palindrome("abracadabra"))

function callfunc(func) {
    return func()
}

console.log(callfunc(() => 2))

function getfunctionName(func) {
    return arguments.callee.name
}

console.log(getfunctionName())