(function(){var c=function(){$lib=AtKit.lib();settings={baseURL:"http://c.atbar.org/ATBar/"};if(/https:/.test(window.location.protocol))settings.baseURL="https://ssl.atbar.org/c/ATBar/";AtKit.addLocalisationMap("GB",{googleplus_title:"Share to Google Plus"});AtKit.addButton("googleplus",AtKit.localisation("googleplus_title"),AtKit.getPluginURL()+"images/google-plus.png",function(){var a=window,b=document,d=encodeURIComponent,c=a.open("https://m.google.com/app/plus/x/?v=compose&hideloc=1&content="+
d(b.title)+" - "+d(b.location),"Share to Google+","left="+(screen.availWidth/2-225)+",top="+(screen.availHeight/2-150)+",height=300px,width=450px,resizable=1,alwaysRaised=1");a.setTimeout(function(){c.focus()},300)},null,null)};typeof window.AtKit=="undefined"?(window.AtKitLoaded=function(){var a=null;this.subscribe=function(b){a=b};this.fire=function(b,c){a!=null&&a(b,c)}},window.AtKitLoaded=new AtKitLoaded,window.AtKitLoaded.subscribe(function(){AtKit.registerPlugin("googleplus",c)})):AtKit.registerPlugin("googleplus",
c)})();
