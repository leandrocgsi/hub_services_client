'use strict';

angular.module('crudApp').factory('CNPJValidator',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                validateCNPJ: validateCNPJ,
                getAllTipoConta: getAllTipoConta
            };

            return factory;

            function validateCNPJ(input_cnpj){

               if(input_cnpj){
                   var input=input_cnpj.toString();
                   var pesos_A=[5,4,3,2,9,8,7,6,5,4,3,2];
                   var pesos_B=[6,5,4,3,2,9,8,7,6,5,4,3,2];
                   var sum=0;
                   var x1=0;
                   var x2=0;
                   for(var i=0;i=2){
                     x1=11-mod;
                   }
                   //calcula digito 2
                   sum=0;
                   for(var i=0;i=2){
                     x2=11-mod;
                   }

                   //test digitos
                   if(x1==input[12] && x2==input[13]){
                     return true;
                   }else{
                     return false;
                   }
               }else{
                  return false;
               }
            }

            function getAllTipoConta(){
            	 return $localStorage.tipoConta;
            }
        }
    ]);
