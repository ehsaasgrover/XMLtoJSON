// Importing fileSystem and Convert function from the xml-js module
import fs from 'fs';
import convert from 'xml-js';

// Extracting the xml file data into a variable 
var xmlData = fs.readFileSync('Sample1-PO5500000150_20230518184727_0000000000087110.xml', 'utf-8');

function removeLeadingZeros(text) {
   return text.replace(/^0+/, '');
}

// These are the fields from which we will remove leading zeros
var fieldsWithLeadingZeros = [
    'VendorNumber__',
    'DocNumber__',
    'Material__',
];

// Options to format the converted JSON format
const convertXML = {
  ignoreDeclaration: true, // Remove the XML heading
  textFn: (value) => value.trim(), // Trim text values
  compact: true, // Convert to a compact JSON format
  ignoreAttributes: false, // Include attributes
  textFn: (value, parentElement) => {
    if (fieldsWithLeadingZeros.includes(parentElement.name)) { // Removing zeros function
      return removeLeadingZeros(value.trim());
    }
    return value.trim();
  }
};

// Convert XML data to JSON
const jsonData = convert.xml2json(xmlData, convertXML);

// Parsing the data
const formattedJsonData = JSON.parse(jsonData);

// Spaced out the JSON
const spacedOutJsonData = JSON.stringify(formattedJsonData, null, 2);

// Putting the json data in an output file
const outputFilePath = 'outputJSONData.json';
fs.writeFileSync(outputFilePath, spacedOutJsonData, 'utf-8');

// Console log of the jsonData for testing purposes
console.log(spacedOutJsonData);