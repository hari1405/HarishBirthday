// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

document.addEventListener("DOMContentLoaded", function() {
  var num_launchers = 21;
  var num_flares = 10;
  var flare_colours = ['red', 'aqua', 'violet', 'yellow', 'lightgreen', 'white', 'blue'];
  var cssIdx = document.styleSheets.length - 1;

  function myRandom(from, to)
  {
    return from + Math.floor(Math.random() * (to-from));
  }

  var keyframes_template = "from { left: LEFTFROM%; top: 380px; width: 6px; height: 12px; }\n"
      + "33% { left: LEFTTOP%; top: TOPTOPpx; width: 0; height: 0; }\n"
      + " to { left: LEFTEND%; top: BOTBOTpx; width: 0; height: 0; }";

  for(var i=0; i < num_launchers; i++) {
    leftfrom = myRandom(15, 85);
    lefttop = myRandom(30, 70);
    toptop = myRandom(20, 200);
    leftend = lefttop + (lefttop-leftfrom)/2;
    botbot = toptop + 100;

    csscode = keyframes_template;
    csscode = csscode.replace(/LEFTFROM/, leftfrom);
    csscode = csscode.replace(/LEFTTOP/, lefttop);
    csscode = csscode.replace(/TOPTOP/, toptop);
    csscode = csscode.replace(/LEFTEND/, leftend);
    csscode = csscode.replace(/BOTBOT/, botbot);

    try { // WebKit browsers
      csscode2 = "@-webkit-keyframes flight_" + i + " {\n" + csscode + "\n}";
      document.styleSheets[cssIdx].insertRule(csscode2, 4);
    } catch(e) { }

    try { // Mozilla browsers
      csscode2 = "@-moz-keyframes flight_" + i + " {\n" + csscode + "\n}";
      document.styleSheets[cssIdx].insertRule(csscode2, 4);
    } catch(e) { }
  }

  for(var i=0; i < num_launchers; i++) {
    var rand = myRandom(0, flare_colours.length - 1);
    var rand_colour = flare_colours[rand];
    var launch_delay = myRandom(0,100) / 10;

    csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") {\n"
      + "  -webkit-animation-name: flight_" + i + ";\n"
      + "  -webkit-animation-delay: " + launch_delay + "s;\n"
      + "  -moz-animation-name: flight_" + i + ";\n"
      + "  -moz-animation-delay: " + launch_delay + "s;\n"
      + "}";
    document.styleSheets[cssIdx].insertRule(csscode, 4);

    csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") div {"
      + "  border-color: " + rand_colour + ";\n"
      + "  -webkit-animation-delay: " + launch_delay + "s;\n"
      + "  -moz-animation-delay: " + launch_delay + "s;\n"
      + "}";
    document.styleSheets[cssIdx].insertRule(csscode, 4);
  }

  for(var i=0; i < num_flares; i++) {
    csscode = ".launcher div:nth-child(" + num_flares + "n+" + i + ") {\n"
	+ "  -webkit-transform: rotate(" + (i * 360/num_flares) + "deg);\n"
	+ "  -moz-transform: rotate(" + (i * 360/num_flares) + "deg);\n"
	+ "}";
    document.styleSheets[cssIdx].insertRule(csscode, 4);
  }

  for(var i=0; i < num_launchers; i++) {
    var newdiv = document.createElement("div");
    newdiv.className = "launcher";
    for(var j=0; j < num_flares; j++) {
      newdiv.appendChild(document.createElement("div"));
    }
    document.getElementById("stage").appendChild(newdiv);
  }
  addImagesToCarousel();
}, false);
function getRandomPhotoOfHarish(index) {
  var path = "/Pictures/Harish";
  return path + index.toString() + ".jpg";
}
function addImagesToCarousel() {
  var numOfPictures = 20;
  var carouselElement = document.getElementById("abc");
  for(var i = 1; i <= numOfPictures; i++) {
    if (i == 6){
      continue;
    }
    var itemDiv = document.createElement('div');
    if(i == 1) {
        itemDiv.className = "item active";
    } else {
      itemDiv.className = "item";
    }
    itemDiv.style.cssText= "height:500px;width:100%";
    var imgTag = document.createElement('img');
    imgTag.src = getRandomPhotoOfHarish(i);
    imgTag.alt = "Harish"+i.toString();
    imgTag.style.cssText = "height:500px;width:100%";
    itemDiv.appendChild(imgTag);
    carouselElement.appendChild(itemDiv);
  }
  $("#myCarousel").carousel();
}
