function Risultati() {

    var testo = cerca.value;    
    website = "http://daas.marconirovereto.it/QROggetti/";
    
    s = "";
    for (var i = 0; i < DB.length; i++) {
        if (DB[i]["modello"]["ITA"].toUpperCase().indexOf(testo.toUpperCase()) > -1 || DB[i]["descrizione"]["ITA"].toUpperCase().indexOf(testo.toUpperCase()) > -1) {                
            s +="<p class='well'>"
            s += '<a href="Oggetto.html?ID=' + i + '">' + DB[i]["modello"]["ITA"] + '</a>';
            s += "</p>";                             
        }       
    }  
    document.getElementById("Results").innerHTML = s;
}

function MouseOnCerca() {
    if (cerca.value == 'Cerca...') {
        cerca.value = '';
        cerca.style = 'color:#000';
    }
}

function MouseLeavesCerca() {
    if (cerca.value == '') {
        cerca.value = "Cerca...";
        cerca.style = 'color:rgba(0,0,0,0.5)';
        cerca.blur();
    }
}

function MouseClickCerca() {
    if (cerca.value != '') {
        cerca.value = '';
        cerca.style = 'color:#000';
        Risultati();
    }
}

function CaricaValue() {
    cerca.value = "Cerca...";
}
