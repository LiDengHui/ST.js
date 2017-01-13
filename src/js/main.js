import ST from '../SThree/index';

let PImage = ST.Particle.PImage;

let TestST = {};

TestST.renderer = new ST.Renderer(document.body.offsetWidth, document.body.offsetHeight);

document
    .body
    .appendChild(TestST.renderer.view);

let img = new Image();
img.src = "/assert/dicom/572991083d89acc32bb32a6a2be088b6";
let pimage =null;
img.onload = () => {
    pimage = new PImage(img);
    TestST
        .renderer
        .render(pimage);
    
    bindClick();
};

let bindClick=function(){
    let canvas = TestST.renderer.view;
    canvas.onmousedown=function(ev){
        let base_x = ev.x;
        let base_y = ev.y;
        canvas.onmouseup =function(ev){
            canvas.onmousemove = null;
            canvas.onmouseup = null;
        };

        canvas.onmousemove=function(ev){
            let clevel = (ev.x-base_x)*1;
            let cwidth = (ev.y-base_y)*1;
            base_x = ev.x;
            base_y = ev.y;
            pimage.setPlevel(pimage.plevel+clevel);
            pimage.setPwidth(pimage.pwidth+cwidth);

            throttle(function(){
                TestST.renderer.render(pimage);
            },40)();
        };

        
    };
};


let throttle = function(fn, interval) {
    let _self = fn,
        timer,
        firstTime = true;

    return function() {
        let args = arguments,
            _me = this;

        if (firstTime) {
            _self.apply(_me, args);
            return firstTime = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me, args);
        }, interval || 500);
    };
};

