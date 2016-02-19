
app.controller('AdminCtrl', ['Auth', '$scope', '$state', '$cookieStore', 'profile',
  function (                  Auth,   $scope,   $state,   $cookieStore,   profile) {
    var adminCtrl = this;
    var mobileView = 992;
    $scope.profile = profile;

    $scope.showChilds = function(item){
      item.active = !item.active;
    };

    $scope.items = [ {
      link: ".dashboard", name: "Dashboard", icon: "menu-icon fa fa-tachometer",
    },
    {
      link: ".catalogs", name: "Catalogs", icon: "menu-icon fa fa-tags",
    },
    {
      link: ".sales", name: "Sales", icon: "menu-icon fa fa-shopping-cart",
    },
    {
      link: ".marketing", name: "Marketing", icon: "menu-icon fa fa-share-alt",
    },
    {
      link: "#", name: "Extensions", icon: "menu-icon fa fa-puzzle-piece",
    },
    {
      link: ".system", name: "System", icon: "menu-icon fa fa-gear",
    },
    {
      link: ".tools", name: "Tools", icon: "menu-icon fa fa-wrench",
    },
    {
      link: ".reports", name: "Reports", icon: "menu-icon fa fa-bar-chart",
    }];


/* - multi-route menu structure
    $scope.items = [ {
      link: ".dashboard", name: "Dashboard", icon: "menu-icon fa fa-tachometer",
    },
    {
      link: ".catalogs", name: "Catalogs", icon: "menu-icon fa fa-tags",
      subItems: [
        {link: ".products", name: "Products", icon: "menu-icon fa fa-th-large"},
        {link: ".categories", name: "Categories", icon: "menu-icon fa fa-sitemap"},
        {link: ".vendors", name: "Vendors", icon: "menu-icon fa fa-gears"}
      ]},
    {
      link: ".sales", name: "Sales", icon: "menu-icon fa fa-shopping-cart",
      subItems: [
        {link: ".orders", name: "Orders", icon: "menu-icon fa fa-clipboard"},
        {link: ".returns", name: "Returns", icon: "menu-icon fa fa-mail-reply-all"},
        {link: ".customers", name: "Customers", icon: "menu-icon fa fa-users"},
        {link: ".vouchers", name: "Gift Vouchers", icon: "menu-icon fa fa-gift"}
      ]},
    {
      link: ".marketing",
      name: "Marketing",
      icon: "menu-icon fa fa-share-alt",
      subItems: [
        {link: ".affiliates", name: "Affiliates", icon: "menu-icon fa fa-user-plus"},
        {link: ".coupons", name: "Coupons", icon: "menu-icon fa fa-tag"}
      ]},
    {
      link: "#",
      name: "Extensions",
      icon: "menu-icon fa fa-puzzle-piece",
      subItems: [
        {link: ".modules", name: "Modules", icon: "menu-icon fa fa-cubes"},
        {link: ".shipping", name: "Shipping", icon: "menu-icon fa fa-truck"},
        {link: ".payment", name: "Payment", icon: "menu-icon fa fa-usd"},
        {link: ".feeds", name: "Feeds", icon: "menu-icon fa fa-rss"}
      ]},
    {
      link: ".system",
      name: "System",
      icon: "menu-icon fa fa-gear",
      subItems: [
        {link: ".store", name: "Store", icon: "menu-icon fa fa-shopping-bag"},
        {link: ".users", name: "Users", icon: "menu-icon fa fa-users"},
        {link: ".localisation", name: "Localization", icon: "menu-icon fa fa-globe"}
      ]},
    {
      link: ".tools",
      name: "Tools",
      icon: "menu-icon fa fa-wrench",
    },
    {
      link: ".reports",
      name: "Reports",
      icon: "menu-icon fa fa-bar-chart",
    }];
*/
    $scope.getWidth = function() {
      return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
        if (angular.isDefined($cookieStore.get('toggle'))) {
          $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
        } else {
          $scope.toggle = true;
        }
      } else {
        $scope.toggle = false;
      }
    });

    window.onresize = function() {
      $scope.$apply();
    };

    $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
    };

    $scope.logout = function() {
      Auth.$unauth();
      $state.go('home');
    };

  }

]);
