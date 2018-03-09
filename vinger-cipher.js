/**
 * English alphabet
 */
const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

/**
 * Vigner Square
 */
const square = alphabet.reduce((square, _, index) => {
    const i = index + 1;
    const tail = alphabet.slice(0, i);
    const row = alphabet.slice(i).concat(alphabet.slice(0, i));

    square.push(row);

    return square;
}, []);

/**
 * Encode string with Vinger Square
 *
 * @param {string} key
 * @param {string} string
 *
 * @returns {string}
 */
function encode(key, string) {
    let result = '';

    const longKey = getLongKey(key, string);
    const keyDictionary = getKeyDictionary(key);

    for (let i = 0; i < string.length; i += 1) {
        const char = string[i];
        const keyChar = longKey[i];
        const index = alphabet.indexOf(char);

        if (index !== -1) {
            result += keyDictionary[keyChar][index];
        }
    }

    return result;
}

/**
 * Decode string with Vinger Square
 *
 * @param {string} key
 * @param {string} string
 *
 * @returns {string}
 */
function decode(key, string) {
    let result = '';

    const longKey = getLongKey(key, string);
    const keyDictionary = getKeyDictionary(key);

    for (let i = 0; i < string.length; i += 1) {
        const char = string[i];
        const keyChar = longKey[i];
        const index = keyDictionary[keyChar].indexOf(char);

        if (index !== -1) {
            result += alphabet[index];
        }
    }

    return result;
}

/**
 * Get dictionary from key
 *
 * @param {string} key
 * @returns {Object}
 */
function getKeyDictionary(key) {
    return key.split('').reduce((keyDictionary, keyChar) => {
        const row = square.find(row => row[0] === keyChar);

        keyDictionary[keyChar] = row;

        return keyDictionary;
    }, {});
}

/**
 * Get key for string
 *
 * @param {string} key
 * @param {string} string
 *
 * @returns {string}
 */
function getLongKey(key, string) {
    let longKey = key;

    while (longKey.length < string.length) {
        longKey += key;
    }

    return longKey;
}

encode('white', 'divert'); // 'zpdxvp'
decode('white', 'zpdxvp'); // 'divert'
