'use strict';

angular.module('crudApp').factory('CNPJValidator',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                validateCNPJ: validateCNPJ,
                getAllTipoConta: getAllTipoConta
            };

            return factory;

            function validateCNPJ() {
              cnpj = cnpj.replace(/[^\d]+/g,'');
              if(cnpj == '') return false;
              // Elimina CNPJs invalidos conhecidos
              if (cnpj.length != 11 ||
                  cnpj == "00000000000" ||
                  cnpj == "11111111111" ||
                  cnpj == "22222222222" ||
                  cnpj == "33333333333" ||
                  cnpj == "44444444444" ||
                  cnpj == "55555555555" ||
                  cnpj == "66666666666" ||
                  cnpj == "77777777777" ||
                  cnpj == "88888888888" ||
                  cnpj == "99999999999")
                      return false;
              // Valida 1o digito
              add = 0;
              for (i=0; i < 9; i ++)
                  add += parseInt(cnpj.charAt(i)) * (10 - i);
                  rev = 11 - (add % 11);
                  if (rev == 10 || rev == 11)
                      rev = 0;
                  if (rev != parseInt(cnpj.charAt(9)))
                      return false;
              // Valida 2o digito
              add = 0;
              for (i = 0; i < 10; i ++)
                  add += parseInt(cnpj.charAt(i)) * (11 - i);
              rev = 11 - (add % 11);
              if (rev == 10 || rev == 11)
                  rev = 0;
              if (rev != parseInt(cnpj.charAt(10)))
                  return false;
              return true;
            }

            function getAllTipoConta(){
            	 return $localStorage.tipoConta;
            }
        }
    ]);
