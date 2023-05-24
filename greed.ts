window.addEventListener("load", hdlLoad);
console.log("v5");

function hdlLoad(): void {
localStorage.clear();
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const body: HTMLBodyElement = <HTMLBodyElement>document.querySelector("body");
const playbtn: HTMLElement = <HTMLElement>document.getElementById("play");
const backbtn: HTMLElement = <HTMLElement>document.getElementById("back");
const TextImg: HTMLImageElement = <HTMLImageElement>document.getElementById("TextImg");
const audioC: HTMLAudioElement = <HTMLAudioElement>document.getElementById("C");
const audioG: HTMLAudioElement = <HTMLAudioElement>document.getElementById("G");
const ctx: CanvasRenderingContext2D    = canvas.getContext("2d");
let started: boolean = false;
let videoInt: number = 0;
let video: HTMLVideoElement  = <HTMLVideoElement>document.getElementById("T1");
let sourceString: string[] = [  "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",
                                "T13", "T14", "T15", "T16", "T17", "T18", "T19", "T20", "T21", "T22", "T23", "T24",
                                "T25", "T26", "T27", "T28", "T29", "T30", "T31", "T32", "T33"];
let hitboxLocation: Vector[] = [{x: 420, y: 500, s: 100}, {x: -100, y: -100, s: 100}, {x: 540, y: 360, s: 150}, {x: -100, y: -100, s: 100}, {x: 520, y: 340, s: 200}, 
                                {x: -100, y: -100, s: 100}, {x: 630, y: 0, s: 800}, {x: -100, y: -100, s: 100}, {x: 660, y: 400, s: 260}, {x: -100, y: -100, s: 100},
                                {x: 0, y: 0, s: 1300}, {x: -100, y: -100, s: 100}, {x: 320, y: 330, s: 150}, {x: -100, y: -100, s: 100}, {x: 730, y: 380, s: 150},
                                {x: -100, y: -100, s: 100}, {x: 400, y: 130, s: 500}, {x: -100, y: -100, s: 100}, {x: 590, y: 450, s: 200}, {x: -100, y: -100, s: 100},
                                {x: 550, y: 230, s: 250}, {x: -100, y: -100, s: 100}, {x: 400, y: 150, s: 250}, {x: -100, y: -100, s: 100}, {x: 550, y: 230, s: 250}, 
                                {x: -100, y: -100, s: 100}, {x: 300, y: 350, s: 250}, {x: -100, y: -100, s: 100}, {x: 550, y: 230, s: 250}, {x: -100, y: -100, s: 100},
                                {x: 550, y: 230, s: 250}, {x: -100, y: -100, s: 100}, {x: 0, y: 0, s: 1300}];
//  1-90, 90-270, 272-362, 362-460, 460-550, 550-1100, 1100-1190, 1190-2000,
//  lp1ev  lp2ev   lp3cy    lp4ev    lp5ev     lp6ev     lp7ev     lp8ev     

//  2000-2090, 2090-2300, 2300-2390, 2390-3000, 3000-3090, 3090-3650, 3650-3740, 3740-4200, 4200-4290, 4290-4380, 4380-4470, 4470-5000, 5000-5087, 5087-5400, 5400-5490
//    lp9ev      lp10ev     lp11ev     lp12ev     lp13ev     lp14ev    lp15ev     lp16ev      lp17ev     lp18ev    lp19ev      lp20ev     lp21ev    lp22ev      lp23ev

//  5490-5580, 5580-5670, 5670-6000, 6000-6090, 6090-6420, 6420-6510, 6510-6600, 6600-6690, 6690-7200, 7200-7290
//    lp24ev    lp25ev      lp26ev    lp27ev     lp28ev    lp29ev     lp30ev     lp31ev    xlp32ev       lp33ev
let hitbox: number[] = [hitboxLocation[0].x*screen.width/1280, hitboxLocation[0].y*screen.width/1280, hitboxLocation[0].s*screen.width/1280, hitboxLocation[0].s*screen.width/1280];
interface Vector {
    x: number;
    y: number;
    s: number;
}

let nextVideo: boolean = false;
let doOneThanSkip: boolean = false;
let debugMode: boolean = false;

let x: number;
let y: number;

playbtn.addEventListener("click", () => {startVideo(), startAudio(), playbtn.style.visibility = "hidden",started = true, document.documentElement.requestFullscreen(), TextImg.src = "./Assets/T1.png"; });
backbtn.addEventListener("click", back);
canvas.addEventListener("click", (e) => action(getCursorPosition(canvas, e)));
canvas.addEventListener("mousemove", (e) => hoverVis(getCursorPosition(canvas, e)))
canvas.width = screen.width;
canvas.height = screen.width/(1920/1080);
document.getElementById("OverlayImg").style.width = canvas.width + "px";
playbtn.addEventListener("mouseover", () => playbtn.style.cursor = "url(./Assets/Grab.png) 50 50, auto");
backbtn.addEventListener("mouseover", () => backbtn.style.cursor = "url(./Assets/Grab.png) 50 50, auto");


function back(): void {
    window.open("./main.html", "_self");
}

function action(vector: number[]): void {
    console.log(vector);
    if (nextVideo == false && vector[0] >= hitbox[0] && vector[0] <= hitbox[0] + hitbox[2] && vector[1] >= hitbox[1] && vector[1] <= hitbox[1] + hitbox[3]){
        console.log("hit");
        nextVideo = true;
        audioG.play();
        video.playbackRate = 5;
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
    canvas.style.cursor = "url(./Assets/Grab.png) 50 50, auto";
    body.style.cursor = "url(./Assets/Grab.png) 50 50, auto";
    }
    else {
    canvas.style.cursor = "url(./Assets/Fist.png) 50 50, auto";
    body.style.cursor = "url(./Assets/Fist.png) 50 50, auto";
    }
}

function startVideo(): void {
        console.log(video);
        video.play();
        LoopStart();         
}

function startAudio(): void {
    audioC.volume = 0.2;
    audioC.play();
}

function LoopStart(): void {
    let $this: HTMLVideoElement = video;
    (function loop(): void {
        if (!$this.ended) {
            ctx.drawImage($this, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(TextImg,0, 0, canvas.width, canvas.height)
            if(debugMode == true) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            ctx.fillRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
            }            
            setTimeout(loop, 1000 / 24);
        }
        else {
            if (doOneThanSkip == true){
                videoInt++;
                console.log(videoInt, sourceString.length);
                if(videoInt < sourceString.length) {
                video = <HTMLVideoElement>document.getElementById(sourceString[videoInt] + "");
                if(videoInt%2 == 0){
                TextImg.src = "./Assets/" + sourceString[videoInt] + ".png";
                }
                else {
                TextImg.src = "./Assets/T0.png"; 
                }
                hitbox[0] = hitboxLocation[videoInt].x*screen.width/1280;
                hitbox[1] = hitboxLocation[videoInt].y*screen.width/1280;
                hitbox[2] = hitboxLocation[videoInt].s*screen.width/1280;
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
                video = <HTMLVideoElement>document.getElementById(sourceString[videoInt] + "");
                if(videoInt%2 == 0){
                    TextImg.src = "./Assets/" + sourceString[videoInt] + ".png";
                    }
                    else {
                    TextImg.src = "./Assets/T0.png"; 
                    }
                hitbox[0] = hitboxLocation[videoInt].x*screen.width/1280;
                hitbox[1] = hitboxLocation[videoInt].y*screen.width/1280;
                hitbox[2] = hitboxLocation[videoInt].s*screen.width/1280;
                hitbox[3] = hitbox[2];
                }
                hoverVis([x,y]);
                nextVideo = false;
                doOneThanSkip = true;
                }
            }
            startVideo();
        }
    })();

};

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent): number[] {
    const rect: ClientRect = canvas.getBoundingClientRect();
    x = (event.clientX - rect.left);
    y = (event.clientY - rect.top);
    return[x, y];
}

};