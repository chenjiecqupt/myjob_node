/**
 * Created by chenjie on 2017/7/11.
 */

var jobApp = angular.module('jobApp',['ui.router']);
/*jobApp.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'tps/index.html'
        /!*controller:''*!/
    }).otherwise({
        templateUrl:'tps/404.html'
        /!*controller:''*!/
    })
})*/
jobApp.config(function(stateHelperProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise();
    stateHelperProvider
        .state('home',{
            url:'/home',
            templateUrl: 'tps/index.html',
            controller:'',
            views: {
                '':{
                    templateUrl: '',
                    controller:''
                },
                'list@home':{
                    templateUrl: '',
                    controller:''
                }
            }
        })
        .state('/',{
            url:'',
            templateUrl: 'tps/index.html',
            controller:''
    })
});
