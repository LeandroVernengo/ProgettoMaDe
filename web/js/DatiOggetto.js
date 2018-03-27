var oggetto;
var server = 'http://daas.marconirovereto.it/QROggetti/';

function MakeImgOggPath(id, img) {
    return server + id + "/" + img;
}

function MakeAllegatiPath(id, allegato) {
    return server + id + "/" + allegato;
}

function MakeAllegatiURL(id_oggetto, all) {
    switch (all.tipo) {
        case 0:
            return "<audio controls><source src='" + MakeAllegatiPath(id_oggetto, all.url) + "' type='audio/mpeg'></audio>";;
        case 1:
            return '<video width="320" height="240" controls><source src="' + MakeAllegatiPath(id_oggetto, all.url) + '" type="video/mp4"></video>';
        case 2:
            return "<img src='" + MakeImgOggPath(id_oggetto, all.url) + "' width='128px' />";
        case 3:
            return '<a href="' + all.url + '">' + all.url + '</a>';
        default:
            return "???" + url;
    }
    return;
}

function Load(oggetti, IdOggetto) {	
    oggetto = oggetti[IdOggetto];
    document.getElementById("Title").innerText = oggetto["modello"]["ITA"];
    document.getElementById("Description").innerHTML = oggetto["descrizione"]["ITA"];
	document.getElementById("Image").src = server + oggetto["id_oggetto"] + '/' + oggetto["immagini"][0];
	
	var alleg = "<h2>Allegati</h2>";
	var allegati = oggetto["allegati"];
	allegati.forEach(function(allegato) {
		alleg+='<div class="pince"><div class="pince-left">';
		switch(allegato["tipo"]) {
			case 0:
                alleg += '<h3 class="glyphicon glyphicon-headphones"></h3>';
				break;
			case 1:
                alleg += '<h3 class="glyphicon glyphicon-facetime-video"></h3>';
				break;
			case 2:
                alleg += '<h3 class="glyphicon glyphicon-picture"></h3>';
				break;
			case 3:
                alleg += '<h3 class="glyphicon glyphicon-globe"></h3>';
				break;
			default:
                alleg += '<p class="glyphicon glyphicon-file" ></p>';
				break;
		}		
        alleg += '</div><div class="pince-right">';
        //alleg+='<p>'+allegato["descrizione_breve"]["ITA"]+'</p>';
        alleg += MakeAllegatiURL(IdOggetto, allegato);
        alleg += '</div><div class="clearfix"></div></div>';
    });

    s = "";
    s += "<table class='table table-bordered' style='margin-top: 20px;'>";
    s += "<thead><tr><th scope='col' colspan='2' style='font-size:larger;'>Informazioni</th></tr></thead>";
    s += "<tbody>";
    s += "<tr><th scope='row'>Nazioni</th><td>" + oggetto.nazione + "</td></tr>";
    s += "<tr><th scope='row'>Calibro</th><td>" + oggetto.calibro + "</td></tr>";
    s += "<tr><th scope='row'>Misure</th><td>" + oggetto.misure["ITA"] + "</td></tr>";
    s += "<tr><th scope='row'>DataProduzione</th><td>" + oggetto.data_prod + "</td></tr>";
    s += "<tr><th scope='row'>Autore</th><td>" + oggetto.autore + "</td></tr>";
    s += "<tr><th scope='row'>Provenienza</th><td>" + oggetto.provenienza + "</td></tr>";
    s += "<tr><th scope='row'>Note</th><td>" + oggetto.note + "</td></tr></table>";
    s += "</tbody>";
    

    document.getElementById("Attachments").innerHTML = alleg;	
    document.getElementById("Informazione").innerHTML = s;
}