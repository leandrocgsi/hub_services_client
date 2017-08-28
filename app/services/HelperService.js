'use strict';

angular.module('crudApp').factory('HelperService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllTipoConta: loadAllTipoConta,
                getAllTipoConta: getAllTipoConta,

                loadAllStatusConta: loadAllStatusConta,
              	getAllStatusConta: getAllStatusConta,

                loadAllPessoa: loadAllPessoa,
                getAllPessoa: getAllPessoa
            };

            return factory;

            function loadAllTipoConta() {
            	console.log('Buscando todas os Tipo Contas');
            	var deferred = $q.defer();
            	$http.get(urls.HELPER_SERVICE_API + "tiposConta")
            		.then(
            			function (response) {
            				console.log('Todas os Tipo Contas recuperados com sucesso');
            				$localStorage.tipoConta = response.data;
            				deferred.resolve(response);
            			},
            			function (errResponse) {
            				console.error('Erro ao recuperar as Tipo Contas');
            				deferred.reject(errResponse);
            			}
            		);
            	return deferred.promise;
            }

            function getAllTipoConta(){
            	 return $localStorage.tipoConta;
            }

            function loadAllStatusConta() {
            	console.log('Buscando todas os Status Contas');
            	var deferred = $q.defer();
            	$http.get(urls.HELPER_SERVICE_API + "statusConta")
            		.then(
            			function (response) {
            				console.log('Todas os Status Contas recuperados com sucesso');
            				$localStorage.statusConta = response.data;
            				deferred.resolve(response);
            			},
            			function (errResponse) {
            				console.error('Erro ao recuperar as StatusContas');
            				deferred.reject(errResponse);
            			}
            		);
            	return deferred.promise;
            }

            function getAllStatusConta(){
            	return $localStorage.statusConta;
            }

            function loadAllPessoa() {
            	console.log('Buscando todas as Pessoas');
            	var deferred = $q.defer();
            	$http.get(urls.HELPER_SERVICE_API + "pessoas")
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
