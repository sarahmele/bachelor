/*
Document name       controllerSarah.js
Made:               01.10.2016
Made through:       meles1
Version Nr.:         1.0

Function: All Controller for the Views "Kernsymptome", "Labyrinth", "Labyrinth Anleitung"
*/
angular.module('starter.controllersSarah', [])

/* -- Controller for Kernsymptome View -- */
.controller('KernsympCtrl', function($scope, $stateParams, $state, QuestionnaireService) {
  $scope.setValue = function(questionid, value) {
    QuestionnaireService.setValue(value, questionid, '9');
  };
  /* Checks if all Questions are answered
  if not, a popup informs the user about it
  if it's the case, we navigate to the home view */
  $scope.goSDVideo = function() {
    /*first variable has to be the name of the view we want to navigate to
    scond is the name of the questionnaire under which we save the answers with localStorage*/
    QuestionnaireService.checkAndStore('zahlsymbolVideo', 'Kernsymptome');
  };

})

/* -- NOT NEEDED IN THIS VERSION OF THE APP -- */
/* -- Controller for Labyrinth Anleitung View -- */
.controller('LabAnlCtrl', function($scope, $stateParams, $state, $ionicModal) {

  // Go to the page "Labyrinth" after Save
  $scope.goRoute = function() {
    $state.go('route');
  };

  // Images with the according instruction text
  $scope.images = [{
    "text": "ROUTE-INSTRUCTION_TEXT_3",
    "src": "img/lab_anl_1.png",
    "src_glass": "img/lab_anl_1_lupe.png"
  }, {
    "text": "ROUTE-INSTRUCTION_TEXT_4",
    "src": "img/lab_anl_2.png",
    "src_glass": "img/lab_anl_2_lupe.png"
  }, {
    "text": "ROUTE-INSTRUCTION_TEXT_5",
    "src": "img/lab_anl_3.png",
    "src_glass": "img/lab_anl_3_lupe.png"
  }, {
    "text": "ROUTE-INSTRUCTION_TEXT_6",
    "src": "img/lab_anl_4.png",
    "src_glass": "img/lab_anl_4_lupe.png"
  }];

  // To show the Modal - a view with the images fullscreen
  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.showModal('templates/image-popover.html');
  }

  // Show the Modal - the view with the video
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  // Play the video in other View
  $scope.playVideo = function() {
    $scope.showModal('templates/routeVideo.html');
  };
})

//--------------------------------------------------------//
//---------------CONTROLLER Labyrinth Instructionvideo----//
//--------------------------------------------------------//
.controller('LabyrinthVideoCtrl', function($scope, $state, $timeout) {
  $scope.hideButton = true;
  $scope.goLab = function() {
    $state.go('labyrinth');
  };
  // to display the next button after 60 seconds
  $timeout(function() {
    $scope.hideButton = false;
  }, 5000);
})

/* -- Controller for Labyrinth View -- */
.controller('LabCtrl', function($scope, $stateParams, $interval, $state, $ionicPopup, $translate, ExcersiseStorageService) {

  // Boolean - is Labyrinth clickable (Standard false)
  var clickOK = false;

  // Factor to draw the Labyrinth (Standard 1024x768)
  var xfactor = 0.0;
  var yfactor = 0.0;

  // X and Y Coordinates to draw a point (Center)
  var xvalue = 0;
  var yvalue = 0;

  // X and Y values for drawing a line from - to
  var xvaluefrom = 0;
  var yvaluefrom = 0;
  var xvalueto = 0;
  var yvalueto = 0;

  // Coordinates for the lines of the Labyrinth (Standard 1024x768)
  var line1 = [51, 682, 160, 415.5];
  var line2 = [160, 415.5, 109, 237.5];
  var line3 = [109, 237.5, 160, 142.5];
  var line4 = [160, 142.5, 294.5, 104];
  var line5 = [294.5, 104, 326.5, 396.5];
  var line6 = [109, 237.5, 326.5, 396.5];
  var line7 = [160, 415.5, 326.5, 396.5];
  var line8 = [160, 415.5, 224, 606];
  var line9 = [51, 682, 224, 606];
  var line10 = [224, 606, 371, 628];
  var line11 = [371, 628, 326.5, 396.5];
  var line12 = [326.5, 396.5, 512, 472.5];
  var line13 = [512, 472.5, 422.5, 320];
  var line14 = [422.5, 320, 441.5, 180.5];
  var line15 = [441.5, 180.5, 294.5, 104];
  var line16 = [441.5, 180.5, 627, 110.5];
  var line17 = [441.5, 180.5, 544, 275.5];
  var line18 = [544, 275.5, 761.5, 339];
  var line19 = [761.5, 339, 627, 110.5];
  var line20 = [761.5, 339, 710.5, 472.5];
  var line21 = [710.5, 472.5, 512, 472.5];
  var line22 = [512, 472.5, 678.5, 663]
  var line23 = [678.5, 663, 371, 628];
  var line24 = [678.5, 663, 806.5, 606];
  var line25 = [806.5, 606, 710.5, 472.5];
  var line26 = [710.5, 472.5, 928, 402.5];
  var line27 = [928, 402.5, 761.5, 339];
  var line28 = [928, 402.5, 889.5, 263];
  var line29 = [889.5, 263, 877, 91.5];
  var line30 = [889.5, 263, 761.5, 339];
  var line31 = [877, 91.5, 627, 110.5];
  var line32 = [928, 402.5, 909, 555];
  var line33 = [909, 555, 806.5, 606];
  var line34 = [909, 555, 953.5, 669.5];
  var line35 = [953.5, 669.5, 806.5, 606];
  var line36 = [422.5, 320, 544, 275.5];

  // Coordinates for the points of the Labyrinth - Center (Standard 1024x768)
  var point1 = [51, 682]; //start
  var point2 = [160, 415.5];
  var point3 = [109, 237.5];
  var point4 = [160, 142.5];
  var point5 = [294.5, 104];
  var point6 = [326.5, 396.5];
  var point7 = [224, 606];
  var point8 = [371, 628];
  var point9 = [678.5, 663];
  var point10 = [512, 472.5];
  var point11 = [422.5, 320];
  var point12 = [441.5, 180.5];
  var point13 = [544, 275.5];
  var point14 = [627, 110.5];
  var point15 = [761.5, 339];
  var point16 = [710.5, 472.5];
  var point17 = [806.5, 606];
  var point18 = [909, 555];
  var point19 = [928, 402.5];
  var point20 = [889.5, 263];
  var point21 = [877, 91.5];
  var point22 = [953.5, 669.5]; //end

  // the last point and line the user clicked
  var lastpoint;
  var beforelastpoint;
  var lastline;

  // how many times the function showWay was executed - initial 0 - counter for the point to draw and the line to draw
  var countway;
  var countwaylines;

  // counter for the point, that needs to be drawn white again (after green) / the line, that needs to be black again
  var whiteone;
  var blackline;

  // Arrays with all the points and all the lines from the labyrinth - 2 Dimensional Array
  // The first square bracket references the desired element in the outer array (actualLab).
  // The second square bracket references the desired element in the inner array (Point or Line Array).
  // (JavaScript array indexes start at zero.)
  var actualLab;// = [point1, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11, point12, point13, point14, point15, point16, point17, point18, point19, point20, point21, point22];
  var actualLabLines;// = [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12, line13, line14, line15, line16, line17, line18, line19, line20, line21, line22, line23, line24, line25, line26, line27, line28, line29, line30, line31, line32, line33, line34, line35, line36];

  // Array with all the points and all the lines to show
  var labWay;
  var labWayLines;
  var labWay1 = [point1, point2, point7, point8, point9, point10, point11, point13, point12, point14, point21, point20, point15, point19, point16, point17, point22];
  var labWayLines1 = [line1, line8, line10, line23, line22, line13, line36, line17, line16, line31, line29, line30, line27, line26, line25, line35];
  var labWay2 = [point1, point7, point2, point3, point4, point5, point12, point11, point13, point15, point19, point16, point10, point9, point17, point18, point22];
  var labWayLines2 = [line9, line8, line2, line3, line4, line15, line14, line36, line18, line27, line26, line21, line22, line24, line33, line34];
  var labWay3 = [point1, point2, point3, point6, point8, point9, point10, point16, point15, point14, point21, point20, point19, point18, point17, point22];
  var labWayLines3 = [line1, line2, line6, line11, line23, line22, line21, line20, line19, line31, line29, line28, line32, line33, line35];
  var labWay4 = [point1, point7, point8, point6, point3, point4, point5, point12, point14, point15, point13, point11, point10, point9, point17, point18, point22];
  var labWayLines4 = [line9, line10, line11, line6, line3, line4, line15, line16, line19, line18, line36, line13, line22, line24, line33, line34];

  // Array with all the points to show the second time - 2 Dimensional Array
  //var secondWay = [point4, point3, point6, point2, point7, point8, point9, point10, point16, point17, point18, point19, point15, point13, point12, point14, point21];
  //var secondWayLines = [line3, line6, line7, line8, line10, line23, line22, line21, line25, line33, line32, line27, line18, line17, line16, line31];

  // The way the user did
  var userway = [];

  // get the html canvas labyrinth
  my_canvas = document.getElementById("labyrinth");

  // get the context of the canvas
  ctx = my_canvas.getContext("2d");

  // Where did the user click in the canvas
  var xclient;
  var yclient;
  var xrealclient;
  var yrealclient;

  //position for the endcircle
  var endcircle;

  //rightclicks - how many clicks by the user where in a circle
  var rightclicks;

  //clicks - how many clicks by the user
  var clicks;

  //how many joints of the user were actually right
  var rightlines;

  // how many times the user did the whole lab right
  var rightlab = 0;

  // how many times the user did the lab
  var countlab = 0;

  // Make the Way
  doWay = function() {
    //You cannot click the lab until the way is shown
    clickOK = false;

    // every variable gets his initialvalue
    countway = 0;
    countwaylines = 0;
    lastpoint = [0, 0];
    beforelastpoint = [0, 0];
    lastline = [0, 0, 0, 0];
    whiteone = 0;
    blackline = 0;
    userway = [];
    xclient = 0.0;
    yclient = 0.0;
    xrealclient = 0.0;
    yrealclient = 0.0;
    rightclicks = 0;
    clicks = 0;
    rightlines = 0;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // the Points of the Lab to draw
    actualLab = [point1, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11, point12, point13, point14, point15, point16, point17, point18, point19, point20, point21, point22];
    actualLabLines = [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12, line13, line14, line15, line16, line17, line18, line19, line20, line21, line22, line23, line24, line25, line26, line27, line28, line29, line30, line31, line32, line33, line34, line35, line36];

    // Draw The Labyrinth
    $scope.drawLab();
    // Show the Way through the Labyrinth - Points
    setTimeout(function() {
      $interval(showWay, 1500, labWay.length + 1); //1500
    }, 2000);//2000
    // Show the Way through the Labyrinth - Lines
    setTimeout(function() {
      $interval(showWayLines, 1500, labWayLines.length + 1); //1500
    }, 2750);//2750
    // Click is Only possible when way through Labyrinth was shown
    setTimeout(function() {
      $scope.drawLab();
      clickOK = true;
      nowDoIt();
    }, 30000); //30000
  };

  getWay = function() {
    var numberLab = (Math.ceil(Math.random() * 4));
    if (numberLab == 1) {
      labWay = labWay1;
      labWayLines = labWayLines1;
    }
    else if (numberLab == 2) {
      labWay = labWay2;
      labWayLines = labWayLines2;
    }
    else if (numberLab == 3) {
      labWay = labWay3;
      labWayLines = labWayLines3;
    }
    else {
      labWay = labWay4;
      labWayLines = labWayLines4;
    }
  };

  // -- Function Draw the Lab initially --//
  $scope.drawLab = function() {
    // Draw all the Lines
    for (var i = 0; i < actualLabLines.length; i++) {
      drawLine(actualLabLines[i][0], actualLabLines[i][1], actualLabLines[i][2], actualLabLines[i][3], "black");
    }
    // Draw all the Points of the Lab
    for (var i = 0; i < actualLab.length; i++) {
      if (i == 0 || i == (actualLab.length - 1)) {
        // draw the first and the last point black
        drawPoint(actualLab[i][0], actualLab[i][1], "black");
      } else {
        // draw all the others white
        drawPoint(actualLab[i][0], actualLab[i][1], "white");
      }
    }
    // Name Start and End
    // where to write START
    var xstart = parseInt(point1[0] * xfactor + 50);
    var ystart = parseInt(point1[1] * yfactor + 10);
    // where to write END
    var xend = parseInt(point22[0] * xfactor - 50);
    var yend = parseInt(point22[1] * yfactor + 10);
    // write the letters in Arial, 20 pt in black
    ctx.font = 'bold 20pt Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "black";
    ctx.fillText('Start', xstart, ystart);
    ctx.fillText('End', xend, yend);
    ctx.font = 'bold 18pt Arial';
    ctx.fillStyle = "green";
    ctx.fillText($translate.instant('MIND_WAY'), ctx.canvas.width / 2, 15);
  };

  // -- Function to draw a point --//
  drawPoint = function(xvalue, yvalue, pointcolor) {
    ctx.beginPath();
    // x and y are center / factor depends on screensize / radius is 18
    ctx.arc(xvalue * xfactor, yvalue * yfactor, 18, 0, 2 * Math.PI);
    //  color of the circles filling
    ctx.fillStyle = pointcolor;
    ctx.fill();
    ctx.closePath();
    // thickness of the circle line and color
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
  };

  // -- Function to draw a line --//
  drawLine = function(xvaluefrom, yvaluefrom, xvalueto, yvalueto, linecolor) {
    ctx.beginPath();
    // line from
    ctx.moveTo(xvaluefrom * xfactor, yvaluefrom * yfactor);
    // line to
    ctx.lineTo(xvalueto * xfactor, yvalueto * yfactor);
    // line thickness
    ctx.lineWidth = 5;
    ctx.strokeStyle = linecolor;
    ctx.stroke();
  };

  // -- Function show the Way in the Labyrinth --//
  // 2 Dimensional Arrays
  // The first square bracket references the desired element in the outer array (labWay).
  // The second square bracket references the desired element in the inner array (Point Array).
  // (JavaScript array indexes start at zero.)
  showWay = function() {
    if (countway == 0) {
      // draw the first point in green --> coordinates
      drawPoint(labWay[countway][0], labWay[countway][1], "lime");
    } else if (countway == (labWay.length)) {
      // make the last point black again
      whiteone = countway - 1;
      drawPoint(labWay[whiteone][0], labWay[whiteone][1], "black");
    } else {
      // draw the point in green
      drawPoint(labWay[countway][0], labWay[countway][1], "lime");
      // draw the point before the one, which is drawn in green, white again
      whiteone = countway - 1;
      if (whiteone != 0) {
        drawPoint(labWay[whiteone][0], labWay[whiteone][1], "white");
      } else {
        drawPoint(labWay[whiteone][0], labWay[whiteone][1], "black");
      }
    }
    // counter of point
    countway = countway + 1;
  };

  // Function show the Way in the Labyrinth
  // 2 Dimensional Arrays
  // The first square bracket references the desired element in the outer array (labWay).
  // The second square bracket references the desired element in the inner array (Point Array).
  // (JavaScript array indexes start at zero.)
  showWayLines = function() {
    if (countwaylines == 0) {
      // draw the first line in green --> coordinates
      drawLine(labWayLines[countwaylines][0], labWayLines[countwaylines][1], labWayLines[countwaylines][2], labWayLines[countwaylines][3], "lime");
      // make startpoint lime again
      drawPoint(labWay[countwaylines][0], labWay[countwaylines][1], "lime");
      // fill following point white again
      drawPoint(labWay[countwaylines + 1][0], labWay[countwaylines + 1][1], "white");
    } else if (countwaylines == (labWayLines.length)) {
      // make the last line black again
      blackline = countwaylines - 1;
      drawLine(labWayLines[blackline][0], labWayLines[blackline][1], labWayLines[blackline][2], labWayLines[blackline][3], "black");
      drawPoint(labWay[blackline][0], labWay[blackline][1], "white");
      drawPoint(labWay[countwaylines][0], labWay[countwaylines][1], "lime");
    } else {
      // draw the line in green
      drawLine(labWayLines[countwaylines][0], labWayLines[countwaylines][1], labWayLines[countwaylines][2], labWayLines[countwaylines][3], "lime");
      if (countwaylines == (labWayLines.length - 1)) {
        // fill the following point black again
        drawPoint(labWay[countwaylines + 1][0], labWay[countwaylines + 1][1], "black");
      } else {
        // fill the following point white again
        drawPoint(labWay[countwaylines + 1][0], labWay[countwaylines + 1][1], "white");
      }
      // draw the line before the one, which is drawn in green, black again
      blackline = countwaylines - 1;
      drawLine(labWayLines[blackline][0], labWayLines[blackline][1], labWayLines[blackline][2], labWayLines[blackline][3], "black");
      // fill the point after the black line lime again
      drawPoint(labWay[countwaylines][0], labWay[countwaylines][1], "lime");
      if (blackline != 0) {
        // fill the point before the black line white again
        drawPoint(labWay[blackline][0], labWay[blackline][1], "white");
      } else {
        // fill the point before the black line black again --> if its the first
        drawPoint(labWay[blackline][0], labWay[blackline][1], "black");
      }
    }
    // counter of lines
    countwaylines = countwaylines + 1;
  };

  /* -- Now its Your Turn to draw -- */
  nowDoIt = function() {
    // write the letters in Arial, 16 pt in white
    ctx.clearRect((ctx.canvas.width / 2) - 250, 3, 500, 35);
    ctx.font = 'bold 18pt Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "mediumblue";
    ctx.fillText($translate.instant('DO_WAY'), ctx.canvas.width / 2, 15);

    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('TRY_LAB'),
      template: $translate.instant('TRY_LAB_TEXT'),
    });
    alertPopup;
    /*.then(function() {
      $state.go('geschafftLAB');
    });*/
  };

  // Function Click: Draw a blue point when click, wherever you are
  $scope.doClick = function(event) {
    // Only if canvas is clickable
    if (clickOK == true) {
      xclient = event.clientX;
      yclient = event.clientY;

      var BB = my_canvas.getBoundingClientRect();
      var offsetX = BB.left;
      var offsetY = BB.top;

      xrealclient = xclient - offsetX;
      yrealclient = yclient - offsetY;

      // true if the user clicks into the endcircle
      endcircle = pointInCircle(xrealclient, yrealclient, point22[0] * xfactor, point22[1] * yfactor, 30);

      // gets true if the user clicks into a point in the labyrinth
      var clickedinacircle = false;
      var madearealline = false;

      if (!endcircle) {
        // the user clicked in a circle which was not the end
        clicks = clicks + 1;
        //search in the whole labyrinth
        for (var i = 0; i < actualLab.length; i++) {
          // check if user clicked in a circle
          clickedinacircle = pointInCircle(xrealclient, yrealclient, actualLab[i][0] * xfactor, actualLab[i][1] * yfactor, 30);
          // if yes --> make it blue an get a rightclick (means he clicked a circle of the whole lab)
          if (clickedinacircle) {
            // count how many real circles the user clicked
            rightclicks = rightclicks + 1;
            // draw the line blue if a circle was clicked before
            if (lastpoint[0] != 0) {
              //Korrekturmöglichkeit (gleicher Punkt wie letzter Punkt)
              if (lastpoint[0] == actualLab[i][0] && lastpoint[1] == actualLab[i][1]){
                // Vorletzter Punkt angeklickt
                if (lastpoint != beforelastpoint){
                  console.log("gleicher Punkt");
                  console.log(lastline);
                  // letzte Linie wieder schwarz machen
                  drawLine(lastline[0], lastline[1], lastline[2], lastline[3], "black");
                  // aktueller Punkt weiss / Vorletzter wieder cyan
                  if (beforelastpoint[0] != 0 ){
                    drawPoint(actualLab[i][0], actualLab[i][1], "white");
                    drawPoint(beforelastpoint[0], beforelastpoint[1], "cyan");
                  }
                  // Wenn aktueller Punkt "Start war"
                  else{
                    drawPoint(actualLab[i][0], actualLab[i][1], "black");
                  }
                  // Letzter Punkt zurücksetzen auf Vorletzten
                  lastpoint = beforelastpoint;
                }
                else{
                  console.log("Korrektur so nicht erlaubt");
                }
              }
              else {
              // draw Line if its in the actuallab
              madearealline = realLineInLab(lastpoint[0], lastpoint[1], actualLab[i][0], actualLab[i][1]);
                if(madearealline){
                  drawLine(lastpoint[0], lastpoint[1], actualLab[i][0], actualLab[i][1], "cyan");
                  // put the clicked line in the array of the way the user did
                  userway.push([lastpoint[0], lastpoint[1], actualLab[i][0], actualLab[i][1]]);
                  lastline = [lastpoint[0], lastpoint[1], actualLab[i][0], actualLab[i][1]];
                  // set the point before the lastpoint
                  beforelastpoint = lastpoint;
                  // draw Point
                  drawPoint(actualLab[i][0], actualLab[i][1], "cyan");
                  lastpoint = [actualLab[i][0], actualLab[i][1]];
                }
              }
            }
            // else draw just the point blue
            else {
              drawPoint(actualLab[i][0], actualLab[i][1], "cyan");
              lastpoint = [actualLab[i][0], actualLab[i][1]];
            }
          }
        }
      } else {
        countlab = countlab + 1;
        clicks = clicks + 1;
        rightclicks = rightclicks + 1;
        drawLine(lastpoint[0], lastpoint[1], point22[0], point22[1], "cyan");
        // put the clicked line in the array of the way the user did
        userway.push([lastpoint[0], lastpoint[1], point22[0], point22[1]]);
        // draw Point
        drawPoint(point22[0], point22[1], "cyan");
        //search in the whole labyrinth
        console.log("USERWAY: " + userway);
        console.log("REALWAY: " + labWayLines);
        // loop durch das userway array (Länge)
        for (var i = 0; i < userway.length; i++) {
          // inner loop durch labWayLines
          for (var j = 0; j < labWayLines.length; j++) {
            if (
              ((userway[i][0] == labWayLines[j][0] && userway[i][1] == labWayLines[j][1]) || (userway[i][0] == labWayLines[j][2] && userway[i][1] == labWayLines[j][3])) &&
              ((userway[i][2] == labWayLines[j][0] && userway[i][3] == labWayLines[j][1]) || (userway[i][2] == labWayLines[j][2] && userway[i][3] == labWayLines[j][3]))
            ) {
              rightlines = rightlines + 1;
            }
          }
        }
        // checken ob der ganze weg richtig gemacht wurde
        if (userway.length == rightlines) {
          rightlab = rightlab + 1;
        }

        if (rightlab > 1 || countlab > 4) {
          // 2 mal richtig oder 5 mal falsch --> Übung beendet
          $scope.saveResultsLab();
          $state.go('geschafftLAB');
        } else {
          // Mache den Weg nochmal
        //  $scope.showPopupMIDATA();
          doWay();
        }
      }
      // Klicken noch nicht erlaubt
    } else {
      console.info("nopes");
    }
  };


  // -- Function to test if the User hit a circle --//
  // x,y is the point to test
  // cx, cy is circle center, and radius is circle radius
  pointInCircle = function(x, y, cx, cy, radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
  };

  // -- Function to test if the line exists in the lab --//
  // x,y is the point to test
  // cx, cy is circle center, and radius is circle radius
  realLineInLab = function(x1, y1, x2, y2) {
    var isinlab = false;
    // loop durch die linien des labs
      for (var n = 0; n < actualLabLines.length; n++) {
        if (
          // vergleich ob koordinaten vorhanden im labyrinth
          ((x1 == actualLabLines[n][0] && y1 == actualLabLines[n][1]) || (x1 == actualLabLines[n][2] && y1 == actualLabLines[n][3])) &&
          ((x2 == actualLabLines[n][0] && y2 == actualLabLines[n][1]) || (x2 == actualLabLines[n][2] && y2 == actualLabLines[n][3]))
        ) {
          isinlab = true;
        }
      }
      return isinlab;
  };

  // Save the Results
  $scope.saveResultsLab = function() {

    // variable wome wott spichere


    // resultat array wome später am service übergit

            var results = [];

    //ab hiä jewils objekt mit name u wert vo de einzelne variable

            var result1 = {};
            var date = new Date();

            result1.name = "Datum, Uhrzeit nach beenden der Übung";

            result1.value = date.toString();

            results.push(result1);

            var result2 = {};

            result2.name = "Anzahl Klicks";

            result2.value = clicks;

            results.push(result2);

            var result3 = {};

            result3.name = "Anzahl Punkte des Labyrinths angeklickt";

            result3.value = rightclicks;

            results.push(result3);

            var result4 = {};

            result4.name = "Anzahl richtige Verbindungen";

            result4.value = rightlines;

            results.push(result4);


    //service ufruef zersch mit em name vor üebig u när em array wome d variable het drigspicheret

            ExcersiseStorageService.saveResultsToFile("Labyrinth Übung", results);

        };

  // Popup mit den Variablen für Midata
  $scope.showPopupMIDATA = function() {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('VARIABLES_MIDATA'),
      template: "Anzahl Clicks: " + clicks + "</br></br>" + "Anz. Punkt des Labs angeklickt: " + rightclicks + "</br></br>" + "Anz. richtige Verbindungen: " + rightlines,
    });
    alertPopup;
    /*.then(function() {
      $state.go('geschafftLAB');
    });*/
  };

  // Labyrinth is defined for width="1024" height="768"
  // Calculate Factor
  var xfactor = window.innerWidth / 1024;
  var yfactor = window.innerHeight / 768;

  // Canvas Size = Screen Size
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  getWay();
  doWay();

});
