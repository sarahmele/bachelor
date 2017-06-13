angular.module('starter.controllersRea', [])
  //--------------------------------------------------------//
  //---------------CONTROLLER Fatigue-----------------------//
  //--------------------------------------------------------//
  .controller('FatigueCtrl', function($scope, $stateParams, $state, $timeout, jsonService, QuestionnaireService) {
    // to initialize the questions
    $timeout(function() {
      $scope.data = jsonService.getJson();
    }, 10);


    /* Checks if all Questions are answered
    if not, a popup informs the user about it
    if it's the case, we navigate to the next view */
    $scope.goImpressum = function() {
      /*first variable has to be the name of the view we want to navigate to
      scond is the name of the ng-modal under which we save the answers with localStorage*/
      QuestionnaireService.checkAndStore('impressum', 'Fatigue Severity Scale');
    };

    $scope.setValue = function(value, questionid) {
      QuestionnaireService.setValue(value, questionid, '9');
    };
  })
  //--------------------------------------------------------//
  //---------------CONTROLLER Msis-----------------------//
  //--------------------------------------------------------//
  .controller('MsisCtrl', function($scope, $stateParams, $state, $timeout, jsonService, $translate, $ionicPopup, QuestionnaireService) {
    // to initialize the buttons
    $timeout(function() {
      $scope.data = jsonService.getJson();
    }, 10);

    //$scope.MSISQS1 = {};
    /* Checks if all Questions are answered
    if not, a popup informs the user about it
    if it's the case, we navigate to the next view */
    $scope.goMsis2 = function() {
      /*first variable has to be the name of the view we want to navigate to
      scond is the name of the ng-modal under which we save the answers with localStorage*/
      QuestionnaireService.checkAndStore('msis2', 'MSIS Seite 1');
    };

    $scope.setValue = function(value, questionid) {
      QuestionnaireService.setValue(value, questionid, '7');
    };
  })
  //--------------------------------------------------------//
  //---------------CONTROLLER Msis2-----------------------//
  //--------------------------------------------------------//
  .controller('Msis2Ctrl', function($scope, $stateParams, $state, jsonService, QuestionnaireService, $timeout) {
    $timeout(function() {
      $scope.data = jsonService.getJson();
    }, 10);

    /* Checks if all Questions are answered
    if not, a popup informs the user about it
    if it's the case, we navigate to the next view */
    $scope.goMsis3 = function() {
      /*first variable has to be the name of the view we want to navigate to
      scond is the name of the ng-modal under which we save the answers with localStorage*/
      QuestionnaireService.checkAndStore('msis3', 'MSIS Seite 2');
    };

    $scope.setValue = function(value, questionid) {
      QuestionnaireService.setValue(value, questionid, '8');
    };
    $scope.goMsis = function() {
      $state.go('msis');
      //******ergänzen mit load function von loaclstorage******/
    };

  })
  //--------------------------------------------------------//
  //---------------CONTROLLER Msis3-----------------------//
  //--------------------------------------------------------//
  .controller('Msis3Ctrl', function($scope, $stateParams, $state, jsonService, QuestionnaireService, $timeout) {
    $timeout(function() {
      $scope.data = jsonService.getJson();
    }, 10);


    /* Checks if all Questions are answered
    if not, a popup informs the user about it
    if it's the case, we navigate to the next view */
    $scope.goMsis4 = function() {
      /*first variable has to be the name of the view we want to navigate to
      scond is the name of the ng-modal under which we save the answers with localStorage*/
      QuestionnaireService.checkAndStore('msis4', 'MSIS Seite 3');
    };

    $scope.setValue = function(value, questionid) {
      QuestionnaireService.setValue(value, questionid, '8');
    };

    $scope.goMsis2 = function() {
      $state.go('msis2');
      //******ergänzen mit load function von loaclstorage******/
    };
  })
  //--------------------------------------------------------//
  //---------------CONTROLLER Msis4-----------------------//
  //--------------------------------------------------------//
  .controller('Msis4Ctrl', function($scope, $stateParams, $state, jsonService, QuestionnaireService, $timeout) {
    $timeout(function() {
      $scope.data = jsonService.getJson();
    }, 10);



    /* Checks if all Questions are answered
    if not, a popup informs the user about it
    if it's the case, we navigate to the next view */
    $scope.goLabVideo = function() {
      /*first variable has to be the name of the view we want to navigate to
      scond is the name of the ng-modal under which we save the answers with localStorage*/
      QuestionnaireService.checkAndStore('labyrinthVideo', 'MSIS Seite 4');
    };

    $scope.setValue = function(value, questionid) {
      QuestionnaireService.setValue(value, questionid, '6');
    };

    $scope.goMsis3 = function() {
      $state.go('msis3');
    };
  })

  //--------------------------------------------------------//
  //---------------CONTROLLER Zahlsymbol Instructionvideo-----------------------//
  //--------------------------------------------------------//
  .controller('SymbolDigitVideoCtrl', function($scope, $state, $timeout) {
    $scope.hideButton = true;
    $scope.goSD = function() {
      $state.go('symbolDigitPrep');
    };
    // to display the next button after 60 seconds
    $timeout(function() {
      $scope.hideButton = false;
    }, 15000);
  })

  //--------------------------------------------------------//
  //---------------CONTROLLER Zahlsymbol-----------------------//
  //--------------------------------------------------------//
  .controller('SymbolDigitCtrl', function($scope, $stateParams, $state, $timeout, $interval, $ionicPopup, SymDigService, $translate, ExcersiseStorageService, $rootScope) {

    //************************************** initialize the variables for the excersise*************************************
    //number of correct assignments
    var correct;
    //number of incorrect assignments
    var incorrect;
    //number of clicks during a definded time span
    var clickFrequency = 0;
    // counter to mark the number of times the interval is excecuted
    var counter = 0;
    // array to store the diffrent result variables
    var results = [];
    // Time after which the interval is triggered
    var intervalDuration = 15000;
    // number to define how many times the interval should be excecuted
    var intervalrepetitions = SymDigService.getTimeExcersise() / intervalDuration;
    console.log("intervalrep" + intervalrepetitions);

    //Popup at the beginning to indicate that the prepartion is over, after the popup(that means after clicking ok), the function functcorrincorr gets triggered
    var popTitle = $translate.instant('INFO');
    var popTemplate = $translate.instant('SDTEMPLATE_POPUP');

    var alertPopup = $ionicPopup.alert({
      title: popTitle,
      template: popTemplate,
    });
    alertPopup.then(function() {
      functcorrincorr();
    });

    // Function after alertPopup
    functcorrincorr = function() {

      // Interval that calls the functioninterval, intervalDuration is the timespan between the two interval calls, intervalrepetitions defines how often the interval gets called
      $interval(functioninterval, intervalDuration, intervalrepetitions);

      // Assign the same 9 numbers as in the sd prepartion to the ranNums variable
      var ranNums = $rootScope.ranNums;

      console.log("Lösungstabelle vom Probelauf:" + ranNums);
      // initialize the keyTable of the main excercise with the same symbol/digit relation as in the prepartion
      $scope.keyTable = $rootScope.keyTable;

      // Add every number of the ranNums array again to the array, because we need to have 18 images in one row in the solveTable - therefore every image is displayed twice in one row
      for (var i = 0; i < 9; i++) {
        ranNums.push(ranNums[i]);
      }
      console.log("Nummern für Bilder der Lösungstabelle:" + ranNums);
      // Generate two tables with 18 random ordered images of the ranNums array that we used to create the keytable
      $scope.solveTable = SymDigService.fillSolveTable((SymDigService.genNums(ranNums, 18)));
      $scope.solveTable2 = SymDigService.fillSolveTable((SymDigService.genNums(ranNums, 18)));
      // every time the fillSolveTable function is called, the first spot of the table is defined as the one to complet next - because we have two solveTables. we have to define that the first spot of solveTable2, is not the next spot to be completed
      $scope.solveTable2[0].next = false;
      //*****************************************************************************************
      var solveImgs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      console.log(solveImgs);

      // Generate the Images to add to the solveTable
      $scope.solveNumbers = SymDigService.genSolveNumbers(solveImgs);

      // *****************************************************************************************
      // Function excecuted if a digit was selected, to assign it to the next symbol
      // *****************************************************************************************

      // Indicates that the next digit to assign is in the first table
      var solveTableOneComplete = false;

      $scope.setValueImage = function(digit) {

        // initialize this variable with the objects of the solveTable to be completed
        var currentSolveTable;
        // check in which solveTable the digit has to be assigned, if the first solveTable is not completed, the next variable has to be assigned in the first solveTable otherwise in the second
        if (!solveTableOneComplete) {
          currentSolveTable = $scope.solveTable;
          console.log("Nächste Variable befindet sich in der oberen Tabelle")
        } else {
          currentSolveTable = $scope.solveTable2;
          console.log("Nächste Variable befindet sich in der unteren Tabelle")
        }
        // get the length of the currentSolvetable
        var length = currentSolveTable.length;
        // The imageName of the selected number
        console.log(length);
        for (var i = 0; i < length; i++) {
          // true if it's the next empty spot, to mark that this spot is gonna be replaced with the choosen number one
          console.log(i);
          if (currentSolveTable[i].next == true) {

            // Set the NumberImage at the current position to the selected one
            currentSolveTable[i].numSrc = "img/" + digit.id + ".png";

            // Set the next spot to be the next one to by replaced by an image, and the current to no longer by the next spot
            if (i < (length - 1)) {
              currentSolveTable[i + 1].next = true;
              currentSolveTable[i].next = false;
            }

            // Check if the selected digit is the one that corresponds to the symbol at the current position
            // imageSource of the symbol at the current[i] position
            var imgSrcSolveTable = currentSolveTable[i].imgSrc;
            // imageSource of the related symbol in the keytable to the choosen number
            var imgSrcKeyTable = $scope.keyTable[digit.id - 1].imgSrc;
            console.log(imgSrcSolveTable);
            console.log(imgSrcKeyTable);
            // Check if the symbols are the same, in that case if they have the same imageSource, if true add one to the number of correct assignments, if false add one to the number of false assignments
            SymDigService.addResult(angular.equals(imgSrcKeyTable, imgSrcSolveTable));


            //Check if the image for the last field was choosen - true means it was the last image of a table
            if (i == (length - 1)) {
              console.log("letztes feld");
              //True if it's the last field of the first table
              if (SymDigService.getTrys() == 0) {
                // mark that the spot at this position is nolonger empty
                currentSolveTable[i].next = false;
                // mark that the first solveTable is completed
                solveTableOneComplete = true;
                // set the first spot of the second solveTable to be the next spot to be completed
                $scope.solveTable2[0].next = true;
                // add a try
                SymDigService.addTry();
                //True if it's the second try, so the last field of the second table, that means that both tables are completed and need to be filled with new values
              } else if (SymDigService.getTrys() == 1) {
                //function to reload the lines with new values
                $scope.solveTable = SymDigService.fillSolveTable((SymDigService.genNums(ranNums, 18)), false);
                $scope.solveTable2 = SymDigService.fillSolveTable((SymDigService.genNums(ranNums, 18)), false);
                // reset the variables to the initial status
                $scope.solveTable2[0].next = false;
                solveTableOneComplete = false;
                SymDigService.setTry(0);
              }
            } else {
              break;
            }

          } else {
            //should not happen
          }
        }
      };
    };

    // funtion that gets triggered by the interval
    functioninterval = function() {
      counter++;
      var partResult = SymDigService.getPartResults();
      correct = partResult.correct;
      incorrect = partResult.incorrect;
      clickFrequency = ((correct + incorrect) / ((SymDigService.getTimeExcersise() / intervalrepetitions) / 60000));

      var partresult1 = {};
      partresult1.name = "Anzahl korrekte Zuordnungen (während dem " + counter + ".Teil)";
      partresult1.value = correct;
      results.push(partresult1);
      var partresult2 = {};
      partresult2.name = "Anzahl inkorrekte Zuordnungen (während dem " + counter + ".Teil)";
      partresult2.value = incorrect;
      results.push(partresult2);
      var partresult3 = {};
      partresult3.name = "Klickfrequenz pro Minute (während dem " + counter + ".Teil)";
      partresult3.value = clickFrequency;
      results.push(partresult3);
      console.log("Zwischenresultate" + results);
      if (counter == intervalrepetitions) {
        $state.go('geschafftSD');

        // Variables to store in the result file
        //var date = new Date();
        correct = SymDigService.getCorrect();
        incorrect = SymDigService.getIncorrect();
        clickFrequency = SymDigService.getClickFrequency();
        /*var result1 = {};
        result1.name = "Datum, Uhrzeit nach beenden der Übung";
        result1.value = date.toString();
        results.push(result1);*/
        var result2 = {};
        result2.name = "Anzahl korrekte Zuordnungen(insgesamt)";
        result2.value = correct;
        results.push(result2);
        var result3 = {};
        result3.name = "Anzahl inkorrekte Zuordnungen(insgesamt)";
        result3.value = incorrect;
        results.push(result3);
        var result4 = {};
        result4.name = "Klickfrequenz pro Minute(insgesamt)";
        result4.value = Math.round(clickFrequency);
        results.push(result4);
        var result5 = {};
        result5.name = "Dauer der Übung in Sekunden";
        result5.value = (SymDigService.getTimeExcersise() / 1000);
        results.push(result5);
        console.log("FinalResultate" + results);
        ExcersiseStorageService.saveResultsToFile("Zahl-Symbol Übung", results);
      } else {
        //do nothing
      }
    };
  })

  //--------------------------------------------------------//
  //---------------CONTROLLER Zahlsymbol Vorbereitung-----------------------//
  //--------------------------------------------------------//
  .controller('SymbolDigitPrepCtrl', function($scope, $stateParams, $ionicPopup, $translate, $rootScope, $state, SymDigService, ExcersiseStorageService) {
    var popTitle = $translate.instant('INFO');
    var popTemplate = $translate.instant('TEMPLATEPOPUP_NEXTPREPZS');

    var alertPopup = $ionicPopup.alert({
      title: popTitle,
      template: popTemplate,
    });
    alertPopup.then(function() {
      var startTime = new Date().getTime();

      // Fill the keyTable with the images in a random way and the numbers ordered from 1 to 9
      var ranNums = SymDigService.doShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
      console.log("RandomOrderedNumbers:" + ranNums);

      //Remove all items after the nint one - because for the keytable only the first nine numbers were choosen to be an image
      ranNums.splice(9);

      //copy the array for the solveTable
      var ranNumsForSolveTable = ranNums.slice();

      // Add the number at position 2 of the ranNums array again to the ranNums array, because we need to have 10 images in the solveTable
      ranNumsForSolveTable.push(ranNumsForSolveTable[2]);
      console.log("10 zahlen" + ranNumsForSolveTable);
      console.log("9 zahlen" + ranNums);

      //initialize rootScope.keytable with the keyTable objects array containing images and numbers. therefore we will be able to fill the keyTable of the symbolDigit excercise with the same symbol/digit relation
      $rootScope.keyTable = SymDigService.fillKeyTable(ranNums);
      //initialize the solveTable with 10 images in a random order, of which one image is used twice
      $scope.solveTable = SymDigService.fillSolveTable((SymDigService.genNums(ranNumsForSolveTable, 10)));
      console.log("Zahlen für richtige Übung" + ranNums);
      //initialize the rootScope.ranNums with the 9 numbers of the images for the keytable. therefore we will be able to generate a solveTable in the main excercise with the correct images
      $rootScope.ranNums = ranNums;
      //*****************************************************************************************
      var solveNumberImages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      console.log("Lösungszahlen" + solveNumberImages);

      // Generate the Numberimages to add to the solveTable
      $scope.solveNumbers = SymDigService.genSolveNumbers(solveNumberImages);

      // *****************************************************************************************
      // Function excecuted if a digit was selected, to assign it to the next symbol
      // *****************************************************************************************
      $scope.setValueImage = function(digit) {
        // initialize this variable with the objects of the solveTable
        var currentSolveTable = $scope.solveTable;
        // get the length of the currentSolvetable
        var length = currentSolveTable.length;
        // The imageName of the selected image
        console.log(length);
        for (var i = 0; i < length; i++) {
          // true if it's the next empty spot, to mark that this spot is gonna be replaced with the choosen number one
          console.log(i);
          if (currentSolveTable[i].next == true) {

            // Set the NumberImage at the current position to the selected one
            currentSolveTable[i].numSrc = "img/" + digit.id + ".png";

            // Set the next spot to be the next one to by replaced by an image, and the current to no longer by the next spot
            if (i < (length - 1)) {
              currentSolveTable[i + 1].next = true;
              currentSolveTable[i].next = false;
            }

            // Check if the selected digit is the one that corresponds to the symbol at the current position
            // imageSource of the symbol at the current[i] position
            var imgSrcSolveTable = currentSolveTable[i].imgSrc;
            console.log("Symbol" + imgSrcSolveTable);
            // imageSource of the related symbol in the keytable to the choosen number
            var imgSrcKeyTable = $scope.keyTable[digit.id - 1].imgSrc;
            console.log("Zahl" + imgSrcKeyTable);
            // Check if the symbols are the same, in that case if they have the same imageSource, if true add one to the number of correct assignments, if false add one to the number of false assignments
            if (angular.equals(imgSrcKeyTable, imgSrcSolveTable)) {
              SymDigService.addCorrectPrep();
            } else {
              SymDigService.addIncorrectPrep();

            }

            //Check if the image for the last field was choosen - true means it was the last image
            if (i == (length - 1)) {
              console.log("letztes feld");
              // set the endTime
              var endTime = new Date().getTime();
              // initialize the results array
              var results = [];
              // mark that there is nomore empty spot in that table
              currentSolveTable[i].next = false;

              // Reset the number of Tries
              // SymDigService.setTry(0);

              $state.go('symbolDigit');
              //***********************************************************************
              // Get the variables to store in the result file
              //***********************************************************************
              var durationExcersisePrep = (endTime - startTime) / 1000;
              correct = SymDigService.getCorrectPrep();
              incorrect = SymDigService.getIncorrectPrep();
              clickFrequency = Math.round((60 / durationExcersisePrep) * (correct + incorrect));
              /*var result1 = {};
              result1.name = "Datum, Uhrzeit nach beenden der Übung";
              result1.value = new Date().toString();
              results.push(result1);*/
              var result2 = {};
              result2.name = "Anzahl korrekte Zuordnungen(insgesamt)";
              result2.value = correct;
              results.push(result2);
              var result3 = {};
              result3.name = "Anzahl inkorrekte Zuordnungen(insgesamt)";
              result3.value = incorrect;
              results.push(result3);
              var result4 = {};
              result4.name = "Klickfrequenz(insgesamt)";
              result4.value = clickFrequency;
              results.push(result4);
              var result5 = {};
              result5.name = "Dauer der Übung in Sekunden";
              result5.value = durationExcersisePrep;
              results.push(result5);
              console.log("FinalResultate" + results);
              ExcersiseStorageService.saveResultsToFile("Zahl-Symbol Übung Vorbereitung", results);
            }
            break;
          } else {

          }
        }
      };
    });
  });
