import ST from '../SThree/index';

let PImage = ST.Particle.PImage;

let TestST = {};

TestST.renderer = new ST.Renderer(document.body.offsetWidth, document.body.offsetHeight);

document
    .body
    .appendChild(TestST.renderer.view);

let img = new Image();
img.src = "/assert/dicom/12e20f8ce961763f7b1143e9077609e9";
let pimage =null;
img.onload = () => {
    pimage = new PImage(img);
    TestST
        .renderer
        .render(pimage);
    
    bindClick();
};
document.querySelector('body').addEventListener('touchstart', function (ev) {
    event.preventDefault();
});
let bindClick=function(){
    let canvas = TestST.renderer.view;
    let base_x =null;
    let base_y = null;
    
    function move1(ev){
        if(base_x==null||base_y==null){
            base_x = ev.x;
            base_y = ev.y;
            return ;
        }
        let clevel = (ev.x-base_x)*5;
        let cwidth = (ev.y-base_y)*5;
        base_x = ev.x;
        base_y = ev.y;
        pimage.setPlevel(pimage.plevel+clevel);
        pimage.setPwidth(pimage.pwidth+cwidth);

        throttle(function(){
            TestST.renderer.render(pimage);
        })();
    };

    function move2(ev){
        if(base_x==null||base_y==null){
            base_x = ev.touches[0].screenX;
            base_y = ev.touches[0].screenY;
            return ;
        }
        let clevel = (ev.touches[0].screenX-base_x)*5;
        let cwidth = (ev.touches[0].screenY-base_y)*5;
        base_x = ev.touches[0].screenX;
        base_y = ev.touches[0].screenY;
        pimage.setPlevel(pimage.plevel+clevel);
        pimage.setPwidth(pimage.pwidth+cwidth);

        throttle(function(){
            TestST.renderer.render(pimage);
        })();
    };
    canvas.addEventListener('touchmove',move2,false);
    canvas.onmousemove=move1;
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
        }, interval);
    };
};

