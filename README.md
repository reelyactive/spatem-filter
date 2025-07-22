spatem-filter
=============

A __spatem-filter__ facilitates the filtering of spatial-temporal (__spatem__) IoT data data based on a standardised set of parameters.

__spatem-filter__ is a lightweight [Node.js package](https://www.npmjs.com/package/spatem-filter) that is typically used with a [chimps](https://github.com/reelyactive/chimps) instance and the barnacles-x family of modules which relay __spatem__ data to specific endpoints.  Together these packages are core components of reelyActive's [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source IoT middleware.

See also the __spatem-filter__'s sister modules, [raddec-filter](https://github.com/reelyactive/raddec-filter) and [dynamb-filter](https://github.com/reelyactive/dynamb-filter).


Hello spatem-filter!
--------------------

```javascript
const SpatemFilter = require('spatem-filter');

let parameters = {
    acceptedDeviceSignatures: [ 'aabbccddeeff/2', '112233445566/2' ],
    acceptedDeviceIds: [ 'aabbccddeeff', '112233445566' ],
    acceptedDeviceIdTypes: [ 2 ]
}

let filter = new SpatemFilter(parameters);

let spatem = { /* Spatem properties */ };

let accepted = filter.isPassing(spatem);

console.log(accepted); // true or false
```

See the [reelyActive Developer's Cheatsheet](https://reelyactive.github.io/diy/cheatsheet/#spatem) for a detailed description of the __spatem__ and its properties.


Filter parameters
-----------------

The following parameters are supported:

### acceptedDeviceSignatures

Array of device signatures to accept.  A filtered spatem must have its device signature (deviceId and deviceIdType) included in the list to pass.  For example, to only allow spatems from a device with EUI-48 identifier aa:bb:cc:dd:ee:ff to pass:

```javascript
let acceptedDeviceSignatures = [ 'aabbccddeeff/2' ];
```

### acceptedDeviceIds

Array of deviceIds to accept.  A filtered spatem must have a deviceId included in the list to pass.  For example, to only allow spatems from devices with the identifier aa:bb:cc:dd:ee:ff to pass:

```javascript
let acceptedDeviceIds = [ 'aabbccddeeff' ];
```


### acceptedDeviceIdTypes

Array of deviceIdTypes to accept.  See the [list of identifier types](https://reelyactive.github.io/diy/cheatsheet/#idtype) for details.  A filtered spatem must have a deviceIdType included in the list to pass.  For example, to only allow spatems from devices with EUI-48 and random 48-bit identifiers to pass:

```javascript
let acceptedDeviceIdTypes = [ 2, 3 ];
```


Filter logic
------------

The __spatem-filter__ will iterate sequentially through each included filter parameter, and return `false` if _any_ should fail.  If _all_ included filter parameters are passing, the __spatem-filter__ will return `true`.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2025 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.