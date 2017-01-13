import Base from './Base';

export default class Cateyes extends Base {

    vshader = [
        'attribute vec3 aVertexPosition;',
        'attribute vec4 aVertexColor;',
        'uniform mat4 mvpMatrix;',
        'uniform float plevel,pwidth,plength;',
        'uniform bool pinverse;',
        'varying lowp vec4 vColor;',
        'void main(void) {',
        '   gl_Position =vec4(aVertexPosition, 1.0);',
        
        '   gl_Position = mvpMatrix * vec4(aVertexPosition, 1.0);',
        '   gl_PointSize =11.2;',
        '   vec4 c = aVertexColor;',
        '   float gray = (c.r * 65536.0) + (c.g * 256.0) + (c.b);',
        '   gray = gray - plength/1000.0;',
        '   gray = gray - plevel/1000.0 + pwidth / 2000.0;',
        '   gray = gray / pwidth*1000.0;',
        '   gray = pinverse?(1.0-gray):gray;',
        '   vColor = vec4(gray,gray,gray,1.0);',
        '}'
    ].join('\n');

    fshader = ['varying lowp vec4 vColor;', 'void main(void) {', 'gl_FragColor = vColor;', '} '].join('\n');

    constructor(gl, vshader, fshader) {
        super();
        this.gl = gl;
        this.vshader = vshader || this.vshader;
        this.fshader = fshader || this.fshader;

        return this;
    }

}
