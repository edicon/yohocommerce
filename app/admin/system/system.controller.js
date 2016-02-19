app.controller('SystemCtrl', ['Stores', '$state',
  function (                   Stores,   $state) {
    var systemCtrl = this;
    systemCtrl.currentState = $state.current.name;

    systemCtrl.myData = [
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
