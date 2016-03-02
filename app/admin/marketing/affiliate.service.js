app.factory('Affiliate', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

      getAffiliate: function(affiliateId) {
        return $firebaseObject(ref.child(tid).child(affiliateId));
      },

      addAffiliate: function(newAffiliate) {
      return affiliate.all.$add(newAffiliate).then(function(postRef){
        return postRef.key();
      });
    },

    getTransactions: function(affiliatetId) {
      var transactionRef = new Firebase(FirebaseUrl+'affiliates/'+tid+'/'+affiliateId+'/addresses');
      return $firebaseArray(transactionRef);
    },

    getTransaction: function(affiliateId, transactionId) {
      var transactionRef = new Firebase(FirebaseUrl+'affiliates/'+tid+'/'+affiliateId+'/addresses/'+transactionId);
      return $firebaseObject(transactionRef);
    },

      addTransaction: function(theTransaction) {
        theTransaction.transaction_date_added = Firebase.ServerValue.TIMESTAMP;
          var affiliateRef = new Firebase(FirebaseUrl+'affiliates/'+tid+'/'+theTransaction.affiliateId+'/transactions');
          return affiliateRef.push({ priority: theTransaction.priority });
        },

    all: affiliates
    };

    return affiliate;

}]);
