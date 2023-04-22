window.addEventListener("load", hdlLoad);
function hdlLoad(): void {

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const playbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("play");
const ctx: CanvasRenderingContext2D    = canvas.getContext("2d");
let videoInt: number = 0;
let video: HTMLVideoElement  = <HTMLVideoElement>document.getElementById("video");
let sourceString: string[] = ["T1.mp4", "T2.mp4", "T3.mp4", "T4.mp4", "T5.mp4"];
let hitbox: number[] = [712, 812, 100, 100];
interface Vector {
    x: number;
    y: number;
}
let hitboxLocation: Vector[] = [{x: 712, y: 812}, {x: -100, y: -100}, {x: 700, y: 360}, {x: -100, y: -100}, {x: 64, y: 364}];
let nextVideo: boolean = false;
let doOneThanSkip: boolean = false;


playbtn.addEventListener("click", startVideo);
canvas.addEventListener("click", (e) => action(getCursorPosition(canvas, e)));

canvas.width = screen.width-(screen.width*0.2);
canvas.height = screen.height-(screen.height*0.2);

function action(vector: number[]): void {
    console.log(vector);
    console.log(hitbox);
    if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]){
        console.log("hit");
        nextVideo = true;
    }
}

function startVideo(): void {
    video.play();
}
function pauseVideo(): void {
    video.pause();
}

video.addEventListener("play", function (): void {
    let $this: HTMLVideoElement = this;
    (function loop(): void {
        if (!$this.paused && !$this.ended) {
            ctx.drawImage($this, 0, 0);
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            ctx.fillRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
        else {
            pauseVideo();
            if (doOneThanSkip == true){
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
    videoInt ++;
    video.src = "./Assets/" + sourceString[videoInt];
    hitbox[0] = hitboxLocation[videoInt].x;
    hitbox[1] = hitboxLocation[videoInt].y;
    startVideo();
    nextVideo = false;
    doOneThanSkip = true;
    }
});

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent): number[] {
    const rect: ClientRect = canvas.getBoundingClientRect();
    let x: number = event.clientX - rect.left;
    let y: number = event.clientY - rect.top;
    return[x, y];
}

};