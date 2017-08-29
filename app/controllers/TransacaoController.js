'use strict';

angular.module('crudApp').controller('TransacaoController',
    ['TransacaoService', 'ContaService', 'HelperService', '$scope',  function( TransacaoService, ContaService, HelperService, $scope) {
        var self = this;
        self.transacao = {};
        self.transacaos=[];
        self.submit = submit;

        //Selects
        self.getAllConta = getAllConta;
        self.getAllTipoTransacao = getAllTipoTransacao;

        //Table
        self.getAllTransacao = getAllTransacao;
        self.createTransacao = createTransacao;
        self.updateTransacao = updateTransacao;
        self.estornaTransacao = estornaTransacao;

        self.editTransacao = editTransacao;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submit() {
            console.log('Submetendo');
            if (self.transacao.id === undefined || self.transacao.id === null) {
                console.log('Salvando uma nova Transação', self.transacao);
                createTransacao(self.transacao);
            } else {
                updateTransacao(self.transacao, self.transacao.id);
                console.log('Atualizando a Transação com o id ', self.transacao.id);
            }
        }

        function createTransacao(transacao) {
            console.log('Criação de Transações');
            TransacaoService.createTransacao(transacao)
                .then(
                    function (response) {
                        console.log('Transação criada com sucesso');
                        self.successMessage = 'Transação criada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        self.transacao={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Erro ao criar a Transação');
                        self.errorMessage = 'Erro ao criar a Transação: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updateTransacao(transacao, id){
            console.log('Atualização de Transações');
            TransacaoService.updateTransacao(transacao, id)
                .then(
                    function (response){
                        console.log('Transação atualizada com sucesso');
                        self.successMessage='Transação atualizada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Erro ao atualizar a Transação');
                        self.errorMessage='Erro ao atualizar a Transação '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function estornaTransacao(id){
            console.log('Remoção de Transação com o id '+id);
            TransacaoService.estornaTransacao(id)
                .then(
                    function(){
                        console.log('Transação de id '+id + ' removida com sucesso');
                    },
                    function(errResponse){
                        console.error('Erro ao remover a Transação '+id +', Erro :'+errResponse.data);
                    }
                );
        }


        function getAllTransacao(){
            return TransacaoService.getAllTransacao();
        }

        function getAllConta(){
            return ContaService.getAllConta();
        }

        function getAllTipoTransacao(){
        	return HelperService.getAllTipoTransacao();
        }

        function editTransacao(id) {
            self.successMessage='';
            self.errorMessage='';
            TransacaoService.getTransacao(id).then(
                function (transacao) {
                    self.transacao = transacao;
                },
                function (errResponse) {
                    console.error('Erro ao remover a Transação ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.transacao={};
            $scope.myForm.$setPristine(); //reset Form
        }

    }
]);
