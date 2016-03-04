app.factory('Affiliates', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

      removeAffiliate: function(aid) {
        return $firebaseObject(ref.child(tid).child(aid)).$remove();
      },

      all: affiliates

    };

    return affiliate;
  }
]);
