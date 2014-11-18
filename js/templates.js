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
output += "\n  </tr>\n\n  <tr class=\"price_per_unit\">\n    <td class=\"header sorter\" data-key=\"price_per_unit\">\n      Price per 1 unit\n    </td>\n    ";
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
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_15),"price_per_unit", env.autoesc),2), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"price_per_serve\">\n    <td class=\"header sorter\" data-key=\"price_per_serve\">\n      Price per serve\n    </td>\n    ";
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
output += "\n      <td>";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_19),"price_per_serve", env.autoesc),2), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  <tr class=\"container_size\">\n    <td class=\"header\">Container Size</td>\n    ";
frame = frame.push();
var t_22 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_22) {var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("row", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n      <td>\n      ";
var t_24;
t_24 = runtime.memberLookup((runtime.memberLookup((t_23),"container_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_23),"size_indexes", env.autoesc)),0, env.autoesc), env.autoesc);
frame.set("size", t_24, true);
if(!frame.parent) {
context.setVariable("size", t_24);
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
var t_27 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_27) {var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("row", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
output += "\n      <td>\n      ";
var t_29;
t_29 = runtime.memberLookup((runtime.memberLookup((t_28),"serving_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_28),"size_indexes", env.autoesc)),1, env.autoesc), env.autoesc);
frame.set("size", t_29, true);
if(!frame.parent) {
context.setVariable("size", t_29);
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
output += "\n      <td>\n      ";
var t_34;
t_34 = runtime.memberLookup((runtime.memberLookup((t_33),"serving_sizes", env.autoesc)),runtime.memberLookup((runtime.memberLookup((t_33),"size_indexes", env.autoesc)),1, env.autoesc), env.autoesc);
frame.set("size", t_34, true);
if(!frame.parent) {
context.setVariable("size", t_34);
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
var t_37 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_37) {var t_36 = t_37.length;
for(var t_35=0; t_35 < t_37.length; t_35++) {
var t_38 = t_37[t_35];
frame.set("category", t_38);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
output += "\n  <tr class=\"category\">\n    <td class=\"header sorter\" data-key=\"num_";
output += runtime.suppressValue(t_38, env.autoesc);
output += "\">";
output += runtime.suppressValue(t_38, env.autoesc);
output += "</td>\n    ";
frame = frame.push();
var t_41 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_41) {var t_40 = t_41.length;
for(var t_39=0; t_39 < t_41.length; t_39++) {
var t_42 = t_41[t_39];
frame.set("row", t_42);
frame.set("loop.index", t_39 + 1);
frame.set("loop.index0", t_39);
frame.set("loop.revindex", t_40 - t_39);
frame.set("loop.revindex0", t_40 - t_39 - 1);
frame.set("loop.first", t_39 === 0);
frame.set("loop.last", t_39 === t_40 - 1);
frame.set("loop.length", t_40);
output += "\n      <td>";
output += runtime.suppressValue(runtime.memberLookup((t_42),"num_" + t_38, env.autoesc), env.autoesc);
output += "</td>\n    ";
;
}
}
frame = frame.pop();
output += "\n  </tr>\n\n  ";
frame = frame.push();
var t_45 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "allnutrients")),t_38, env.autoesc);
if(t_45) {var t_44 = t_45.length;
for(var t_43=0; t_43 < t_45.length; t_43++) {
var t_46 = t_45[t_43];
frame.set("nutrients", t_46);
frame.set("loop.index", t_43 + 1);
frame.set("loop.index0", t_43);
frame.set("loop.revindex", t_44 - t_43);
frame.set("loop.revindex0", t_44 - t_43 - 1);
frame.set("loop.first", t_43 === 0);
frame.set("loop.last", t_43 === t_44 - 1);
frame.set("loop.length", t_44);
output += "\n  <tr>\n    <!-- <td><div  class='num_slider'></div></td> -->\n    <td class=\"header\">\n      <input type=\"checkbox\" data-category=\"";
output += runtime.suppressValue(t_38, env.autoesc);
output += "\" ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "checkedBox")),runtime.memberLookup((t_46),0, env.autoesc), env.autoesc), env.autoesc);
output += ">\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_46),0, env.autoesc), env.autoesc);
output += " \n    </td>\n    ";
frame = frame.push();
var t_49 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_49) {var t_48 = t_49.length;
for(var t_47=0; t_47 < t_49.length; t_47++) {
var t_50 = t_49[t_47];
frame.set("row", t_50);
frame.set("loop.index", t_47 + 1);
frame.set("loop.index0", t_47);
frame.set("loop.revindex", t_48 - t_47);
frame.set("loop.revindex0", t_48 - t_47 - 1);
frame.set("loop.first", t_47 === 0);
frame.set("loop.last", t_47 === t_48 - 1);
frame.set("loop.length", t_48);
output += "\n      ";
if((lineno = 112, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_50),"nutrients", env.autoesc)),"hasOwnProperty", env.autoesc), "row[\"nutrients\"][\"hasOwnProp\"]", [runtime.memberLookup((t_46),0, env.autoesc)]))) {
output += "\n        ";
var t_51;
t_51 = runtime.memberLookup((runtime.memberLookup((t_50),"nutrients", env.autoesc)),runtime.memberLookup((t_46),0, env.autoesc), env.autoesc);
frame.set("cur_nutrient", t_51, true);
if(!frame.parent) {
context.setVariable("cur_nutrient", t_51);
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
