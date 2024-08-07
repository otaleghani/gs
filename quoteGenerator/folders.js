// Creates a new client folder if it doesn't exist
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

// Creates the folder for the quote that is beign generated
function createQuoteFolder(clientFolderId) {
  let clientFolder = DriveApp.getFolderById(clientFolderId);
  let data = new Date();

  let quoteFolder = clientFolder.createFolder(data.toLocaleString());
  return quoteFolder.getId();
}
