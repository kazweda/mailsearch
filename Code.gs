function main() {
  saveConfig();
  myFunction();
}

function myFunction() {
  const START_HOUR = PropertiesService.getScriptProperties().getProperty("start_hour");
  const END_HOUR = PropertiesService.getScriptProperties().getProperty("end_hour");
  const QUERY = PropertiesService.getScriptProperties().getProperty("query");

  var myThreads = GmailApp.search(QUERY);
  var myMessages = GmailApp.getMessagesForThreads(myThreads);
  
  for(var i in myMessages){
    for(var j in myMessages[i]){
 
      var strDate　=　myMessages[i][j].getDate();
      var strSubject　=　myMessages[i][j].getSubject();

      if (checkSubject(strSubject) && checkHours(strDate, START_HOUR, END_HOUR)) {
        console.log(strSubject);
        myMessages[i][j].star();
      }

    }
  }  
}

function checkSubject(subject) {
  if (subject.includes('テスト')) {
    return true;
  }
  return false;
}

function checkHours(date, start, end) {
  if (date.getHours() >= start) {
    if (date.getHours() <= end) {
      return true;
    }
  }
  return false;
}
