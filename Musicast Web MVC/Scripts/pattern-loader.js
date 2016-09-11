window.onload = function () {
    createBoard();
};
function createBoard() {
    var dom = document.getElementById('div-pattern');
    var notes = ['G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C', 'B', 'A#', 'A', 'G#'];
    var pattId = 0;
    var octave = 6;
    var j = 0;
    for (var i = 0; i < 35; i++) {
        var board = document.createElement('div');
        var note = notes[j] + octave;
        board.className = "seq_row";
        board.id = "pat"+note;
        board.innerHTML = boardCreator(pattId, note);
        pattId += 64;
        dom.appendChild(board);
        j++;
        if (j == 8) {
            octave--;
        }
        if (j == 12) {
            j = 0;
        }
    }
}
function boardCreator(pattId, note) {
    var str = "";
    for (var i = 0; i < 64; i++) {
        $.ajax({
            url: action = "/Sequencer/Sequencer",
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (Array.isArray(data)) {
                    var message = "";
                    for (var i = 0; i < data.length; i++) {
                        message += "Item " + [i] + "\n"
                            + GetObjectString(data[i]) + "\n\n";
                    }
                    alert(message);
                } else {
                    //$("#results").text(GetObjectString(data));
                }
            }
        });
        str += "<span data-tic=" + i + " class='pat' id=" + pattId + " onclick='onPatternClick(" + pattId + ")'"+" value="+note+"></span>";
        pattId++;
    }
    str += "</div>";
    return str;
}
function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}
function onPatternClick(id) {
    var pattern = document.getElementById(id);
    if (pattern.className == 'pat') {
        pattern.className = 'pat_active';
        //var note = pattern.getAttribute('value');
        //var key = window.frames[0].document.getElementById(note);
        ////console.log(key);
        //if (key) {
        //    //--- Simulate a natural mouse-click sequence.
        //    triggerMouseEvent(key, "mouseover");
        //    triggerMouseEvent(key, "mousedown");
        //    //triggerMouseEvent(targetNode, "mouseup");
        //    //triggerMouseEvent(targetNode, "click");
        //}
        //else
        //    console.log("*** Target node not found!");
    }
    else {
        pattern.className = 'pat';
        //var note = pattern.getAttribute('value');
        //var key = window.frames[0].document.getElementById(note);
        ////console.log(key);
        //if (key) {
        //    //--- Simulate a natural mouse-click sequence.
        //    triggerMouseEvent(key, "mouseup");
        //    triggerMouseEvent(key, "click");
        //}
        //else
        //    console.log("*** Target node not found!");
    }
}
function patternPlayer(j) {
    for (var i = j; i < 64*35+j; i += 64) {
        var pattern = document.getElementById(i);
        //console.log(i);
        var note = pattern.getAttribute('value');
        var key = window.frames[0].document.getElementById(note);
        var isActive = key.style.backgroundColor;
            if (pattern.className == 'pat') {
                //console.log(key);
                if (key) {
                    if (isActive == 'yellow') {
                        //--- Simulate a natural mouse-click sequence.
                        //console.log("UP: " + key);
                        triggerMouseEvent(key, "mouseup");
                        //triggerMouseEvent(key, "click");
                    }
                }
                else
                    console.log("*** Target node not found!");
            }
            else {
                //console.log(key);
                if (key) {
                    //--- Simulate a natural mouse-click sequence.
                    //triggerMouseEvent(key, "mouseover");
                    if (isActive != 'yellow') {
                        //console.log(isActive);
                        //console.log("DOWN: " + key);
                        triggerMouseEvent(key, "mousedown");
                    }
                    //triggerMouseEvent(targetNode, "mouseup");
                    //triggerMouseEvent(targetNode, "click");
                }
                else
                    console.log("*** Target node not found!");
            }
        }
}
function savePattern() {
    var s = new XMLSerializer();
    var d = document.getElementById('div-pattern');
    var str = s.serializeToString(d);
    console.log(str);
    //alert(str);
}