app.factory('Affiliate', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

      getAffiliate: function(aid) {
        return $firebaseObject(ref.child(tid).child(aid));
      },

      addAffiliate: function(theObj) {
      return affiliate.all.$add(theObj).then(function(postRef){
        return postRef.key();
      });
    },

    all: affiliates
    };

    return affiliate;

}]);
