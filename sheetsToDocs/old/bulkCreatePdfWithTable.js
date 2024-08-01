function createPDFsFromTemplate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var templateId = '1dub-8qUrsFazLXLH22qXMlkf7caK7p_Oixm5X7q3GC4';
  var folderId = '1qb80yGd9RXBs9ebmc6Em-QBZzZEezQdi';

  var headers = data[0];
  var rows = data.slice(1);

  var templateDoc = DocumentApp.openById(templateId);
  var folder = DriveApp.getFolderById(folderId);

  rows.forEach(function(row) {
    var copyId = DriveApp.getFileById(templateId).makeCopy().getId();
    var copyDoc = DocumentApp.openById(copyId);
    var copyBody = copyDoc.getBody();

    headers.forEach(function(header, index) {
      if (header !== 'DataTable') { // Skip the DataTable header
        copyBody.replaceText('{{' + header + '}}', row[index]);
      }
    });

    // Find the {{DataTable}} placeholder and get its parent paragraph
    var placeholder = copyBody.findText('{{DataTable}}');
    if (placeholder) {
      var placeholderElement = placeholder.getElement();
      var paragraph = placeholderElement.getParent().asParagraph();

      // Create a table from the row data
      var tableData = [];
      tableData.push(headers.map(header => header)); // Add headers as first row
      tableData.push(row.map(cell => cell.toString())); // Add row data as second row

      // Insert the table before the paragraph containing the placeholder
      var table = copyBody.insertTable(paragraph.getParent().getChildIndex(paragraph), tableData);

      // Remove the paragraph containing the placeholder
      paragraph.removeFromParent();
    }

    copyDoc.saveAndClose();

    var pdf = DriveApp.getFileById(copyId).getAs('application/pdf');
    folder.createFile(pdf);
    DriveApp.getFileById(copyId).setTrashed(true);
  });
}
