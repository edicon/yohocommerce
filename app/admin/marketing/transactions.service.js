app.factory('Transactions', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                  $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'transactions');
    var transactions = $firebaseArray(ref.child(tid).orderByPriority());

    var transaction = {

      getTransactions: function(aid) {
        var theRef = new Firebase(FirebaseUrl+'transactions/'+tid+'/'+aid);
        return $firebaseArray(theRef);
      },

      addTransaction: function(theObj) {
        theObj.transaction_date_added = Firebase.ServerValue.TIMESTAMP;
          var theRef = new Firebase(FirebaseUrl+'transactions/'+tid+'/'+theObj.aid);
          return theRef.push(theObj);
        },

      all: transactions,

    };
    return transaction;
  }
]);
