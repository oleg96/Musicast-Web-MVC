var c_canvas = document.getElementById("grid");
var context = c_canvas.getContext("2d");

for (var x = 0.5; x < 800; x += 25) {
    context.moveTo(x, 0);
    context.lineTo(x, 700);
}

context.moveTo(800, 0);
context.lineTo(800, 700);

for (var y = 0.5; y < 700; y += 20) {
    context.moveTo(0, y);
    context.lineTo(800, y);
}

context.moveTo(0, 700);
context.lineTo(800, 700);

context.strokeStyle = "#888";
context.stroke();