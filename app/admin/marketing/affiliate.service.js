app.factory('Affiliate', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {
// method that calls the reference in firebase, adds object to coupon array
      addAffiliate: function(theObj) {
        console.log(theObj)
// setting up the node in firebase
        var theRef = new Firebase(FirebaseUrl+'affiliates/'+tid);
//pushes the reference to firebase and returns it back to the controller
//        return theRef.push( {affiliate_full_name: theObj.affiliateFullName, affiliate_email: theObj.affiliateEmail} );
        return theRef.push(theObj);
      },

      all: affiliates
    };

    return affiliate;

}]);
