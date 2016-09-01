var XMLLite=function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var e={};return n.m=t,n.c=e,n.p="/",n(0)}([function(t,n,e){"use strict";mocha.setup("bdd"),e(31),e(32),e(35),mocha.run()},,function(t,n){t.exports=jQuery},,function(t,n){t.exports=XMLLite},function(t,n,e){"use strict";var r=e(6),i=e(9),o=e(8),u=e(10),c=e(11),f=e(7);t.exports=u.extend({global:i},r,o,u,c,f)},function(t,n,e){"use strict";function r(t){return"object"===("undefined"==typeof t?"undefined":l(t))&&d.isFinite(t.length)}function i(t){return r(t)?g.call(t):[]}function o(t){return g.call(t,1)}function u(t,n,e){return t.apply(n,o(e))}function c(t,n){return y(i(t),n)>-1}function f(t){var n=[];return b(t,function(t){c(n,t)||n.push(t)}),n}function s(t){for(var n=i(t),e=[],o=0,u=n.length;o<u;++o)r(n[o])?e=e.concat(n[o]):e[e.length]=n[o];return e}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=e(7),d=e(8),m=a.isArray,p=Array.prototype,g=p.slice,h=function(t){return function(n,e,r){var i=void 0,o=n.length>>>0;if(0===o)return-1;if(r?r<0&&(r=Math.max(0,n.length+r)):r=t?0:n.length,t){for(i=r;i<n.length;i++)if(n[i]===e)return i}else for(i=r;i>=0;i--)if(n[i]===e)return i;return-1}},y=p.indexOf?function(t){return u(p.indexOf,t,arguments)}:h(!0),v=p.lastIndexOf?function(t){return u(p.lastIndexOf,t,arguments)}:h(),b=p.forEach?function(t){u(p.forEach,t,arguments)}:function(t,n,e){for(var r=i(t),o=0;o<r.length;o++)n.call(e,r[o],o,t)},x=p.every?function(t){return u(p.every,t,arguments)}:function(t,n,e){for(var r=i(t),o=0;o<r.length;o++)if(!n.call(e,r[o],o,t))return!1;return!0},j=p.filter?function(t){return u(p.filter,t,arguments)}:function(t,n,e){var r=[];return b(t,function(i,o){n.call(e,i,o,t)&&r.push(i)}),r},w=p.map?function(t){return u(p.map,t,arguments)}:function(t,n,e){var r=[];return b(t,function(i,o){r.push(n.call(e,i,o,t))}),r},S=p.some?function(t){return u(p.some,t,arguments)}:function(t,n,e){var r=void 0;for(r=0;r<t.length;r++)if(n.call(e,t[r],r,t))return!0;return!1},O=p.reduce?function(t){return u(p.reduce,t,arguments)}:function(t,n,e){var r=void 0;e&&(r=e);for(var i=0;i<t.length;i++)r=r?n(r,t[i],i,t):t[i];return r},A=p.reduceRight?function(t){return u(p.reduceRight,t,arguments)}:function(t,n,e){var r=void 0;e&&(r=e);for(var i=t.length-1;i>=0;i--)r=r?n(r,t[i],i,t):t[i];return r},L={contains:c,each:b,every:x,filter:j,flatten:s,index:h,indexOf:y,isArray:m,isArrayLike:r,lastIndexOf:v,map:w,reduce:O,reduceRight:A,some:S,toArray:i,uniq:f,forEach:b,difference:function(t){var n=s(o(arguments));return j(t,function(t){return!c(n,t)})},eachReverse:function(t,n,e){for(var r=i(t),o=r.length-1;o>-1;o-=1)n.call(e,r[o],o,t)},intersect:function(t,n){var e=[];return b(t,function(t){c(n,t)&&e.push(t)}),e},range:function N(t,n,e){null==n&&(n=t||0,t=0),e||(e=n<t?-1:1);for(var r=Math.max(Math.ceil((n-t)/e),0),N=new Array(r),i=0;i<r;i++,t+=e)N[i]=t;return N},remove:function(t,n,e){var r=t.length;if(!d.isNumber(n))return t;var i=t.slice((e||n)+1||r);return t.length=n<0?r+n:n,t.push.apply(t,i)},union:function(){var t=[],n=i(arguments);return b(n,function(n){t=t.concat(n)}),f(t)}};t.exports=L},function(t,n){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},r={}.toString,i=function(t,n){return r.call(t)==="[object "+n+"]"},o={isType:i,isArguments:function(t){return i(t,"Arguments")},isArray:Array.isArray?Array.isArray:function(t){return i(t,"Array")},isArrayLike:function(t){return"object"===("undefined"==typeof t?"undefined":e(t))&&isFinite(t.length)},isBoolean:function(t){return i(t,"Boolean")},isDate:function(t){return i(t,"Date")},isError:function(t){return i(t,"Error")},isFunction:function(t){return i(t,"Function")},isNull:function(t){return null===t},isNumber:function(t){return i(t,"Number")},isPlainObject:function(t){return i(t,"Object")},isRegExp:function(t){return i(t,"RegExp")},isString:function(t){return i(t,"String")},isUndefined:function(t){return void 0===t},getType:function(t){var n=r.call(t);return n.replace(/^\[object /,"").replace(/\]$/,"")},isObject:function(t){var n="undefined"==typeof t?"undefined":e(t);return"function"===n||"object"===n&&!!t}};o.isNil=function(t){return o.isNull(t)||o.isUndefined(t)},t.exports=o},function(t,n,e){"use strict";var r=e(7),i=r.isNumber,o=Math.min,u=Math.max,c={isFinite:isFinite,isNaN:isNaN,isNumber:i,isDecimal:function(t){return i(t)&&t%1!==0},isEven:function(t){return i(t)&&t%2===0},isInteger:Number.isInteger?Number.isInteger:function(t){return i(t)&&t%1===0},isNegative:function(t){return i(t)&&t<0},isOdd:function(t){return i(t)&&t%2!==0},isPositive:function(t){return i(t)&&t>0},toFloat:function(t){return parseFloat(t)},toInteger:function(t,n){return parseInt(t,n||10)},isInRange:function(t,n,e){return n=+n||0,void 0===e?(e=n,n=0):e=+e||0,t>=o(n,e)&&t<u(n,e)}};c.isInFinite=function(t){return!c.isFinite(t)},t.exports=c},function(t,n){(function(n){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},r="undefined",i={};("undefined"==typeof window?"undefined":e(window))!==r?i=window:("undefined"==typeof n?"undefined":e(n))!==r?i=n:("undefined"==typeof self?"undefined":e(self))!==r&&(i=self),t.exports=i}).call(n,function(){return this}())},function(t,n,e){"use strict";function r(t){return d(t)?t:{}}function i(t,n,e){var i=r(t);for(var o in i)({}).hasOwnProperty.call(i,o)&&n.call(e,i[o],o,t)}function o(t){var n=[];return i(t,function(t){n.push(t)}),n}function u(t){return t=t||{},g(y(arguments).slice(1),function(n){n&&i(n,function(e,r){t[r]=n[r]})}),t}function c(t){return t=t||{},g(y(arguments).slice(1),function(n){i(n,function(e,r){s(n[r])!==s(t[r])?d(n[r])?(t[r]={},c(t[r],n[r])):t[r]=n[r]:d(n[r])?c(t[r],n[r]):t[r]=n[r]})}),t}var f=e(7),s=f.getType,l=f.isFunction,a=f.isObject,d=f.isPlainObject,m=e(6),p=m.contains,g=m.each,h=m.isArrayLike,y=m.toArray,v=Object.keys?function(t){return Object.keys(t)}:function(t){var n=[];return i(t,function(e,r){l(t)&&"prototype"===r||n.push(r)}),n},b={extend:u,forIn:i,isObject:a,isPlainObject:d,keys:v,merge:c,values:o,assign:u,hasKey:function(t,n){return{}.hasOwnProperty.call(t,n)},hasValue:function(t,n){return p(o(t),n)},invert:function(t){var n={};return i(t,function(t,e){n[t]=e}),n},clone:function(t){return h(t)?y(t):d(t)?c({},t):t},destroy:function(t){i(t,function(n,e){delete t[e]}),t.prototype=null,t=null}};t.exports=b},function(t,n,e){"use strict";function r(t){return t.toString()}var i=e(7),o=i.isString,u=String.prototype,c={isString:o,trim:function(t){return t=r(t),u.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},trimLeft:function(t){return t=r(t),u.trimLeft?t.trimLeft():t.replace(/^\s+/g,"")},trimRight:function(t){return t=r(t),u.trimRight?t.trimRight():t.replace(/^\s+/g,"")},lc:function(t){return r(t).toLowerCase()},uc:function(t){return r(t).toUpperCase()},hasSubString:function(t,n){return r(t).indexOf(r(n))>-1}};t.exports=c},,,,,,,,,,,,,,,,,,,,function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=e(4),o=r(i),u=chai.assert;describe("dom2js",function(){var t=document.createElement("div");t.innerHTML='hello, world!\n<a href="https://github.com/leungwensen/xml-lite">\n  maintaining xml in pure javascript (IN BOTH NODE.JS & BROWSERS)\n</a>',t.setAttribute("class","test-div"),t.setAttribute("data-hello","world");var n=o["default"].dom2js(t);it("Element: type and tag",function(){u.equal(n.type,"Element","XMLLite.dom2js() not working: type is not right."),u.equal(n.tag,"DIV","XMLLite.dom2js() not working: tag is not right.")}),it("Element: attributes",function(){u.deepEqual(n.attributes,{"class":"test-div","data-hello":"world"},"XMLLite.dom2js() not working: something wrong with the attributes.")})})},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=e(2),o=r(i),u=e(4),c=r(u),f=e(33),s=r(f),l=e(34),a=r(l),d=chai.assert;describe("js2xml",function(){function t(n){n.length&&!function(){var e=n.shift();it("js2xml: spec/fixtures/"+e+".xml",function(t){o["default"].get("./fixtures/"+e+".xml",function(n){o["default"].get("./fixtures/"+e+".json",function(r){var i=Date.now();c["default"].js2xml(r);var o=Date.now()-i,u=(0,s["default"])(r);console.log("%cjs2xml: %c%sms %cto render %c%s %celements in fixture "+e+".","font-weight: bold; color: blue;","font-weight: bold; color: green;",(0,a["default"])(o,3),"font-weight: normal; color: black;","font-weight: bold; color: red;",(0,a["default"])(u,4),"font-weight: normal; color: black;"),d.equal(c["default"].js2xml(r),c["default"].uglify(n),"test case by fixture "+e+" not passed"),t()})},"text")}),t(n)}()}this.timeout(1e4),o["default"].get("./fixtures/files.json",function(n){t(n)})})},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=e(5),o=r(i);t.exports=function(t){function n(t){"Document"!==t.type&&"TextNode"!==t.type&&e++,t.children&&o["default"].each(t.children,function(t){n(t)})}var e=0;return n(t),e}},function(t,n){"use strict";t.exports=function(t,n,e){e=e||" ";for(var r=t.toString();r.length<n;)r=e+r;return r}},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=e(2),o=r(i),u=e(4),c=r(u),f=e(33),s=r(f),l=e(34),a=r(l),d=chai.assert;describe("xml2js",function(){function t(n){n.length&&!function(){var e=n.shift();it("xml2js: spec/fixtures/"+e+".xml",function(t){o["default"].get("./fixtures/"+e+".xml",function(n){o["default"].get("./fixtures/"+e+".json",function(r){var i=Date.now(),o=c["default"].xml2js(n),u=Date.now()-i,f=(0,s["default"])(o);console.log("%cxml2js: %c%sms %cto parse %c%s %celements in fixture "+e+".","font-weight: bold; color: blue;","font-weight: bold; color: green;",(0,a["default"])(u,3),"font-weight: normal; color: black;","font-weight: bold; color: red;",(0,a["default"])(f,5),"font-weight: normal; color: black;"),d.deepEqual(c["default"].xml2js(n),r,"test case by fixture "+e+" not passed"),t()})},"text")}),t(n)}()}this.timeout(1e4),o["default"].get("./fixtures/files.json",function(n){t(n)})})}]);