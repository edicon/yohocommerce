app.factory('Affiliates', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

//      getAffiliate: function(cid) {
//        return $firebaseObject(ref.child(tid));
//      },

      removeAffiliate: function(theObj) {
// calling up the node in firebase
      var theRef = new Firebase(FirebaseUrl+'affiliates/'+tid+'/'+theObj.affiliateId);
//removes the node from firebase
      return theRef.remove();
      },

      all: affiliates

    };

    return affiliate;
  }
]);
