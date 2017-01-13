import {matIV} from './minMatrix.js';
import Shader from './Shader/index';

export default class Renderer {
    view = {}; //domElement
    gl = {};
    canvas = {};
    constructor(width, height) {
        let canvas = this.canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this.view = canvas;
        this.gl = Renderer.create3DContext(canvas);
        let shader = new Shader.Cateyes();
        this.gl.program = shader.initShader(this.gl)
        return this;
    }

    static create3DContext(canvas, options) {

        let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let context = null;
        for (let i = 0; i < names.length; i++) {
            try {
                context = canvas.getContext(names[i], options);
            } catch (e) {}

            if (context) {
                break;
            }
        }
        return context;
    }
    /**
     * 显示
     */
    render(particle) {
        let gl = this.gl;
        let canvas = this.canvas;
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.enable(gl.DEPTH_TEST);


        // let shader = particle.filters[0];
        // this.gl.program = shader.initShader(this.gl);
        
        var m = new matIV();  
        
        var mMatrix = m.identity(m.create());  
        var vMatrix = m.identity(m.create());  
        var pMatrix = m.identity(m.create());  
        var mvpMatrix = m.identity(m.create());  
        
        // 视图变换坐标矩阵
        m.lookAt([0.0, 0.0, 1.0], [0, 0, 0], [0, 2, 0], vMatrix);  
        
        // 投影坐标变换矩阵         
        m.perspective(90, canvas.width / canvas.height, 0.01, 1000, pMatrix);  
        
        m.multiply(pMatrix, vMatrix, mvpMatrix);  
        m.multiply(mvpMatrix, mMatrix, mvpMatrix);  
        
        var uniLocation = gl.getUniformLocation(this.gl.program, 'mvpMatrix');  
        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);          


       
        let plevelLocation = gl.getUniformLocation(this.gl.program,'plevel');
        let pwidthLocation = gl.getUniformLocation(this.gl.program,'pwidth');
        let plengthLocation = gl.getUniformLocation(this.gl.program,'plength');
        let pinverseLocation = gl.getUniformLocation(this.gl.program,'pinverse');
        gl.uniform1f(plevelLocation,particle.plevel);
        gl.uniform1f(pwidthLocation,particle.pwidth);
        gl.uniform1f(plengthLocation,particle.plength);
        gl.uniform1f(pinverseLocation,particle.pinverse);
        gl.viewport(0, 0, canvas.width, canvas.height);

        particle.loadBuffer(this.gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, particle.num);
    }
}