function start() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var cellPosition = "I5";

  LogToCell(sheet, cellPosition, "Prelevo le righe del preventivo...");
  // Quote range
  let quoteRangeRaw = sheet.getRange("Preventivo!D2:G30").getValues();
  let quoteRows = quoteRangeRaw.filter(function(row) {
    return row.some(function(cell) {
      return cell !== '';
    });
  });

  LogToCell(sheet, cellPosition, "Prelevo i servizi...");
  // Services range
  let servicesRangeRaw = sheet.getRange("Preventivo!B43:B90").getValues();
  let servicesRows = servicesRangeRaw.filter(function(row) {
    return row.some(function(cell) {
      return cell !== '';
    });
  });

  LogToCell(sheet, cellPosition, "Prelevo data...");
  let date = sheet.getRange("Preventivo!B36").getValue().toLocaleDateString();

  LogToCell(sheet, cellPosition, "Prelevo i dati del cliente...");
  let client = {};
  client.name = sheet.getRange("Preventivo!B2").getValue();
  client.surname = sheet.getRange("Preventivo!B3").getValue();
  client.phone = sheet.getRange("Preventivo!B10").getValue();
  client.mobile = sheet.getRange("Preventivo!B11").getValue();
  client.email = sheet.getRange("Preventivo!B12").getValue();
  client.tax_code = sheet.getRange("Preventivo!B13").getValue();
  client.billing_address = sheet.getRange("Preventivo!B4").getValue();
  client.billing_number = sheet.getRange("Preventivo!B5").getValue();
  client.billing_postcode = sheet.getRange("Preventivo!B6").getValue();
  client.billing_city = sheet.getRange("Preventivo!B7").getValue();
  client.billing_province = sheet.getRange("Preventivo!B8").getValue();
  client.billing_nation = sheet.getRange("Preventivo!B9").getValue();
  client.birth_address = sheet.getRange("Preventivo!B14").getValue();
  client.birth_date = sheet.getRange("Preventivo!B15").getValue();
  client.implant_address = sheet.getRange("Preventivo!B16").getValue();
  client.implant_number = sheet.getRange("Preventivo!B17").getValue();
  client.implant_postcode = sheet.getRange("Preventivo!B18").getValue();
  client.implant_city = sheet.getRange("Preventivo!B19").getValue();
  client.implant_province = sheet.getRange("Preventivo!B20").getValue();
  client.implant_nation = sheet.getRange("Preventivo!B21").getValue();

  LogToCell(sheet, cellPosition, "Prelevo i dati del sistema...");
  let system = {}
  system.price = sheet.getRange("Preventivo!B26").getValue();
  system.vat = sheet.getRange("Preventivo!B27").getValue();
  system.total = sheet.getRange("Preventivo!B28").getValue();
  system.description = sheet.getRange("Preventivo!B31").getValue() + " " + sheet.getRange("Preventivo!B37").getValue();
  system.incentive = sheet.getRange("Preventivo!B42").getValue();

  LogToCell(sheet, cellPosition, "Creo le cartelle...");
  let clientFolder = client.name + " " + client.surname;
  let clientFolderId = createClientFolder(clientFolder);
  let quoteFolderId = createQuoteFolder(clientFolderId)

  // Setup cell logging link
  var folderLink = 'https://drive.google.com/drive/folders/' + quoteFolderId;
  var cellText = "Preventivo " + client.name + " " + client.surname

  // create docs
  LogToCell(sheet, cellPosition, "Creo richiesta IVA agevolata...");
  createVatFacilitationDoc(client, date, quoteFolderId);
  LogToCell(sheet, cellPosition, "Creo termini di fornitura...");
  createTermsDoc(client, date, quoteFolderId);
  LogToCell(sheet, cellPosition, "Creo preventivo...");
  createQuoteDoc(client, date, system, quoteRows, servicesRows, quoteFolderId);


  // convert into pdfs
  LogToCell(sheet, cellPosition, "Converto in pdf...");
  var folder = DriveApp.getFolderById(quoteFolderId);
  var files = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  while (files.hasNext()) {
    var file = files.next();
    var pdf = file.getAs('application/pdf');
    folder.createFile(pdf);
    Logger.log('Converted: ' + file.getName());
  }

  // link result
  LogToCell(sheet, cellPosition, cellText, folderLink);
}

function LogToCell(sheet, cellPosition, text, link) {
  var cell = sheet.getRange(cellPosition);
  cell.setValue(text);
  if (link != undefined) {
    sheet.getRange(cellPosition).setFormula('=HYPERLINK("' + link + '"; "' + text + '")');
  }
}
