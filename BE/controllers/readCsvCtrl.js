const router = require('express').Router();
const fs = require('fs');
const XLSX = require('xlsx');
const ItemCsv = require('../models/readCsvModel');

const readCsvCtrl = {
  postItemCsv: async (req, res) => {
    try {
      const { link } = req.body;
      const items = await getDataCsv(link);

      res.json(items);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const getDataCsv = (link) => {
  const workbook = XLSX.readFile(link);

  let worksheets = {};

  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  return JSON.stringify(worksheets.Sheet1);
};
module.exports = readCsvCtrl;
