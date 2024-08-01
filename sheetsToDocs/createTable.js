function exportSheetDataToDoc() {
  // Step 1: Get data from Google Sheets
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //var data = sheet.getDataRange().getValues();
  var data = sheet.getRange("fof!A4:B6").getValues();

  // Step 2: Create a new Google Docs document
  var doc = DocumentApp.create('Pretty Printed Table');
  var body = doc.getBody();

  // Step 3: Insert the data as a table
  var table = body.appendTable(data);
  table.setBorderColor('#FF0000');
  table.setBorderWidth(5);

  // Apply formatting to the table (optional)
  var numRows = table.getNumRows();
  var numCols = table.getRow(0).getNumCells();

  for (var i = 0; i < numRows; i++) {
    var row = table.getRow(i);
    for (var j = 0; j < numCols; j++) {
      var cell = row.getCell(j);
      cell.setBackgroundColor('#f4f4f4'); // Set background color
      cell.setPaddingTop(5);
      cell.setPaddingBottom(5);
      cell.setPaddingLeft(5);
      cell.setPaddingRight(5);
      cell.setFontFamily('Roboto');
      cell.setFontSize(10);
      //cell.setBorderWidth('1pt'); // Set border width
      //cell.setBorderColor('#000000'); // Set border color
    }
  }

  // Step 4: Get the URL of the created document
  var docUrl = doc.getUrl();

  // Step 5: Write the URL to a specific cell
  // Change 'C1' to the cell where you want the URL to appear
  var urlCell = sheet.getRange('O1');
  urlCell.setValue(docUrl);

  // Log the URL of the created document
  Logger.log('Document URL: ' + doc.getUrl());
}
