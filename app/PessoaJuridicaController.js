'use strict';

angular.module('crudApp').controller('PessoaJuridicaController',
    ['PessoaJuridicaService', /*'CourseService',*/ '$scope',  function( PessoaJuridicaService, /*CourseService,*/ $scope) {

        var self = this;
        self.pessoaJuridica = {};

        self.submit = submit;
        self.getAllPessoaJuridica = getAllPessoaJuridica;
        self.createPessoaJuridica = createPessoaJuridica;
        self.updatePessoaJuridica = updatePessoaJuridica;
        self.removePessoaJuridica = removePessoaJuridica;
        self.editPessoaJuridica = editPessoaJuridica;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        self.filterCondition = {
            u: {}
        }

        function submit() {
            console.log('Submetendo');
            if (self.pessoaJuridica.id === undefined || self.pessoaJuridica.id === null) {
                console.log('Salvando um nova Pessoa Jurídica', self.pessoaJuridica);
                createPessoaJuridica(self.pessoaJuridica);
            } else {
                updatePessoaJuridica(self.pessoaJuridica, self.pessoaJuridica.id);
                console.log('Pessoa Jurídica atualizado com o id ', self.pessoaJuridica.id);
            }
        }

        function createPessoaJuridica(pessoaJuridica) {
            console.log('Criação da Pessoa Jurídica');
            PessoaJuridicaService.createPessoaJuridica(pessoaJuridica)
                .then(
                    function (response) {
                        console.log('Pessoa Jurídica cadastrada com sucesso');
                        self.successMessage = 'Pessoa Jurídica cadastrada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        self.pessoaJuridica={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Erro ao criar a Pessoa Jurídica');
                        self.errorMessage = 'Erro ao criar a Pessoa Jurídica: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updatePessoaJuridica(pessoaJuridica, id){
            console.log('Atualização da Pessoa Juridica');
            PessoaJuridicaService.updatePessoaJuridica(pessoaJuridica, id)
                .then(
                    function (response){
                        console.log('Pessoa Jurídica atualizada com sucesso');
                        self.successMessage='Pessoa Jurídica atualizada com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Erro ao remover a Pessoa Jurídica');
                        self.errorMessage='Erro ao remover a Pessoa Jurídica '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removePessoaJuridica(id){
            console.log('Removendo o estudante de id '+id);
            PessoaJuridicaService.removePessoaJuridica(id)
                .then(
                    function(){
                        console.log('Pessoa Jurídica '+id + ' removida com sucesso');
                    },
                    function(errResponse){
                        console.error('Erro ao remover a Pessoa Jurídica '+id +', Error :'+errResponse.data);
                    }
                );
        }


        function getAllPessoaJuridica(){
            return PessoaJuridicaService.getAllPessoaJuridica();
        }

        function editPessoaJuridica(id) {
            self.successMessage='';
            self.errorMessage='';
            PessoaJuridicaService.getPessoaJuridica(id).then(
                function (pessoaJuridica) {
                    self.pessoaJuridica = pessoaJuridica;
                },
                function (errResponse) {
                    console.error('Erro ao remover a Pessoa Jurídica ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.pessoaJuridica={};
            $scope.myForm.$setPristine(); //reset Form
        }
    }
]);
