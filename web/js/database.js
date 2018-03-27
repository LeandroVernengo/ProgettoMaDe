
var server = "http://daas.marconirovereto.it/QROggetti/";
var sale = [], collezioni = [];


function ProvaSale() {
	var s = "<div class='container'><div class='agileinfo-heading'><h3>Sale</h3></div><div class='special-top-grids'>";
	var c = "<div class='container'><div class='agileinfo-heading'><h3>Collezioni</h3></div><div class='special-top-grids'>";
	var sala = -1, collezione = -1;
	
	for (var i in DB) {
		if (sale.indexOf(DB[i].id_sala) == -1) {
			sale.push(DB[i].id_sala);
		}
		if (collezioni.indexOf(DB[i].id_collezione) == -1) {
			collezioni.push(DB[i].id_collezione);
		}
	}

	for (var i in sale) {

		if (i % 4 == 0 && i > 0) {
			s += "<div class='clearfix'></div>";
			s += "</div>";
		}
		if (i % 4 == 0) {
			s += "<div class='w3-agile-special'>";
		}

		s += "<div class='col-md-3 special-grids'>";
		s += "<div class='special-img'>";
		s += "<img class='img-responsive' src='SalaX.jpg' width='128px' height='128px' alt='ciao' />";
		s += "<div class='captn'>";
		s += "<div class='captn-top'>";
		s += "<p>Sala " + sale[i] + "</p></div>";
        s += "<a href='?Sala=" + sale[i] + "'><i class='fas fa-plus' style='color:white;font-size:40px'></i></a></div></div></div>";
	}
	s += "</div></div></div>";

	for (var i in collezioni) {

		if (i % 4 == 0 && i > 0) {
			c += "<div class='clearfix'></div>";
			c += "</div>";
		}
		if (i % 4 == 0) {
			c += "<div class='w3-agile-special'>";
		}

		c += "<div class='col-md-3 special-grids'>";
		c += "<div class='special-img'>";
		c += "<img class='img-responsive' src='CollezioneX.jpg' width='128px' height='128px' alt='ciao' />";
		c += "<div class='captn'>";
		c += "<div class='captn-top'>";
		c += "<p>Collezione " + collezioni[i] + "</p></div>";
		c += "<a href='?Collezione=" + collezioni[i] + "'><div class='wthree-special-info'><p>" + collezioni[i] + "</p></div></a></div></div></div>";
	}
	c += "</div></div></div>";

	document.getElementById("Elementi").innerHTML = s + c;
}


function addRow(label, value) {
    return "<tr><td class='td_sx'>" + label + "</td><td class='td_dx'>" + value + "</td></tr>"
}

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

function createTable() {

    var s = "";

    for (var i in DB) {
        ogg = DB[i];
        cnt = eval(i) + 1;
        if (ogg.id_oggetto != "QR_00xx") {
            console.log(ogg.id_oggetto)
            s += "<h3>Oggetto n° " + cnt + "</h3>";
            s += "<table id='" + ogg.id_oggetto + "' border=1>";
            s += addRow("ID Oggetto", "<strong>" + ogg.id_oggetto + "</strong>");
            s += addRow("ID Collezione", ogg.id_collezione);
            s += addRow("ID Sala", ogg.id_sala);
            s += addRow("Gruppo", ogg.gruppo_made);
            s += addRow("Modello (ITA)", ogg.modello.ITA);
            s += addRow("Modello (ENG)", ogg.modello.ENG);
            s += addRow("Descrizione (ITA)", ogg.descrizione.ITA);
            s += addRow("Descrizione (ENG)", ogg.descrizione.ENG);
            s += addRow("Nazioni", ogg.nazione);
            s += addRow("Calibro", ogg.calibro);
            s += addRow("Misure (ITA)", ogg.misure.ITA);
            s += addRow("Misure (ENG)", ogg.misure.ENG);
            s += addRow("Data Prod", ogg.data_prod);
            s += addRow("Autore", ogg.autore);
            s += addRow("Provenienza", ogg.provenienza);
            s += addRow("Note", ogg.note);
            s += addRow("img1", "<img src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[0]) + "' width='128px' />");
            s += addRow("img2", "<img src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[1]) + "' width='128px' />");
            s += addRow("img3", "<img src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[2]) + "' width='128px' />");
            s += "</table>";
            s += "<br />";
            s += "<h4>Allegati</h4>";
            s += "<table border=1>"
            s += "<tr><th>Tipo</th><th>URL</th><th>Des ITA</th><th>Des ENG</th></tr>";
            for (var k in ogg.allegati) {
                var all = ogg.allegati[k];
                s += "<tr><td>" + all.tipo + "</td><td>"
                s += MakeAllegatiURL(ogg.id_oggetto, all) + "</td><td>"
                s += all.descrizione_breve.ITA + "</td><td>"
                s += all.descrizione_breve.ENG + "</td></tr>";
            }
            s += "</table>"
        }
        else {
            s += "<h3>Oggetto n° " + cnt + " --  da fare!</h3>";
        }
    }
    document.getElementById("Oggetti").innerHTML = s;
}


function Oggetti(scelta, id) {
	var s = "";
	if (scelta == 0) {
		s = "<div class='container'><div class='agileinfo-heading'><h3>Sala " + id + "</h3></div><div class='special-top-grids'>";
	}
	if (scelta == 1) {
		s = "<div class='container'><div class='agileinfo-heading'><h3>Collezione " + id + "</h3></div><div class='special-top-grids'>";
	}
	
    for (var i in DB) {
        ogg = DB[i];
		var count = 0;
		if (count % 4 == 0 && count > 0) {
            s += "<div class='clearfix'></div>";
            s += "</div>";
        }
		if (count % 4 == 0) {
            s += "<div class='w3-agile-special'>";
		}

		if ((scelta == 0 && ogg.id_sala == id) || (scelta == 1 && ogg.id_collezione == id)) {
			console.log("zsv " + ogg.id_oggetto);
			s += "<div class='col-md-3 special-grids'>";
			s += "<div class='special-img'>";
			s += "<img class='img-responsive' src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[0]) + "' width='128px' height='128px' alt='ciao' />";
			s += "<div class='captn'>";
			s += "<div class='captn-top'>";
			s += "<p>" + ogg.modello.ITA + "</p></div>";
            s += "<a href='Oggetto.html?ID=" + i + "'><i class='fas fa-plus' style='color:white;font-size:40px'></i></a></div></div></div>";
			count += 1;
		}
	}
	s += "</div></div></div></div>";

	document.getElementById("Elementi").innerHTML = s;
}

