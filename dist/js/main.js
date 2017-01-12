(function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Renderer = function () {
    //domElement
    function Renderer(width, height) {
        classCallCheck(this, Renderer);
        this.view = {};
        this.gl = {};
        this.canvas = {};

        var canvas = this.canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this.view = canvas;
        this.gl = Renderer.create3DContext(canvas);
        return this;
    }

    createClass(Renderer, [{
        key: "render",

        /**
         * 显示
         */
        value: function render(particle) {
            var gl = this.gl;
            var canvas = this.canvas;
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            var shader = particle.filters[0];
            this.gl.program = shader.initShader(this.gl);
            particle.loadBuffer(this.gl);
            console.dir(particle);

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, particle.num);
        }
    }], [{
        key: "create3DContext",
        value: function create3DContext(canvas, options) {

            var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            var context = null;
            for (var i = 0; i < names.length; i++) {
                try {
                    context = canvas.getContext(names[i], options);
                } catch (e) {}

                if (context) {
                    break;
                }
            }
            return context;
        }
    }]);
    return Renderer;
}();

var Base = function () {
    function Base(gl, vertiecs, colors, num) {
        classCallCheck(this, Base);
        this.gl = {};
        this.vertiecs = [];
        this.colors = [];
        this.num = 0;

        this.vertiecs = vertiecs;
        this.colors = colors;
        this.num = num;
        return this;
    }

    createClass(Base, [{
        key: 'initBuffer',
        value: function initBuffer(gl) {
            this.gl = gl;
            // Write the vertex coordinates and color to the buffer object
            if (!Base.initArrayBuffer(this.gl, this.vertiecs, 3, gl.FLOAT, 'aVertexPosition')) return -1;

            if (!Base.initArrayBuffer(this.gl, this.colors, 4, gl.FLOAT, 'aVertexColor')) return -1;

            return this.num;
        }
    }], [{
        key: 'initArrayBuffer',
        value: function initArrayBuffer(gl, data, num, type, attribute) {
            // Create a buffer object
            var buffer = gl.createBuffer();
            if (!buffer) {
                console.log('Failed to create the buffer object');
                return false;
            }
            // Write date into the buffer object
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
            // Assign the buffer object to the attribute variable
            var a_attribute = gl.getAttribLocation(gl.program, attribute);
            if (a_attribute < 0) {
                console.log('Failed to get the storage location of ' + attribute);
                return false;
            }
            gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
            // Enable the assignment of the buffer object to the attribute variable
            gl.enableVertexAttribArray(a_attribute);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            return true;
        }
    }]);
    return Base;
}();

var Base$2 = function () {
    function Base(gl, vshader, fshader) {
        classCallCheck(this, Base);
        this.gl = {};
        this.vshader = {};
        this.fshader = {};
        this.program = {};

        this.gl = gl;
        this.vshader = vshader;
        this.fshader = fshader;

        return this;
    }

    createClass(Base, [{
        key: 'initShader',
        value: function initShader(gl) {
            this.gl = gl;
            this.program = Base.createProgram(this.gl, this.vshader, this.fshader);

            if (!this.program) {
                console.log('Failed to create program');
                return null;
            }

            gl.useProgram(this.program);
            gl.program = this.program;

            return this.program;
        }
    }], [{
        key: 'createProgram',
        value: function createProgram(gl, vshader, fshader) {
            // Create shader object
            var vertexShader = Base.loadShader(gl, gl.VERTEX_SHADER, vshader);
            var fragmentShader = Base.loadShader(gl, gl.FRAGMENT_SHADER, fshader);

            if (!vertexShader || !fragmentShader) {
                return null;
            }

            // Create a program object
            var program = gl.createProgram();
            if (!program) {
                return null;
            }

            // Attach the shader objects
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);

            // Link the program object
            gl.linkProgram(program);

            // Check the result of linking
            var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!linked) {
                var error = gl.getProgramInfoLog(program);
                console.log('Failed to link program: ' + error);
                gl.deleteProgram(program);
                gl.deleteShader(fragmentShader);
                gl.deleteShader(vertexShader);
                return null;
            }
            return program;
        }
    }, {
        key: 'loadShader',
        value: function loadShader(gl, type, source) {
            // Create shader object
            var shader = gl.createShader(type);
            if (shader == null) {
                console.log('unable to create shader');
                return null;
            }

            // Set the shader program
            gl.shaderSource(shader, source);

            // Compile the shader
            gl.compileShader(shader);

            // Check the result of compilation
            var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compiled) {
                var error = gl.getShaderInfoLog(shader);
                console.log('Failed to compile shader: ' + error);
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        }
    }]);
    return Base;
}();

var Cateyes = function (_Base) {
    inherits(Cateyes, _Base);

    function Cateyes(gl, vshader, fshader) {
        var _ret;

        classCallCheck(this, Cateyes);

        var _this = possibleConstructorReturn(this, (Cateyes.__proto__ || Object.getPrototypeOf(Cateyes)).call(this));

        _this.vshader = ['attribute vec3 aVertexPosition;', 'attribute vec4 aVertexColor;',
        // 'uniform mat4 uMVMatrix;',
        // 'uniform mat4 uPMatrix;',
        'varying lowp vec4 vColor;', 'void main(void) {', '   gl_Position =vec4(aVertexPosition, 1.0);',

        // '   gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);',
        '   gl_PointSize =11.4;', '   vec4 c = aVertexColor;', '   float gray = (c.r * 65536.0) + (c.g * 256.0) + (c.b);', '   gray = gray - 2047.0/1000.0;', '   gray = gray - 50.0/1000.0 + 350.0 / 2000.0;', '   gray = gray / 350.0*1000.0;', '   vColor = vec4(gray,gray,gray,1.0);', '}'].join('\n');
        _this.fshader = ['varying lowp vec4 vColor;', 'void main(void) {', 'gl_FragColor = vColor;', '} '].join('\n');

        _this.gl = gl;
        _this.vshader = vshader || _this.vshader;
        _this.fshader = fshader || _this.fshader;

        return _ret = _this, possibleConstructorReturn(_this, _ret);
    }

    return Cateyes;
}(Base$2);

var Shader = {
    Cateyes: Cateyes
};

var PImage$1 = function (_Base) {
    inherits(PImage, _Base);

    function PImage(img) {
        var _ret;

        classCallCheck(this, PImage);

        var _this = possibleConstructorReturn(this, (PImage.__proto__ || Object.getPrototypeOf(PImage)).call(this));

        _this.vertiecs = [];
        _this.colors = [];
        _this.filters = [];

        var pixels = PImage.getPixels(img);
        _this.colors = PImage.getColor(pixels);
        _this.vertiecs = PImage.getPosition(pixels);
        _this.num = pixels.width * pixels.height;
        _this.filters.push(new Shader.Cateyes());
        return _ret = _this, possibleConstructorReturn(_this, _ret);
    }

    createClass(PImage, [{
        key: 'loadBuffer',
        value: function loadBuffer(gl) {
            this.gl = gl;
            var n = this.initBuffer(gl);
            if (n < 0) {
                console.log('Failed to set the vertex information');
                return false;
            }
            return true;
        }
    }], [{
        key: 'getPixels',
        value: function getPixels(img) {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            return ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    }, {
        key: 'getColor',
        value: function getColor(pixels) {
            var data = pixels.data;
            var color = [];
            for (var i = 0; i < data.length; i += 4) {
                color.push(data[i] / 1000, data[i + 1] / 1000, data[i + 2] / 1000, data[i + 3] / 1000);
            }
            return color;
        }
    }, {
        key: 'getPosition',
        value: function getPosition(pixels) {
            var data = pixels.data;
            var vertiecs = [];
            var calposition = function calposition(n, m) {
                return (2 * n - m + 1) / 1000;
            };
            var width = pixels.width;
            var height = pixels.height;
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    vertiecs.push(calposition(j, height), -calposition(i, width), 0);
                }
            }

            return vertiecs;
        }
    }]);
    return PImage;
}(Base);

var Particle = {
    PImage: PImage$1
};

var ST = {
    Renderer: Renderer,
    Particle: Particle
};

var PImage = ST.Particle.PImage;

var TestST = {};

TestST.renderer = new ST.Renderer(document.body.offsetWidth, document.body.offsetHeight);

document.body.appendChild(TestST.renderer.view);

var img = new Image();
img.src = "/assert/dicom/572991083d89acc32bb32a6a2be088b6";

img.onload = function () {
    var pimage = new PImage(img);
    TestST.renderer.render(pimage);
};

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
