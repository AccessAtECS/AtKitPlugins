(function(){var c=function(){$lib=AtKit.lib();settings={baseURL:"http://c.atbar.org/ATBar/"};if(/https:/.test(window.location.protocol))settings.baseURL="https://ssl.atbar.org/c/ATBar/";AtKit.addLocalisationMap("GB",{webdictionary_title:"Use the dictionary"});AtKit.addButton("webdictionary",AtKit.localisation("webdictionary_title"),AtKit.getPluginURL()+"images/dictionary.png",function(){try{var b=window.getSelection(),a=b?b.toString().replace(/(^\W+|\W+$)/g,""):"";if(!a&&(a=prompt("Enter a word to look up"),
!a))return;var d="http://dictionary.reference.com/search?r=1&q="+encodeURIComponent(a);window.open(d)}catch(c){alert("Error:\n"+c.message)}},null,null)};typeof window.AtKit=="undefined"?(window.AtKitLoaded=function(){var b=null;this.subscribe=function(a){b=a};this.fire=function(a,c){b!=null&&b(a,c)}},window.AtKitLoaded=new AtKitLoaded,window.AtKitLoaded.subscribe(function(){AtKit.registerPlugin("webdictionary",c)})):AtKit.registerPlugin("webdictionary",c)})();
