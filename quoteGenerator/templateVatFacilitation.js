function createVatFacilitationDoc(client, date, quoteFolderId) {
  let quoteFolder = DriveApp.getFolderById(quoteFolderId);
  let facilitationFileName = client.name + " " + client.surname + " - Richiesta IVA";
  let facilitationFileTemplate = DriveApp.getFileById(TEMPLATE_FACILITATION);
  let facilitationFileId = facilitationFileTemplate.makeCopy(facilitationFileName, quoteFolder).getId();

  let facilitationFileDoc = DocumentApp.openById(facilitationFileId);
  let facilitationFileBody = facilitationFileDoc.getBody();

  facilitationFileBody.replaceText("{{name}}", client.name);
  facilitationFileBody.replaceText("{{surname}}", client.surname);
  facilitationFileBody.replaceText("{{tax_code}}", client.tax_code);
  facilitationFileBody.replaceText("{{address}}", client.billing_address);
  facilitationFileBody.replaceText("{{postcode}}", client.billing_postcode);
  facilitationFileBody.replaceText("{{city}}", client.billing_city);
  facilitationFileBody.replaceText("{{province}}", client.billing_province);
  facilitationFileBody.replaceText("{{nation}}", client.billing_nation);
  facilitationFileBody.replaceText("{{birth_address}}", client.birth_address);
  facilitationFileBody.replaceText("{{birth_date}}", client.birth_date.toLocaleDateString());
  facilitationFileBody.replaceText("{{date}}", date);

  facilitationFileDoc.saveAndClose();
}
