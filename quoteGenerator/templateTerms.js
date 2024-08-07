function createTermsDoc(client, date, quoteFolderId) {
  let quoteFolder = DriveApp.getFolderById(quoteFolderId);
  let termsFileName = client.name + " " + client.surname + " - Termini di fornitura";
  let termsFileTemplate = DriveApp.getFileById(TEMPLATE_TERMS);
  let termsFileId = termsFileTemplate.makeCopy(termsFileName, quoteFolder).getId();

  let termsFileDoc = DocumentApp.openById(termsFileId);
  let termsFileBody = termsFileDoc.getBody();

  termsFileBody.replaceText("{{city}}", client.billing_city);
  termsFileBody.replaceText("{{province}}", client.billing_province);
  termsFileBody.replaceText("{{date}}", date);

  termsFileDoc.saveAndClose();
}
