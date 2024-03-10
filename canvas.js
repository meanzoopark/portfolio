// canvas.js

var heatmapInstance = h337.create({
    container: document.body,
    radius: 50,
    width: window.innerWidth,
    height: window.innerHeight
});

document.body.onmousedown = function (ev) {
    console.log('X:', ev.layerX, 'Y:', ev.layerY, 'Target Element:', ev.target);

    heatmapInstance.addData({
        x: ev.clientX,
        y: ev.clientY + window.scrollY,
        value: 1
    });
}

