app.factory('Affiliates', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

//      getAffiliate: function(cid) {
//        return $firebaseObject(ref.child(tid));
//      },

      removeAffiliate: function(affiliateId) {
        return $firebaseObject(ref.child(tid).child(affiliateId)).$remove();
      },

      all: affiliates

    };

    return affiliate;
  }
]);
