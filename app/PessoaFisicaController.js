'use strict';

angular.module('crudApp').controller('PessoaFisicaController',
    ['PessoaFisicaService', '$scope',  function( PessoaFisicaService, $scope) {
        var self = this;
        self.pessoaFisica = {};
        self.pessoaFisicas=[];

        self.submit = submit;
        self.getAllPessoaFisica = getAllPessoaFisica;
        self.createPessoaFisica = createPessoaFisica;
        self.updatePessoaFisica = updatePessoaFisica;
        self.removePessoaFisica = removePessoaFisica;
        self.editPessoaFisica = editPessoaFisica;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submit() {
            console.log('Submetendo');
            if (self.pessoaFisica.id === undefined || self.pessoaFisica.id === null) {
                console.log('Salvando Um Nova Pessoa F&#x00ED;sica', self.pessoaFisica);
                createPessoaFisica(self.pessoaFisica);
            } else {
                updatePessoaFisica(self.pessoaFisica, self.pessoaFisica.id);
                console.log('Atualizando a Pessoa F&#x00ED;sica com o id ', self.pessoaFisica.id);
            }
        }

        function createPessoaFisica(pessoaFisica) {
            console.log('Criação de Pessoas F&#x00ED;sicas');
            PessoaFisicaService.createPessoaFisica(pessoaFisica)
                .then(
                    function (response) {
                        console.log('Pessoa F&#x00ED;sica criada com sucesso');
                        self.successMessage = 'Pessoa F&#x00ED;sica criada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        self.pessoaFisica={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Erro ao criar a Pessoa F&#x00ED;sica');
                        self.errorMessage = 'Erro ao criar a Pessoa F&#x00ED;sica: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updatePessoaFisica(pessoaFisica, id){
            console.log('Atualização de Pessoas F&#x00ED;sicas');
            PessoaFisicaService.updatePessoaFisica(pessoaFisica, id)
                .then(
                    function (response){
                        console.log('Pessoa F&#x00ED;sica atualizada com sucesso');
                        self.successMessage='Pessoa F&#x00ED;sica atualizada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Erro ao atualizar a Pessoa F&#x00ED;sica');
                        self.errorMessage='Erro ao atualizar a Pessoa F&#x00ED;sica '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removePessoaFisica(id){
            console.log('Remoção de Pessoa F&#x00ED;sica com o id '+id);
            PessoaFisicaService.removePessoaFisica(id)
                .then(
                    function(){
                        console.log('Pessoa F&#x00ED;sica de id '+id + ' removida com sucesso');
                    },
                    function(errResponse){
                        console.error('Erro ao remover a Pessoa F&#x00ED;sica '+id +', Erro :'+errResponse.data);
                    }
                );
        }


        function getAllPessoaFisica(){
            return PessoaFisicaService.getAllPessoaFisica();
        }

        function editPessoaFisica(id) {
            self.successMessage='';
            self.errorMessage='';
            PessoaFisicaService.getPessoaFisica(id).then(
                function (pessoaFisica) {
                    self.pessoaFisica = pessoaFisica;
                },
                function (errResponse) {
                    console.error('Erro ao remover a Pessoa F&#x00ED;sica ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.pessoaFisica={};
            $scope.myForm.$setPristine(); //reset Form
        }
    }
]);
