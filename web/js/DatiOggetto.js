var oggetto;
var server = 'http://daas.marconirovereto.it/QROggetti/';
function Load(oggetti, IdOggetto) {	
	oggetto = oggetti[IdOggetto];
    document.getElementById("Title").innerText = oggetto["modello"]["ITA"];
	document.getElementById("Description").innerText = oggetto["descrizione"]["ITA"];
	document.getElementById("Image").src = server + oggetto["id_oggetto"] + '/' + oggetto["immagini"][0];
	
	var alleg = "<h4>Allegati</h4>";
	var allegati = oggetto["allegati"];
	console.log(allegati);
	allegati.forEach(function(allegato) {
		alleg+='<div class="pince"><div class="pince-left">';
		switch(allegato["tipo"]) {
			case 0:
				alleg+='<h5>MP3</h5>'
				break;
			case 1:
				alleg+='<h5>MP4</h5>'
				break;
			case 2:
				alleg+='<h5>JPG</h5>'
				break;
			case 3:
				alleg+='<h5>URL</h5>'
				break;
			default:
				alleg+='<h5>File</h5>'
				break;
		}		
		alleg+='</div><div class="pince-right">';
		alleg+='<p>'+allegato["descrizione_breve"]["ITA"]+'</p>';
		alleg+='</div><div class="clearfix"></div></div>';	
    });

    s = "";
    s += "<table>";
    s += "<tr><th>Nazioni</th><th>" + oggetto.nazione + "</th></tr>";
    s += "<tr><th>Calibro</th><th>" + oggetto.calibro + "</th></tr>";
    s += "<tr><th>Misure</th><th>" + oggetto.misure["ITA"] + "</th></tr>";
    s += "<tr><th>DataProduzione</th><th>" + oggetto.data_prod + "</th></tr>";
    s += "<tr><th>Autore</th><th>" + oggetto.autore + "</th></tr>";
    s += "<tr><th>Provenienza</th><th>" + oggetto.provenienza + "</th></tr>";
    s += "<tr><th>Note</th><th>" + oggetto.note + "</th></tr></table>";
    

    document.getElementById("Attachments").innerHTML = alleg;	
    document.getElementById("Informazione").innerHTML = s;
}