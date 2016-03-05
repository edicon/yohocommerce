app.factory('Customer', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (              $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customers');
    var customers = $firebaseArray(ref.child(tid).orderByPriority());

    var customer = {

      getCustomer: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid));
      },

      addCustomer: function(theObj) {
        theObj.customer_date_added = Firebase.ServerValue.TIMESTAMP;
        return customer.all.$add(theObj).then(function(postRef) {
          return postRef.key();
        });
      },

      getAddresses: function(cid) {
        var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses');
        return $firebaseArray(addressRef);
      },

      getAddress: function(cid, addressId) {
        var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses/'+addressId);
        return $firebaseObject(addressRef);
      },

      addAddress: function(theObj) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid+'/addresses');
        return custRef.push({ priority: theObj.priority });
      },

      updateAddressCount: function(theObj) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid);
        return custRef.update( {customer_address_count: theObj.addressCount} );
      },

      recountAddresses: function(cid) {
        var data = $firebaseArray(ref.child(tid).child(cid).child("addresses").orderByChild("priority"));
        data.$loaded().then(function() {
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses/'+data[i].$id);
            addressRef.update({ priority: cnt });
            cnt = cnt + 1;
          }
        });
      },

      removeAddress: function(theObj) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid+'/addresses/'+theObj.addressId);
        custRef.remove();
        return customer.recountAddresses(theObj.cid);
      },

      getIndex: function(cid) {
        return customers.$indexFor(cid);
      },

      getKey: function(key) {
        return customers.$keyAt(key);
      },

      getCount: function() {
        return customers.length;
      },

      all: customers

    };

    return customer;
  }
]);
