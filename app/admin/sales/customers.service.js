app.factory('Customers', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customers');
    var customers = $firebaseArray(ref.child(tid).orderByPriority());

    var customer = {

      getCustomer: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid));
      },

      removeCustomer: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid)).$remove();
      },

      saveCustomer: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.pid);
        return theRef.update({ customer_status_id: theObj.customer_status_id, customer_status: theObj.customer_status });
      },

      all: customers

    };

    return customer;

}]);
