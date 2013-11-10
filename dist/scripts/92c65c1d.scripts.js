"use strict";angular.module("faeriaDeckbuilderApp",["ui.bootstrap"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/deckbuilder",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/designer",{templateUrl:"views/designer.html",controller:"DesignerCtrl"}).when("/changelog",{templateUrl:"views/changelog.html",controller:"ChangelogCtrl"}).when("/cardlist",{templateUrl:"views/cardlist.html",controller:"CardlistCtrl"}).otherwise({redirectTo:"/deckbuilder"})}]),angular.module("faeriaDeckbuilderApp").controller("MainCtrl",["$scope","$location","cards","skipReload","$http","$modal",function(a,b,c,d,e,f){function g(){d(),b.hash(h(a.deck))}function h(){var b="";for(var c in a.deck)b.length&&(b+=":"),b+=a.deck[c].id+(a.deck[c].quantity>1?","+a.deck[c].quantity:"");var d=(a.deckName?a.deckName:"")+"@"+b+"."+a.currentVersion;return d}function i(b){if(-1!==b.indexOf(".")){var c=b.split(".");b=c[0],a.currentVersion=Number(c[1])}else a.currentVersion=1;var d=b.split("@");a.deckName=d[0];var e=b.split("@")[1].split(":");"string"==typeof e&&(e=[e]),a.clearDeck(!0),e.forEach(function(b){b=b.split(",");var c,d;b.length>1?(c=Number(b[0]),d=Number(b[1])):(c=Number(b[0]),d=1),a.allCards.cards.forEach(function(b){if(b.id===c)for(var e=0;d>e;)a.addToDeck(b,!0),e++})})}function j(){var b=["Creature","Event","Structure"];a.exportData='[deck="'+a.deckName||'"]\n',b.forEach(function(b,c){var d="";for(var e in a.deck)a.deck[e].type===b.toLowerCase()&&(d+=a.deck[e].quantity>1?a.deck[e].quantity+" ":"",d+=a.deck[e].name+"\n");d.length>0&&(c>0&&(a.exportData+="\n"),d="// "+b+"s\n"+d,a.exportData+=d)}),a.exportData+="[/deck]"}var k=3,l=window.FAERIACARDS;l.clearQueue(),a.VERSION=3,a.currentVersion=k;var m=window.alert;a.allCards=c.get(),a.searchText="",a.showBlue=!0,a.showGreen=!0,a.showRed=!0,a.showYellow=!0,a.showHuman=!0,a.showCreature=!0,a.showStructure=!0,a.showEvent=!0,a.showFate=!0,a.showCommon=!0,a.showUncommon=!0,a.showEpic=!0,a.showRare=!0,a.showLegendary=!0,a.isShared=!1,a.error=null,a.deck={},a.filterColumn="name",a.$watch("currentVersion",function(){a.currentVersion!==k&&c.get(a.currentVersion)}),a.share=function(){g();var c=b.hash();e({method:"GET",url:"/share?deckInfo="+c}).success(function(c){d(),a.isShared=!0,a.sharedUrl="faeriadecks.com/deckbuilder#"+c.hash,b.hash(c.hash),a.showUrl=!0}).error(function(){m("error saving")})},a.addToDeck=function(b,c){a.isShared=!1,a.error=null,a.deck[b.name]?a.deck[b.name].quantity<3?a.deck[b.name].quantity++:a.error="limit3":(a.deck[b.name]=b,a.deck[b.name].quantity=1),c||g(),j()},a.removeFromDeck=function(b){a.isShared=!1,a.error=null,a.deck[b.name].quantity--,a.deck[b.name].quantity||delete a.deck[b.name],g(),j()},a.upgrade=function(){a.currentVersion=k,g(),a.clearDeck(!0),c.get()},a.clearDeck=function(b){a.deck={},b||g()},a.countDeck=function(){var b=0;for(var c in a.deck)b+=a.deck[c].quantity;return b},a.countType=function(b){var c=0;for(var d in a.deck)a.deck[d].type===b&&(c+=a.deck[d].quantity);return c},a.countGold=function(){var b=0;for(var c in a.deck)b+=a.deck[c].gold*a.deck[c].quantity;return b},a.countFaeria=function(){var b=0;for(var c in a.deck)b+=a.deck[c].faeria*a.deck[c].quantity;return b},a.countColor=function(b){var c=0;for(var d in a.deck)a.deck[d].landColor===b&&(c+=a.deck[d].landCost*a.deck[d].quantity);return c},a.countZeroF=function(){var b=0;for(var c in a.deck)"creature"!==a.deck[c].type||Number(a.deck[c].faeria)||(b+=a.deck[c].quantity);return b},a.search=function(b){return"blue"!==b.landColor||a.showBlue?"green"!==b.landColor||a.showGreen?"red"!==b.landColor||a.showRed?"yellow"!==b.landColor||a.showYellow?"human"!==b.landColor||a.showHuman?"creature"!==b.type||a.showCreature?"structure"!==b.type||a.showStructure?"event"!==b.type||a.showEvent?"fate"!==b.type||a.showFate?"C"!==b.rarity||a.showCommon?"U"!==b.rarity||a.showUncommon?"E"!==b.rarity||a.showEpic?"R"!==b.rarity||a.showRare?"L"!==b.rarity||a.showLegendary?-1!==b.name.toLowerCase().indexOf(a.searchText.toLowerCase())?!0:!1:!1:!1:!1:!1:!1:!1:!1:!1:!1:!1:!1:!1:!1:!1},a.sort={column:"name",descending:!1},a.selectedCls=function(b){return b===a.sort.column&&"sort-"+a.sort.descending},a.changeSorting=function(b){var c=a.sort;c.column===b?c.descending=!c.descending:(c.column=b,c.descending=!1)},a.sortDeck={column:"name",descending:!1},a.selectedClsDeck=function(b){return b===a.sortDeck.column&&"sort-"+a.sortDeck.descending},a.changeSortingDeck=function(b){var c=a.sortDeck;c.column===b?c.descending=!c.descending:(c.column=b,c.descending=!1)},a.powerLifeString=function(a){return a.power||a.life?"structure"===a.type?a.life:Number(a.power)+"/"+a.life:""},a.exportData="",a.export=function(){f.open({templateUrl:"exportModal.html",controller:"ExportModalCtrl",resolve:{exportData:function(){return a.exportData}}})},a.import=function(){var b=f.open({templateUrl:"importModal.html",controller:"ImportModalCtrl"});b.result.then(function(b){if(b)try{a.deck={};var c=b.split("\n");c.forEach(function(b){if(b){if("["===b[0])return-1!==b.indexOf('"')&&(a.deckName=b.split('"')[1]),void 0;if("/"!==b[0]){var c,d=b[0];isNaN(Number(d))?c=1:(c=Number(d),b=b.replace(d+" ","")," "===b[0]&&(b=b.slice(1,b.length)));var e=!1;a.allCards.cards.forEach(function(d){if(d.name.toLowerCase()===b.toLowerCase()){for(var f=0;c>f;f++)a.addToDeck(d);e=!0}}),e||console.log("Failed to parse ",b)}}})}catch(d){m("Error importing.")}})},a.$watch("allCards.cards",function(){if(a.allCards.cards.length){var c=b.hash();return 5===c.length&&-1===c.indexOf("@")?(e.get("/load?shortKey="+c).success(function(d){i(d.data[0].fullInfo),b.hash(c),a.isShared=!0,a.sharedUrl="faeriadecks.com/deckbuilder#"+c}),void 0):(c&&i(c),void 0)}}),a.$watch("deckName",function(b,c){a.deckName&&c&&(a.isShared=!1,g())})}]),angular.module("faeriaDeckbuilderApp").service("cards",["$http",function(a){function b(b){c=b;var f="/cards.json";b&&(f="/old-data/cards."+b+".json"),a({method:"GET",url:f}).success(function(a){e.cards=a,e.cards.forEach(function(a,b){a.id=a.gameId?Number(a.gameId):b})}).error(function(){d("Could not get card data!")})}var c,d=window.alert,e={cards:[]};return{get:function(a){return c===a&&e.cards.length?e:(b(a),e)}}}]),angular.module("faeriaDeckbuilderApp").factory("skipReload",["$route","$rootScope",function(a,b){return function(){var c=a.current,d=b.$on("$locationChangeSuccess",function(){a.current=c,d()})}}]),angular.module("faeriaDeckbuilderApp").directive("landColor",function(){var a=window.$;return{link:function(b,c,d){b.$watch(d.landColor,function(b){b&&a(c).addClass("land-"+b.toLowerCase())})}}}),angular.module("faeriaDeckbuilderApp").filter("toArray",function(){return function(a){return a instanceof Object?Object.keys(a).map(function(b){return Object.defineProperty(a[b],"$key",{value:b})}):a}}),angular.module("faeriaDeckbuilderApp").controller("DesignerCtrl",["$scope",function(a){function b(b){var d=new FileReader;d.onload=function(b){var d=new Image;d.onload=function(){a.opts.img=d,c.render(a.opts)},d.src=b.target.result},d.readAsDataURL(b.target.files[0])}var c=window.FAERIACARDS;a.opts={name:"Awesome Dragon",img:"img/dragon.png",gold:7,faeria:3,rarity:"L",attack:2,life:5,type:"Creature",effect:"Haste. Flying. [lb] [Charge4]. [Accumulator2]. [lb] 1 energy - Draw 2 Cards.",color:"green",landB:0,landG:3,landR:0,landY:0},a.export=function(){window.open(c.toURL(),"FaeriaDecks Card Render","height=500,width=300,location=no,menubar=no,titlebar=no",!1)},a.$watch("opts.name + opts.gold + opts.faeria + opts.rarity + opts.attack + opts.life + opts.type + opts.effect + opts.color + opts.landB + opts.landG + opts.landR + opts.landY + opts.img",function(){c.render(a.opts)}),c.ready(function(){c.setContainer("#designer-render"),c.render(a.opts)});var d=document.getElementById("imageLoader");d.addEventListener("change",b,!1)}]),angular.module("faeriaDeckbuilderApp").controller("ChangelogCtrl",function(){}),angular.module("faeriaDeckbuilderApp").controller("NavCtrl",function(){}),angular.module("faeriaDeckbuilderApp").directive("imagePopup",function(){function a(a){if(a.length<4)for(;a.length<4;)a="0"+a;return a}var b=window.$,c=window.FAERIACARDS;return{link:function(d,e,f){d.$watch(f.imagePopup,function(d){if(d&&d.type){var g,h=Math.floor(999999*Math.random()),i={landB:0,landG:0,landR:0,landY:0};i["land"+d.landColor[0].toUpperCase()]=d.landCost,b(e).popover({html:!0,content:'<img id="current-popover'+h+'" />',trigger:"hover",placement:f.imagePopupPositon?f.imagePopupPositon:"right",container:".image-popup-container"}),b(e).on("shown.bs.popover",function(){return g?(b("#current-popover"+h).attr("src",g),void 0):(c.queue({card:{name:d.name,img:"img/cards/"+a(d.gameId)+".jpg",gold:Number(d.gold),faeria:Number(d.faeria),rarity:d.rarity,attack:d.power?Number(d.power):"",life:Number(d.life),type:d.type[0].toUpperCase()+d.type.substring(1),effect:d.ability,color:d.landColor,landB:i.landB,landG:i.landG,landR:i.landR,landY:i.landY},container:".render-container",callback:function(a){g=a,b("#current-popover"+h).attr("src",g)}}),void 0)})}})}}}),angular.module("faeriaDeckbuilderApp").controller("CardlistCtrl",["$scope","cards",function(a,b){var c=window.FAERIACARDS;c.clearQueue(),a.allCards=b.get(),a.currentWidth=125}]),angular.module("faeriaDeckbuilderApp").directive("faeriaImg",function(){function a(a){if(a.length<4)for(;a.length<4;)a="0"+a;return a}var b=window.$,c=window.FAERIACARDS;return c.setContainer(".cardlist-render-container"),{link:function(d,e,f){d.$watch(f.faeriaImg,function(d){if(d&&d.type){var f={landB:0,landG:0,landR:0,landY:0};f["land"+d.landColor[0].toUpperCase()]=d.landCost,c.queue({card:{name:d.name,img:"img/cards/"+a(d.gameId)+".jpg",gold:Number(d.gold),faeria:Number(d.faeria),rarity:d.rarity,attack:d.power?Number(d.power):"",life:Number(d.life),type:d.type[0].toUpperCase()+d.type.substring(1),effect:d.ability,color:d.landColor,landB:f.landB,landG:f.landG,landR:f.landR,landY:f.landY},callback:function(a){a&&b(e).attr("src",a)}})}})}}}),angular.module("faeriaDeckbuilderApp").controller("ExportModalCtrl",["$scope","$modalInstance","exportData",function(a,b,c){a.exportData=c,a.ok=function(){b.close()}}]),angular.module("faeriaDeckbuilderApp").controller("ImportModalCtrl",["$scope","$modalInstance",function(a,b){a.importDeck="",a.ok=function(a){b.close(a)},a.cancel=function(){b.close()}}]);