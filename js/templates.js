(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<table id=\"nutrients\">\n  <thead>\n  <tr>\n    <th class=\"header center\">\n      <div class=\"normal\">\n        Showing Columns: <br>\n        ";
var t_1;
t_1 = (runtime.contextOrFrameLookup(context, frame, "page_no") - 1) * runtime.contextOrFrameLookup(context, frame, "results_per_page") + 1;
frame.set("start", t_1, true);
if(!frame.parent) {
context.setVariable("start", t_1);
context.addExport("start");
}
output += "\n        ";
if(runtime.contextOrFrameLookup(context, frame, "page_no") < runtime.contextOrFrameLookup(context, frame, "total_pages")) {
output += "\n          ";
var t_2;
t_2 = runtime.contextOrFrameLookup(context, frame, "page_no") * runtime.contextOrFrameLookup(context, frame, "results_per_page");
frame.set("end", t_2, true);
if(!frame.parent) {
context.setVariable("end", t_2);
context.addExport("end");
}
output += "\n        ";
;
}
else {
output += "\n          ";
var t_3;
t_3 = runtime.contextOrFrameLookup(context, frame, "total_results");
frame.set("end", t_3, true);
if(!frame.parent) {
context.setVariable("end", t_3);
context.addExport("end");
}
output += "\n        ";
;
}
output += "\n        <b>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start"), env.autoesc);
output += " to ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "end"), env.autoesc);
output += "</b> <br>\n        (";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total_results"), env.autoesc);
output += " total)\n      </div>\n      ";
if(runtime.contextOrFrameLookup(context, frame, "page_no") > 1) {
output += "\n      <span data-navigate=\"prev\">\n      ";
;
}
else {
output += "\n      <span class=\"hidden\">\n      ";
;
}
output += "\n        &#x21a4;\n      </span>\n      ";
if(runtime.contextOrFrameLookup(context, frame, "page_no") < runtime.contextOrFrameLookup(context, frame, "total_pages")) {
output += " \n      <span data-navigate=\"next\">\n      ";
;
}
else {
output += "\n      <span class=\"hidden\">\n      ";
;
}
output += "\n        &#x21a6;\n      </span>\n      <div class=\"icon\">\n      <a title=\"The codez\" class=\"icon-github\" href=\"https://github.com/alyssaq/iherb-scraper-searcher\"></a>\n      </div>\n    </th>\n    ";
frame = frame.push();
var t_6 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_6) {var t_5 = t_6.length;
for(var t_4=0; t_4 < t_6.length; t_4++) {
var t_7 = t_6[t_4];
frame.set("row", t_7);
frame.set("loop.index", t_4 + 1);
frame.set("loop.index0", t_4);
frame.set("loop.revindex", t_5 - t_4);
frame.set("loop.revindex0", t_5 - t_4 - 1);
frame.set("loop.first", t_4 === 0);
frame.set("loop.last", t_4 === t_5 - 1);
frame.set("loop.length", t_5);
output += "\n    <th>\n      <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_7),"url", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_7),"display_name", env.autoesc), env.autoesc);
output += "</a>\n    </th>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n  </thead>\n  <tbody style=\"height: 300px; overflow-y: auto\">\n  <tr class=\"price\">\n    <td class=\"header sorter\" data-key=\"price\">Price</td>\n    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_10) {var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("row", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n      <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"price", env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"price_per_serve\">\n    <td class=\"header sorter\" data-key=\"price_per_serve\">\n      Price per serve\n    </td>\n    ";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_14) {var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("row", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n      <td>";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_15),"price_per_serve", env.autoesc),2), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"container_size\">\n    <td class=\"header\">Container Size</td>\n    ";
frame = frame.push();
var t_18 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_18) {var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("row", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n      <td>\n      ";
var t_20;
t_20 = runtime.memberLookup((runtime.memberLookup((t_19),"container_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_19),"size_indexes", env.autoesc)),0, env.autoesc), env.autoesc);
frame.set("size", t_20, true);
if(!frame.parent) {
context.setVariable("size", t_20);
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
output += "\n  </tr>\n\n  <tr class=\"serving_size\">\n    <td class=\"header\">Serving Size</td>\n    ";
frame = frame.push();
var t_23 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_23) {var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("row", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n      <td>\n      ";
var t_25;
t_25 = runtime.memberLookup((runtime.memberLookup((t_24),"serving_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_24),"size_indexes", env.autoesc)),1, env.autoesc), env.autoesc);
frame.set("size", t_25, true);
if(!frame.parent) {
context.setVariable("size", t_25);
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
var t_28 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_28) {var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("category", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
output += "\n  <tr class=\"category\">\n    <td class=\"header sorter\" data-key=\"num_";
output += runtime.suppressValue(t_29, env.autoesc);
output += "\">";
output += runtime.suppressValue(t_29, env.autoesc);
output += "</td>\n    ";
frame = frame.push();
var t_32 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_32) {var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("row", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
output += "\n      <td>";
output += runtime.suppressValue(runtime.memberLookup((t_33),"num_" + t_29, env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  ";
frame = frame.push();
var t_36 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "allnutrients")),t_29, env.autoesc);
if(t_36) {var t_35 = t_36.length;
for(var t_34=0; t_34 < t_36.length; t_34++) {
var t_37 = t_36[t_34];
frame.set("nutrients", t_37);
frame.set("loop.index", t_34 + 1);
frame.set("loop.index0", t_34);
frame.set("loop.revindex", t_35 - t_34);
frame.set("loop.revindex0", t_35 - t_34 - 1);
frame.set("loop.first", t_34 === 0);
frame.set("loop.last", t_34 === t_35 - 1);
frame.set("loop.length", t_35);
output += "\n  <tr>\n    <!-- <td><div  class='num_slider'></div></td> -->\n    <td class=\"header\">\n      <input type=\"checkbox\" data-category=\"";
output += runtime.suppressValue(t_29, env.autoesc);
output += "\" ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "checkedBox")),runtime.memberLookup((t_37),0, env.autoesc), env.autoesc), env.autoesc);
output += ">\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_37),0, env.autoesc), env.autoesc);
output += " \n    </td>\n    ";
frame = frame.push();
var t_40 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_40) {var t_39 = t_40.length;
for(var t_38=0; t_38 < t_40.length; t_38++) {
var t_41 = t_40[t_38];
frame.set("row", t_41);
frame.set("loop.index", t_38 + 1);
frame.set("loop.index0", t_38);
frame.set("loop.revindex", t_39 - t_38);
frame.set("loop.revindex0", t_39 - t_38 - 1);
frame.set("loop.first", t_38 === 0);
frame.set("loop.last", t_38 === t_39 - 1);
frame.set("loop.length", t_39);
output += "\n      ";
if((lineno = 93, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_41),"nutrients", env.autoesc)),"hasOwnProperty", env.autoesc), "row[\"nutrients\"][\"hasOwnProp\"]", [runtime.memberLookup((t_37),0, env.autoesc)]))) {
output += "\n        ";
var t_42;
t_42 = runtime.memberLookup((runtime.memberLookup((t_41),"nutrients", env.autoesc)),runtime.memberLookup((t_37),0, env.autoesc), env.autoesc);
frame.set("cur_nutrient", t_42, true);
if(!frame.parent) {
context.setVariable("cur_nutrient", t_42);
context.addExport("cur_nutrient");
}
output += "\n\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cur_nutrient")),"percent_dv", env.autoesc) > 0) {
output += "\n        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cur_nutrient")),"percent_dv", env.autoesc), env.autoesc);
output += "</td>\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cur_nutrient")),"amount", env.autoesc) != "") {
output += "\n        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cur_nutrient")),"amount", env.autoesc), env.autoesc);
output += "</td>\n        ";
;
}
else {
output += "\n        <td>&#10004;</td>\n        ";
;
}
;
}
output += "\n\n      ";
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
output += "\n</tbody>\n</table>";
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
