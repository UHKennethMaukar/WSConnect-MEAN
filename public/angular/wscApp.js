angular.module('wscApp', []);

var ideaListCtrl = function ($scope, wscData) {
    wscData
        .success(function(data) {
            $scope.data = { ideas: data };
        })
        .error(function (e) {
            console.log(e);
        });
};


var wscData = function ($http) {
    return $http.get('/api/ideas');
};

/*
var wscStaticData = function () {
    return [{
        title: 'Attractive Valuation Post-Correction',
        ticker: 'AAPL',
        sentiment: 'Bullish',
        text: 'In the aftermath of a major correction in the major indexes, tech stocks have been rattled by negative sentiment. A lacklustre quarter for Apple further subjected it to the wrath of a major selloff. As the dust begins to settle, I see a very good opportunity to once again invest in Apple, which should rebound swiftly given its robust product line, innovation, and gradual shift in focus towards its services segment with higher retention rates and commendable gross margins.',
        postedBy: 'Jdoe1',
        postedAt: '1 Jan 2019',
        upvoteCount: '9',
        downvoteCount: '3'
      }];
};
*/

/*
var TO_FIX_outputSentiment = function () {
    return {
        scope: {
            thisSentiment : '=sentiment'
        },
        templateUrl: '/angular/output-sentiment.html'
    };
};
*/

angular
    .module('wscApp')
    .controller('ideaListCtrl', ideaListCtrl)
    .service('wscData', wscData)
//  .directive('TO_FIX_outputSentiment', outputSentiment);
    
