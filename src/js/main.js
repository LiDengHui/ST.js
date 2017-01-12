import ST from '../SThree/index';

let PImage = ST.Particle.PImage;

let TestST = {};

TestST.renderer = new ST.Renderer(document.body.offsetWidth, document.body.offsetHeight);

document
    .body
    .appendChild(TestST.renderer.view);

let img = new Image();
img.src = "/assert/dicom/572991083d89acc32bb32a6a2be088b6";

img.onload = () => {
    let pimage = new PImage(img);
    TestST
        .renderer
        .render(pimage);
};
