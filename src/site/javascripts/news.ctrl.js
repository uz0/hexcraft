'use strict';

export default class newsCtrl {
  static $inject = ['$http']; // jshint ignore:line

  constructor($http) {
    $http.get('/api/news').then((res)=>{
      this.list = res.data;
    });
  }
}