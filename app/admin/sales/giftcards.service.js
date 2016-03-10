app.factory('Giftcards', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'giftcards');
    var giftcards = $firebaseArray(ref.child(tid).orderByPriority());

    var giftcard = {

      addGiftcard: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'giftcards/'+tid);
        return theRef.push(theObj);
      },

      removeGiftcard: function(gid) {
        return $firebaseObject(ref.child(tid).child(gid)).$remove();
      },

      all: giftcards

    };

    return giftcard;
  }
]);
