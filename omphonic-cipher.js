/**
 * Omphonic cipher dictionary
 */
const cipher = [
    { char: 'a', values: ['09', '12', '33', '47', '53', '67', '78', '92'] },
    { char: 'b', values: ['48', '81'] },
    { char: 'c', values: ['13', '41', '62'] },
    { char: 'd', values: ['01', '03', '45', '79'] },
    { char: 'e', values: ['14', '16', '24', '44', '46', '55', '57', '64', '74', '82', '87', '98'] },
    { char: 'f', values: ['10', '31'] },
    { char: 'g', values: ['06', '25'] },
    { char: 'h', values: ['23', '39', '50', '56', '65', '68'] },
    { char: 'i', values: ['32', '70', '73', '83', '88', '93'] },
    { char: 'j', values: ['15'] },
    { char: 'k', values: ['04'] },
    { char: 'l', values: ['26', '37', '51', '84'] },
    { char: 'm', values: ['22', '27'] },
    { char: 'n', values: ['18', '58', '59', '66', '71', '91'] },
    { char: 'o', values: ['00', '05', '07', '54', '72', '90', '99'] },
    { char: 'p', values: ['38', '95'] },
    { char: 'q', values: ['94'] },
    { char: 'r', values: ['29', '35', '40', '42', '77', '80'] },
    { char: 't', values: ['11', '19', '36', '76', '86', '96'] },
    { char: 'u', values: ['08', '61', '63'] },
    { char: 'v', values: ['34'] },
    { char: 'w', values: ['60', '89'] },
    { char: 'x', values: ['28'] },
    { char: 'y', values: ['21', '52'] },
    { char: 'z', values: ['02'] }
];

/**
 * Dictionary for encoding
 */
const encodeDictionary = cipher.reduce((dictionary, cipherItem) => {
    dictionary[cipherItem.char] = cipherItem.values;
    return dictionary;
}, {});

/**
 * Dictionary for decoding
 */
const decodeDictionary = cipher.reduce((dictionary, cipherItem) => {
    cipherItem.values.forEach(value => {
        dictionary[value] = cipherItem.char;
    });

    return dictionary;
}, {});

/**
 * Encode string by omphonic cipher
 *
 * @param {string} string
 * @returns {string}
 */
function encode(string) {
    let result = '';

    for (let i = 0; i < string.length; i += 1) {
        const char = string[i];

        if (encodeDictionary.hasOwnProperty(char)) {
            const charMaxIndex = encodeDictionary[char].length - 1;

            result += encodeDictionary[char][getRandom(0, charMaxIndex)];
        }
    }

    return result;
}

/**
 * Decode string from omphonic cipher
 *
 * @param {string} string
 * @returns {string}
 */
function decode(string) {
    const chars = string.match(/.{1,2}/g);
    let result = '';

    for (let i = 0; i < chars.length; i += 1) {
        const char = chars[i];

        if (decodeDictionary.hasOwnProperty(char)) {
            result += decodeDictionary[char];
        }
    }

    return result;
}

/**
 * Return random int between `min` and `max`
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

encode('hello'); // '5087375190' (may change)
decode('5087375190'); // 'hello'
