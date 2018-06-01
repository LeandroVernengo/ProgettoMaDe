
var server = "http://daas.marconirovereto.it/QROggetti/";
var sale = [];


function ProvaSale() {
	var s = "<div class='container'><div class='agileinfo-heading'><h3>Sale</h3></div><div class='special-top-grids'>";
	var sala = -1;
	
	for (var i in DB) {
		if (sale.indexOf(DB[i].id_sala) == -1) {
			sale.push(DB[i].id_sala);
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
		s += "<img class='img-responsive' src='./images/Sala" + sale[i] + ".jpg' width='128px' height='128px' alt='ciao' />";
		s += "<div class='captn'>";
		s += "<div class='captn-top'>";
		s += "</div>";
        s += "<a href='?Sala=" + sale[i] + "'><i class='fas fa-plus' style='margin-top:25px;color:white;font-size:40px'></i></a></div></div></div>";
	}
	s += "</div></div></div>";	

	document.getElementById("Elementi").innerHTML = s;
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


function Oggetti(scelta, id) {
    var s = "";
    if (scelta == 0) {
        s = "<div class='container'><div class='agileinfo-heading'><h3>Sala " + id + "</h3></div><div class='special-top-grids'>";
    }
    if (scelta == 1) {
        s = "<div class='container'><div class='agileinfo-heading'><h3>Collezione " + id + "</h3></div><div class='special-top-grids'>";
    }

    var count = 0;

    for (var i in DB) {
        ogg = DB[i];
        var titolo = "" + ogg.modello.ITA;
        if (count % 4 == 0 && count > 0) {
            s += "<div class='clearfix'></div>";
            s += "</div>";
        }
        if (count % 4 == 0) {
            s += "<div class='w3-agile-special'>";
        }

		if (scelta == 0 && ogg.id_sala == id) {
			console.log("zsv " + ogg.id_oggetto);
			s += "<div class='col-md-3 special-grids'>";
			s += "<div class='special-img'>";
			s += "<img class='img-responsive' src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[0]) + "' width='128px' height='128px' alt='ciao' />";
			s += "<div class='captn'>";
            s += "<div class='captn-top'>";
            if (titolo.length < 50) {
                s += "<p>" + titolo + "</p></div>";
            }
            else {
                s += "<p>" + titolo.substring(0, 50) + "..." + "</p></div>";
            }			
            s += "<a href='Oggetto.html?ID=" + i + "'><i class='fas fa-plus' style='color:white;font-size:40px'></i></a></div></div></div>";
			count += 1;
		}
	}
	s += "</div></div></div></div>";

	document.getElementById("Elementi").innerHTML = s;
}
