# Dinom SHA3.js

A lightweight JavaScript library for generating SHA-3 (Keccak) cryptographic hashes in the browser, or Node.js environments.

## Overview

`Dinom-SHA3.js` provides an implementation of the SHA-3 (Secure Hash Algorithm 3) family of cryptographic hash functions, based on the Keccak algorithm. It supports multiple output sizes (224, 256, 384, and 512 bits) and is designed to be used in both browser and Node.js environments. The library is modular, lightweight, and easy to integrate into your projects.


## Features

*   No external dependencies!
*   Supports SHA-3 hash sizes: 224, 256, 384, and 512 bits.
*   Flexible input formats: plain strings or hexadecimal strings.
*   Configurable padding: SHA-3 standard or Keccak padding.
*   Compatible with browsers, Node.js, and AMD environments.


## Installation

### Browser use

Add the `Dinom-SHA3.js` file to your project directly from a CDN:
`<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/DinomNet/Dinom-SHA3@main/dist/sha3.min.js"></script>`

or download the `Dinom-SHA3.js` file and include it directly:
`<script src="path/to/Dinom-SHA3.js"></script>`

The library will be available as a global variable `SHA3`.


### Node.js use

Once installed, you can require Dinom SHA3 in your project:

`const SHA3 = require('dinom-sha3');`


## Usage

The library exposes four public methods corresponding to different hash sizes:
* `224`
* `256`
* `384`
* `512`

Each method accepts a string to hash and an optional options object.

### Browser Example
```
<script src="Dinom-SHA3.js"></script>
<script>
    // Generate a 512-bit SHA-3 hash
    const hash512 = SHA3['512']("Hello, World!");
    console.log(hash512); 
    // Output: "e5e14... (128 hex characters)"

    // Generate a 256-bit SHA-3 hash with custom options
    const hash256 = SHA3['256']("Test", { padding: 'keccak', format: 'hex' });
    console.log(hash256); 
    // Output: "c6d6... (64 hex characters)"
</script>
```

### Node.js Example

```
const SHA3 = require('./Dinom-SHA3.js');

const hash384 = SHA3['384']("Node.js example");
console.log(hash384); 
// Output: "f8b3... (96 hex characters)"
```

## API

The library provides the following methods:

### `SHA3['512'](string, [options])`

*   **Description:** Generates a 512-bit SHA-3 hash (128 hex characters).
*   **Parameters:**
    *   `string`: The input text to hash (string or hex).
    *   `options` (optional):
        *   `padding`: `'sha-3'` (default) or `'keccak'`.
        *   `format`: `'string'` (default) or `'hex'`.
*   **Returns:** A hexadecimal string representing the hash.

### `SHA3['384'](string, [options])`

*   **Description:** Generates a 384-bit SHA-3 hash (96 hex characters).
*   Same parameters and return type as above.

### `SHA3['256'](string, [options])`

*   **Description:** Generates a 256-bit SHA-3 hash (64 hex characters).
*   Same parameters and return type as above.

### `SHA3['224'](string, [options])`

*   **Description:** Generates a 224-bit SHA-3 hash (56 hex characters).
*   Same parameters and return type as above.

## Options

*   `padding`:
    *   `'sha-3'`: Uses SHA-3 standard padding (default).
    *   `'keccak'`: Uses Keccak padding.
*   `format`:
    *   `'string'`: Treats input as a UTF-8 string (default).
    *   `'hex'`: Treats input as a hexadecimal string.

## License

This project is licensed under the MIT License. See below for details:

```
MIT License

Copyright (c) 2025, github.com/Chefaroon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on the [GitHub repository](https://github.com/DinomNet/Dinom-SHA3).

## Contact

For questions or feedback, please visit the [GitHub repository](https://github.com/DinomNet/Dinom-SHA3) and open an issue.
