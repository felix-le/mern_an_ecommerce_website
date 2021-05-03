const getDataCsv = (link) => {
  const workbook = XLSX.readFile(link);

  let worksheets = {};

  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  let newData = JSON.stringify(worksheets.Sheet1);

  return newData;
};
module.exports = getDataCsv;
