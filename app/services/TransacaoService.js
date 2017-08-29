'use strict';

angular.module('crudApp').factory('TransacaoService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllTransacao: loadAllTransacao,
                getAllTransacao: getAllTransacao,
                getTransacao: getTransacao,
                createTransacao: createTransacao,
                updateTransacao: updateTransacao,
                estornaTransacao: estornaTransacao
            };

            return factory;

            function loadAllTransacao() {
                console.log('Buscando todas as Transações');
                var deferred = $q.defer();
                $http.get(urls.TRANSACAO_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Todas as Transações recuperadas com sucesso');
                            $localStorage.transacao = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as Transações');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllTransacao(){
                return $localStorage.transacao;
            }

            function getTransacao(id) {
                console.log('Recuperando as informações da Transação de id :'+id);
                var deferred = $q.defer();
                $http.get(urls.TRANSACAO_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Informações da Transação de id :'+id+ ' recuperadas com sucesso');
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as informações da Transação de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createTransacao(transacao) {
                console.log('Criando uma nova Transação');
                var deferred = $q.defer();
                $http.post(urls.TRANSACAO_SERVICE_API, transacao)
                    .then(
                        function (response) {
                            loadAllTransacao();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Erro ao criar uma nova Transação : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateTransacao(transacao, id) {
                console.log('Atualizando a Transação de id '+id);
                var deferred = $q.defer();
                $http.put(urls.TRANSACAO_SERVICE_API + id, transacao)
                    .then(
                        function (response) {
                            loadAllTransacao();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar a Transação de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function estornaTransacao(id) {
                console.log('Atualizando a Transação de id '+id);
                var deferred = $q.defer();
                $http.put(urls.TRANSACAO_SERVICE_API + "/estornoTransacao/"+ id)
                    .then(
                        function (response) {
                            loadAllTransacao();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar a Transação de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);
