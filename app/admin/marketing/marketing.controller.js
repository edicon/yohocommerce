app.controller('MarketingCtrl', ['Marketing', '$state', '$scope',
  function (                      Marketing,   $state,   $scope) {
  var marketingCtrl = this;
  marketingCtrl.currentState = $state.current.name;
  console.log(marketingCtrl.currentState)

  console.log($scope)

    marketingCtrl.myData = [
    {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
    },
    {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
    },
    {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
    }
  ];

  }
]);
