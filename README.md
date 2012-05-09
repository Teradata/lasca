 ````
 _   _                                                 
|*\_/*| _____     _           
|_/-\_|      |   | |                             
 |   0   0   |   | |      __ _ ___  ___  __ _ 
 |     -     |   | |     / _` / __|/ __|/ _` |
 |   \___/   |   | |____| (_| \__ \ (__| (_| |
 |___________|   \_____/ \__,_|___/\___|\__,_|
     |   |       
 |---|   |---|   POWER DOWN. BEEP BOOP.
 |           |
````

What is lasca good for? Lasca will not solve all your problems. However, lasca is very logical and despises disorder. Lasca solves the following issues.

* String.localeCompare results vary between platform and browser combinations. Lasca normalizes locale based sorting by using its own local copies of the 
[UCA collation tables][1] or developer defined collation tables.
* Sorting results often differ between the front-end and the back-end because they use different collation tables. Lasca can use any collation table and/or 
sorting algorithm you provide. Lasca will also run in Node.js, so you can share collation tables between the front-end and back-end.

[1]: http://www.unicode.org/charts/uca/

Development Status
------------------
The current version of lasca should be considered a beta release. Lasca is in need of testing by developers who fluently read and write other languages than English - 
unfortunately the primary author of Lasca only speaks english, JavaScript, and conversational Klingon. Please fork and fix Lasca as needed. Please file issues and take 
responsibility for other issues. Lasca loves self improvement and will be eternally grateful for you help. 

Features
--------

* Sorts arrays, arrays of objects, and compare strings
* Define custom sorting functions
* Define custom functions for sorting characters not in a collation table
* Runs in the browser or Node.js
* AMD compliant and exportable – attempts to use define() or module.exports (node.js); if those efforts fail then lasca attaches to global root
* Can run as as web worker
* Useful for automated internationalized testing in browsers
* Available without UCA collation definitions (lasca.nouca.min.js 3.33KB as opposed to 105KB for lasca.min.js)

API
---
### lasca.setLanguage(language)
Set the language collation table. If not set lasca will default to the first language in the collation table collection.

* language (string or object) – collation table key or custom collation table definition
```javascript
lasca.setLanguage('uca_devanagari');
```

### lasca.setNonCollValCompare(func)
Set the comparator for values not defined in a collation table. The default functionality is to compare character code values.

* func (function) – a comparator that accepts an "a" and "b" values
```javascript
lasca.setNonCollValCompare(function (a, b) { return a > b ? 1 : -1; });
```

### lasca.sort(array, [key])
Sort an array of values or an array of objects using a property key of the object.

* array (array) – an array of values or objects to be sorted
* key (optional, string) – a property key for an object

```javascript
lasca.sort(['foo', 'bar', 'baz']); // sort an array
lasca.sort([{prop1: 1, prop2: 'foo'}, {prop1: 2, prop2: 'bar'}, {prop1: 3, prop2: 'baz'}], 'prop2'); // sort an array of objects
```

### lasca.compare(a, b)
Compare two strings.

* a (string) – first string to compare 
* b (string) – second string to compare

```javascript
lasca.compare('foo', 'bar'); // returns -1
lasca.compare('bar', 'foo'); // returns 1
lasca.compare('foo', 'foo'); // returns 0
```

### lasca.getLanguageKeys()
Returns the lookup keys for all defined collation tables.

### lasca.getLanguage(key)
Returns a collation table and associated configuration for a language.

Defining Custom Collation Tables
--------------------------------
Collation table definitions are object literals with the properties below. These definitions can be added to lasca by passing them to lasca.setLanguage().

* key – A unique lookup key for the collation
* collation – The encoded collation definition. Encodings are the hexadecimal values for the corresponding code point. If a character is comprised of 
more than one code point a '+' operator is used to signify that the code points should be considered a single character. This differs from the standard 
JavaScript character definition, which is a single 16 bit code point.
* compare – Sets the sorting type. 'multi' is for languages that can have more than one code point per character. 'single' is for languages that only have one 16 bit code point per character.

### Examples

```javascript
// single code point per character language
{ key : 'uca_avestan', collation : '10B0010B0110B0210B0310B0410B0510B0610B0710B0810B0910B0A10B0B10B0C10B0D10B0E10B0F10B1010B1110B1210B1310B1410B1510B1610B1710B1810B1910B1A10B1B10B1C10B1D10B1E10B1F10B2010B2110B2210B2310B2410B2510B2610B2710B2810B2910B2A10B2B10B2C10B2D10B2E10B2F10B3010B3110B3210B3310B3410B35', compare : 'single' };
```

```javascript
// multiple code point character language
languages[3] = { key : 'uca_balinese', collation : '1B051B05+1B351B061B071B07+1B351B081B091B09+1B351B0A1B0B1B0B+1B351B0C1B0D1B0D+1B351B0E1B0F1B101B111B11+1B351B121B131B451B461B141B151B161B171B181B191B1A1B1B1B1C1B1D1B1E1B1F1B201B211B221B471B231B241B251B261B271B481B281B291B2A1B2B1B2C1B2D1B2E1B2F1B491B301B311B321B4A1B4B1B331B351B361B371B381B391B3A1B3A+1B351B3B1B3C1B3C+1B351B3D1B3E1B3F1B3E+1B351B401B3F+1B351B411B421B42+1B351B431B44', compare : 'multi' };
```