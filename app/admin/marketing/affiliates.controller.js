app.controller('AffiliatesCtrl', ['Affiliates', '$state', '$scope',
  function (                      Affiliates,   $state,   $scope) {
  var affiliatesCtrl = this;
  affiliatesCtrl.currentState = $state.current.name;
  console.log(affiliatesCtrl.currentState)

  console.log($scope)

    affiliatesCtrl.myData = [
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
