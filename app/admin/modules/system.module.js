'use strict';

angular.module('SystemModule', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.bootstrap',
    'ui.router',
    'ui.grid',
    'ngFileUpload'
])


.config(    ['$stateProvider', '$httpProvider',
    function( $stateProvider,   $httpProvider) {

  //  $httpProvider.interceptors.push('httpInterceptor');

    $stateProvider
        .state('admin.system', {
            url: '/system',
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/system.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system": {
                    controller: 'UsersCtrl as usersCtrl',
                    templateUrl: 'admin/views/system/users.html'
                }
            }
        })
        .state('admin.system.users', {
            url: '/users',
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/users.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.users": {
                    controller: 'UsersCtrl as usersCtrl',
                    templateUrl: 'admin/views/system/users.html'
                }
            }
        })
        .state('admin.system.user', {
            url: '/user',
            params: {
                rowEntity: null,
            },
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/user.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.user": {
                    controller: 'UserCtrl as userCtrl',
                    templateUrl: 'admin/views/system/user.html'
                }
            }
        })
        .state('admin.system.library', {
            url: '/library',
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/library.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.library": {
                    controller: 'LibraryCtrl as libraryCtrl',
                    templateUrl: 'admin/views/system/library.html'
                }
            }
        })
        .state('admin.system.localization', {
            url: '/localization',
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/localization.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.localization": {
                    controller: 'LocalizationCtrl as localizationCtrl',
                    templateUrl: 'admin/views/system/localization.html'
                }
            }
        })
        .state('admin.system.taxgroups', {
            url: '/taxgroups',
            params: {
                rowEntity: null,
            },
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/taxgroups.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.taxgroups": {
                    controller: 'TaxgroupsCtrl as taxgroupsCtrl',
                    templateUrl: 'admin/views/system/taxgroups.html'
                }
            }
        })
        .state('admin.system.taxgroup', {
            url: '/taxgroup',
            params: {
                rowEntity: null,
            },
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/taxgroup.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.taxgroup": {
                    controller: 'TaxgroupCtrl as taxgroupCtrl',
                    templateUrl: 'admin/views/system/taxgroup.html'
                }
            }
        })
        .state('admin.system.stores', {
            url: '/stores',
            params: {
              rowEntity: null,
            },
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/stores.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.stores": {
                    controller: 'StoresCtrl as storesCtrl',
                    templateUrl: 'admin/views/system/stores.html'
                }
            }
        })
        .state('admin.system.store', {
            url: '/store',
            params: {
                rowEntity: null,
            },
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/store.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.store": {
                    controller: 'StoreCtrl as storeCtrl',
                    templateUrl: 'admin/views/system/store.html'
                }
            }
        })
        .state('admin.system.banner', {
            url: '/banner',
            params: {
                rowEntity: null,
            },
            views: {
                "header@admin": {
                    templateUrl: 'admin/views/system/banner.header.html'
                },
                "main@admin": {
                    templateUrl: 'admin/views/system/system.html'
                },
                "list@admin.system.banner": {
                    controller: 'BannerCtrl as bannerCtrl',
                    templateUrl: 'admin/views/system/banner.html'
                }
            }
        })
    }
])

.factory('Users', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (    $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'profiles');
          var users = $firebaseArray(ref);

          var user = {

              getProfile: function(uid) {
                  return $firebaseObject(ref.child(uid));
              },

              all: users

          };

          return user;

      }

])

.factory('User', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (   $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'profiles');
          var users = $firebaseArray(ref);

          var user = {

              getUser: function(uid) {
                  return $firebaseObject(ref.child(uid));
              },

              removeUser: function(uid) {
                  return $firebaseObject(ref.child(uid)).$remove();
              },

              saveUser: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'profiles/'+theObj.uid);
                  return theRef.update(theObj);
              },

              getIndex: function(cid) {
                  return users.$indexFor(cid);
              },

              getKey: function(key) {
                  return users.$keyAt(key);
              },

              getCount: function() {
                  return users.length;
              },

              all: users

          };

          return user;

      }

])

.factory('Tenant', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (     $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'tenants');
          var tenants = $firebaseArray(ref);

          var tenant = {

              getTenant: function(uid) {
                  return tenants.$getRecord(uid)
              },

              getStoreTenant: function() {
                  return $firebaseObject(ref.child(tid));
              },

              getInstanceCredentials: function() {
                  return $firebaseObject(ref.child(tid));
              },

              saveDreamFactoryUser: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'tenants/'+tid);
                  return theRef.update({ dreamfactory_email: theObj.dreamfactory_email, dreamfactory_password: theObj.dreamfactory_password });
              },

              all: tenants

          };

          return tenant;

      }

])

.factory('Stores', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (     $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'stores');
          var stores = $firebaseArray(ref.child(tid).orderByPriority());

          var store = {

            removeStore: function(sid) {
                return $firebaseObject(ref.child(tid).child(sid)).$remove();
            },

            all: stores

          };

          return store;

      }

])

.factory('Store', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (    $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'stores');
          var stores = $firebaseArray(ref.child(tid).orderByPriority());

          var store = {

              getStore: function(sid) {
                  return $firebaseObject(ref.child(tid).child(sid));
              },

              addStore: function(theObj) {
                  return store.all.$add(theObj).then(function(postRef){
                      return postRef.key();
                  });
              },

              getIndex: function(sid) {
                  return stores.$indexFor(sid);
              },

              getKey: function(key) {
                  return stores.$keyAt(key);
              },

              getCount: function() {
                  return stores.length;
              },

              all: stores

          };

          return store;

      }

])

.factory('Library', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (      $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'banner_images');

          var banner = {

              getImages: function(bid) {
                  return $firebaseArray(ref.child(tid).child(bid));
              },

              addImage: function(imageEntity) {
                  return $firebaseArray(ref.child(tid).child(imageEntity.bid)).$add({image: imageEntity.imageSrc});
              },

              removeImage: function(imageEntity) {
                  return $firebaseObject(ref.child(tid).child(imageEntity.bid).child(imageEntity.$id)).$remove();
              }

          };

          return banner;

      }

])

.factory('Banner', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (     $firebaseArray,   $firebaseObject,   FirebaseUrl,  tid) {
          var ref = new Firebase(FirebaseUrl+'banner_images');

          var banner = {

              getImages: function(bid) {
                  return $firebaseArray(ref.child(tid).child(bid));
              },

              addImage: function(imageEntity) {
                  return $firebaseArray(ref.child(tid).child(imageEntity.bid)).$add({image: imageEntity.imageSrc});
              },

              removeImage: function(imageEntity) {
                  return $firebaseObject(ref.child(tid).child(imageEntity.bid).child(imageEntity.$id)).$remove();
              }

          };

          return banner;

      }

])

.factory('Taxes', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (    $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'taxes');
          var taxes = $firebaseArray(ref.child(tid));

          var tax = {

              addTax: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'taxes/'+tid);
                  return theRef.push(theObj);
              },

              removeTax: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'taxes/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: taxes,

          };

          return tax;

      }

])

.factory('TaxGroups', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (        $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'tax_groups');
          var taxgroups = $firebaseArray(ref.child(tid));

          var taxgroup = {

              addTaxGroups: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'tax_groups/'+tid);
                  return theRef.push(theObj);
              },

              removeTaxGroups: function(gid) {
                  var theRef = new Firebase(FirebaseUrl+'tax_groups/'+tid+'/'+gid);
                  return theRef.remove();
              },

              getTaxGroup: function(gid) {
                  return $firebaseObject(ref.child(tid).child(gid));
              },

              all: taxgroups,

          };

          return taxgroup;

      }

])

.factory('TaxGroup', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (       $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'tax_groups');
          var taxgroups = $firebaseArray(ref.child(tid));

          var taxgroup = {

              addTaxGroup: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'tax_groups/'+tid+'/'+theObj.gid+'/tax_entries/');
                  return theRef.push({ entry_description: theObj.entry_description, entry_rate: theObj.entry_rate,
                      entry_type: theObj.entry_type, entry_based_on: theObj.entry_based_on});
              },

              getTaxGroup: function(gid) {
                  return $firebaseArray(ref.child(tid).child(gid).child('/tax_entries/'));
              },

              removeTaxGroup: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'tax_groups/'+tid+'/'+theObj.gid+'/tax_entries/'+theObj.eid);
                  return theRef.remove();
              },

              all: taxgroups,

          };

          return taxgroup;

      }

])

.factory('ReturnStatuses', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'return_statuses');
          var returnstatuses = $firebaseArray(ref.child(tid));

          var returnstatus = {

              addReturnStatus: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'return_statuses/'+tid);
                  return theRef.push(theObj);
              },

              removeReturnStatus: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'return_statuses/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: returnstatuses,

          };

          return returnstatus;

      }

])

.factory('ReturnActions', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'return_actions');
          var returnactions = $firebaseArray(ref.child(tid));

          var returnaction = {

              addReturnAction: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'return_actions/'+tid);
                  return theRef.push(theObj);
              },

              removeReturnAction: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'return_actions/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: returnactions,

          };

          return returnaction;

      }

])

.factory('ReturnReasons', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'return_reasons');
          var returnreasons = $firebaseArray(ref.child(tid));

          var returnreason = {

              addReturnReason: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'return_reasons/'+tid);
                  return theRef.push(theObj);
              },

              removeReturnStatus: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'return_reasons/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: returnreasons,

          };

          return returnreason;

      }

])

.factory('OrderStatuses', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'order_statuses');
          var orderstatuses = $firebaseArray(ref.child(tid));

          var orderstatus = {

              addOrderStatus: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'order_statuses/'+tid);
                  return theRef.push(theObj);
              },

              removeOrderStatus: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'order_statuses/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: orderstatuses,

          };

          return orderstatus;

      }

])

.factory('LengthUnits', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'length_units');
          var lengthunits = $firebaseArray(ref.child(tid));

          var lengthunit = {

              addLengthUnit: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'length_units/'+tid);
                  return theRef.push(theObj);
              },

              removeLengthUnit: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'length_units/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: lengthunits,

          };

          return lengthunit;

      }

])

.factory('WeightUnits', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'weight_units');
          var weightunits = $firebaseArray(ref.child(tid));

          var weightunit = {

              addWeightUnit: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'weight_units/'+tid);
                  return theRef.push(theObj);
              },

              removeWeightUnit: function(theId) {
                  var theRef = new Firebase(FirebaseUrl+'weight_units/'+tid+'/'+theId);
                  return theRef.remove();
              },

              all: weightunits,

          };

          return weightunit;

      }

])

.controller('LibraryCtrl', ['Upload', 'Tenant', 'InstanceUrl', '$timeout', '$state', '$scope', '$stateParams',
      function (             Upload,   Tenant,   InstanceUrl,   $timeout,   $state,   $scope,   $stateParams) {

          var libraryCtrl = this;

      /*    $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
              if (file) {
                file.upload = Upload.upload({
                  url: 'http://ec2-54-187-192-104.us-west-2.compute.amazonaws.com/files/marketplace',
                  data: {file: file}
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                  });
                }, function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
            }
        }
  */

          $scope.uploadFiles = function (blob) {

              Upload.http({
                  url: DreamFactoryFilesUrl,
                  headers : {
                      "Content-Type": "image/png",
                      "X-File-Name": blob.name
                  },
                  processData: false,
                  data: blob

              }).then(function (resp) {
                  //$rootScope.$broadcast('camera.upload');
              }, function (resp) {
                  //$rootScope.$broadcast('camera.upload');
              }, function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + progressPercentage + '% ');
              });
          };

          libraryCtrl.saveDreamFactoryUser = function() {
              Tenant.saveDreamFactoryUser(libraryCtrl.user);
          }, function(error) {
              AlertService.addError(error.message);
          };
      }

])

.controller('StoreCtrl', ['Store', 'Stores', 'Transactions', 'Banner', 'Countries', 'FileReader', 'AlertService', '$state', '$scope', '$stateParams', '$http',
      function (           Store,   Stores,   Transactions,   Banner,   Countries,   FileReader,   AlertService,   $state,   $scope,   $stateParams,   $http) {

            var storeCtrl = this;
            storeCtrl.store = {};
            $scope.countries = Countries.all;
            $scope.address = {};
            storeCtrl.bid = "1";
            storeCtrl.myInterval = 5000;
            storeCtrl.noWrapSlides = false;
            storeCtrl.bannerArray = 'yes';

            storeCtrl.refreshAddresses = function(address) {
                  var params = {address: address, sensor: false};
                  return $http.get(
                      'http://maps.googleapis.com/maps/api/geocode/json',
                      {params: params}
                  ).then(function(response) {
                      $scope.addresses = response.data.results
                  });
            };

            storeCtrl.parseAddress = function(address) {
                  var addressArray = address.split(", ");
                  var regionArray = addressArray[2].split(" ");
                  storeCtrl.store.store_address_street = addressArray[0];
                  storeCtrl.store.store_address_city = addressArray[1];
                  storeCtrl.store.store_address_postal_code = regionArray[1] + " " + regionArray[2];
                  storeCtrl.store.store_address_region = regionArray[0];
                  storeCtrl.store.store_address_country = addressArray[3];

                  if (regionArray[2] == undefined) {
                        storeCtrl.store.store_address_postal_code = regionArray[1];
                  };

                  if (regionArray[1] == undefined && regionArray[2] == undefined) {
                        storeCtrl.store.store_address_postal_code = "n/a";
                  };
            };

            storeCtrl.loadStore = function(sid) {
                  var theStore = Store.getStore(sid);
                  theStore.$loaded().then(function() {
                      storeCtrl.store = theStore;
                      storeCtrl.storeIndex = Store.getIndex(sid);
                      storeCtrl.count = Stores.all.length;
                  });
            };

            if ($stateParams.rowEntity != undefined) {
                  storeCtrl.loadStore($stateParams.rowEntity.$id);
                  storeCtrl.sid = $stateParams.rowEntity.$id;
            } else {
                  storeCtrl.sid = null;
            };

            storeCtrl.addStore = function() {
                  Store.addStore(storeCtrl.store).then(function(sid) {
                        storeCtrl.loadStore(sid)
                  });
            }, function(error) {
                  AlertService.addError(error.message);
            };

            storeCtrl.next = function() {

                  if (storeCtrl.count > 0) {
                        key = storeCtrl.storeIndex;

                        if (key < storeCtrl.count - 1) {
                              key = storeCtrl.storeIndex + 1;
                              var sid = Store.getKey(key);
                              storeCtrl.loadStore(sid);
                        }
                  }

            }, function(error) {
                  storeCtrl.error = error;
            };

            storeCtrl.back = function() {
                var key = storeCtrl.storeIndex - 1;

                if (key < 0) key = 0
                      var sid = Store.getKey(key);

                  storeCtrl.loadStore(sid);

            }, function(error) {
                  storeCtrl.error = error;
            };

            storeCtrl.first = function() {
                  var key = 0;
                  var sid = Store.getKey(key);
                  storeCtrl.loadStore(sid);
            }, function(error) {
                  storeCtrl.error = error;
            };

            storeCtrl.last = function() {
                  var key = storeCtrl.count - 1;
                  var sid = Store.getKey(key);
                  storeCtrl.loadStore(sid);
            }, function(error) {
                  storeCtrl.error = error;
            };

            storeCtrl.defaultSlides = [
                  {image: "/images/carousel-default-image.png",},
                  {image: "/images/carousel-default-image.png",},
                  {image: "/images/carousel-default-image.png",}
            ]

            storeCtrl.bannerImages = Banner.getImages(storeCtrl.bid);
            storeCtrl.bannerImages.$loaded().then(function() {
                  if (storeCtrl.bannerImages.length === 0) {
                          storeCtrl.bannerArray = 'no';
                          storeCtrl.bannerImages = storeCtrl.defaultSlides;
                  }
            });

            storeCtrl.removeImage = function($id) {
                  imageEntity.$id = $id;
                  imageEntity.bid = bannerCtrl.bid;
                  Banner.removeImage(imageEntity);
                  $state.reload(bannerCtrl.currentState);
            }, function(error) {
                  bannerCtrl.error = error;
            };

            $scope.getFile = function () {
                  FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
                        imageEntity.imageSrc = result;
                        imageEntity.bid = bannerCtrl.bid;
                        Banner.addImage(imageEntity).then(function() {
                            $state.reload(bannerCtrl.currentState);
                //          bannerCtrl.bannerArray = 'yes';
                        });
                  });
            };

      }

])

.controller('StoresCtrl', ['Stores', '$state', '$scope', '$stateParams',
      function (            Stores,   $state,   $scope,   $stateParams) {

          var storesCtrl = this;

          storesCtrl.gridStores = {
              showGridFooter: false,
              enableSorting: true,
              enableCellEditOnFocus: false,
              enableFiltering: false,
              data: Stores.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/system/gridTemplates/editStore.html',
                      width: 35, enableColumnMenu: false, headerTooltip: 'Edit Store' },
                  { name:'storeName', field: 'store_name',
                      enableHiding: false, enableSorting: false, width: '40%' },
                  { name:'storeUrl', field: 'store_url', enableHiding: false, enableSorting: false },
                  { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeStore.html',
                      width: 35, enableColumnMenu: false, headerTooltip: 'Delete Store' }
              ]
          };

          storesCtrl.editStore = function(row) {
              $state.go('admin.system.store', {'rowEntity': row.entity});
          };

          storesCtrl.removeStore = function(row) {
              Stores.removeStore(row.entity.$id);
          }, function(error) {
              storesCtrl.error = error;
          };

      }

])

.controller('UserCtrl', ['Auth', 'Profile', 'Users', 'User', 'Customers', 'AlertService', 'md5', 'tid', '$scope', '$state', '$stateParams',
      function (          Auth,   Profile,   Users,   User,   Customers,   AlertService,   md5,   tid,   $scope,   $state,   $stateParams) {

          var userCtrl = this;
          userCtrl.user = {};
          userCtrl.totalCount = Users.all.length;

          userCtrl.loadUser = function(uid) {
              var theUser = User.getUser(uid);
              theUser.$loaded().then(function() {
                  userCtrl.user = theUser;
                  userCtrl.user.uid = uid;
                  userCtrl.userIndex = User.getIndex(uid);

                    if (userCtrl.user.type === 'Customer') {
                          var theCustomer = Customers.getCustomer(userCtrl.user.cid);
                          theCustomer.$loaded().then(function() {
                              userCtrl.customer = theCustomer;
                          });
                    }
              });
          };

          if ($stateParams.rowEntity != undefined) {
                userCtrl.loadUser($stateParams.rowEntity.$id);
          } else {
                userCtrl.user.uid = null;
                userCtrl.user.user_full_name = 'New User';
          }

          userCtrl.addProfile = function() {
                userCtrl.profile = Profile.getProfile(userCtrl.uid);
                userCtrl.profile.$loaded().then(function() {
                    userCtrl.profile.emailHash = md5.createHash(userCtrl.user.email);
                    userCtrl.profile.first_name = userCtrl.user.first_name;
                    userCtrl.profile.last_name = userCtrl.user.last_name;
                    userCtrl.profile.full_name = userCtrl.user.first_name+' '+userCtrl.user.last_name;
                    userCtrl.profile.email = userCtrl.user.email;
                    userCtrl.profile.type = userCtrl.user.type;
                    userCtrl.profile.status = userCtrl.user.status;
                    userCtrl.profile.tid = tid;
                    userCtrl.profile.$save();
              });
          }, function(error) {
                AlertService.addError(error.message);
          };

          userCtrl.createUser = function() {
              userCtrl.user.email = userCtrl.user.email;
              userCtrl.user.password = 'S1mpleOne';
              Auth.$createUser(userCtrl.user).then(function(user) {
                      userCtrl.uid = user.uid;
                      userCtrl.addProfile();
                  }, function(error) {
                      AlertService.addError(error.message);
              });
          };

          userCtrl.goCustomer = function(cid) {
              $state.go('admin.sales.customer', {'cid': cid});
          };

          userCtrl.next = function() {
              var key = userCtrl.userIndex + 1;

              if (key != userCtrl.totalCount) {
                  userCtrl.uid = User.getKey(key);
                  userCtrl.loadUser(userCtrl.uid);
              }
          }, function(error) {
                  userCtrl.error = error;
          };

          userCtrl.back = function() {
              var key = userCtrl.userIndex - 1;

              if (key < 0) key = 0
                  userCtrl.uid = User.getKey(key);
                  userCtrl.loadUser(userCtrl.uid);
          }, function(error) {
                  userCtrl.error = error;
          };

          userCtrl.first = function() {
                userCtrl.uid = User.getKey(0);
                userCtrl.loadUser(userCtrl.uid);
          }, function(error) {
                userCtrl.error = error;
          };

          userCtrl.last = function() {
                userCtrl.uid = User.getKey(userCtrl.totalCount - 1);
                userCtrl.loadUser(userCtrl.uid);
          }, function(error) {
                userCtrl.error = error;
          };
      }

])

.controller('UsersCtrl', ['Users', '$state', '$scope',
      function (           Users,   $state,   $scope) {

          var usersCtrl = this;

          usersCtrl.editUser = function(row) {
              $state.go('admin.system.user', {'rowEntity': row.entity});
          };

          usersCtrl.gridUsers = {
              enableSorting: true,
              enableCellEditOnFocus: true,
              data: Users.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/system/gridTemplates/editUser.html',
                      width: 34, enableColumnMenu: false, headerTooltip: 'Edit User' },
                  { name:'firstName', field: 'first_name', enableHiding: false },
                  { name:'lastName', field: 'last_name', enableHiding: false },
                  { name:'email', field: 'email', width: '50%', enableHiding: false },
                  { name:'type', field: 'type', enableHiding: false },
                  { name:'status', field: 'status', enableHiding: false },
              ]
          };
      }

])

.controller('LocalizationCtrl', ['Taxes', 'TaxGroups', 'ReturnStatuses', 'ReturnActions', 'ReturnReasons', 'OrderStatuses', 'LengthUnits', 'WeightUnits', '$state', '$scope', '$stateParams',
      function (                  Taxes,   TaxGroups,   ReturnStatuses,   ReturnActions,   ReturnReasons,   OrderStatuses,   LengthUnits,   WeightUnits,   $state,   $scope,   $stateParams) {
            var localizationCtrl = this;
            localizationCtrl.tax = {};
            localizationCtrl.tax.tax_type = 'Percent';
            localizationCtrl.allTaxes = Taxes.all;

            localizationCtrl.tax_group = {};
            localizationCtrl.return_status = {};
            localizationCtrl.return_action = {};
            localizationCtrl.return_reason = {};

            localizationCtrl.addTax = function() {
                  Taxes.addTax(localizationCtrl.tax);
                  localizationCtrl.tax.tax_name = null;
                  localizationCtrl.tax.tax_rate = null;
                  localizationCtrl.tax.tax_type = 'Percent';
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.updateTaxType = function(type) {
                  localizationCtrl.tax.tax_group = type;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeTax = function(row) {
                  Taxes.removeTax(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridTaxes = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: Taxes.all,
                  columnDefs: [
                        { name:'taxName', field: 'tax_name', width: '40%', enableHiding: false },
                        { name:'taxRate', field: 'tax_rate', width: '30%', enableHiding: false, cellClass: 'grid-align-right' },
                        { name:'type', field: 'tax_type', enableHiding: false, cellClass: 'grid-align-right' },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeTax.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

            localizationCtrl.updateTaxRate = function(name, rate, type) {
                  localizationCtrl.tax_group.group_label = name+' - '+rate+' '+type;
                  localizationCtrl.tax_group.group_tax_rate = rate;
                  localizationCtrl.tax_group.group_tax_rate_type = type;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.addReturnStatus = function() {
                  ReturnStatuses.addReturnStatus(localizationCtrl.return_status);
                  localizationCtrl.return_status.status_name = null;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeReturnStatus = function(row) {
                  ReturnStatuses.removeReturnStatus(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridReturnStatus = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: ReturnStatuses.all,
                  columnDefs: [
                        { name:'statusName', field: 'status_name', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeReturnStatus.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

            localizationCtrl.addReturnAction = function() {
                  ReturnActions.addReturnAction(localizationCtrl.return_action);
                  localizationCtrl.return_action.action_name = null;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeReturnAction = function(row) {
                  ReturnActions.removeReturnAction(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridReturnAction = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: ReturnActions.all,
                  columnDefs: [
                        { name:'actionName', field: 'action_name', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeReturnAction.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

            localizationCtrl.addReturnReason = function() {
                  ReturnReasons.addReturnReason(localizationCtrl.return_reason);
                  localizationCtrl.return_reason.reason_name = null;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeReturnReason = function(row) {
                  ReturnReasons.removeReturnReason(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridReturnReason = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: ReturnReasons.all,
                  columnDefs: [
                        { name:'reasonName', field: 'reason_name', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeReturnReason.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

            localizationCtrl.addOrderStatus = function() {
                  OrderStatuses.addOrderStatus(localizationCtrl.order_status);
                  localizationCtrl.order_status.status_name = null;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeOrderStatus = function(row) {
                  OrderStatuses.removeOrderStatus(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridOrderStatuses = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: OrderStatuses.all,
                  columnDefs: [
                        { name:'OrderStatusName', field: 'status_name', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeOrderStatus.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

            localizationCtrl.addLengthUnit = function() {
                  LengthUnits.addLengthUnit(localizationCtrl.length_unit);
                  localizationCtrl.length_unit.unit_title = null;
                  localizationCtrl.length_unit.unit_abbreviation = null;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeLengthUnit = function(row) {
                  LengthUnits.removeLengthUnit(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridLengthUnits = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: LengthUnits.all,
                  columnDefs: [
                        { name:'unitTitle', field: 'unit_title', enableHiding: false },
                        { name:'unitAbbreviation', field: 'unit_abbreviation', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeLengthUnit.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

            localizationCtrl.addWeightUnit = function() {
                  WeightUnits.addWeightUnit(localizationCtrl.weight_unit);
                  localizationCtrl.weight_unit.unit_title = null;
                  localizationCtrl.weight_unit.unit_abbreviation = null;
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.removeWeightUnit = function(row) {
                  WeightUnits.removeWeightUnit(row.entity.$id);
            }, function(error) {
                  localizationCtrl.error = error;
            };

            localizationCtrl.gridWeightUnits = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: WeightUnits.all,
                  columnDefs: [
                        { name:'unitTitle', field: 'unit_title', enableHiding: false },
                        { name:'unitAbbreviation', field: 'unit_abbreviation', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeWeightUnit.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

      }

])


.controller('TaxgroupsCtrl', ['TaxGroups', '$state', '$stateParams',
      function (               TaxGroups,   $state,   $stateParams) {
            var taxgroupsCtrl = this;
            taxgroupsCtrl.tax_groups = {};

            taxgroupsCtrl.addTaxGroups = function() {
                  TaxGroups.addTaxGroups(taxgroupsCtrl.tax_groups);
                  taxgroupsCtrl.tax_groups.group_name = null;
            }, function(error) {
                  taxgroupsCtrl.error = error;
            };

            taxgroupsCtrl.removeTaxGroups = function(row) {
                  TaxGroups.removeTaxGroups(row.entity.$id);
            }, function(error) {
                  taxgroupCtrl.error = error;
            };

            taxgroupsCtrl.editTaxGroup = function(row) {
                  $state.go('admin.system.taxgroup', {'rowEntity': row.entity});
            };

            taxgroupsCtrl.gridTaxGroups = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  data: TaxGroups.all,
                  columnDefs: [
                        { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/system/gridTemplates/editTaxGroup.html',
                            width: 35, enableColumnMenu: false, headerTooltip: 'Edit Tax Group', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                        { name:'groupName', field: 'group_name', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeTaxGroups.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

      }

])


.controller('TaxgroupCtrl', ['TaxGroup', 'Taxes', '$state', '$scope', '$stateParams',
      function (              TaxGroup,   Taxes,   $state,   $scope,   $stateParams) {
            var taxgroupCtrl = this;
            taxgroupCtrl.allTaxes = Taxes.all;
            taxgroupCtrl.tax_group = {};

            if ($stateParams.rowEntity != null) {
                taxgroupCtrl.tax_group.gid = $stateParams.rowEntity.$id;
                var theTaxGroup = TaxGroup.getTaxGroup(taxgroupCtrl.tax_group.gid);
                    theTaxGroup.$loaded().then(function() {
                          taxgroupCtrl.gridTaxGroup.data = theTaxGroup;
                    });
            }

            taxgroupCtrl.addTaxGroup = function() {
                  TaxGroup.addTaxGroup(taxgroupCtrl.tax_group);
                  taxgroupCtrl.tax_group.entry_description = null;
                  taxgroupCtrl.tax_group.entry_rate = null;
                  taxgroupCtrl.tax_group.entry_based_on = null;
            }, function(error) {
                  taxgroupCtrl.error = error;
            };

            taxgroupCtrl.updateTaxRate = function(name, rate, type) {
                  taxgroupCtrl.tax_group.entry_rate = rate;
                  taxgroupCtrl.tax_group.entry_type = type;
                  taxgroupCtrl.tax_group.entry_description = name + ' - ' + rate + ' ' + type;
            }, function(error) {
                  taxgroupCtrl.error = error;
            };

            taxgroupCtrl.updateGroupBasedOn = function(type) {
                  taxgroupCtrl.tax_group.entry_based_on = type;
            }, function(error) {
                  taxgroupCtrl.error = error;
            };

            taxgroupCtrl.removeTaxGroup = function(row) {
                  var theObj = {};
                  theObj.gid = taxgroupCtrl.tax_group.gid;
                  theObj.eid = row.entity.$id;
                  TaxGroup.removeTaxGroup(theObj);
            }, function(error) {
                  taxgroupCtrl.error = error;
            };

            taxgroupCtrl.gridTaxGroup = {
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  columnDefs: [
                        { name:'taxDescription', field: 'entry_description', width: '30%', enableHiding: false },
                        { name:'basedOn', field: 'entry_based_on', enableHiding: false },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/system/gridTemplates/removeTaxGroup.html',
                          width: 35, enableCellEdit: false, enableColumnMenu: false }
                  ]
            };

      }

])
