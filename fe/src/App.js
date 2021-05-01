import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
// import Header from './components/headers';
// import MainPages from './components/mainpages';
import * as fs from 'fs'; //
import * as XLSX from 'xlsx';

import product from './product.xlsx';
function App() {
  const [rawData, setRawData] = useState([]);
  console.log('🚀 ~ file: App.js ~ line 15 ~ App ~ rawData', rawData);

  const readSheetBook = async () => {
    const workbook = await XLSX.readFile(product);
    let worksheets = {};
    for (const sheetName of workbook.SheetNames) {
      worksheets[sheetName] = XLSX.utils.sheet_to_json(
        workbook.Sheet[sheetName]
      );
    }
    setRawData(worksheets);
  };

  useEffect(() => {
    readSheetBook();
  }, []);

  return (
    <DataProvider>
      <Router>hello</Router>
    </DataProvider>
  );
}

export default App;
