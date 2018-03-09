/**
 * Omphonic cipher dictionary
 */
const cipher = {
    a: ['09', '12', '33', '47', '53', '67', '78', '92'],
    b: ['48', '81'],
    c: ['13', '41', '62'],
    d: ['01', '03', '45', '79'],
    e: ['14', '16', '24', '44', '46', '55', '57', '64', '74', '82', '87', '98'],
    f: ['10', '31'],
    g: ['06', '25'],
    h: ['23', '39', '50', '56', '65', '68'],
    i: ['32', '70', '73', '83', '88', '93'],
    j: ['15'],
    k: ['04'],
    l: ['26', '37', '51', '84'],
    m: ['22', '27'],
    n: ['18', '58', '59', '66', '71', '91'],
    o: ['00', '05', '07', '54', '72', '90', '99'],
    p: ['38', '95'],
    q: ['94'],
    r: ['29', '35', '40', '42', '77', '80'],
    t: ['11', '19', '36', '76', '86', '96'],
    u: ['08', '61', '63'],
    v: ['34'],
    w: ['60', '89'],
    x: ['28'],
    y: ['21', '52'],
    z: ['02']
};

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
        const charMaxIndex = cipher[char].length - 1;

        result += cipher[char][getRandom(0, charMaxIndex)];
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
    const chars = [];
    let result = '';

    while (string.length) {
        chars.push(string.slice(0, 2));
        string = string.slice(2);
    }

    for (let i = 0; i < chars.length; i += 1) {
        const char = chars[i];

        for (const key in cipher) {
            const charCodes = cipher[key];

            if (charCodes.includes(char)) {
                result += key;
            }
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

encode('hello'); // '5087375190'
decode('5087375190'); // 'hello'
