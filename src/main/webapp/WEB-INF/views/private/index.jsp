<!DOCTYPE html>
<html lang="en" data-ng-app="angle">

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
   <meta name="description" content="{{app.description}}">
   <meta name="keywords" content="app, responsive, angular, bootstrap, dashboard, admin">
   <title data-ng-bind="pageTitle()">Isis Bruder</title>
   <link rel="stylesheet" href="app/css/app.css" data-ng-if="!app.layout.isRTL">
   <link rel="stylesheet" href="app/css/app-rtl.css" data-ng-if="app.layout.isRTL">
   <style type="text/css">
      .help-error {
         margin-top: 5px;
         color: #fff;
         padding: 0 10px;
      }
   </style>
</head>

<body data-ng-class="{ 'layout-fixed' : app.layout.isFixed, 'aside-collapsed' : app.layout.isCollapsed, 'layout-boxed' : app.layout.isBoxed }">
   <div data-ui-view="" data-autoscroll="false" data-ng-class="mainViewAnimation" class="wrapper"></div>
   <script src="//maps.googleapis.com/maps/api/js?sensor=false"></script>
   <script src="app/js/base.js"></script>
   <script src="app/js/app.js"></script>
</body>

</html>