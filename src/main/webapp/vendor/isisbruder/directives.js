angular.module('fe-directives', [])
.directive('fePaginator', function() {
  return {
    restrict: 'E',
    scope: {
      page: '=',
      load: '&'
    },
    templateUrl: './modules/main/views/templates/fe-paginator.html',
   	controller: ['$scope', function($scope){
   		$scope.nextPage = function(){
   			if ($scope.page.pageNumber < $scope.page.pageCount) {
   				$scope.load({pagina: $scope.page.pageNumber+1});
   			};
   		}
   		$scope.previousPage = function(){
   			if($scope.page.pageNumber>1){
  				$scope.load({pagina: $scope.page.pageNumber-1});
   			};
   		}
   	}]
  }
})
.directive('feDialog', function() {
  return {
    restrict: 'EA',
    priority: 1,
    scope: {
      idModal: '@',
      titulo: '@'
    },
    templateUrl: './modules/main/views/templates/fe-dialog.html',
    transclude: true
  }
})
.directive('feTelefones', function($compile, $http) {
  return {
    restrict: 'E',
    scope: {
      telefones: '=',
      visualizar: '='
    },
    templateUrl: './modules/main/views/templates/fe-telefones.html',
    link: function(scope, el, attr) {
      // var form = el.parents('form');
      // $http.get('./modules/main/views/templates/partials/fe-telefones-modal.html')
      //   .then(function(response){
      //     form.after($compile(response.data)(scope));
      //   });
    },
    controller: ['$scope', '$rootScope', '$modal', 'Restangular', 'UtilService', function($scope, $rootScope, $modal, Restangular, UtilService){

      $scope.instancia
      
      $scope.novoTelefone = function(){
        // $scope.modalTelefone = {};
        // $scope.form.telefone.$setPristine();
        // $('#modalTelefone').modal('show');
        modalInstance = $modal.open({
          templateUrl: './modules/main/views/templates/partials/fe-telefones-modal.html',
          controller: 'FeTelefonesModalCtrl',
          size: 'lg'
        });

        modalInstance.result.then(function (telefone) {
          $scope.salvarTelefone(telefone);
        }, function () {
          //Modal foi fechado sem o cadastro completo
        });

      }

      $scope.salvarTelefone = function(telefone){
        var find = _.find($scope.telefones, function(objt){
          return objt.$$hashKey == telefone.$$hashKey;
        });
        if(find){
          var index = $scope.telefones.indexOf(find);
          $scope.telefones[index] = telefone;
        } else {
          $scope.telefones.push(telefone);
        }    
        //delete this.modalTelefone;
        //$('#modalTelefone').modal('hide');
      };

      $scope.removerTelefone = function(telefone){
        $scope.telefones = _.without($scope.telefones, telefone);
      }

      $scope.editarTelefone = function(varTelefone){
       // $('#modalTelefone').modal('show');
        registro = _.clone(varTelefone);
       // $scope.modalTelefone = registro;

        var modalScope = $rootScope.$new();
        modalScope.modalTelefone = registro;

        modalInstance = $modal.open({
          templateUrl: './modules/main/views/templates/partials/fe-telefones-modal.html',
          controller: 'FeTelefonesModalCtrl',
          size: 'lg',
          scope: modalScope
        });

        modalInstance.result.then(function (telefone) {
          $scope.salvarTelefone(telefone);
        }, function () {
          //Modal foi fechado sem o cadastro completo
        });

      }

    }]
  }
})
.controller('FeTelefonesModalCtrl', function($scope, $modalInstance, Restangular, UtilService) {

  console.log('Modal Controller', $scope);

  $scope.init = function(){
    $scope.telefone = {};
    $scope.form = {};
  //$scope.modalTelefone || {};

    Restangular.all('tipotelefone').getList().then(function(data) {
      $scope.tiposTelefone = UtilService.limparDados(data);
    }); 
  }

  $scope.init();

  $scope.salvarTelefone = function(telefone) {
    $modalInstance.close(telefone);
  }

  $scope.fecharModal = function(telefone) {
    $modalInstance.dismiss();
  }

})
.directive('feEnderecos', function($compile, $http) {
  return {
    restrict: 'E',
    scope: {
      enderecos: '=',
      visualizar: '='
    },
    templateUrl: './modules/main/views/templates/fe-enderecos.html',
    link: function(scope, el, attr) {
      // var form = el.parents('form');
      // $http.get('./modules/main/views/templates/partials/fe-enderecos-modal.html')
      //   .then(function(response){
      //     form.after($compile(response.data)(scope));
      //   });
    },
    controller: ['$scope', '$modal', '$rootScope', 'Restangular', 'UtilService', 'EnderecoService', function($scope, $modal, $rootScope, Restangular, UtilService, EnderecoService){

      $scope.novoEndereco = function(){
        // $scope.modalEnd = {};
        // $scope.form.endereco.$setPristine();
        // $('#modalEnderecos').modal('show');
        modalInstance = $modal.open({
          templateUrl: './modules/main/views/templates/partials/fe-enderecos-modal.html',
          controller: 'FeEnderecosModalCtrl',
          size: 'lg'
        });

        modalInstance.result.then(function (endereco) {
          $scope.salvarEndereco(endereco);
        }, function () {
          //Modal foi fechado sem o cadastro completo
        });
      }

      $scope.salvarEndereco = function(endereco){
        if(!$scope.enderecos){
          $scope.enderecos = [];
        }
        var find = _.find($scope.enderecos, function(objt){
          return objt.$$hashKey == endereco.$$hashKey;
        });
        if(find){
          var index = $scope.enderecos.indexOf(find);
          $scope.enderecos[index] = endereco;
        } else {          
          $scope.enderecos.push(endereco);
        }    
      };

      $scope.removerEnderecos = function(endereco){
        $scope.enderecos = _.without($scope.enderecos, endereco);
      }

      $scope.editarEnderecos = function(endereco){
        var registro = _.clone(endereco);
        var modalScope = $rootScope.$new();
        modalScope.modalEnd = registro;
        modalScope.modalFiltro = {'endereco':{}};
        modalScope.modalFiltro.endereco.pais = modalScope.modalEnd.bairro.cidade.unidadeFederativa.pais;
        modalScope.modalFiltro.endereco.unidadeFederativa = modalScope.modalEnd.bairro.cidade.unidadeFederativa;
        modalScope.modalFiltro.endereco.cidade = modalScope.modalEnd.bairro.cidade;
        modalScope.modalFiltro.tipoLogradouro = modalScope.modalEnd.logradouro.tipoLogradouro;
        modalScope.modalEnd.cep = modalScope.modalEnd.logradouro.faixasDeCep[0].cep;
      
        modalInstance = $modal.open({
          templateUrl: './modules/main/views/templates/partials/fe-enderecos-modal.html',
          controller: 'FeEnderecosModalCtrl',
          scope: modalScope,
          size: 'lg'
        });

        modalInstance.result.then(function (endereco) {
          $scope.salvarEndereco(endereco);
        }, function () {
          //Modal foi fechado sem o cadastro completo
        });

        console.log(this.modalEnd);
      }      
    }]
  }
})
.controller('FeEnderecosModalCtrl', function($scope, $modalInstance, Restangular, UtilService, EnderecoService) {
  // $scope.endereco = {};
  // $scope.form = {};
  // $scope.modalEnd = {};
  // $scope.modalFiltro = { 'endereco': {} };


  $scope.getUfs = function(idPais){
    console.log("GetUfs");
    EnderecoService.getUfs(idPais, function(dados){
      $scope.ufs = dados;
    });
  }

  $scope.getCidades = function(idUf){
    EnderecoService.getCidades(idUf, function(dados){
      $scope.cidades = dados;
    });
  }

  $scope.getBairros = function(idCidade){
    EnderecoService.getBairros(idCidade, function(dados){
      $scope.bairros = dados;
    });
  }

  $scope.getLogradouros = function(idBairro){
    EnderecoService.getLogradouros(idBairro, function(dados){
      $scope.logradouros = dados;
    });
  }

  $scope.initEndereco = function() {
    $scope.getUfs($scope.modalEnd.bairro.cidade.unidadeFederativa.pais.id);
    $scope.getCidades($scope.modalEnd.bairro.cidade.unidadeFederativa.id);
    $scope.getBairros($scope.modalEnd.bairro.cidade.id);
    $scope.getLogradouros($scope.modalEnd.bairro.id);
  }


  $scope.init = function() {
    EnderecoService.getPaises(function(dados){
      $scope.paises = dados;
    });

    EnderecoService.getTiposLogradouro(function(dados){
      $scope.tiposLogradouro = dados;
    })

    if ($scope.modalEnd) {
      $scope.initEndereco();
    } else {
      $scope.modalFiltro = {'endereco':{}};
    };

  }

  $scope.init();

  $scope.getEnderecoLatLng = function(endereco, callback){
    if(endereco){
      var stringEndereco = 
      endereco.logradouro.tipoLogradouro.nome + ' ' +
      endereco.logradouro.nome + ', ' +
      endereco.numero + ' - ' +
      endereco.bairro.cidade.nome + ' - ' +
      endereco.bairro.cidade.unidadeFederativa.nome;  
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': stringEndereco }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var geoLocalizacao = { geoLocalizacao: {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng()
          }};
          callback(endereco, geoLocalizacao);
        } else {
          console.log('A requisição falhou!');               
        }
      });
    }   
    console.log(stringEndereco);
  }

  $scope.getEndereco = function(cep, modal, filtro){
    if (cep&&cep.length==8) {
      Restangular.one('endereco').one('buscarPorCep', cep).get().then(function(data) {
        var registro = UtilService.limparDados(data);
        if(data.bairro.cidade){
          EnderecoService.getLogradouros(data.bairro.id, function(dados){
            $scope.logradouros = dados;
          });
          EnderecoService.getUfs(data.bairro.cidade.unidadeFederativa.pais.id, function(dados) {
            $scope.ufs = dados;
          });
          EnderecoService.getCidades(data.bairro.cidade.unidadeFederativa.id, function(dados){
            $scope.cidades = dados;
          });
          EnderecoService.getBairros(data.bairro.cidade.id, function(dados){
            $scope.bairros = dados;
          });

          modal.tipoEndereco = data.tipoEndereco;
          modal.bairro = data.bairro;
          modal.logradouro = data.logradouro;
          filtro.endereco.pais = data.bairro.cidade.unidadeFederativa.pais;
          filtro.endereco.unidadeFederativa = data.bairro.cidade.unidadeFederativa;
          filtro.endereco.cidade = data.bairro.cidade;
          filtro.tipoLogradouro = data.logradouro.tipoLogradouro;
        }
        
      });
    };
  }

  $scope.salvarTelefone = function(telefone) {
    $modalInstance.close(telefone);
  }

  $scope.salvarEnderecos = function(endereco){
    if(!$scope.enderecos){
      $scope.enderecos = [];
    }
    $scope.getEnderecoLatLng(endereco, function(endereco, geoLocalizacao){
      var newEndereco = angular.extend(endereco,geoLocalizacao);
      console.log('Novo endereco', newEndereco);
      $modalInstance.close(newEndereco);
    });
  };

  $scope.fecharModal = function(telefone) {
    $modalInstance.dismiss();
  }

})
.directive('feFilhos', function($compile, $http) {
  return {
    restrict: 'E',
    scope: {
      filhos: '=',
      temFilhos: '=',
      visualizar: '='
    },
    templateUrl: './modules/main/views/templates/fe-filhos.html',
    link: function(scope, el, attr) {
      // var form = el.parents('form');
      // $http.get('./modules/main/views/templates/partials/fe-filhos-modal.html')
      //   .then(function(response){
      //     form.after($compile(response.data)(scope));
      //   });
    },
    controller: ['$scope', '$modal', '$rootScope', 'Restangular', 'UtilService', function($scope, $modal, $rootScope, Restangular, UtilService){
      
      $scope.form = {};
      $scope.modalFilho = {};

      $scope.novoFilho = function(){
        // $scope.modalFilho = {};
        // $scope.form.filho.$setPristine();
        // $('#modalFilho').modal('show');

        var modalFilhosCtrl = function($scope, $modalInstance){
          $scope.salvarFilho = function(filho) {
            $modalInstance.close(filho);
          }
        }

        modalInstance = $modal.open({
          templateUrl: './modules/main/views/templates/partials/fe-filhos-modal.html',
          controller: modalFilhosCtrl,
          size: 'lg'
        });

        modalInstance.result.then(function (filho) {
          $scope.salvarFilho(filho);
        }, function () {
          //Modal foi fechado sem o cadastro completo
        });
      }

      $scope.salvarFilho = function(filho){
        if(!$scope.filhos){
          $scope.filhos = [];
        }
        var find = _.find($scope.filhos, function(objt){
          return objt.$$hashKey == filho.$$hashKey;
        });
        if(find){
          var index = $scope.filhos.indexOf(find);
          $scope.filhos[index] = filho;
        } else {
          $scope.filhos.push(filho);
        }    
      };

      $scope.removerFilho = function(filho){
        console.log(this.filhos);
        $scope.filhos = _.without($scope.filhos, filho);
      }

      $scope.editarFilho = function(varFilho){
         registro = _.clone(varFilho);
        // $scope.modalTelefone = registro;

        var modalFilhosCtrl = function($scope, $modalInstance){
          $scope.salvarFilho = function(filho) {
            $modalInstance.close(filho);
          }
        }

         var modalScope = $rootScope.$new();
         modalScope.modalFilho = registro;

         modalInstance = $modal.open({
           templateUrl: './modules/main/views/templates/partials/fe-filhos-modal.html',
           controller: modalFilhosCtrl,
           size: 'lg',
           scope: modalScope
         });

         modalInstance.result.then(function (filho) {
           $scope.salvarFilho(filho);
         }, function () {
           //Modal foi fechado sem o cadastro completo
         });
      }

    }]
  }
})
.directive('feResetform', function($compile, $http) {
  return {
    restrict: 'E',
    scope: {
      reOrigem: '=',
      reReset:  '=',
      reForm:   '='
    },
    template: 
      '<button ng-click="resetForm()" class="btn btn-warning" ng-if="!visualizar">'+
      ' Limpar  '+ 
      '</button>',
    replace: true,
    controller: ['$scope','Restangular', function($scope,Restangular){
      $scope.resetForm = function(){       
        $scope.reReset = Restangular.copy($scope.reOrigem);
        $scope.reForm.$setPristine();  
      }
    }]
  }
});