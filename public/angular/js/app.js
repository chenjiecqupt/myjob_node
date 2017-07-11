/**
 * Created by chenjie on 2017/7/11.
 */

var jobApp = angular.module('jobApp',['ngRoute']);
jobApp.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'tps/index.html'
        /*controller:''*/
    }).otherwise({
        templateUrl:'tps/404.html'
        /*controller:''*/
    })
})
