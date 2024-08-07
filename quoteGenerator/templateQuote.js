function createQuoteDoc(client, date, system, quoteRows, services, quoteFolderId) {
  let quoteFolder = DriveApp.getFolderById(quoteFolderId);
  let quoteFileName = client.name + " " + client.surname + " - Preventivo";
  let quoteFileTemplate = DriveApp.getFileById(TEMPLATE_QUOTE);
  let quoteFileId = quoteFileTemplate.makeCopy(quoteFileName, quoteFolder).getId();
  let quoteFileDoc = DocumentApp.openById(quoteFileId);
  let quoteFileBody = quoteFileDoc.getBody();

  // Quote table
  let quoteFileTables = quoteFileBody.getTables();
  if (quoteFileTables.length == 0) {
    console.log("No tables found in the document.");
    return;
  }
  var formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  let quoteTable = quoteFileTables[4];
  for (var i = 0; i < quoteRows.length; i++) {
    let tableRow = quoteTable.appendTableRow();
    for (var j = 0; j < quoteRows[i].length; j++) {
      if (j > 1) {
        if (typeof quoteRows[i][j] === "number") {
          tableRow.appendTableCell(formatter.format(quoteRows[i][j]));
        } else {
          tableRow.appendTableCell(quoteRows[i][j]);
        }
      } else {
        tableRow.appendTableCell(quoteRows[i][j]);
      }
    }
  }

  var numRows = quoteTable.getNumRows();
  var numCols = quoteTable.getRow(0).getNumCells();
  for (var i = 2; i < numRows; i++) {
    var row = quoteTable.getRow(i);
    for (var j = 0; j < numCols; j++) {
      var cell = row.getCell(j);
      cell.setBackgroundColor('#ffffff');

      let text = cell.editAsText();
      text.setBold(false);
    }
  }

  // Services list
  var servicesElement = quoteFileBody.findText("{{services_list}}");
  if (servicesElement) {
    var servicesText = servicesElement.getElement();
    var startOffset = servicesElement.getStartOffset();
    var endOffsetInclusive = servicesElement.getEndOffsetInclusive();
    servicesText.editAsText().deleteText(startOffset, endOffsetInclusive);
    var checkedCheckbox = '\u2705';
    var parent = servicesText.getParent();
    var parentIndex = quoteFileBody.getChildIndex(parent);
    for (var i = 0; i < services.length; i++) {
      var newParagraph = quoteFileBody.insertParagraph(parentIndex + i + 1, checkedCheckbox + ' ' + services[i]);
    }
    parent.removeFromParent();
  }

  // Text replacing
  quoteFileBody.replaceText("{{date}}", date);
  quoteFileBody.replaceText("{{implant_description}}", system.description);
  quoteFileBody.replaceText("{{name}}", client.name);
  quoteFileBody.replaceText("{{surname}}", client.surname);
  quoteFileBody.replaceText("{{city}}", client.implant_city);
  quoteFileBody.replaceText("{{province}}", client.implant_province);
  quoteFileBody.replaceText("{{phone}}", client.phone);
  quoteFileBody.replaceText("{{mobile}}", client.mobile);
  quoteFileBody.replaceText("{{email}}", client.email);
  quoteFileBody.replaceText("{{tax_code}}", client.tax_code);
  quoteFileBody.replaceText("{{billing_address}}", client.billing_address);
  quoteFileBody.replaceText("{{billing_number}}", client.billing_number);
  quoteFileBody.replaceText("{{billing_number}}", client.billing_number);
  quoteFileBody.replaceText("{{billing_postal_code}}", client.billing_postcode);
  quoteFileBody.replaceText("{{billing_city}}", client.billing_city);
  quoteFileBody.replaceText("{{billing_province}}", client.billing_province);
  quoteFileBody.replaceText("{{billing_nation}}", client.billing_nation);
  quoteFileBody.replaceText("{{installation_address}}", client.implant_address);
  quoteFileBody.replaceText("{{installation_number}}", client.implant_number);
  quoteFileBody.replaceText("{{installation_number}}", client.implant_number);
  quoteFileBody.replaceText("{{installation_postal_code}}", client.implant_postcode);
  quoteFileBody.replaceText("{{installation_city}}", client.implant_city);
  quoteFileBody.replaceText("{{installation_province}}", client.implant_province);
  quoteFileBody.replaceText("{{installation_nation}}", client.implant_nation);
  quoteFileBody.replaceText("{{price}}", formatter.format(system.price));
  quoteFileBody.replaceText("{{vat}}", formatter.format(system.price));
  quoteFileBody.replaceText("{{total}}", formatter.format(system.price));
  quoteFileBody.replaceText("{{incentive}}", system.incentive);

  quoteFileDoc.saveAndClose();
}
