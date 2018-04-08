const ASCII = [
    { letter: 'A', binary: 1000001 },
    { letter: 'B', binary: 1000010 },
    { letter: 'C', binary: 1000011 },
    { letter: 'D', binary: 1000100 },
    { letter: 'E', binary: 1000101 },
    { letter: 'F', binary: 1000110 },
    { letter: 'G', binary: 1000111 },
    { letter: 'H', binary: 1001000 },
    { letter: 'I', binary: 1001001 },
    { letter: 'J', binary: 1001010 },
    { letter: 'K', binary: 1001011 },
    { letter: 'L', binary: 1001100 },
    { letter: 'M', binary: 1001101 },
    { letter: 'N', binary: 1001110 },
    { letter: 'O', binary: 1001111 },
    { letter: 'P', binary: 1010000 },
    { letter: 'Q', binary: 1010001 },
    { letter: 'R', binary: 1010010 },
    { letter: 'S', binary: 1010011 },
    { letter: 'T', binary: 1010100 },
    { letter: 'U', binary: 1010101 },
    { letter: 'V', binary: 1010110 },
    { letter: 'W', binary: 1010111 },
    { letter: 'X', binary: 1011000 },
    { letter: 'Y', binary: 1011001 },
    { letter: 'Z', binary: 1011010 }
];

// Dictionary for decoding
const decodeDictionary = ASCII.reduce((dictionary, letterDescription) => {
    dictionary[letterDescription.letter] = letterDescription.binary;
    return dictionary;
}, {});

// Dictionary for encoding
const encodeDictionary = ASCII.reduce((dictionary, letterDescription) => {
    dictionary[letterDescription.binary] = letterDescription.letter;
    return dictionary;
}, {});

/**
 * Get message with binary format
 *
 * @param {string} message
 * @returns {string}
 */
function getBinaryMessage(message) {
    return message.split('').map(letter => {
        return decodeDictionary[letter];
    }).join('');
}

/**
 * Get message text from binary format
 *
 * @param {string} message
 * @returns {string}
 */
function getMessageFromBinary(message) {
    const letters = message.match(/.{1,7}/g);

    return letters.map(letter => {
        return encodeDictionary[letter]
    }).join('');
}

/**
 * Get decoded message
 *
 * @param {string} key — key for decoding/encoding message
 * @param {string} message — message to decode
 *
 * @returns {string} decoded message
 */
function decode(key, message) {
    key = getLongKey(key, message);

    const binaryKey = getBinaryMessage(key);
    const binaryMessage = getBinaryMessage(message);

    let decodedMessage = '';

    for (let i = 0; i < binaryMessage.length; i += 1) {
        const keyLetter = binaryKey[i];
        const messageLetter = binaryMessage[i];

        if (keyLetter === messageLetter) {
            decodedMessage += '0';
        } else {
            decodedMessage += '1';
        }
    }

    return decodedMessage;
}

/**
 * Get encoded message
 *
 * @param {string} key — key for decoding/encoding message
 * @param {string} message — message to encode
 *
 * @returns {string} encoded message
 */
function encode(key, message) {
    key = getLongKey(key, message);

    const binaryKey = getBinaryMessage(key);

    let encodedMessage = '';

    for (let i = 0; i < message.length; i += 1) {
        const keyLetter = binaryKey[i];
        const messageLetter = message[i];

        if (messageLetter === '0') {
            encodedMessage += keyLetter;
        } else {
            encodedMessage += keyLetter === '0' ? '1' : '0';
        }
    }

    return getMessageFromBinary(encodedMessage);
}

/**
 * Get key with message length
 *
 * @param {string} key — key for decoding/encoding message
 * @param {string} message
 *
 * @returns {string}
 */
function getLongKey(key, message) {
    while (key.length < message.length) {
        key += key;
    }

    return key;
}

const decodedMessage = decode('DAVID', 'HELLO');
const encodedMessage = encode('DAVID', decodedMessage);

console.log(decodedMessage); // 00011000000100001101000001010001011
console.log(encodedMessage); // HELLO
