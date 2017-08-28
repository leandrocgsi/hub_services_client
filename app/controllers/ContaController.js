'use strict';

angular.module('crudApp').controller('ContaController',
    ['ContaService', 'HelperService', '$scope',  function( ContaService, HelperService, $scope) {
        var self = this;
        self.conta = {};
        self.contas=[];
        self.submit = submit;

        self.getAllConta = getAllConta;

        self.getAllPessoa = getAllPessoa;

        self.createConta = createConta;
        self.updateConta = updateConta;
        self.removeConta = removeConta;

        self.pessoas= HelperService.loadAllPessoa();

        self.editConta = editConta;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submit() {
            console.log('Submetendo');
            if (self.conta.id === undefined || self.conta.id === null) {
                console.log('Salvando Um Nova Conta', self.conta);
                createConta(self.conta);
            } else {
                updateConta(self.conta, self.conta.id);
                console.log('Atualizando a Conta com o id ', self.conta.id);
            }
        }

        function createConta(conta) {
            console.log('Criação de Contas');
            ContaService.createConta(conta)
                .then(
                    function (response) {
                        console.log('Conta criada com sucesso');
                        self.successMessage = 'Conta criada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        self.conta={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Erro ao criar a Conta');
                        self.errorMessage = 'Erro ao criar a Conta: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updateConta(conta, id){
            console.log('Atualização de Contas');
            ContaService.updateConta(conta, id)
                .then(
                    function (response){
                        console.log('Conta atualizada com sucesso');
                        self.successMessage='Conta atualizada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Erro ao atualizar a Conta');
                        self.errorMessage='Erro ao atualizar a Conta '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removeConta(id){
            console.log('Remoção de Conta com o id '+id);
            ContaService.removeConta(id)
                .then(
                    function(){
                        console.log('Conta de id '+id + ' removida com sucesso');
                    },
                    function(errResponse){
                        console.error('Erro ao remover a Conta '+id +', Erro :'+errResponse.data);
                    }
                );
        }

        function getAllConta(){
            return ContaService.getAllConta();
        }

        function getAllPessoa(){
            return HelperService.loadAllPessoa();
        }

        function editConta(id) {
            self.successMessage='';
            self.errorMessage='';
            ContaService.getConta(id).then(
                function (conta) {
                    self.conta = conta;
                    self.conta.dataCriacao = new Date(self.conta.dataCriacao);
                },
                function (errResponse) {
                    console.error('Erro ao remover a Conta ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.conta={};
            $scope.myForm.$setPristine(); //reset Form
        }

    }
]);
