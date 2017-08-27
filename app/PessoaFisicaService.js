'use strict';

angular.module('crudApp').factory('PessoaFisicaService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllPessoaFisica: loadAllPessoaFisica,
                getAllPessoaFisica: getAllPessoaFisica,
                getPessoaFisica: getPessoaFisica,
                createPessoaFisica: createPessoaFisica,
                updatePessoaFisica: updatePessoaFisica,
                removePessoaFisica: removePessoaFisica
            };

            return factory;

            function loadAllPessoaFisica() {
                console.log('Buscando todas as Pessoas F&#x00ED;sicas');
                var deferred = $q.defer();
                $http.get(urls.PESSOA_FISICA_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Todas as Pessoas F&#x00ED;sicas recuperadas com sucesso');
                            $localStorage.pessoaFisica = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as Pessoas F&#x00ED;sicas');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllPessoaFisica(){
                return $localStorage.pessoaFisica;
            }

            function getPessoaFisica(id) {
                console.log('Recuperando as informações da Pessoa F&#x00ED;sica de id :'+id);
                var deferred = $q.defer();
                $http.get(urls.PESSOA_FISICA_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Informações da Pessoa F&#x00ED;sica de id :'+id+ ' recuperadas com sucesso');
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as informações da Pessoa F&#x00ED;sica de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createPessoaFisica(pessoaFisica) {
                console.log('Criando uma nova Pessoa F&#x00ED;sica');
                var deferred = $q.defer();
                $http.post(urls.PESSOA_FISICA_SERVICE_API, pessoaFisica)
                    .then(
                        function (response) {
                            loadAllPessoaFisica();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Erro ao criar uma nova Pessoa F&#x00ED;sica : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updatePessoaFisica(pessoaFisica, id) {
                console.log('Atualizando a Pessoa F&#x00ED;sica de id '+id);
                var deferred = $q.defer();
                $http.put(urls.PESSOA_FISICA_SERVICE_API + id, pessoaFisica)
                    .then(
                        function (response) {
                            loadAllPessoaFisica();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar a Pessoa F&#x00ED;sica de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removePessoaFisica(id) {
                console.log('Removendo a Pessoa F&#x00ED;sica de id '+id);
                var deferred = $q.defer();
                $http.delete(urls.PESSOA_FISICA_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllPessoaFisica();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao remover a Pessoa F&#x00ED;sica de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);