app.factory('Catalog', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'categories');
    var categories = $firebaseArray(ref.child(tid).orderByPriority());

    var subRef = new Firebase(FirebaseUrl+'sub_categories');
    var subCategories = $firebaseArray(subRef.child(tid).orderByChild('category_id'));
    var pulldownCategories = $firebaseArray(subRef.child(tid).orderByChild('category_id'));

    var cartRef = new Firebase(FirebaseUrl+'carts');
    var carts = $firebaseArray(cartRef.child(tid));

    var category = {

      addCart: function() {
        console.log('got here')
        return carts.$add({items: 0, total: 0}).then(function(theRef) {
          return theRef.key();
        });
      },

      getCart: function(cid) {
        return $firebaseObject(cartRef.child(tid).child(cid));
      },

      all: categories,

      pulldown: pulldownCategories,

      allMenus: subCategories

    };

    return category;
  }

]);
