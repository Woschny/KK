window.addEventListener("load", hdlLoad);
console.log("v1");
function hdlLoad() {
    localStorage.clear();
    var canvas = document.getElementById("canvas");
    var playbtn = document.getElementById("play");
    var debugbtn = document.getElementById("debug");
    var monImg = document.getElementById("MoniImg");
    var ctx = canvas.getContext("2d");
    var videoInt = 0;
    var video = document.getElementById("video");
    var sourceString = ["T1.mp4", "T2.mp4", "T3.mp4", "T4.mp4", "T5.mp4", "T6.mp4", "T7.mp4", "T8.mp4", "T9.mp4", "T10.mp4", "T11.mp4"];
    var hitboxLocation = [{ x: 660, y: 780, s: 100 }, { x: -100, y: -100, s: 100 }, { x: 820, y: 540, s: 200 }, { x: -100, y: -100, s: 100 }, { x: 820, y: 540, s: 200 },
        { x: -100, y: -100, s: 100 }, { x: 830, y: 40, s: 800 }, { x: -100, y: -100, s: 100 }, { x: 1080, y: 630, s: 260 }, { x: -100, y: -100, s: 100 }, { x: 0, y: 0, s: 2000 }];
    //  1-90, 90-270, 272-362, 362-460, 560-550, 550-1100, 1100-1190, 1190-2000, 2000-2090, 2090-2300, 2300-2390,
    //   cy     cy      ev       ev        ev       ev         ev         ev        ev          ev        ev
    var hitbox = [hitboxLocation[0].x, hitboxLocation[0].y, hitboxLocation[0].s, hitboxLocation[0].s];
    var nextVideo = false;
    var doOneThanSkip = false;
    var scaleFactor = 4.55;
    var debugMode = false;
    var interval;
    playbtn.addEventListener("click", function () { startVideo(), playbtn.style.visibility = "hidden", monImg.src = "./Assets/MonitorBack.png"; });
    debugbtn.addEventListener("click", toggleDebugMode);
    canvas.addEventListener("click", function (e) { return action(getCursorPosition(canvas, e)); });
    canvas.addEventListener("mousemove", function (e) { return hoverVis(getCursorPosition(canvas, e)); });
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.width = canvas.width * (scaleFactor / 10) + "px";
    function action(vector) {
        console.log(vector);
        console.log(hitbox);
        if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]) {
            console.log("hit");
            nextVideo = true;
        }
    }
    function toggleDebugMode() {
        if (debugMode == true) {
            debugMode = false;
        }
        else if (debugMode == false) {
            debugMode = true;
        }
    }
    function hoverVis(vector) {
        if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]) {
            canvas.style.cursor = "pointer";
        }
        else {
            canvas.style.cursor = "default";
        }
    }
    function startVideo() {
        video.play();
    }
    function pauseVideo() {
        video.pause();
    }
    video.addEventListener("play", function () {
        var $this = this;
        (function loop() {
            if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0);
                if (debugMode == true) {
                    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
                    ctx.fillRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
                }
                interval = setInterval(loop, 1000 / 30);
            }
            else {
                pauseVideo();
                if (doOneThanSkip == true) {
                    videoInt++;
                    video.src = "./Assets/" + sourceString[videoInt];
                    hitbox[0] = hitboxLocation[videoInt].x;
                    hitbox[1] = hitboxLocation[videoInt].y;
                    hitbox[2] = hitboxLocation[videoInt].s;
                    hitbox[3] = hitbox[2];
                    doOneThanSkip = false;
                }
                startVideo();
            }
        })();
        console.log("finish");
        if (nextVideo == true) {
            videoInt++;
            video.src = "./Assets/" + sourceString[videoInt];
            hitbox[0] = hitboxLocation[videoInt].x;
            hitbox[1] = hitboxLocation[videoInt].y;
            hitbox[2] = hitboxLocation[videoInt].s;
            hitbox[3] = hitbox[2];
            startVideo();
            nextVideo = false;
            doOneThanSkip = true;
        }
    });
    function getCursorPosition(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left) * (10 / scaleFactor);
        var y = (event.clientY - rect.top) * (10 / scaleFactor);
        return [x, y];
    }
}
;
//# sourceMappingURL=index.js.map