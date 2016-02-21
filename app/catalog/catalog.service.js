app.factory('Catalog', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'categories');
    var categories = $firebaseArray(ref.child(tid).orderByPriority());

    var subRef = new Firebase(FirebaseUrl+'sub_categories');
    var subCategories = $firebaseArray(subRef.child(tid).orderByChild('category_id'));
    var pulldownCategories = $firebaseArray(subRef.child(tid).orderByChild('category_id'));

    var category = {

      addOrder: function(theObj) {
      console.log('got here')
      },

      all: categories,

      pulldown: pulldownCategories,

      allMenus: subCategories

    };

    return category;
  }

]);
