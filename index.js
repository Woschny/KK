window.addEventListener("load", hdlLoad);
function hdlLoad() {
    var canvas = document.getElementById("canvas");
    var playbtn = document.getElementById("play");
    var ctx = canvas.getContext("2d");
    var videoInt = 0;
    var video = document.getElementById("video");
    var sourceString = ["T1.mp4", "T2.mp4", "T3.mp4", "T4.mp4", "T5.mp4"];
    var hitbox = [712, 812, 100, 100];
    var hitboxLocation = [{ x: 712, y: 812 }, { x: -100, y: -100 }, { x: 700, y: 360 }, { x: -100, y: -100 }, { x: 64, y: 364 }];
    var nextVideo = false;
    var doOneThanSkip = false;
    playbtn.addEventListener("click", startVideo);
    canvas.addEventListener("click", function (e) { return action(getCursorPosition(canvas, e)); });
    canvas.width = screen.width - (screen.width * 0.2);
    canvas.height = screen.height - (screen.height * 0.2);
    function action(vector) {
        console.log(vector);
        console.log(hitbox);
        if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]) {
            console.log("hit");
            nextVideo = true;
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
            startVideo();
            nextVideo = false;
            doOneThanSkip = true;
        }
    });
    function getCursorPosition(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return [x, y];
    }
}
;
//# sourceMappingURL=index.js.map