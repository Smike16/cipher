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

// Default shift
const SHIFT_DEFAULT = 1;

/**
 * Encode string by Caesar cipher
 *
 * @param {string} string
 * @param {number} [shift=SHIFT_DEFAULT]
 *
 * @returns {string}
 */
function encode(string, shift = SHIFT_DEFAULT) {
    const shiftAlphabet = alphabet.concat(alphabet.slice(0, shift));
    let result = '';

    for (let i = 0; i < string.length; i += 1) {
        const char = string[i];
        const charIndex = shiftAlphabet.indexOf(char);

        if (charIndex !== -1) {
            result += shiftAlphabet[charIndex + shift];
        }
    }

    return result;
}

/**
 * Decode string from Caesar cipher
 *
 * @param {string} string
 * @param {number} [shift=SHIFT_DEFAULT]
 *
 * @returns {string}
 */
function decode(string, shift = SHIFT_DEFAULT) {
    const shiftAlphabet = alphabet.concat(alphabet.slice(0, shift));
    let result = '';

    for (let i = 0; i < string.length; i += 1) {
        const char = string[i];
        const charIndex = shiftAlphabet.indexOf(char);

        if (charIndex !== -1) {
            result += shiftAlphabet[charIndex - shift];
        }
    }

    return result;
}
