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

      getIndex: function(aid) {
        return affiliates.$indexFor(aid);
      },

      getKey: function(key) {
        return affiliates.$keyAt(key);
      },

      getCount: function() {
        return affiliates.length;
      },

    all: affiliates
    };

    return affiliate;

}]);
