'use strict';

angular.module('crudApp').controller('HomeController',
    ['$scope',  function( $scope) {
        var self = this;

        function addPessoaFisica() {
            $state.go('pessoaFisica');
        }
        
        function addPessoaJuridica() {
            $state.go('pessoaJuridica');
        }
    }
]);