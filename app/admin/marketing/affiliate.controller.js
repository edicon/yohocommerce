app.controller('AffiliateCtrl', ['Affiliate', 'Affiliates', '$state', '$scope',
  function (                      Affiliate, Affiliates, $state,   $scope) {
  var affiliateCtrl = this;

  console.log(affiliateCtrl.currentState)
  console.log($scope)

//function called from affiliate.html
  affiliateCtrl.addAffiliate = function() {
//console test to check if it's working
  console.log('gothere')
//calling the object theAffiliate with corresponding fields
    var theAffiliate = {};
//corresoponding fields in theAffiliate object, data will be saved in the node
    theAffiliate.affiliateFullName = affiliateCtrl.affiliate_first_name + ' ' + affiliateCtrl.affiliate_last_name;
    theAffiliate.affiliateEmail = affiliateCtrl.affiliate_email;
//calling affiliate.service.js addAffiliate function
    Affiliate.addAffiliate(theAffiliate);
    }, function(error) {
      affiliateCtrl.error = error;
    };




  }
]);
