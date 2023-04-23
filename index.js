window.addEventListener("load", hdlLoad);
function hdlLoad() {
    localStorage.clear();
    var canvas = document.getElementById("canvas");
    var playbtn = document.getElementById("play");
    var ctx = canvas.getContext("2d");
    var videoInt = 0;
    var video = document.getElementById("video");
    var sourceString = ["T1.mp4", "T2.mp4", "T3.mp4", "T4.mp4", "T5.mp4"];
    var hitbox = [660, 780, 100, 100];
    var hitboxLocation = [{ x: 660, y: 780, s: 100 }, { x: -100, y: -100, s: 100 }, { x: 820, y: 540, s: 200 }, { x: -100, y: -100, s: 100 }, { x: 64, y: 364, s: 100 }];
    var nextVideo = false;
    var doOneThanSkip = false;
    var scaleFactor = 8;
    playbtn.addEventListener("click", function () { startVideo(), playbtn.style.visibility = "hidden"; });
    canvas.addEventListener("click", function (e) { return action(getCursorPosition(canvas, e)); });
    canvas.addEventListener("mousemove", function (e) { return hoverVis(getCursorPosition(canvas, e)); });
    canvas.width = screen.width;
    canvas.height = screen.height;
    canvas.style.width = canvas.width * (scaleFactor / 10) + "px";
    function action(vector) {
        console.log(vector);
        console.log(hitbox);
        if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]) {
            console.log("hit");
            nextVideo = true;
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
                ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
                ctx.fillRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
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