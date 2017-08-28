var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/',
    CONTA_SERVICE_API : 'http://localhost:8080/api/conta/',
    HELPER_SERVICE_API : 'http://localhost:8080/api/helper/',
    PESSOA_FISICA_SERVICE_API : 'http://localhost:8080/api/pessoaFisica/',
    PESSOA_JURIDICA_SERVICE_API : 'http://localhost:8080/api/pessoaJuridica/',
    TRANSACAO_SERVICE_API : 'http://localhost:8080/api/transacao/'
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html'
        })
        .state('conta', {
            url: '/conta',
            templateUrl: 'pages/conta.html',
            controller:'ContaController',
            controllerAs:'contaCtrl',
            resolve: {
                conta: function ($q, ContaService) {
                    console.log('Listando todas as Contas');
                    var deferred = $q.defer();
                    ContaService.loadAllConta().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                },
                pessoa: function ($q, HelperService) {
                	console.log('Listando as Pessoas');
                	var deferred = $q.defer();
                	HelperService.loadAllPessoa().then(deferred.resolve, deferred.resolve);
                	return deferred.promise;
                }
            }
        })
        .state('transacao', {
            url: '/transacao',
            templateUrl: 'pages/transacao.html',
            controller:'TransacaoController',
            controllerAs:'transacaoCtrl',
            resolve: {
                transacao: function ($q, TransacaoService) {
                    console.log('Listando todas as Transacaos');
                    var deferred = $q.defer();
                    TransacaoService.loadAllTransacao().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .state('pessoaJuridica', {
            url: '/pessoaJuridica',
            templateUrl: 'pages/pessoaJuridica.html',
            controller:'PessoaJuridicaController',
            controllerAs:'pessoaJuridicaCtrl',
            resolve: {
                pessoaJuridica: function ($q, PessoaJuridicaService) {
                    console.log('Listando as Pessoas Juridicas');
                    var deferred = $q.defer();
                    PessoaJuridicaService.loadAllPessoaJuridica().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .state('pessoaFisica', {
            url: '/pessoaFisica',
            templateUrl: 'pages/pessoaFisica.html',
            controller:'PessoaFisicaController',
            controllerAs:'pessoaFisicaCtrl',
            resolve: {
                pessoaFisica: function ($q, PessoaFisicaService) {
                    console.log('Listando todas as Pessoas Fisicas');
                    var deferred = $q.defer();
                    PessoaFisicaService.loadAllPessoaFisica().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        });
        ;
    }]);
