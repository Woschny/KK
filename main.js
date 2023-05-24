window.addEventListener("load", hdlLoadMain);
function hdlLoadMain() {
    var title = document.querySelector(".backgroundTitle");
    var terri = document.querySelector(".backgroundTerri");
    var body = document.querySelector("body");
    console.log("v5");
    var x = 0;
    var y = 0;
    window.addEventListener("mousemove", getCursorPositionMain);
    function getCursorPositionMain(event) {
        var rect = body.getBoundingClientRect();
        x = (event.clientX - rect.left - screen.width / 2);
        y = (event.clientY - rect.top - screen.height / 2);
        title.style.top = -12 + 0.007 * -y + "%";
        title.style.left = 0 + 0.007 * -x + "%";
        terri.style.top = -5 + 0.003 * -y + "%";
        terri.style.left = 0 + 0.003 * -x + "%";
    }
}
//# sourceMappingURL=main.js.map