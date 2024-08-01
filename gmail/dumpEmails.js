const label = "YOUR LABEL"
const from = 'from:email@domain.com'
const subject = "Subject..."

function dumpEmailsToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // var label = GmailApp.getUserLabelByName(label);
  // var threads = label.getThreads();
  var threads = GmailApp.search(from);
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject();
      if (subject.includes(subject)) {
        var date = message.getDate();
        var from = message.getFrom(); 
        var subject = message.getSubject();
        var body = message.getPlainBody();
        sheet.appendRow([date, from, subject, body]);
      }
    }
  }
}
