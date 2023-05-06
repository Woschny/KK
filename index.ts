window.addEventListener("load", hdlLoad);
console.log("v2");

function hdlLoad(): void {
localStorage.clear();
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const playbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("play");
const debugbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("debug");
const monImg: HTMLImageElement = <HTMLImageElement>document.getElementById("MoniImg");
const ctx: CanvasRenderingContext2D    = canvas.getContext("2d");
let videoInt: number = 0;
let video: HTMLVideoElement  = <HTMLVideoElement>document.getElementById("video");
let sourceString: string[] = [  "T1.mp4", "T2.mp4", "T3.mp4", "T4.mp4", "T5.mp4", "T6.mp4", "T7.mp4", "T8.mp4", "T9.mp4", "T10.mp4", "T11.mp4", "T12.mp4",
                                "T13.mp4", "T14.mp4", "T15.mp4", "T16.mp4", "T17.mp4"];
let hitboxLocation: Vector[] = [{x: 660, y: 780, s: 100}, {x: -100, y: -100, s: 100}, {x: 820, y: 540, s: 200}, {x: -100, y: -100, s: 100}, {x: 820, y: 540, s: 200}, 
                                {x: -100, y: -100, s: 100}, {x: 830, y: 40, s: 800}, {x: -100, y: -100, s: 100}, {x: 1080, y: 630, s: 260}, {x: -100, y: -100, s: 100},
                                {x: 0, y: 0, s: 2000}, {x: -100, y: -100, s: 100}, {x: 520, y: 530, s: 200}, {x: -100, y: -100, s: 100}, {x: 1110, y: 550, s: 150},
                                {x: -100, y: -100, s: 100}, {x: 630, y: 160, s: 1000}];
//  1-90, 90-270, 272-362, 362-460, 460-550, 550-1100, 1100-1190, 1190-2000, 2000-2090, 2090-2300, 2300-2390, 2390-3000, 3000-3090, 3090-3650, 3650-3740, 3740-4200, 4200-4290, 
//   bt1cy  bt2cy    bt3ev   bt4ev    t5ev     t6ev       bt7ev      bt8ev     bt9ev      bt10ev     bt11ev     bt12ev     bt13ev     bt14ev    bt15ev     bt16ev      bt17ev
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
let interval: number;

let x: number;
let y: number;

playbtn.addEventListener("click", () => {startVideo(), playbtn.style.visibility = "hidden", monImg.src = "./Assets/MonitorBack.png";});
debugbtn.addEventListener("click", toggleDebugMode);
canvas.addEventListener("click", (e) => action(getCursorPosition(canvas, e)));
canvas.addEventListener("mousemove", (e) => hoverVis(getCursorPosition(canvas, e)))

canvas.width = 1920;
canvas.height = 1080;
canvas.style.width = canvas.width*(scaleFactor/10) + "px";

function action(vector: number[]): void {
    console.log(vector);
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
    if (vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]){
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
            interval = setInterval(loop, 1000 / 30);
        }
        else {
            pauseVideo();
            if (doOneThanSkip == true){
                videoInt++;
                console.log(videoInt, sourceString.length);
                
                if(videoInt < sourceString.length) {
                video.src = "./Assets/" + sourceString[videoInt];
                hitbox[0] = hitboxLocation[videoInt].x;
                hitbox[1] = hitboxLocation[videoInt].y;
                hitbox[2] = hitboxLocation[videoInt].s;
                hitbox[3] = hitbox[2];
                }
                hoverVis([x,y]);
                doOneThanSkip = false;
                }
            else {
                console.log("finish");
                if (nextVideo == true) {
                videoInt ++;
                console.log(videoInt, sourceString.length);
                if(videoInt < sourceString.length) {
                video.src = "./Assets/" + sourceString[videoInt];
                hitbox[0] = hitboxLocation[videoInt].x;
                hitbox[1] = hitboxLocation[videoInt].y;
                hitbox[2] = hitboxLocation[videoInt].s;
                hitbox[3] = hitbox[2];
                }
                hoverVis([x,y]);
                startVideo();
                nextVideo = false;
                doOneThanSkip = true;
                }
            }
            startVideo();
        }
    })();

});

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent): number[] {
    const rect: ClientRect = canvas.getBoundingClientRect();
    x = (event.clientX - rect.left)*(10/scaleFactor);
    y = (event.clientY - rect.top)*(10/scaleFactor);
    return[x, y];
}

};