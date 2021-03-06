'use strict';

angular.module('crudApp').factory('ContaService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllConta: loadAllConta,
                getAllConta: getAllConta,
                getConta: getConta,
                createConta: createConta,
                updateConta: updateConta,
                removeConta: removeConta
            };

            return factory;

            function loadAllConta() {
                console.log('Buscando todas as Conta');
                var deferred = $q.defer();
                $http.get(urls.CONTA_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Todas as Contas recuperadas com sucesso');
                            $localStorage.conta = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as Contas');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllConta(){
                return $localStorage.conta;
            }

            function getConta(id) {
                console.log('Recuperando as informações da Conta de id :'+id);
                var deferred = $q.defer();
                $http.get(urls.CONTA_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Informações da Conta de id :'+id+ ' recuperadas com sucesso');
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as informações da Conta de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createConta(conta) {
                console.log('Criando uma nova Conta');
                var deferred = $q.defer();
                $http.post(urls.CONTA_SERVICE_API, conta)
                    .then(
                        function (response) {
                            loadAllConta();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Erro ao criar uma nova Conta : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateConta(conta, id) {
                console.log('Atualizando a Conta de id '+id);
                var deferred = $q.defer();
                $http.put(urls.CONTA_SERVICE_API + id, conta)
                    .then(
                        function (response) {
                            loadAllConta();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar a Conta de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeConta(id) {
                console.log('Removendo a Conta de id '+id);
                var deferred = $q.defer();
                $http.delete(urls.CONTA_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllConta();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao remover a Conta de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);
