function createFacilitationDoc(client, quoteFolderId) {
  let quoteFolder = DriveApp.getFolderById(quoteFolderId);
  let facilitationFileName = client.name + " " + client.surname + " - Richiesta IVA";
  let facilitationFileTemplate = DriveApp.getFileById(TEMPLATE_FACILITATION);
  let facilitationFileId = facilitationFileTemplate.makeCopy(facilitationFileName, quoteFolder).getId();

  let facilitationFileDoc = DocumentApp.openById(facilitationFileId);
  let facilitationFileBody = facilitationFileDoc.getBody();

  facilitationFileBody.replaceText("{{name}}", client.name);
  facilitationFileBody.replaceText("{{surname}}", client.surname);
  facilitationFileBody.replaceText("{{tax_code}}", client.tax_code);

  facilitationFileBody.replaceText("{{address}}", client.address);
  facilitationFileBody.replaceText("{{postcode}}", client.postcode);
  facilitationFileBody.replaceText("{{city}}", client.city);
  facilitationFileBody.replaceText("{{province}}", client.province);
  facilitationFileBody.replaceText("{{nation}}", client.nation);

  facilitationFileBody.replaceText("{{birth_address}}", client.birth_address);
  facilitationFileBody.replaceText("{{birth_postcode}}", client.birth_postcode);
  facilitationFileBody.replaceText("{{birth_city}}", client.birth_city);
  facilitationFileBody.replaceText("{{birth_province}}", client.birth_province);
  facilitationFileBody.replaceText("{{birth_nation}}", client.birth_nation);
  facilitationFileBody.replaceText("{{birth_date}}", client.birth_date.toLocaleDateString());

  facilitationFileDoc.saveAndClose();
}
