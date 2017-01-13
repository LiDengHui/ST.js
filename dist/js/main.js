(function () {
'use strict';

// ------------------------------------------------------------------------------------------------
// minMatrix.js
// version 0.0.3
// ------------------------------------------------------------------------------------------------

function matIV() {
	this.create = function () {
		return new Float32Array(16);
	};
	this.identity = function (dest) {
		dest[0] = 1;dest[1] = 0;dest[2] = 0;dest[3] = 0;
		dest[4] = 0;dest[5] = 1;dest[6] = 0;dest[7] = 0;
		dest[8] = 0;dest[9] = 0;dest[10] = 1;dest[11] = 0;
		dest[12] = 0;dest[13] = 0;dest[14] = 0;dest[15] = 1;
		return dest;
	};
	this.multiply = function (mat1, mat2, dest) {
		var a = mat1[0],
		    b = mat1[1],
		    c = mat1[2],
		    d = mat1[3],
		    e = mat1[4],
		    f = mat1[5],
		    g = mat1[6],
		    h = mat1[7],
		    i = mat1[8],
		    j = mat1[9],
		    k = mat1[10],
		    l = mat1[11],
		    m = mat1[12],
		    n = mat1[13],
		    o = mat1[14],
		    p = mat1[15],
		    A = mat2[0],
		    B = mat2[1],
		    C = mat2[2],
		    D = mat2[3],
		    E = mat2[4],
		    F = mat2[5],
		    G = mat2[6],
		    H = mat2[7],
		    I = mat2[8],
		    J = mat2[9],
		    K = mat2[10],
		    L = mat2[11],
		    M = mat2[12],
		    N = mat2[13],
		    O = mat2[14],
		    P = mat2[15];
		dest[0] = A * a + B * e + C * i + D * m;
		dest[1] = A * b + B * f + C * j + D * n;
		dest[2] = A * c + B * g + C * k + D * o;
		dest[3] = A * d + B * h + C * l + D * p;
		dest[4] = E * a + F * e + G * i + H * m;
		dest[5] = E * b + F * f + G * j + H * n;
		dest[6] = E * c + F * g + G * k + H * o;
		dest[7] = E * d + F * h + G * l + H * p;
		dest[8] = I * a + J * e + K * i + L * m;
		dest[9] = I * b + J * f + K * j + L * n;
		dest[10] = I * c + J * g + K * k + L * o;
		dest[11] = I * d + J * h + K * l + L * p;
		dest[12] = M * a + N * e + O * i + P * m;
		dest[13] = M * b + N * f + O * j + P * n;
		dest[14] = M * c + N * g + O * k + P * o;
		dest[15] = M * d + N * h + O * l + P * p;
		return dest;
	};
	this.scale = function (mat, vec, dest) {
		dest[0] = mat[0] * vec[0];
		dest[1] = mat[1] * vec[0];
		dest[2] = mat[2] * vec[0];
		dest[3] = mat[3] * vec[0];
		dest[4] = mat[4] * vec[1];
		dest[5] = mat[5] * vec[1];
		dest[6] = mat[6] * vec[1];
		dest[7] = mat[7] * vec[1];
		dest[8] = mat[8] * vec[2];
		dest[9] = mat[9] * vec[2];
		dest[10] = mat[10] * vec[2];
		dest[11] = mat[11] * vec[2];
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
		return dest;
	};
	this.translate = function (mat, vec, dest) {
		dest[0] = mat[0];dest[1] = mat[1];dest[2] = mat[2];dest[3] = mat[3];
		dest[4] = mat[4];dest[5] = mat[5];dest[6] = mat[6];dest[7] = mat[7];
		dest[8] = mat[8];dest[9] = mat[9];dest[10] = mat[10];dest[11] = mat[11];
		dest[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12];
		dest[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13];
		dest[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
		dest[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
		return dest;
	};
	this.rotate = function (mat, angle, axis, dest) {
		var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
		if (!sq) {
			return null;
		}
		var a = axis[0],
		    b = axis[1],
		    c = axis[2];
		if (sq != 1) {
			sq = 1 / sq;a *= sq;b *= sq;c *= sq;
		}
		var d = Math.sin(angle),
		    e = Math.cos(angle),
		    f = 1 - e,
		    g = mat[0],
		    h = mat[1],
		    i = mat[2],
		    j = mat[3],
		    k = mat[4],
		    l = mat[5],
		    m = mat[6],
		    n = mat[7],
		    o = mat[8],
		    p = mat[9],
		    q = mat[10],
		    r = mat[11],
		    s = a * a * f + e,
		    t = b * a * f + c * d,
		    u = c * a * f - b * d,
		    v = a * b * f - c * d,
		    w = b * b * f + e,
		    x = c * b * f + a * d,
		    y = a * c * f + b * d,
		    z = b * c * f - a * d,
		    A = c * c * f + e;
		if (angle) {
			if (mat != dest) {
				dest[12] = mat[12];dest[13] = mat[13];
				dest[14] = mat[14];dest[15] = mat[15];
			}
		} else {
			dest = mat;
		}
		dest[0] = g * s + k * t + o * u;
		dest[1] = h * s + l * t + p * u;
		dest[2] = i * s + m * t + q * u;
		dest[3] = j * s + n * t + r * u;
		dest[4] = g * v + k * w + o * x;
		dest[5] = h * v + l * w + p * x;
		dest[6] = i * v + m * w + q * x;
		dest[7] = j * v + n * w + r * x;
		dest[8] = g * y + k * z + o * A;
		dest[9] = h * y + l * z + p * A;
		dest[10] = i * y + m * z + q * A;
		dest[11] = j * y + n * z + r * A;
		return dest;
	};
	this.lookAt = function (eye, center, up, dest) {
		var eyeX = eye[0],
		    eyeY = eye[1],
		    eyeZ = eye[2],
		    upX = up[0],
		    upY = up[1],
		    upZ = up[2],
		    centerX = center[0],
		    centerY = center[1],
		    centerZ = center[2];
		if (eyeX == centerX && eyeY == centerY && eyeZ == centerZ) {
			return this.identity(dest);
		}
		var x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
		z0 = eyeX - center[0];z1 = eyeY - center[1];z2 = eyeZ - center[2];
		l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
		z0 *= l;z1 *= l;z2 *= l;
		x0 = upY * z2 - upZ * z1;
		x1 = upZ * z0 - upX * z2;
		x2 = upX * z1 - upY * z0;
		l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
		if (!l) {
			x0 = 0;x1 = 0;x2 = 0;
		} else {
			l = 1 / l;
			x0 *= l;x1 *= l;x2 *= l;
		}
		y0 = z1 * x2 - z2 * x1;y1 = z2 * x0 - z0 * x2;y2 = z0 * x1 - z1 * x0;
		l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
		if (!l) {
			y0 = 0;y1 = 0;y2 = 0;
		} else {
			l = 1 / l;
			y0 *= l;y1 *= l;y2 *= l;
		}
		dest[0] = x0;dest[1] = y0;dest[2] = z0;dest[3] = 0;
		dest[4] = x1;dest[5] = y1;dest[6] = z1;dest[7] = 0;
		dest[8] = x2;dest[9] = y2;dest[10] = z2;dest[11] = 0;
		dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
		dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
		dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
		dest[15] = 1;
		return dest;
	};
	this.perspective = function (fovy, aspect, near, far, dest) {
		var t = near * Math.tan(fovy * Math.PI / 360);
		var r = t * aspect;
		var a = r * 2,
		    b = t * 2,
		    c = far - near;
		dest[0] = near * 2 / a;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		dest[4] = 0;
		dest[5] = near * 2 / b;
		dest[6] = 0;
		dest[7] = 0;
		dest[8] = 0;
		dest[9] = 0;
		dest[10] = -(far + near) / c;
		dest[11] = -1;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = -(far * near * 2) / c;
		dest[15] = 0;
		return dest;
	};
	this.ortho = function (left, right, top, bottom, near, far, dest) {
		var h = right - left;
		var v = top - bottom;
		var d = far - near;
		dest[0] = 2 / h;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		dest[4] = 0;
		dest[5] = 2 / v;
		dest[6] = 0;
		dest[7] = 0;
		dest[8] = 0;
		dest[9] = 0;
		dest[10] = -2 / d;
		dest[11] = 0;
		dest[12] = -(left + right) / h;
		dest[13] = -(top + bottom) / v;
		dest[14] = -(far + near) / d;
		dest[15] = 1;
		return dest;
	};
	this.transpose = function (mat, dest) {
		dest[0] = mat[0];dest[1] = mat[4];
		dest[2] = mat[8];dest[3] = mat[12];
		dest[4] = mat[1];dest[5] = mat[5];
		dest[6] = mat[9];dest[7] = mat[13];
		dest[8] = mat[2];dest[9] = mat[6];
		dest[10] = mat[10];dest[11] = mat[14];
		dest[12] = mat[3];dest[13] = mat[7];
		dest[14] = mat[11];dest[15] = mat[15];
		return dest;
	};
	this.inverse = function (mat, dest) {
		var a = mat[0],
		    b = mat[1],
		    c = mat[2],
		    d = mat[3],
		    e = mat[4],
		    f = mat[5],
		    g = mat[6],
		    h = mat[7],
		    i = mat[8],
		    j = mat[9],
		    k = mat[10],
		    l = mat[11],
		    m = mat[12],
		    n = mat[13],
		    o = mat[14],
		    p = mat[15],
		    q = a * f - b * e,
		    r = a * g - c * e,
		    s = a * h - d * e,
		    t = b * g - c * f,
		    u = b * h - d * f,
		    v = c * h - d * g,
		    w = i * n - j * m,
		    x = i * o - k * m,
		    y = i * p - l * m,
		    z = j * o - k * n,
		    A = j * p - l * n,
		    B = k * p - l * o,
		    ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
		dest[0] = (f * B - g * A + h * z) * ivd;
		dest[1] = (-b * B + c * A - d * z) * ivd;
		dest[2] = (n * v - o * u + p * t) * ivd;
		dest[3] = (-j * v + k * u - l * t) * ivd;
		dest[4] = (-e * B + g * y - h * x) * ivd;
		dest[5] = (a * B - c * y + d * x) * ivd;
		dest[6] = (-m * v + o * s - p * r) * ivd;
		dest[7] = (i * v - k * s + l * r) * ivd;
		dest[8] = (e * A - f * y + h * w) * ivd;
		dest[9] = (-a * A + b * y - d * w) * ivd;
		dest[10] = (m * u - n * s + p * q) * ivd;
		dest[11] = (-i * u + j * s - l * q) * ivd;
		dest[12] = (-e * z + f * x - g * w) * ivd;
		dest[13] = (a * z - b * x + c * w) * ivd;
		dest[14] = (-m * t + n * r - o * q) * ivd;
		dest[15] = (i * t - j * r + k * q) * ivd;
		return dest;
	};
}

function hsva(h, s, v, a) {
	if (s > 1 || v > 1 || a > 1) {
		return;
	}
	var th = h % 360;
	var i = Math.floor(th / 60);
	var f = th / 60 - i;
	var m = v * (1 - s);
	var n = v * (1 - s * f);
	var k = v * (1 - s * (1 - f));
	var color = new Array();
	if (!s > 0 && !s < 0) {
		color.push(v, v, v, a);
	} else {
		var r = new Array(v, n, m, m, k, v);
		var g = new Array(k, v, v, n, m, m);
		var b = new Array(m, m, k, v, v, n);
		color.push(r[i], g[i], b[i], a);
	}
	return color;
}

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

var Base = function () {
    function Base(gl, vshader, fshader) {
        classCallCheck(this, Base);
        this.gl = {};
        this.vshader = {};
        this.fshader = {};
        this.program = null;

        this.gl = gl;
        this.vshader = vshader;
        this.fshader = fshader;

        return this;
    }

    createClass(Base, [{
        key: 'initShader',
        value: function initShader(gl) {
            this.gl = gl;
            if (!this.program) {
                this.program = Base.createProgram(this.gl, this.vshader, this.fshader);
            }

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

        _this.vshader = ['attribute vec3 aVertexPosition;', 'attribute vec4 aVertexColor;', 'uniform mat4 mvpMatrix;', 'uniform float plevel,pwidth,plength;', 'uniform bool pinverse;', 'varying lowp vec4 vColor;', 'void main(void) {', '   gl_Position =vec4(aVertexPosition, 1.0);', '   gl_Position = mvpMatrix * vec4(aVertexPosition, 1.0);', '   gl_PointSize =11.2;', '   vec4 c = aVertexColor;', '   float gray = (c.r * 65536.0) + (c.g * 256.0) + (c.b);', '   gray = gray - plength/1000.0;', '   gray = gray - plevel/1000.0 + pwidth / 2000.0;', '   gray = gray / pwidth*1000.0;', '   gray = pinverse?(1.0-gray):gray;', '   vColor = vec4(gray,gray,gray,1.0);', '}'].join('\n');
        _this.fshader = ['varying lowp vec4 vColor;', 'void main(void) {', 'gl_FragColor = vColor;', '} '].join('\n');

        _this.gl = gl;
        _this.vshader = vshader || _this.vshader;
        _this.fshader = fshader || _this.fshader;

        return _ret = _this, possibleConstructorReturn(_this, _ret);
    }

    return Cateyes;
}(Base);

var Shader = {
    Cateyes: Cateyes
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
        var shader = new Shader.Cateyes();
        this.gl.program = shader.initShader(this.gl);
        return this;
    }

    createClass(Renderer, [{
        key: 'render',

        /**
         * 显示
         */
        value: function render(particle) {
            var gl = this.gl;
            var canvas = this.canvas;
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

            var plevelLocation = gl.getUniformLocation(this.gl.program, 'plevel');
            var pwidthLocation = gl.getUniformLocation(this.gl.program, 'pwidth');
            var plengthLocation = gl.getUniformLocation(this.gl.program, 'plength');
            var pinverseLocation = gl.getUniformLocation(this.gl.program, 'pinverse');
            gl.uniform1f(plevelLocation, particle.plevel);
            gl.uniform1f(pwidthLocation, particle.pwidth);
            gl.uniform1f(plengthLocation, particle.plength);
            gl.uniform1f(pinverseLocation, particle.pinverse);
            gl.viewport(0, 0, canvas.width, canvas.height);

            particle.loadBuffer(this.gl);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, particle.num);
        }
    }], [{
        key: 'create3DContext',
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

var Base$2 = function () {
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

var PImage$1 = function (_Base) {
    inherits(PImage, _Base);

    function PImage(img, plength, pwidth, plevel, isInverse) {
        var _ret;

        classCallCheck(this, PImage);

        var _this = possibleConstructorReturn(this, (PImage.__proto__ || Object.getPrototypeOf(PImage)).call(this));

        _this.vertiecs = [];
        _this.colors = [];
        _this.filters = [];
        _this.plength = 3121.0;
        _this.pwidth = 8191.0;
        _this.plevel = 4096.0;
        _this.pinverse = false;

        var pixels = PImage.getPixels(img);
        _this.colors = PImage.getColor(pixels);
        _this.vertiecs = PImage.getPosition(pixels);
        _this.num = pixels.width * pixels.height;
        _this.filters.push(new Shader.Cateyes());
        plength && (_this.plength = plength);
        pwidth && (_this.pwidth = pwidth);
        plevel && (_this.plevel = plevel);
        isInverse && (_this.pinverse = isInverse);

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
    }, {
        key: 'setPlength',
        value: function setPlength(length) {
            this.plength = length;
        }
    }, {
        key: 'setPwidth',
        value: function setPwidth(width) {
            this.pwidth = width;
        }
    }, {
        key: 'setPlevel',
        value: function setPlevel(level) {
            this.plevel = level;
        }
    }, {
        key: 'setPinverse',
        value: function setPinverse(isInverse) {
            this.inverse = isInverse;
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
}(Base$2);

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
img.src = "/assert/dicom/12e20f8ce961763f7b1143e9077609e9";
var pimage = null;
img.onload = function () {
    pimage = new PImage(img);
    TestST.renderer.render(pimage);

    bindClick();
};
document.querySelector('body').addEventListener('touchstart', function (ev) {
    event.preventDefault();
});
var bindClick = function bindClick() {
    var canvas = TestST.renderer.view;
    var base_x = null;
    var base_y = null;

    function move1(ev) {
        if (base_x == null || base_y == null) {
            base_x = ev.x;
            base_y = ev.y;
            return;
        }
        var clevel = (ev.x - base_x) * 5;
        var cwidth = (ev.y - base_y) * 5;
        base_x = ev.x;
        base_y = ev.y;
        pimage.setPlevel(pimage.plevel + clevel);
        pimage.setPwidth(pimage.pwidth + cwidth);

        throttle(function () {
            TestST.renderer.render(pimage);
        })();
    }

    function move2(ev) {
        if (base_x == null || base_y == null) {
            base_x = ev.touches[0].screenX;
            base_y = ev.touches[0].screenY;
            return;
        }
        var clevel = (ev.touches[0].screenX - base_x) * 5;
        var cwidth = (ev.touches[0].screenY - base_y) * 5;
        base_x = ev.touches[0].screenX;
        base_y = ev.touches[0].screenY;
        pimage.setPlevel(pimage.plevel + clevel);
        pimage.setPwidth(pimage.pwidth + cwidth);

        throttle(function () {
            TestST.renderer.render(pimage);
        })();
    }
    canvas.addEventListener('touchmove', move2, false);
    canvas.onmousemove = move1;
};

var throttle = function throttle(fn, interval) {
    var _self = fn,
        timer = void 0,
        firstTime = true;

    return function () {
        var args = arguments,
            _me = this;

        if (firstTime) {
            _self.apply(_me, args);
            return firstTime = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me, args);
        }, interval);
    };
};

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
