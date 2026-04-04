var SCRIPT_RELEASE = "v1.0.0";

function salvarLogsBaculaComoPDFEstilizado() {
  var nomeMarcador = "Backup HAMA";
  var pastaPaiId = "1mp6KJF5EcDDYaeQsdRaIwYcX2dMElBLA";

  var marcador = GmailApp.getUserLabelByName(nomeMarcador);
  if (!marcador) {
    Logger.log("Erro: Marcador não encontrado.");
    return;
  }

  var threads = marcador.getThreads();
  var pastaPai = DriveApp.getFolderById(pastaPaiId);

  Logger.log("Processando " + threads.length + " e-mails de log...");
  Logger.log("Bacula Log Archiver release: " + SCRIPT_RELEASE);

  for (var i = 0; i < threads.length; i++) {
    var mensagens = threads[i].getMessages();

    for (var j = 0; j < mensagens.length; j++) {
      var msg = mensagens[j];
      var dataEmail = Utilities.formatDate(msg.getDate(), "GMT-3", "yyyy-MM-dd");
      var assunto = msg.getSubject().replace(/[/\\?%*:|"<>]/g, '-');

      var pastaDestino = obterOuCriarPasta(pastaPai, dataEmail);

      var estiloCss = "<style>" +
                      "body { font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #333; }" +
                      ".header { background-color: #f4f4f4; padding: 10px; border-bottom: 2px solid #ccc; margin-bottom: 20px; }" +
                      ".content { white-space: pre-wrap; margin-top: 20px; line-height: 1.4; }" +
                      "</style>";

      var corpoHtml = "<html><head>" + estiloCss + "</head><body>" +
                      "<div class='header'>" +
                      "<h2>Relatório de Backup: " + assunto + "</h2>" +
                      "<b>Data do E-mail:</b> " + msg.getDate() + "<br>" +
                      "<b>Remetente:</b> " + msg.getFrom() +
                      "</div>" +
                      "<div class='content'>" + msg.getPlainBody() + "</div>" +
                      "</body></html>";

      var blob = Utilities.newBlob(corpoHtml, "text/html", assunto + ".html");
      var pdf = blob.getAs("application/pdf").setName(assunto + ".pdf");

      pastaDestino.createFile(pdf);

      var anexos = msg.getAttachments();
      for (var k = 0; k < anexos.length; k++) {
        pastaDestino.createFile(anexos[k]);
      }

      Logger.log("PDF Estilizado gerado: " + assunto);
    }

    threads[i].removeLabel(marcador);
    threads[i].moveToArchive();
  }
}

function obterOuCriarPasta(pastaPai, nomePasta) {
  var iterador = pastaPai.getFoldersByName(nomePasta);
  return iterador.hasNext() ? iterador.next() : pastaPai.createFolder(nomePasta);
}
