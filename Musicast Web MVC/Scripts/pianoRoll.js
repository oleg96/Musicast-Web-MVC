var c_canvas = document.getElementById("grid");
var context = c_canvas.getContext("2d");

var c_canvas_notes = document.getElementById("notes");
var context_notes = c_canvas_notes.getContext("2d");

var c_canvas_keys = document.getElementById("canvas_keys");
var context_keys = c_canvas_keys.getContext("2d");

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

var y = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 7; j++) {
        //context_notes.fillRect(notes[i][0], notes[i][1], notes[i][2], 20);
        if ((j == 0 && i == 0) || j == 1 || j == 2 || j == 4 || j == 5) {
            context_keys.beginPath();
            context_keys.rect(0, y, 100, 30);
            context_keys.fillStyle = 'white';
            context_keys.fill();
            context_keys.lineWidth = 1;
            context_keys.strokeStyle = 'black';
            context_keys.stroke();
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
            y += 40;
        }
    }
}
var y = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 12; j++) {
        //context_notes.fillRect(notes[i][0], notes[i][1], notes[i][2], 20);
        if (j == 1 || j == 4 || j == 6 || j == 9 || (j == 11 && i != 2)) {
            context_keys.beginPath();
            context_keys.rect(0, y, 50, 20);
            context_keys.fillStyle = 'black';
            context_keys.fill();
            context_keys.lineWidth = 1;
            context_keys.strokeStyle = 'black';
            context_keys.stroke();
        }
        y += 20;
    }
}

$("#canvas_keys").click(function (e) {

});

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
            context_notes.strokeStyle = "rgb(0, 0, 0)";
            for (var i = 0; i < data.notes.length; i++) {
                context_notes.fillRect(data.notes[i].position * 14, data.notes[i].note * 20, data.notes[i].length, 20);
                context_notes.strokeRect(data.notes[i].position * 14, data.notes[i].note * 20, data.notes[i].length, 20);
            }
        });
    });

}

function isExist(position, note, length) {
    for (var i = 0; i < notes.length; i++) {
        console.log("item: " + notes[i][0] + " " + notes[i][1] + " " + notes[i][2]);
        if (position >= notes[i][0] && position <= (notes[i][0] + notes[i][2] - 1) && note == notes[i][1]) {
            return true;
        }
    }
    return false;
}

function isExistPosition(position, note, i) {
    console.log("position: " + notes[i][0] + " note: " + notes[i][1] + " length: " + notes[i][2]);
    console.log("coord position: " + position + " note: " + note);
    if (position >= notes[i][0] && position <= (notes[i][0] + notes[i][2] - 1) && note == notes[i][1]) {
        return true;
    }
    return false;
}

function refreshPianoRoll() {
    //for (var x = 0; x * 14 <= 896; x++) {
    //    for (var y = 0; y * 20 <= 700; y++) {
    //        context_notes.clearRect(x * 14, y * 20, 14, 20);
    //    }
    //}
    context_notes.clearRect(0, 0, c_canvas_notes.width, c_canvas_notes.height);
    //context_notes.fillStyle = "rgb(255,255,255)";
    for (var i = 0; i < notes.length; i++) {
        //context_notes.fillRect(notes[i][0], notes[i][1], notes[i][2], 20);
        context_notes.beginPath();
        context_notes.rect(notes[i][0], notes[i][1], notes[i][2], 20);
        context_notes.fillStyle = '#7c8';
        context_notes.fill();
        context_notes.lineWidth = 3;
        context_notes.strokeStyle = '#565';
        context_notes.stroke();
    }
}

$("#notes").click(function (e) {

    var x = Math.floor((e.pageX - $("#notes").offset().left) / 14);
    var y = Math.floor((e.pageY - $("#notes").offset().top) / 20);

    if (document.getElementById('remove').checked) {
        var position = x * 14;
        var note = y * 20;
        for (var i = 0; i < notes.length; i++) {
            if (isExistPosition(position, note, i)) {
                console.log("remove " + position + " " + note + " " + i);
                notes.splice(i, 1);
                console.log("new length " + notes.length);
                refreshPianoRoll();
                break;
            }
        }
    }
    else {

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

            if (!isExist(position, note, length)) {
                notes.push(newNote);
            }

            refreshPianoRoll();
        }
        if (document.getElementById('1/8').checked && document.getElementById('add').checked) {
            var position = x * 14;
            var note = y * 20;
            var length = 28;
            var newNote = [position, note, length];

            if (!isExist(position, note, length)) {
                notes.push(newNote);
            }

            refreshPianoRoll();
        }
        if (document.getElementById('1/4').checked && document.getElementById('add').checked) {
            var position = x * 14;
            var note = y * 20;
            var length = 56;
            var newNote = [position, note, length];

            if (!isExist(position, note, length)) {
                notes.push(newNote);
            }

            refreshPianoRoll();
        }
        if (document.getElementById('1/2').checked && document.getElementById('add').checked) {
            var position = x * 14;
            var note = y * 20;
            var length = 112;
            var newNote = [position, note, length];

            if (!isExist(position, note, length)) {
                notes.push(newNote);
            }

            refreshPianoRoll();
        }
        if (document.getElementById('1/1').checked && document.getElementById('add').checked) {
            var position = x * 14;
            var note = y * 20;
            var length = 224;
            var newNote = [position, note, length];

            if (!isExist(position, note, length)) {
                notes.push(newNote);
            }

            refreshPianoRoll();
        }
    }
}
);