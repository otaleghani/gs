function start() {
  // get the data from the spreadsheet
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let extras = sheet.getRange("Preventivo!G2:J10").getValues();
  //for (let i = 0; i < extras.length; i++)
  console.log(extras)

  let client = {};
  client.name = sheet.getRange("Preventivo!B2").getValue();
  client.surname = sheet.getRange("Preventivo!B3").getValue();
  client.phone = sheet.getRange("Preventivo!B9").getValue();
  client.mobile = sheet.getRange("Preventivo!B10").getValue();
  client.tax_code = sheet.getRange("Preventivo!B12").getValue();

  client.address = sheet.getRange("Preventivo!B4").getValue();
  client.postcode = sheet.getRange("Preventivo!B5").getValue();
  client.city = sheet.getRange("Preventivo!B6").getValue();
  client.province = sheet.getRange("Preventivo!B7").getValue();
  client.nation = sheet.getRange("Preventivo!B8").getValue();

  client.birth_address = sheet.getRange("Preventivo!B14").getValue();
  client.birth_postcode = sheet.getRange("Preventivo!B15").getValue();
  client.birth_city = sheet.getRange("Preventivo!B16").getValue();
  client.birth_province = sheet.getRange("Preventivo!B17").getValue();
  client.birth_nation = sheet.getRange("Preventivo!B18").getValue();
  client.birth_date = sheet.getRange("Preventivo!B19").getValue();

  client.implant_address = sheet.getRange("Preventivo!B21").getValue();
  client.implant_postcode = sheet.getRange("Preventivo!B22").getValue();
  client.implant_city = sheet.getRange("Preventivo!B23").getValue();
  client.implant_province = sheet.getRange("Preventivo!B24").getValue();
  client.implant_nation = sheet.getRange("Preventivo!B25").getValue();

  let system = {}
  system.power = sheet.getRange("Preventivo!E11").getValue();
  system.unit_price = sheet.getRange("Preventivo!E11").getValue();
  system.total_price = sheet.getRange("Preventivo!E11").getValue();
  system.optimizers = sheet.getRange("Preventivo!E11").getValue();
  system.vat = sheet.getRange("Preventivo!E11").getValue();
  system.total_price_with_vat = sheet.getRange("Preventivo!E11").getValue();
  system.total_financing = sheet.getRange("Preventivo!E11").getValue();

  system.inverter = {};
  system.inverter.name = sheet.getRange("Preventivo!E11").getValue();
  system.inverter.power = sheet.getRange("Preventivo!E11").getValue();
  system.inverter.warranty = sheet.getRange("Preventivo!E11").getValue();

  console.log(system)

  let clientFolder = client.name + " " + client.surname;
  let clientFolderId = createClientFolder(clientFolder);
  let quoteFolderId = createQuoteFolder(clientFolderId)
  console.log(quoteFolderId);

  createFacilitationDoc(client, quoteFolderId);
}

function createClientFolder(folderName) {
  let clientFolderId;

  let quotesFolder = DriveApp.getFolderById(QUOTE_FOLDER_ID);
  let clientFolder = quotesFolder.getFoldersByName(folderName);

  if (clientFolder.hasNext()) {
    console.log("Client folder already present");
    clientFolderId = clientFolder.next().getId();
  } else {
    let clientFolder = quotesFolder.createFolder(folderName);
    clientFolderId = clientFolder.getId();
  }

  return clientFolderId;
}

function createQuoteFolder(clientFolderId) {
  let clientFolder = DriveApp.getFolderById(clientFolderId);
  let data = new Date();

  let quoteFolder = clientFolder.createFolder(data.toLocaleString());
  return quoteFolder.getId();
}
