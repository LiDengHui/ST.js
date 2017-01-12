export default class Renderer{
    view={}; //domElement
    gl={};
    canvas={};
    constructor(width,height){
        let canvas =this.canvas= document.createElement("canvas");
        canvas.width=width;
        canvas.height=height;
        this.view = canvas;
        this.gl = Renderer.create3DContext(canvas);
        return this;
    }

    static create3DContext(canvas,options){

        let names=["webgl","experimental-webgl","webkit-3d","moz-webgl"];
        let context = null;
        for(let i=0;i<names.length;i++){
            try{
                context = canvas.getContext(names[i],options);
            }catch(e){}

            if(context){
                break;
            }
        }
        return context;
    }    
    /**
     * 显示
     */
    render(particle){
        let gl = this.gl;
        let canvas = this.canvas;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        
        let shader = particle.filters[0];
        this.gl.program = shader.initShader(this.gl);
        particle.loadBuffer(this.gl);
        console.dir(particle);
        
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0 ,particle.num);

    }
}