var app = angular.module('myApp', []);
    
  app.service('notesService', function () {
        var data = [];
        var currentIndex = 0;
        var indx = 1;
        this.notes = function () {
            return data;
        }
        this.addNote = function (noteTitle, noteDescription) {
            currentIndex = data.length + 1;
            data.push({
		    	id:currentIndex,
		    	title:noteTitle,
		    	description:noteDescription
            });           
        }

        this.deleteNote = function (id) {
            var oldNotes = data;
            data = [];

            angular.forEach(oldNotes, function (note) {
                if (note.id !== id) data.push(note);
            });
        }
        
        this.ind = function() {
        	arguments.callee.indx = ++arguments.callee.count;
        	return arguments.callee.indx;
        };
    });

    app.factory('enterDataService',function($http) {
      return {
        enter_data:function(id,noteTitle,noteDescription) {
          var dataObj = {
          	id:id,
            title:noteTitle,
            description:noteDescription
          };
          var $json = angular.toJson(dataObj);
          var $promise = $http.post('user.php',$json);
       	/*	$promise.then(function(msg) {
       			if (msg.data == "success") console.log("yeahhh");
       			else console.log(" :( ");
       		});
		*/
          dataObj = [];
        }
      };
    });

    app.directive('myNotebook', function ($log) {
        return {
            restrict:"E",
            scope:{
                notes:'=',
                ondelete:'&',
               
            },
            templateUrl:"_note.html",
            controller:function ($scope, $attrs) {
                $scope.deleteNote = function (id) {
                    $scope.ondelete({id:id});
                }
            }
        };
    });

    app.directive('myNote', function () {
        return {
            restrict:'E',
            scope:{
                delete:'&',
                note:'='
            },
            link:function (scope, element, attrs) {
                
                scope.bg_color = function(id) {
                    var background_change = document.getElementById('bgcolor'+id);
                    background_change.onchange = function() {
                    var div = document.getElementById("box"+id);
                     switch (background_change.value) {
                        case '1':
                            div.style.backgroundColor = 'grey';
                            break;
                        case '2':
                            div.style.backgroundColor = 'red';
                            break;
                        case '3':
                            div.style.backgroundColor = 'blue';
                            break;
                        case '4':
                            div.style.backgroundColor = 'cyan';
                            break;
                        case '5':
                            div.style.backgroundColor = 'green';
                            break;
                     }
                 }

                };
                
                scope.font_size = function(id) {
                    var fontsize = document.getElementById('fontsize'+id);
                    var demo = document.getElementById(id);
                    fontsize.onchange = function() {
                         demo.style.fontSize = fontsize.value + "px";
                    }
                };

                scope.text_bold = function(id){
                    var str = document.getElementById(id);
                    if (str.style.fontWeight == "bolder") {
                        str.style.fontWeight = "normal";
                    } else {
                        str.style.fontWeight = "bolder";
                    }

                };
                 scope.italics = function(id){
                    var str = document.getElementById(id);
                    if (str.style.fontStyle == "italic") {
                        str.style.fontStyle = "normal";
                    } else {
                        str.style.fontStyle = "italic";
                    }

                };
                 scope.underline = function(id){
                    var str = document.getElementById(id);
                    if (str.style.textDecoration == "underline") {
                        str.style.textDecoration = "none";
                    } else {
                        str.style.textDecoration = "underline";
                    }

                };
            }
        };
    });


  app.controller('NotebookCtrl', ['$scope', 'notesService','enterDataService', function ($scope, notesService,enterDataService) {
      $scope.getNotes = function () {
          return notesService.notes();
      };

     $scope.addNote = function (noteTitle,noteDescription) {
         if(noteTitle != '' && noteDescription != '') {
             notesService.addNote(noteTitle,noteDescription);
         }
     };
     var index = notesService.ind();
     $scope.enter_data = function(noteTitle,noteDescription) {
        enterDataService.enter_data(index, noteTitle, noteDescription);
     }; 

     $scope.deleteNote = function (id) {
         notesService.deleteNote(id);
     };
    
     $scope.sticky_note = function (id) {
     		var elem = document.getElementById(id);
     		if (elem.style.display == 'block')
    			elem.style.display = 'none';
    		else 
    			elem.style.display = 'block';
     };

     $scope.resetForm = function() {
        $scope.noteTitle = '';
	    $scope.noteDescription = '';
     };
}]);
