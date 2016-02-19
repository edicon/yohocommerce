app.factory('Marketing', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates'+'tid');
    var affiliates = $firebaseArray(ref);

    var marketing = {

      getAffiliate: function(cid) {
        return $firebaseObject(ref.child(cid));
      },

      all: affiliates

    };

    return marketing;
  }
]);
