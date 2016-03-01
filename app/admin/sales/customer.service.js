app.factory('Customer', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (              $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customers');
    var customers = $firebaseArray(ref.child(tid).orderByPriority());

    var customer = {

      getCustomer: function(custId) {
        return $firebaseObject(ref.child(tid).child(custId));
      },

      addCustomer: function(newCustomer) {
        newCustomer.customer_date_added = Firebase.ServerValue.TIMESTAMP;
        return customer.all.$add(newCustomer).then(function(postRef) {
          return postRef.key();
        });
      },

      getAddresses: function(custId) {
        var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+custId+'/addresses');
        return $firebaseArray(addressRef);
      },

      getAddress: function(custId, addressId) {
        var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+custId+'/addresses/'+addressId);
        return $firebaseObject(addressRef);
      },

      addAddress: function(theAddress) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theAddress.custId+'/addresses');
        return custRef.push({ priority: theAddress.priority });
      },

      updateAddressCount: function(theAddress) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theAddress.custId);
        return custRef.update( {customer_address_count: theAddress.addressCount} );
      },

      recountAddresses: function(custId) {
        var data = $firebaseArray(ref.child(tid).child(custId).child("addresses").orderByChild("priority"));
        data.$loaded().then(function() {
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+custId+'/addresses/'+data[i].$id);
            addressRef.update({ priority: cnt });
            cnt = cnt + 1;
          }
        });
      },

      removeAddress: function(theAddress) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theAddress.custId+'/addresses/'+theAddress.addressId);
        custRef.remove();
        return customer.recountAddresses(theAddress.custId);
      },

      getIndex: function(custId) {
        return customers.$indexFor(custId);
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
