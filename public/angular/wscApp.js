angular.module('wscApp', []);

var ideaListCtrl = function ($scope) {
    $scope.data = {
        ideas: [{
            title: 'Attractive Valuation Post-Correction',
            ticker: 'AAPL',
            sentiment: 'Bullish',
            text: 'In the aftermath of a major correction in the major indexes, tech stocks have been rattled by negative sentiment. A lacklustre quarter for Apple further subjected it to the wrath of a major selloff. As the dust begins to settle, I see a very good opportunity to once again invest in Apple, which should rebound swiftly given its robust product line, innovation, and gradual shift in focus towards its services segment with higher retention rates and commendable gross margins.',
            postedBy: 'Jdoe1',
            postedAt: '1 Jan 2019',
            upvoteCount: '9',
            downvoteCount: '3',
        },{
            title: 'The Struggle Against Generics',
            ticker: 'PFE',
            sentiment: 'Neutral',
            text: 'After an impressive 2018 performance, Pfizer once again faces its decades-old nemesis: generic drugs. With the imminent expiry of patents covering some of its most valuable drugs in its pipeline, it is unclear whether Pfizer has what it takes to ramp up innovation and preserve a competitive moat to enhance its revenue stream. For now, it is difficult to find any further upside from its current valuation.',
            postedBy: 'Marcus_Wright',
            postedAt: '30 Dec 2018',
            upvoteCount: '6',
            downvoteCount: '7',
        }]
    };
};

angular
    .module('wscApp')
    .controller('ideaListCtrl', ideaListCtrl);
