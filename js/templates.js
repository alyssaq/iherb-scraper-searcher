(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<table id=\"nutrients\">\n  <thead>\n  ";
var t_1;
t_1 = (runtime.contextOrFrameLookup(context, frame, "page_no") - 1) * runtime.contextOrFrameLookup(context, frame, "results_per_page") + 1;
frame.set("start", t_1, true);
if(!frame.parent) {
context.setVariable("start", t_1);
context.addExport("start");
}
output += "\n  ";
if(runtime.contextOrFrameLookup(context, frame, "page_no") < runtime.contextOrFrameLookup(context, frame, "total_pages")) {
output += "\n    ";
var t_2;
t_2 = runtime.contextOrFrameLookup(context, frame, "page_no") * runtime.contextOrFrameLookup(context, frame, "results_per_page");
frame.set("end", t_2, true);
if(!frame.parent) {
context.setVariable("end", t_2);
context.addExport("end");
}
output += "\n  ";
;
}
else {
output += "\n    ";
var t_3;
t_3 = runtime.contextOrFrameLookup(context, frame, "total_results");
frame.set("end", t_3, true);
if(!frame.parent) {
context.setVariable("end", t_3);
context.addExport("end");
}
output += "\n  ";
;
}
output += "\n  ";
var t_4;
t_4 = (lineno = 8, colno = 32, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"slice", env.autoesc), "data[\"slice\"]", [runtime.contextOrFrameLookup(context, frame, "start") - 1,runtime.contextOrFrameLookup(context, frame, "end")]));
frame.set("page_results", t_4, true);
if(!frame.parent) {
context.setVariable("page_results", t_4);
context.addExport("page_results");
}
output += "\n  <tr>\n    <th class=\"header center\">\n      <div class=\"normal\">\n        Showing Columns: <br>\n        <b>";
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
var t_7 = (lineno = 34, colno = 26, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"slice", env.autoesc), "data[\"slice\"]", [runtime.contextOrFrameLookup(context, frame, "start") - 1,runtime.contextOrFrameLookup(context, frame, "end")]));
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
output += "\n    <th>\n      <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"url", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_8),"display_name", env.autoesc), env.autoesc);
output += "</a>\n    </th>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n  </thead>\n  <tbody style=\"height: 300px; overflow-y: auto\">\n  <tr class=\"price\">\n    <td class=\"header sorter\" data-key=\"price\">Price</td>\n    ";
frame = frame.push();
var t_11 = runtime.contextOrFrameLookup(context, frame, "page_results");
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
output += runtime.suppressValue(runtime.memberLookup((t_12),"price", env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"price_per_unit\">\n    <td class=\"header sorter\" data-key=\"price_per_unit\">\n      Price per 1 unit\n    </td>\n    ";
frame = frame.push();
var t_15 = runtime.contextOrFrameLookup(context, frame, "page_results");
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
output += "\n      <td>";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_16),"price_per_unit", env.autoesc),2), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"price_per_serve\">\n    <td class=\"header sorter\" data-key=\"price_per_serve\">\n      Price per serve\n    </td>\n    ";
frame = frame.push();
var t_19 = runtime.contextOrFrameLookup(context, frame, "page_results");
if(t_19) {var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("row", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n      <td>";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_20),"price_per_serve", env.autoesc),2), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"container_size\">\n    <td class=\"header\">Container Size</td>\n    ";
frame = frame.push();
var t_23 = (lineno = 69, colno = 26, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"slice", env.autoesc), "data[\"slice\"]", [runtime.contextOrFrameLookup(context, frame, "start") - 1,runtime.contextOrFrameLookup(context, frame, "end")]));
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
t_25 = runtime.memberLookup((runtime.memberLookup((t_24),"container_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_24),"size_indexes", env.autoesc)),0, env.autoesc), env.autoesc);
frame.set("size", t_25, true);
if(!frame.parent) {
context.setVariable("size", t_25);
context.addExport("size");
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"amount", env.autoesc), env.autoesc);
output += "\n      </td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"serving_size\">\n    <td class=\"header\">Serving Size</td>\n    ";
frame = frame.push();
var t_28 = runtime.contextOrFrameLookup(context, frame, "page_results");
if(t_28) {var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("row", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
output += "\n      <td>\n      ";
var t_30;
t_30 = runtime.memberLookup((runtime.memberLookup((t_29),"serving_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_29),"size_indexes", env.autoesc)),1, env.autoesc), env.autoesc);
frame.set("size", t_30, true);
if(!frame.parent) {
context.setVariable("size", t_30);
context.addExport("size");
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"amount", env.autoesc), env.autoesc);
output += "\n      </td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"unit\">\n    <td class=\"header\">Unit</td>\n    ";
frame = frame.push();
var t_33 = runtime.contextOrFrameLookup(context, frame, "page_results");
if(t_33) {var t_32 = t_33.length;
for(var t_31=0; t_31 < t_33.length; t_31++) {
var t_34 = t_33[t_31];
frame.set("row", t_34);
frame.set("loop.index", t_31 + 1);
frame.set("loop.index0", t_31);
frame.set("loop.revindex", t_32 - t_31);
frame.set("loop.revindex0", t_32 - t_31 - 1);
frame.set("loop.first", t_31 === 0);
frame.set("loop.last", t_31 === t_32 - 1);
frame.set("loop.length", t_32);
output += "\n      <td>\n      ";
var t_35;
t_35 = runtime.memberLookup((runtime.memberLookup((t_34),"serving_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_34),"size_indexes", env.autoesc)),1, env.autoesc), env.autoesc);
frame.set("size", t_35, true);
if(!frame.parent) {
context.setVariable("size", t_35);
context.addExport("size");
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "size")),"unit", env.autoesc), env.autoesc);
output += "\n      </td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  ";
frame = frame.push();
var t_38 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_38) {var t_37 = t_38.length;
for(var t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36];
frame.set("category", t_39);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
output += "\n  <tr class=\"category\">\n    <td class=\"header sorter\" data-key=\"num_";
output += runtime.suppressValue(t_39, env.autoesc);
output += "\">";
output += runtime.suppressValue(t_39, env.autoesc);
output += "</td>\n    ";
frame = frame.push();
var t_42 = runtime.contextOrFrameLookup(context, frame, "page_results");
if(t_42) {var t_41 = t_42.length;
for(var t_40=0; t_40 < t_42.length; t_40++) {
var t_43 = t_42[t_40];
frame.set("row", t_43);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
output += "\n      <td>";
output += runtime.suppressValue(runtime.memberLookup((t_43),"num_" + t_39, env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  ";
frame = frame.push();
var t_46 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "allnutrients")),t_39, env.autoesc);
if(t_46) {var t_45 = t_46.length;
for(var t_44=0; t_44 < t_46.length; t_44++) {
var t_47 = t_46[t_44];
frame.set("nutrients", t_47);
frame.set("loop.index", t_44 + 1);
frame.set("loop.index0", t_44);
frame.set("loop.revindex", t_45 - t_44);
frame.set("loop.revindex0", t_45 - t_44 - 1);
frame.set("loop.first", t_44 === 0);
frame.set("loop.last", t_44 === t_45 - 1);
frame.set("loop.length", t_45);
output += "\n  <tr>\n    <!-- <td><div  class='num_slider'></div></td> -->\n    <td class=\"header\">\n      <input type=\"checkbox\" data-category=\"";
output += runtime.suppressValue(t_39, env.autoesc);
output += "\" ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "checkedBox")),runtime.memberLookup((t_47),0, env.autoesc), env.autoesc), env.autoesc);
output += ">\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_47),0, env.autoesc), env.autoesc);
output += " \n    </td>\n    ";
frame = frame.push();
var t_50 = runtime.contextOrFrameLookup(context, frame, "page_results");
if(t_50) {var t_49 = t_50.length;
for(var t_48=0; t_48 < t_50.length; t_48++) {
var t_51 = t_50[t_48];
frame.set("row", t_51);
frame.set("loop.index", t_48 + 1);
frame.set("loop.index0", t_48);
frame.set("loop.revindex", t_49 - t_48);
frame.set("loop.revindex0", t_49 - t_48 - 1);
frame.set("loop.first", t_48 === 0);
frame.set("loop.last", t_48 === t_49 - 1);
frame.set("loop.length", t_49);
output += "\n      ";
if((lineno = 113, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_51),"nutrients", env.autoesc)),"hasOwnProperty", env.autoesc), "row[\"nutrients\"][\"hasOwnProp\"]", [runtime.memberLookup((t_47),0, env.autoesc)]))) {
output += "\n        ";
var t_52;
t_52 = runtime.memberLookup((runtime.memberLookup((t_51),"nutrients", env.autoesc)),runtime.memberLookup((t_47),0, env.autoesc), env.autoesc);
frame.set("cur_nutrient", t_52, true);
if(!frame.parent) {
context.setVariable("cur_nutrient", t_52);
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
