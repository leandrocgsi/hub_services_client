'use strict';

angular.module('crudApp').factory('ContaService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllConta: loadAllConta
            };

            return factory;

            function loadAllConta() {
                console.log('Buscando todas as Conta');
                var deferred = $q.defer();
                $http.get(urls.CONTA_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Todas as Conta recuperadas com sucesso');
                            $localStorage.conta = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as Conta');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllConta(){
                return $localStorage.conta;
            }
        }
    ]);
