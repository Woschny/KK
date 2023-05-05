window.addEventListener("load", hdlLoad);
function hdlLoad(): void {
localStorage.clear();
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const playbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("play");
const debugbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("debug");
const monImg: HTMLImageElement = <HTMLImageElement>document.getElementById("MoniImg");
const ctx: CanvasRenderingContext2D    = canvas.getContext("2d");
let videoInt: number = 0;
let video: HTMLVideoElement  = <HTMLVideoElement>document.getElementById("video");
let sourceString: string[] = ["T1.mp4", "T2.mp4", "T3.mp4", "T4.mp4", "T5.mp4", "T6.mp4", "T7.mp4", "T8.mp4", "T9.mp4", "T10.mp4"];
let hitboxLocation: Vector[] = [{x: 660, y: 780, s: 100}, {x: -100, y: -100, s: 100}, {x: 820, y: 540, s: 200}, {x: -100, y: -100, s: 100}, {x: 820, y: 540, s: 200}, 
                                {x: -100, y: -100, s: 100}, {x: 830, y: 40, s: 800}, {x: -100, y: -100, s: 100}, {x: 1080, y: 630, s: 260}, {x: -100, y: -100, s: 100}];
//  1-90, 90-270, 272-362, 362-460, 560-550, 550-1100, 1100-1190, 1190-2000, 2000-2090, 2090-2300,
//   cy     cy      ev       ev        ev       ev         ev         ev        ev          ev
let hitbox: number[] = [hitboxLocation[0].x, hitboxLocation[0].y, hitboxLocation[0].s, hitboxLocation[0].s];
interface Vector {
    x: number;
    y: number;
    s: number;
}

let nextVideo: boolean = false;
let doOneThanSkip: boolean = false;
let scaleFactor: number = 4.55;
let debugMode: boolean = false;

playbtn.addEventListener("click", () => {startVideo(), playbtn.style.visibility = "hidden", monImg.src = "./Assets/MonitorBack.png";});
debugbtn.addEventListener("click", toggleDebugMode);
canvas.addEventListener("click", (e) => action(getCursorPosition(canvas, e)));
canvas.addEventListener("mousemove", (e) => hoverVis(getCursorPosition(canvas, e)))

canvas.width = 1920;
canvas.height = 1080;
canvas.style.width = canvas.width*(scaleFactor/10) + "px";

function action(vector: number[]): void {
    console.log(vector);
    console.log(hitbox);
    if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]){
        console.log("hit");
        nextVideo = true;
    }
}

function toggleDebugMode(): void {
    if (debugMode == true) {
        debugMode = false;
    }
    else if(debugMode == false) {
        debugMode = true;
    }
}

function hoverVis(vector: number[]): void {
    if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]){
    canvas.style.cursor = "pointer";
    }
    else {
    canvas.style.cursor = "default";
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
            if(debugMode == true) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            ctx.fillRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
            }
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
        else {
            pauseVideo();
            if (doOneThanSkip == true){
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
    videoInt ++;
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

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent): number[] {
    const rect: ClientRect = canvas.getBoundingClientRect();
    let x: number = (event.clientX - rect.left)*(10/scaleFactor);
    let y: number = (event.clientY - rect.top)*(10/scaleFactor);
    return[x, y];
}

};