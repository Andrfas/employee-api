app.directive('autocomplete', ['$document', '$timeout', function($document, $timeout) {
    return {
        templateUrl: "/templates/autocomplete.html",
        scope: {
            selectedData: '=selectedData', // elements that is selected in resultBox
            onSelect: '&onSelect', // function to be called after eleme selected
            getSearchRes: '&getSearchRes', // function that returns searching results. Should take one param - searchStr (with exactly that name)
            getResToShow: '&getResToShow' // funciton takes elements from searchResult and returns string, that will be displayed in search result box
        },
        link: function(scope, elem, attrs, cntrl) {
            var searchbox = angular.element(element[0].querySelector('#searchbox'));
            scope.results = []; // results that are showing in results box
            scope.areResultsVisible = false; // show/hide results box
            console.log(scope.getResToShow);
            if(!attrs.getResToShow) {
                console.log('not defined')
                scope.getResToShow = function(el) {
                    console.log(el)
                    return el;
                }
            }
            console.log(searchbox);
            
            // we don't want to send to the server requests every time when new letter typed. We can minimize requests count for that users, that type fast. We make timeout in 300 milliseconds for each typed letter. If there will be more typed letters in 300 milliseconds - no request is being make. Otherwise, if in 300 milliseconds there will be no more typed letters - make a request. typedCount variable is for that purpose.
            var typedCount = 0;
            scope.$watch('searchStr', function(newVal, oldVal) {
                if(newVal === oldVal) return;
                scope.areResultsVisible = false;
                ++typedCount;
                $timeout(function() {
                    --typedCount;
                    if(typedCount == 0){
                        scope.results = scope.getSearchRes({searchStr:newVal});
                        console.log('search',scope.results);
                        scope.areResultsVisible = true;
                    }
                }, 300);

            })

            

            scope.selectElem = function(selectedElem) {
                scope.searchStr = scope.getResToShow(selectedElem);
                scope.selectedData = selectedElem;
                scope.areResultsVisible = false; // hide results box
                $timeout(function() {
                    scope.onSelect();
                }, 0);
            }

            $document.on('click', function(e) {
                // console.log(scope.areResultsVisible)
                scope.areResultsVisible = false;
                scope.$apply();
            })

            
        }
    }
}])