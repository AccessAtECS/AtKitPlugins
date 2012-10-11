(function(){var f=function(){$lib=AtKit.lib();$lib.sb_spellVersion="3.5";AtKit.addLocalisationMap("GB",{spell_title:"Start Spellchecker",spell_complete:"Spell checking complete!",spell_mistake:"Spelling Mistake",spell_suggestions:"Spelling Suggestions",spell_ignore:"Ignore",spell_replace:"Replace"});AtKit.addLocalisationMap("ar",{spell_title:"&#1575;&#1604;&#1578;&#1583;&#1602;&#1610;&#1602; &#1575;&#1604;&#1575;&#1605;&#1604;&#1575;&#1574;&#1610;",spell_complete:"&#1578;&#1605; &#1575;&#1604;&#1575;&#1606;&#1578;&#1607;&#1575;&#1569; &#1605;&#1606; &#1575;&#1604;&#1578;&#1583;&#1602;&#1610;&#1602; &#1575;&#1604;&#1573;&#1605;&#1604;&#1575;&#1574;&#1610;",
spell_mistake:"&#1582;&#1591;&#1571; &#1573;&#1605;&#1604;&#1575;&#1574;&#1610;",spell_suggestions:"&#1575;&#1602;&#1578;&#1585;&#1575;&#1581;&#1575;&#1578; &#1604;&#1578;&#1589;&#1581;&#1610;&#1581; &#1575;&#1604;&#1582;&#1591;&#1571; &#1575;&#1604;&#1573;&#1605;&#1604;&#1575;&#1574;&#1610;",spell_ignore:"&#1578;&#1580;&#1575;&#1607;&#1604;",spell_replace:"&#1575;&#1587;&#1578;&#1576;&#1583;&#1575;&#1604;"});AtKit.set("spellInitialised",!1);var e=$lib("<div>",{style:""});e.append($lib("<h3>",{html:AtKit.localisation("spell_complete")}));
var c="http://c.atbar.org/ATBar/";/https:/.test(window.location.protocol)&&(c="https://ssl.atbar.org/c/ATBar/");AtKit.addFn("removeIncorrectWord",function(){$lib("#spellcheckmistakes option:selected").remove();$lib("#spellcheckmistakes").val($lib("#spellcheckmistakes option:first").val());$lib("#spellcheckmistakes").children().length===0?AtKit.message(e):$lib("#spellcheckmistakes").trigger("change")});AtKit.addFn("initSpell",function(){$lib.fn.spellcheck=function(a){return this.each(function(){var b=
$lib(this);!b.is("[type=password]")&&!b.data("spellchecker")&&$lib(this).data("spellchecker",new $lib.SpellChecker(this,a))})};$lib.fn.removeSpellCheck=function(){return this.each(function(){$lib(this).unbind(this.options.events);$lib(this).removeData("spellchecker")})};$lib.fn.rteSpellCheck=function(a,b,d){return this.each(function(){$lib(this);(new $lib.SpellChecker(this,d)).checkRTESpelling(a,b,d.RTEType)})};$lib.fn.checkspelling=function(){return this.each(function(){var a=$this.data("spellchecker");
a&&a.checkSpelling()})};$lib.SpellChecker=function(a,b){this.$element=$lib(a);this.options=$lib.extend({lang:"en_US",autocheck:750,events:"keypress blur paste",url:"spellcheck.php",useXHRMethod:"GM-XHR",ignorecaps:1,ignoredigits:1,isRTE:!1,RTEType:""},b);this.bindEvents()};$lib.SpellChecker.prototype={bindEvents:function(){if(this.options.events){var a=this,b;this.$element.bind(this.options.events,function(d){/^key[press|up|down]/.test(d.type)?(b&&clearTimeout(b),b=setTimeout(function(){a.checkSpelling()},
a.options.autocheck)):a.checkSpelling()})}},checkRTESpelling:function(a,b,d){this.options.isRTE=!0;this.origText=a;this.rteptr=b;this.RTEType=d;a.replace(/<.*?>/ig,"");this.text=a.replace(/<.*?>/ig,"");var g=this;$lib.getJSON("http://core.a.atbar.org/API/spellng.php?l="+this.options.lang+"&r="+encodeURIComponent(this.text)+"&callback=?",function(a){g.parseResults(a)})},checkSpelling:function(){this.options.isRTE=!1;var a=this.text,b=this.$element.val(),d=this;if(a!==b)this.text=this.$element.val(),
d=this,$lib.getJSON("http://core.a.atbar.org/API/spellng.php?l="+this.options.lang+"&r="+encodeURIComponent(this.text)+"&callback=?",function(a){d.parseResults(a)})},parseResults:function(a){this.results={};this.results.words={};i=0;for(r in a)this.results.words[r]={word:r,suggestions:a[r].suggestions,w_offset:a[r].offset},i++;this.results.count=i;this.displayResults()},displayResults:function(){if(this.results.count){var a=$lib("<div>",{style:""});a.append($lib("<h3>",{html:AtKit.localisation("spell_mistake")}));
a.append($lib("<div>",{id:"AtKitSpellMistakeContainer"}));a.append($lib("<h3>",{html:AtKit.localisation("spell_suggestions")}));a.append($lib("<div>",{id:"AtKitSpellSuggestionContainer"}));a.append($lib("<button>",{html:AtKit.localisation("spell_replace"),id:"AtKitSpellReplace"}));a.append($lib("<button>",{html:AtKit.localisation("spell_ignore"),id:"AtKitSpellIgnore"}));var b=this;a.children("#AtKitSpellMistakeContainer").append($lib("<select>",{name:"spellcheckmistakes",id:"spellcheckmistakes",size:7,
style:"width: 350px"}).change(function(){$lib("#spellchecksuggestions").empty();var a=b.results.words[$lib(this).val()].suggestions;$lib.each(a,function(a,b){$lib("#spellchecksuggestions").append($lib("<option>",{name:b,text:b}))})}));a.children("#AtKitSpellSuggestionContainer").append($lib("<select>",{name:"spellchecksuggestions",id:"spellchecksuggestions",size:7,style:"width: 350px"}));AtKit.message(a);$lib.each(this.results.words,function(b,c){a.find("#spellcheckmistakes").append($lib("<option>",
{name:c.word,text:c.word}))});$lib("#AtKitSpellIgnore").click(function(){AtKit.call("removeIncorrectWord")});$lib("#AtKitSpellReplace").click(function(){var d=a.find("#spellcheckmistakes").val(),c=a.find("#spellchecksuggestions").val();b.isRTE===!1||typeof b.isRTE=="undefined"?b.$element.val(b.$element.val().replace(d,c)):(b.origText=b.origText.replace(d,c),b.RTEType=="tMCE"?b.rteptr.setContent(b.origText):b.RTEType=="CKE"&&b.rteptr.setData(b.origText));AtKit.call("removeIncorrectWord")});a.find("#spellcheckmistakes").val(a.find("#spellcheckmistakes option:first").val());
a.find("#spellcheckmistakes").trigger("change")}}};AtKit.set("spellInitialised",!0)});AtKit.addButton("spell",AtKit.localisation("spell_title"),AtKit.getPluginURL()+"images/spell-off.png",function(){AtKit.get("spellInitialised")===!1&&AtKit.call("initSpell");$lib("textarea").spellcheck({useXHRMethod:AtKit.__env.transport,lang:AtKit.getLanguage(),baseURL:c});$lib("input[type=text]").spellcheck({useXHRMethod:AtKit.__env.transport,lang:AtKit.getLanguage(),baseURL:c});if(typeof AtKit.__env.window.tinyMCE!=
"undefined")tinyMCE=AtKit.__env.window.tinyMCE,tinyMCE.activeEditor.onKeyPress.add(function(){var a=tinyMCE.activeEditor.getContent();rteSpellTimer&&window.clearTimeout(rteSpellTimer);rteSpellTimer=window.setTimeout(function(){$lib("#"+tinyMCE.activeEditor.editorContainer).rteSpellCheck(a,tinyMCE.activeEditor,{useXHRMethod:AtKit.__env.transport,lang:AtKit.getLanguage(),RTEType:"tMCE"})},750)});if(typeof AtKit.__env.window.CKEDITOR!="undefined"){CKE=AtKit.__env.window.CKEDITOR;for(var a in CKE.instances)CKE.instances[a].document.bind("keypress",
function(){rteSpellTimer&&window.clearTimeout(rteSpellTimer);var b=CKE.instances[a].getData();rteSpellTimer=window.setTimeout(function(){$lib("#"+CKE.instances[a].element.getId()).rteSpellCheck(b,CKE.instances[a],{useXHRMethod:AtKit.__env.transport,lang:AtKit.getLanguage(),RTEType:"CKE"})},750)})}$lib("#at-lnk-spell").find("img").attr("src",c+"images/spell.png")})};typeof window.AtKit=="undefined"?(window.AtKitLoaded=function(){var e=null;this.subscribe=function(c){e=c};this.fire=function(c,a){e!==
null&&e(c,a)}},window.AtKitLoaded=new AtKitLoaded,window.AtKitLoaded.subscribe(function(){AtKit.registerPlugin("spellng",f)})):AtKit.registerPlugin("spellng",f)})();
