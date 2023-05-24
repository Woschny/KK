window.addEventListener("load", hdlLoadMain);

function hdlLoadMain(): void {
const title: HTMLImageElement = <HTMLImageElement>document.querySelector(".backgroundTitle");
const terri: HTMLImageElement = <HTMLImageElement>document.querySelector(".backgroundTerri");
const body: HTMLBodyElement = <HTMLBodyElement>document.querySelector("body");
console.log("v5");
let x: number = 0;
let y: number = 0;
window.addEventListener("mousemove", getCursorPositionMain);

function getCursorPositionMain(event: MouseEvent): void{
    const rect: ClientRect = body.getBoundingClientRect();
    x = (event.clientX - rect.left - screen.width/2);
    y = (event.clientY - rect.top - screen.height/2);
    title.style.top = -12 + 0.007* - y + "%";
    title.style.left = 0 + 0.007* - x + "%";
    terri.style.top = -5 + 0.003* - y + "%";
    terri.style.left = 0 + 0.003* - x + "%";
}

}