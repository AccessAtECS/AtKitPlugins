(function(){var a=function(){$lib=AtKit.lib();settings={baseURL:"http://c.atbar.org/ATBar/"};if(/https:/.test(window.location.protocol))settings.baseURL="https://ssl.atbar.org/c/ATBar/";AtKit.addLocalisationMap("GB",{wave_title:"Use WAVE accessibility checker"});AtKit.addButton("wave",AtKit.localisation("wave_title"),AtKit.getPluginURL()+"images/wave.png",function(){window.open("http://wave.webaim.org/report?url="+escape(window.location))},null,null)};typeof window.AtKit=="undefined"?(window.AtKitLoaded=
function(){var b=null;this.subscribe=function(c){b=c};this.fire=function(c,a){b!=null&&b(c,a)}},window.AtKitLoaded=new AtKitLoaded,window.AtKitLoaded.subscribe(function(){AtKit.registerPlugin("wave",a)})):AtKit.registerPlugin("wave",a)})();