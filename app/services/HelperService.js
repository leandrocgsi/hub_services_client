'use strict';

angular.module('crudApp').factory('HelperService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllTipoConta: loadAllTipoConta,
                loadAllStatusConta: loadAllStatusConta,
                loadAllPessoa: loadAllPessoa,
                getAllPessoa: getAllPessoa
            };

            return factory;

            function loadAllTipoConta() {
                console.log('Buscando todos os Tipos de Conta');
                var deferred = $q.defer();
                $http.get(urls.HELPER_SERVICE_API + "/tiposConta")
                    .then(
                        function (response) {
                            console.log('Todas os Tipos de Conta recuperados com sucesso');
                            $localStorage.helper = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar os Tipos de Conta');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadAllStatusConta() {
                console.log('Buscando todos os Status de Conta');
                var deferred = $q.defer();
                $http.get(urls.HELPER_SERVICE_API + "/statusConta")
                    .then(
                        function (response) {
                            console.log('Todas os Status de Conta recuperados com sucesso');
                            $localStorage.helper = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar os Status de Conta');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadAllPessoa() {
                console.log('Buscando todas as Pessoas');
                var deferred = $q.defer();
                $http.get(urls.HELPER_SERVICE_API + "/pessoas")
                    .then(
                        function (response) {
                            console.log('Todas as Pessoas recuperadas com sucesso');
                            $localStorage.pessoa = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as Pessoas');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllPessoa(){
                return $localStorage.pessoa;
            }

        }
    ]);
