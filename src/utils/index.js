import { nextTick } from 'vue';
/**
 * 获取范围内的随机整数
 * @param {*} minNum 最小值
 * @param {*} maxNum 最大值
 * @returns 整数
 */
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

/**
 * 获取str中的?参数
 * @param {*} str 链接参数
 * @returns {}
 */
export function getQueryString(str = location.search) {
  if (!str) {
    return {};
  }
  if (str.includes('?')) {
    const arr = str.split('?');
    str = arr[arr.length - 1];
  }
  if (str.startsWith('?')) {
    str = str.substr(1);
  }
  const qsArr = str.split('&');
  return qsArr.reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    if (typeof value !== 'undefined') {
      pre[key] = value;
    }
    return pre;
  }, {});
}

/**
 * 获取图片的真实宽高
 * @param {*} img
 * @returns
 */
export function getImgRawSize(img) {
  return Promise.resolve(
    new Promise(function (reslove, reject) {
      let _image = img;
      if (_image instanceof HTMLImageElement) {
        if (_image.naturalWidth) return reslove({ width: _image.naturalWidth, height: _image.naturalHeight });
        img = img.src;
      }
      if (typeof img == 'string') {
        _image = new Image();
        _image.src = img;
      }
      _image.onload = () =>
        reslove({ width: _image.naturalWidth || _image.width, height: _image.naturalHeight || _image.height });
      _image.onerror = () => reject({ width: 0, height: 0 });
    }),
  );
}

/**
 * 将base64图片转成Blob
 * @param {*} base64
 * @returns
 */
export function base64UrlToBlob(base64) {
  const bytes = window.atob(base64.split(',')[1]); //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpg' }); //return Blob对象
}
/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export const lazyImg = (el, arr) => {
  const io = new IntersectionObserver((res) => {
    res.forEach((v) => {
      if (v.isIntersecting) {
        const { img, key } = v.target.dataset;
        if (arr[key]) {
          arr[key]['loading'] = true;
        }
        v.target.src = img;
        v.target.onload = () => {
          io.unobserve(v.target);
          if (arr[key]) {
            arr[key]['loading'] = false;
          }
        };
      }
    });
  });
  nextTick(() => {
    document.querySelectorAll(el).forEach((img) => io.observe(img));
  });
};
/**
 * dom元素添加class
 * @param {*} el  dom 目标元素
 * @param {String} className 类名
 */
export const addClass = (el, className) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
};
/**
 * dom元素删除class
 * @param {*} el dom 目标元素
 * @param {String} className 类名
 */
export const removeClass = (el, className) => {
  el.classList.remove(className);
};

/**
 * 加法精度丢失
 * @param {*} num1
 * @param {*} num2
 */
export const add = (num1, num2) => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (num1 * m + num2 * m) / m;
};
/**
 * 减法精度丢失
 * @param {*} num1
 * @param {*} num2
 */
export const sub = (num1, num2) => {
  let r1, r2, m, n;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  n = Math.max(r1, r2);
  m = Math.pow(10, n);
  return Number(((num1 * m - num2 * m) / m).toFixed(n));
};
/**
 * 乘法精度丢失
 * @param {*} num1
 * @param {*} num2
 */
export const multiply = (num1, num2) => {
  let m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    // console.log(1);
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    // console.log(1);
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};

/**
 * 除法精度丢失
 * @param {Number} num1
 * @param {Number} num2
 */
export const divide = (num1 = 1, num2) => {
  let t1, t2, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split('.')[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace('.', ''));
  r2 = Number(num2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
/**
 * 价格分转化元
 * @param {Number} price
 */
export const calculatePrice = (price = 0, fiexd = 0) => {
  if (!price) price = 0;
  return divide(price, 100).toFixed(fiexd);
};

/**
 * 判断url是不是图片
 * @param {*} url
 * @returns
 */
export function judgeIsImage(url) {
  let img = document.createElement('img');
  img.src = url;
  return new Promise(function (resolve) {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}
/**
 *
 * @param {*} e DOM
 * @param {*} defaultImg  默认显示图片
 */
export function imgError(e, defaultImg) {
  const img = e.srcElement;
  img.src = defaultImg;
  img.onerror = null;
}
/**
 *  阿拉伯数字转中文数字
 * @param {number|string} section
 */
export function numberToChinese(section) {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千', '万', '亿', '万亿', '亿亿'];
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
/**
 * 换行, 空格替换
 * @param {String} str
 *
 */
export function formatPre(str = '') {
  str = str.replace(/(\r\n)|(\n)/g, '<br>');
  str = str.replace(/\s/g, '&nbsp;');
  return str;
}
