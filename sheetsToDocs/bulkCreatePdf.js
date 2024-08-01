function createPDFsFromTemplate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var headers = rows.shift();
  
  var templateId = '1dub-8qUrsFazLXLH22qXMlkf7caK7p_Oixm5X7q3GC4';
  var folderId = '1qb80yGd9RXBs9ebmc6Em-QBZzZEezQdi';
  
  var templateDoc = DocumentApp.openById(templateId);
  var folder = DriveApp.getFolderById(folderId);
  
  rows.forEach(function(row) {
    var copyId = DriveApp.getFileById(templateId).makeCopy().getId();
    var copyDoc = DocumentApp.openById(copyId);
    var copyBody = copyDoc.getBody();
    
    headers.forEach(function(header, index) {
      copyBody.replaceText('{{' + header + '}}', row[index]);
    });
    
    copyDoc.saveAndClose();
    
    var pdf = DriveApp.getFileById(copyId).getAs('application/pdf');
    folder.createFile(pdf);
    DriveApp.getFileById(copyId).setTrashed(true);
  });
}
