const fs = require('fs');
const XLSX = require('xlsx');
const jsontoxml = require('jsontoxml');

const workbook = XLSX.readFile(
  '/Applications/MAMP/htdocs/mern_an_ecommerce_website/BE/routes/product.xlsx'
);

let worksheets = {};
for (const sheetName of workbook.SheetNames) {
  worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

console.log(JSON.stringify(worksheets.Sheet1));
