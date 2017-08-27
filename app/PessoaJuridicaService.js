'use strict';

angular.module('crudApp').factory('PessoaJuridicaService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllPessoaJuridica: loadAllPessoaJuridica,
                getAllPessoaJuridica: getAllPessoaJuridica,
                getPessoaJuridica: getPessoaJuridica,
                createPessoaJuridica: createPessoaJuridica,
                updatePessoaJuridica: updatePessoaJuridica,
                removePessoaJuridica: removePessoaJuridica
            };

            return factory;

            function loadAllPessoaJuridica() {
                console.log('Buscando todos as Pessoas Juridicas');
                var deferred = $q.defer();
                $http.get(urls.PESSOA_JURIDICA_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Pessoas Juridicas recuperados com sucesso');
                            $localStorage.pessoaJuridica = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as Pessoas Juridicas');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllPessoaJuridica(){
                return $localStorage.pessoaJuridica;
            }

            function getPessoaJuridica(id) {
                console.log('Recuperando as informações da Pessoa Jurídica com o id :'+id);
                var deferred = $q.defer();
                $http.get(urls.PESSOA_JURIDICA_SERVICE_API + id.id + "/" +id.registration)
                    .then(
                        function (response) {
                            console.log('Recuperando as informações da Pessoa Jurídica com o id :'+id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao ler as informações da Pessoa Jurídica com o id  :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createPessoaJuridica(pessoaJuridica) {
                console.log('Criando Pessoa Juridica');
                var deferred = $q.defer();
                $http.post(urls.PESSOA_JURIDICA_SERVICE_API, pessoaJuridica)
                    .then(
                        function (response) {
                            loadAllPessoaJuridica();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Erro ao criar a Pessoa Jurídica : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updatePessoaJuridica(pessoaJuridica, id) {
                console.log('Atualizando Pessoa Juridica de id '+id);
                var deferred = $q.defer();
                $http.put(urls.PESSOA_JURIDICA_SERVICE_API + id.id + "/" +id.registration, pessoaJuridica)
                    .then(
                        function (response) {
                            loadAllPessoaJuridica();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar a Pessoa Jurídica com o id  :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removePessoaJuridica(id) {
                console.log('Removendo a Pessoa Jurídica com o id '+id);
                var deferred = $q.defer();
                $http.delete(urls.PESSOA_JURIDICA_SERVICE_API + id.id + "/" +id.registration)
                    .then(
                        function (response) {
                            loadAllPessoaJuridica();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao remover a Pessoa Jurídica com o id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);