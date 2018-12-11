// Utilizzare il DB del Basket già creato nell’esercizio precedente, per creare un’interfaccia grafica.
// Tutti i giocatori verranno visualizzati tramite il loro codice in una sidebar.
// Una volta cliccato sul codice giocatore, nel corpo principale verranno visualizzate le statistiche corrispondenti.
// Utilizzare jquery, handlebars e il DB del precedente esercizio


var giocatori = [];

//Creo gli oggetti e gli assegno dei valori
for (var i = 0; i < 100; i++) {
    var codiceGiocatore = creaCodice();
    var puntiFatti = Math.floor(Math.random() * 31);
    var rimbalzi = Math.floor(Math.random()*(55 - 20 + 1) + 20);
    var falli = Math.floor(Math.random() * 3);
    var percSuccDuePunti = Math.floor((Math.random() * 100) + 1);
    var percSuccTrePunti = Math.floor((Math.random() * 100) + 1);
    var nomeGiocatore = {
        "codice_Giocatore" : codiceGiocatore,
        "punti_Segnati" : puntiFatti,
        "num_Rimbalzi" : rimbalzi,
        "falli" : falli,
        "successo_duePunti" : percSuccDuePunti,
        "successo_trePunti" : percSuccTrePunti
    }

    giocatori.push(nomeGiocatore);
};

//  METODO 1)
// $(document).ready(function(){
//    for (var i = 0; i < giocatori.length; i++) {
//      var playerCode = giocatori[i].codice_Giocatore;
//      var divGiocatore = '<div class="code_area">' + playerCode + '</div>';
//      $('.sidebar').append(divGiocatore);
//   }
//  });

// METODO 2) HANDLEBARS
$(document).ready(function(){
  for (var i = 0; i < giocatori.length; i++) {
    var playerCode = giocatori[i].codice_Giocatore;
    // var source   = document.getElementById("playercode_template").innerHTML;
    var source   = $('#playercode_template').html();
    var template = Handlebars.compile(source);
    var context = {codiceplayer : playerCode };
    var html    = template(context);
    $('.sidebar').append(html);
 }
  $('.code_area').click(function(){
    var thisCode = $(this).text();
    for (var i = 0; i < giocatori.length; i++) {
      var playerCode = giocatori[i].codice_Giocatore;
      if (thisCode == playerCode) {
        console.log(giocatori[i]);
        var source   = $('#statistiche_template').html();
        var template = Handlebars.compile(source);
        var context = {code : giocatori[i].codice_Giocatore, score : giocatori[i].punti_Segnati, bounce : giocatori[i].num_Rimbalzi, fault : giocatori[i].falli,  };
        var html    = template(context);
        $('.statistiche_wrapper').html(html);
      }
    }
  });

});


function creaCodice(){
    var codePlayer = "";
    var casualNumber = "";

    for (var i = 0; i < 3; i++) {
      //Genero una lettera casuale maiuscola prendendo i valori dall'unicode
      var casualLetter = String.fromCharCode(Math.floor((Math.random()*(90 - 65 + 1) + 65)));
      codePlayer += casualLetter;
    }

    for (var i = 0; i < 3; i++) {
      casualNumber = Math.floor((Math.random() * 9) + 1);
      codePlayer += casualNumber;
    }

    return codePlayer;
}
