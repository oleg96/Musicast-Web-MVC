var notes = []

var width = 0;

var c_canvas = document.getElementById("grid");
var context = c_canvas.getContext("2d");

var c_canvas_colored = document.getElementById("colored");
var context_colored = c_canvas_colored.getContext("2d");

var c_canvas_notes = document.getElementById("notes");
var context_notes = c_canvas_notes.getContext("2d");

var c_canvas_keys = document.getElementById("keys");
var context_keys = c_canvas_keys.getContext("2d");

var c_canvas_labels = document.getElementById("note_labels");
var context_labels = c_canvas_labels.getContext("2d");

var c_canvas_indicator = document.getElementById("indicator");
var context_indicator = c_canvas_indicator.getContext("2d");

var notelbls = ["G", "F", "E", "D", "C", "B", "A"];
var allnoteslbls = ["G", "F#", "F", "E", "D#", "D", "C#", "C", "B", "A#", "A", "G#"];
var allnoteslblsLoad = ["G", "Fd", "F", "E", "Dd", "D", "Cd", "C", "B", "AAd", "A", "Gd"];
var allnotesarray = [];

var intervalID;
var indicator_position = 0;

var tempoInMillisec;

var stopped = false;

function drawFunction() {
    context_colored.canvas.width = width;
    context_colored.beginPath();
    context_colored.rect(0, 0, width, 700);
    context_colored.fillStyle = 'rgba(60, 60, 60, 0.75)';
    context_colored.fill();

    $("#roll").width = width;

    context_indicator.canvas.width = width;
    context_indicator.beginPath();
    context_indicator.rect(0, 0, 4, 700);
    context_indicator.fillStyle = 'rgba(241, 142, 28, 1)';
    context_indicator.fill();

    context.canvas.width = width;
    for (var x = 0.5; x < width; x += 14) {
        context.moveTo(x, 0);
        context.lineTo(x, 700);
    }

    context.moveTo(width, 0);
    context.lineTo(width, 700);

    for (var y = 0.5; y < 700; y += 20) {
        context.moveTo(0, y);
        context.lineTo(width, y);
    }

    context.moveTo(0, 700);
    context.lineTo(width, 700);

    context.strokeStyle = "#888";
    context.stroke();

    var oct = 6;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 12; j++) {
            allnotesarray.push(allnoteslbls[j] + oct);
            //console.log(allnotesarray);
            if (j == 7) {
                oct--;
            }
        }
    }

    var y = 0;
    oct = 6;

    context_notes.canvas.width = width;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 7; j++) {
            if ((j == 0 && i == 0) || j == 1 || j == 2 || j == 4 || j == 5) {
                context_keys.beginPath();
                context_keys.rect(0, y, 100, 30);
                context_keys.fillStyle = 'white';
                context_keys.fill();
                context_keys.lineWidth = 1;
                context_keys.strokeStyle = 'black';
                context_keys.stroke();
                context_labels.font = "20px sans-serif";
                context_labels.fillText(notelbls[j] + oct, 70, 22 + y);
                if (j == 4) {
                    oct--;
                }
                y += 30;
            }
            else if ((j == 0 && i != 0) || j == 3 || j == 6) {
                context_keys.beginPath();
                context_keys.rect(0, y, 100, 40);
                context_keys.fillStyle = 'white';
                context_keys.fill();
                context_keys.lineWidth = 1;
                context_keys.strokeStyle = 'black';
                context_keys.stroke();
                context_labels.font = "20px sans-serif";
                context_labels.fillText(notelbls[j] + oct, 70, 22 + y);
                y += 40;
            }
        }
    }
    var y = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 12; j++) {
            if (j == 1 || j == 4 || j == 6 || j == 9 || (j == 11 && i != 2)) {
                context_keys.beginPath();
                context_keys.rect(0, y, 65, 20);
                context_keys.fillStyle = 'black';
                context_keys.fill();
                context_keys.lineWidth = 1;
                context_keys.strokeStyle = 'black';
                context_keys.stroke();
                context_colored.beginPath();
                context_colored.rect(0, y, width, 20);
                context_colored.fillStyle = 'rgba(40, 40, 40, 0.75)';
                context_colored.fill();
            }
            y += 20;
        }
    }
}

// создаем аудио контекст
var audio_context = new (window.AudioContext || window.webkitAudioContext)(); //
// переменные для буфера, источника и получателя
var buffer = [], source, destination;

// функция для подгрузки файла в буфер
function loadSoundFiles() {
    // делаем XMLHttpRequest (AJAX) на сервер
    for (var i = 0; i < allnoteslbls.length; i++) {
        var xhr = new XMLHttpRequest();
        var url = '/PianoSounds/';
        url += allnoteslblsLoad[i];
        url += '4.mp3';
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer'; // важно
        xhr.onload = function (e) {
            // декодируем бинарный ответ
            audio_context.decodeAudioData(this.response,
            function (decodedArrayBuffer) {
                // получаем декодированный буфер
                buffer.push(decodedArrayBuffer);
            }, function (e) {
                console.log('Error decoding file', e);
            });
        };
        xhr.send();
    }
    //console.log(buffer);
}

function rollPlayNote(Note, time) {
    // создаем источник
    source = audio_context.createBufferSource();
    // подключаем буфер к источнику
    if (Note == "G5") {
        source.buffer = buffer[0];
    }
    if (Note == "F#5") {
        source.buffer = buffer[1];
    }
    if (Note == "F5") {
        source.buffer = buffer[2];
    }
    if (Note == "E5") {
        source.buffer = buffer[3];
    }
    if (Note == "D#5") {
        source.buffer = buffer[4];
    }
    if (Note == "D5") {
        source.buffer = buffer[5];
    }
    if (Note == "C#5") {
        source.buffer = buffer[6];
    }
    if (Note == "C5") {
        source.buffer = buffer[7];
    }
    if (Note == "B5") {
        source.buffer = buffer[8];
    }
    if (Note == "A#5") {
        source.buffer = buffer[9];
    }
    if (Note == "A5") {
        source.buffer = buffer[10];
    }
    if (Note == "G#5") {
        source.buffer = buffer[11];
    }
    if (Note == "pause5") {
        setTimeout(function () {
        }, time);
    }
    else {
        // дефолтный получатель звука
        destination = audio_context.destination;
        // подключаем источник к получателю
        source.connect(destination);
        // воспроизводим
        source.start(0);

        //code before the pause
        setTimeout(function () {
            source.stop(0);
        }, time);
    }
}

function rollStopNote(Note) {
    source.stop(0);
}

function playPattern() {

    var tempo = 80;

    tempoInMillisec = 60000 / tempo;

    var time = 100;

    //setTimeout(function () { $('#roll').scrollLeft($('#roll').scrollLeft() + 14); }, time);

    //$('.roll').scroll();
    //$("#roll").animate({
    //    scrollLeft: width
    //}, ((width / 16) * tempoInMillisec / 4));

    console.log(((1 * tempoInMillisec) / 4));
    animation();
   
    for (var i = 0; i < notes.length; i++) {
        time = ((notes[i]["Position"] / 14) * tempoInMillisec) / 4;
        var note = notes[i]["Name"] + "5";
        var lengthnote = ((notes[i]["Length"]) * tempoInMillisec) / 4 - 15;
        //console.log("indexnote "+note+" lengthnote "+lengthnote+" time "+time);
        notePlayer(note, lengthnote, time);
    }

}

function animation() {
    //console.log(indicator_position);
    context_indicator.clearRect(0, 0, width, 700);
    context_indicator.beginPath();
    context_indicator.rect(indicator_position, 0, 4, 700);
    context_indicator.fillStyle = 'rgba(241, 142, 28, 1)';
    context_indicator.fill();
    indicator_position = indicator_position + (14);
    if (indicator_position >= 14 * 16) {
        $("#roll").scrollLeft(indicator_position - (14 * 16));
    }
    if (indicator_position == width) {
        indicator_position = 0;
        context_indicator.clearRect(0, 0, width, 700);
        context_indicator.beginPath();
        context_indicator.rect(indicator_position, 0, 4, 700);
        context_indicator.fillStyle = 'rgba(241, 142, 28, 1)';
        context_indicator.fill();
        $("#roll").scrollLeft(indicator_position);
        return;
    }
    setTimeout(animation, ((1 * tempoInMillisec) / 4));
}

function stopPattern() {
    stopped = true;
}

function notePlayer(note, lengthnote, time) {
    //code before the play
    if (stopped == false) {
        var id_timeout = setTimeout(function () {
            //console.log("playing note " + note + " lengthnote " + lengthnote + " time " + time);
            rollPlayNote(note, lengthnote);
        }, time);
    }
    else {
        clearTimeout(id_timeout);
        rollStopNote(note);
    }
}

function loadPattern() {
    var json = $('#notesHidden').val();
    notes = JSON.parse(json);
    width = notes[notes.length - 1]["Position"] + notes[notes.length - 1]["Length"] * 14;
    //console.log(notes);
}

function refreshPianoRoll() {
    context_notes.clearRect(0, 0, c_canvas_notes.width, c_canvas_notes.height);
    for (var i = 0; i < notes.length; i++) {
        if (notes[i]["Name"] == "C")
        {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 380, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(227, 35, 34)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        if (notes[i]["Name"] == "C#") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 360, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(234, 98, 31)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "D")
        {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 340, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(241, 142, 28)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "D#") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 320, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(253, 198, 11)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "E") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 300, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(244, 229, 0)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "F") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 280, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(140, 187, 38)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "F#") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 260, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(0, 142, 91)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "G") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 240, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(6, 150, 187)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "G#") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 220, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(42, 113, 176)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "A") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 200, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(68, 78, 153)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "A#") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 180, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(109, 57, 139)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
        else if (notes[i]["Name"] == "B") {
            context_notes.beginPath();
            context_notes.rect(notes[i]["Position"], 160, notes[i]["Length"] * 14, 20);
            context_notes.fillStyle = 'rgb(196, 3, 125)';
            context_notes.fill();
            context_notes.lineWidth = 3;
            context_notes.strokeStyle = '#565';
            context_notes.stroke();
        }
    }
}