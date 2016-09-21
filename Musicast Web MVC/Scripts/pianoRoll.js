var c_canvas = document.getElementById("grid");
var context = c_canvas.getContext("2d");

var c_canvas_notes = document.getElementById("notes");
var context_notes = c_canvas_notes.getContext("2d");

var notes = []

for (var x = 0.5; x < 896; x += 14) {
    context.moveTo(x, 0);
    context.lineTo(x, 700);
}

context.moveTo(896, 0);
context.lineTo(896, 700);

for (var y = 0.5; y < 700; y += 20) {
    context.moveTo(0, y);
    context.lineTo(896, y);
}

context.moveTo(0, 700);
context.lineTo(896, 700);

context.strokeStyle = "#888";
context.stroke();

function rollPlayNote(Note, time) {
    var iframe = document.getElementsByTagName('iframe')[0];

    var iframeDoc = iframe.contentWindow;

    iframeDoc.playNote(Note);

    //code before the pause
    setTimeout(function () {
        iframeDoc.stopNote(Note);
    }, time);

}

function savePattern() {
    
}

function loadPattern() {

    $(function () {
        $.getJSON('../pattern.json', function (data) {
            context_notes.fillStyle = "rgb(255,255,255)";
            for (var i = 0; i < data.notes.length; i++) {
                context_notes.fillRect(data.notes[i].position * 14, data.notes[i].note * 20, data.notes[i].length, 20);
            }
        });
    });

}

function isExist(newNote) {
    for (var i = 0; i < notes.length; i++) {
        if (newNote[0] == notes[i][0] && newNote[1] == notes[i][1] && newNote[2] == notes[i][2]) {
            return true;
        }
    }
    return false;
}

function refreshPianoRoll() {

}

$("#notes").click(function (e) {

    var x = Math.floor((e.pageX - $("#notes").offset().left) / 14);
    var y = Math.floor((e.pageY - $("#notes").offset().top) / 20);

    //if (document.getElementById('1/16').checked && document.getElementById('remove').checked) {
    //    context_notes.clearRect(x * 14, y * 20, 14, 20);
    //}
    //if (document.getElementById('1/8').checked && document.getElementById('remove').checked) {
    //    context_notes.clearRect(x * 14, y * 20, 28, 20);
    //}
    //if (document.getElementById('1/4').checked && document.getElementById('remove').checked) {
    //    context_notes.clearRect(x * 14, y * 20, 56, 20);
    //}
    //if (document.getElementById('1/2').checked && document.getElementById('remove').checked) {
    //    context_notes.clearRect(x * 14, y * 20, 112, 20);
    //}
    //if (document.getElementById('1/1').checked && document.getElementById('remove').checked) {
    //    context_notes.clearRect(x * 14, y * 20, 224, 20);
    //}

    if (document.getElementById('1/16').checked && document.getElementById('add').checked) {
        var position = x * 14;
        var note = y * 20;
        var length = 14;
        var newNote = [position, note, length];

        if (isExist(newNote)) {
            
        }
        else {
            notes.push(newNote);
        }

        refreshPianoRoll();
    }
    if (document.getElementById('1/8').checked && document.getElementById('add').checked) {
        context_notes.fillStyle = "rgb(255,255,255)";
        context_notes.fillRect(x * 14, y * 20, 28, 20);
    }
    if (document.getElementById('1/4').checked && document.getElementById('add').checked) {
        context_notes.fillStyle = "rgb(255,255,255)";
        context_notes.fillRect(x * 14, y * 20, 56, 20);
    }
    if (document.getElementById('1/2').checked && document.getElementById('add').checked) {
        context_notes.fillStyle = "rgb(255,255,255)";
        context_notes.fillRect(x * 14, y * 20, 112, 20);
    }
    if (document.getElementById('1/1').checked && document.getElementById('add').checked) {
        context_notes.fillStyle = "rgb(255,255,255)";
        context_notes.fillRect(x * 14, y * 20, 224, 20);
    }

    }
);