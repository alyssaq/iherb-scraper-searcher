(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"wrapper\">\n<table id=\"nutrients\">\n  <thead>\n  <tr>\n    <th class=\"header\"></th>\n    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("row", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n    <th>\n      <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.autoesc), env.autoesc);
output += "</a>\n    \n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n  </thead>\n  <tbody>\n  <tr class=\"price\">\n    <td class=\"header sorter\" data-key=\"price\">Price</td>\n    ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("row", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n      <td>";
output += runtime.suppressValue(runtime.memberLookup((t_8),"price", env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"price_per_serve\">\n    <td class=\"header sorter\" data-key=\"price_per_serve\">Price per serve</td>\n    ";
frame = frame.push();
var t_11 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_11) {var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("row", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n      <td>";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_12),"price_per_serve", env.autoesc),2), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"container_size\">\n    <td class=\"header\">Size</td>\n    ";
frame = frame.push();
var t_15 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_15) {var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("row", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
output += "\n      <td>\n      ";
var t_17;
t_17 = runtime.memberLookup((runtime.memberLookup((t_16),"container_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_16),"size_indexes", env.autoesc)),0, env.autoesc), env.autoesc);
frame.set("size", t_17, true);
if(!frame.parent) {
context.setVariable("size", t_17);
context.addExport("size");
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"amount", env.autoesc), env.autoesc);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"unit", env.autoesc), env.autoesc);
output += "\n      </td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"serving_size\">\n    <td class=\"header\">Serve</td>\n    ";
frame = frame.push();
var t_20 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_20) {var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("row", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
output += "\n      <td>\n       ";
var t_22;
t_22 = runtime.memberLookup((runtime.memberLookup((t_21),"serving_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_21),"size_indexes", env.autoesc)),1, env.autoesc), env.autoesc);
frame.set("size", t_22, true);
if(!frame.parent) {
context.setVariable("size", t_22);
context.addExport("size");
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"amount", env.autoesc), env.autoesc);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"unit", env.autoesc), env.autoesc);
output += "\n      </td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  ";
frame = frame.push();
var t_25 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_25) {var t_24 = t_25.length;
for(var t_23=0; t_23 < t_25.length; t_23++) {
var t_26 = t_25[t_23];
frame.set("category", t_26);
frame.set("loop.index", t_23 + 1);
frame.set("loop.index0", t_23);
frame.set("loop.revindex", t_24 - t_23);
frame.set("loop.revindex0", t_24 - t_23 - 1);
frame.set("loop.first", t_23 === 0);
frame.set("loop.last", t_23 === t_24 - 1);
frame.set("loop.length", t_24);
output += "\n  <tr class=\"category\">\n    <td class=\"header\">";
output += runtime.suppressValue(t_26, env.autoesc);
output += "</td>\n    ";
frame = frame.push();
var t_29 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_29) {var t_28 = t_29.length;
for(var t_27=0; t_27 < t_29.length; t_27++) {
var t_30 = t_29[t_27];
frame.set("row", t_30);
frame.set("loop.index", t_27 + 1);
frame.set("loop.index0", t_27);
frame.set("loop.revindex", t_28 - t_27);
frame.set("loop.revindex0", t_28 - t_27 - 1);
frame.set("loop.first", t_27 === 0);
frame.set("loop.last", t_27 === t_28 - 1);
frame.set("loop.length", t_28);
output += "\n      <td>";
output += runtime.suppressValue(runtime.memberLookup((t_30),"num_" + t_26, env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  ";
frame = frame.push();
var t_33 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "allnutrients")),t_26, env.autoesc);
if(t_33) {var t_32 = t_33.length;
for(var t_31=0; t_31 < t_33.length; t_31++) {
var t_34 = t_33[t_31];
frame.set("nutrients", t_34);
frame.set("loop.index", t_31 + 1);
frame.set("loop.index0", t_31);
frame.set("loop.revindex", t_32 - t_31);
frame.set("loop.revindex0", t_32 - t_31 - 1);
frame.set("loop.first", t_31 === 0);
frame.set("loop.last", t_31 === t_32 - 1);
frame.set("loop.length", t_32);
output += "\n  <tr>\n    <!-- <td><div  class='num_slider'></div></td> -->\n    <td class=\"header\">\n      <input type=\"checkbox\" data-category=\"";
output += runtime.suppressValue(t_26, env.autoesc);
output += "\" ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "checkedBox")),runtime.memberLookup((t_34),0, env.autoesc), env.autoesc), env.autoesc);
output += ">\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_34),0, env.autoesc), env.autoesc);
output += " \n    </td>\n    ";
frame = frame.push();
var t_37 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_37) {var t_36 = t_37.length;
for(var t_35=0; t_35 < t_37.length; t_35++) {
var t_38 = t_37[t_35];
frame.set("row", t_38);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
output += "\n      ";
if((lineno = 63, colno = 48, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_38),"nutrients", env.autoesc)),t_26, env.autoesc)),"hasOwnProperty", env.autoesc), "row[\"nutrients\"][\"category\"][\"hasOwnProp\"]", [runtime.memberLookup((t_34),0, env.autoesc)]))) {
output += "\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_38),"nutrients", env.autoesc)),t_26, env.autoesc)),runtime.memberLookup((t_34),0, env.autoesc), env.autoesc)),2, env.autoesc) == 0) {
output += "\n        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_38),"nutrients", env.autoesc)),t_26, env.autoesc)),runtime.memberLookup((t_34),0, env.autoesc), env.autoesc)),1, env.autoesc), env.autoesc);
output += "</td>\n        ";
;
}
else {
output += "\n        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_38),"nutrients", env.autoesc)),t_26, env.autoesc)),runtime.memberLookup((t_34),0, env.autoesc), env.autoesc)),2, env.autoesc), env.autoesc);
output += "</td>\n        ";
;
}
output += "\n      ";
;
}
else {
output += "\n      <td>***</td>\n      ";
;
}
output += "\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr> \n  ";
;
}
}
frame = frame.pop();
output += "\n   \n  ";
;
}
}
frame = frame.pop();
output += "\n</tbody>\n</table>\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
