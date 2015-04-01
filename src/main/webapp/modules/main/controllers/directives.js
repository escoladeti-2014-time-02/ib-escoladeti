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
    controller: ['$scope', 'Restangular', 'UtilService', function($scope, Restangular, UtilService){
      $scope.telefone = {};
      $scope.form = {};
      $scope.modalTelefone = {};

      Restangular.all('tipotelefone').getList().then(function(data) {
        $scope.tiposTelefone = UtilService.limparDados(data);
      }); 

      $scope.novoTelefone = function(){
        $scope.modalTelefone = {};
        $scope.form.telefone.$setPristine();
        //$('#modalTelefone').modal('show');
        $modal.open({
          templateUrl: './modules/main/views/templates/partials/fe-telefones-modal.html',
          scope: this,
          size: 'lg'
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
        delete this.modalTelefone;
        $('#modalTelefone').modal('hide');
      };

      $scope.removerTelefone = function(telefone){
        $scope.telefones = _.without($scope.telefones, telefone);
      }

      $scope.editarTelefone = function(varTelefone){
        $('#modalTelefone').modal('show');
        registro = _.clone(varTelefone);
        $scope.modalTelefone = registro;
      }

    }]
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
      var form = el.parents('form');
      $http.get('./modules/main/views/templates/partials/fe-enderecos-modal.html')
        .then(function(response){
          form.after($compile(response.data)(scope));
        });
    },
    controller: ['$scope', 'Restangular', 'UtilService', 'EnderecoService', function($scope, Restangular, UtilService, EnderecoService){

      $scope.endereco = {};
      $scope.form = {};
      $scope.modalEnd = {};
      $scope.modalFiltro = { 'endereco': {} };

      EnderecoService.getPaises(function(dados){
        $scope.paises = dados;
      });

      EnderecoService.getTiposLogradouro(function(dados){
        $scope.tiposLogradouro = dados;
      })

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

      $scope.novoEndereco = function(){
        $scope.modalEnd = {};
        $scope.form.endereco.$setPristine();
        $('#modalEnderecos').modal('show');
      }

      $scope.salvarEnderecos = function(endereco){
        if(!$scope.enderecos){
          $scope.enderecos = [];
        }
        $scope.getEnderecoLatLng(endereco, function(endereco, geoLocalizacao){
          angular.extend(endereco,geoLocalizacao);
          console.log('Novo endereco', endereco);
        });
        var find = _.find($scope.enderecos, function(objt){
          return objt.$$hashKey == endereco.$$hashKey;
        });
        if(find){
          var index = $scope.enderecos.indexOf(find);
          $scope.enderecos[index] = endereco;
        } else {
          
          $scope.enderecos.push(endereco);
        }    
        delete this.modalEnd;
        delete this.modalFiltro;
        $('#modalEnderecos').modal('hide');
      };

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

      $scope.removerEnderecos = function(endereco){
        $scope.enderecos = _.without($scope.enderecos, endereco);
      }

      $scope.editarEnderecos = function(endereco){
        console.log('end', endereco )
        $('#modalEnderecos').modal('show');
        var registro = _.clone(endereco);
        $scope.modalEnd = registro;
        $scope.modalFiltro = {'endereco':{}};
        $scope.modalFiltro.endereco.pais = $scope.modalEnd.bairro.cidade.unidadeFederativa.pais;
        $scope.modalFiltro.endereco.unidadeFederativa = $scope.modalEnd.bairro.cidade.unidadeFederativa;
        $scope.modalFiltro.endereco.cidade = $scope.modalEnd.bairro.cidade;
        $scope.modalFiltro.tipoLogradouro = $scope.modalEnd.logradouro.tipoLogradouro;
        $scope.modalEnd.cep = $scope.modalEnd.logradouro.faixasDeCep[0].cep;
        console.log(this.modalEnd);
      }

      $scope.getEndereco = function(cep, modal, filtro){
        console.log(cep);
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
    }]
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
      var form = el.parents('form');
      $http.get('./modules/main/views/templates/partials/fe-filhos-modal.html')
        .then(function(response){
          form.after($compile(response.data)(scope));
        });
    },
    controller: ['$scope', 'Restangular', 'UtilService', function($scope, Restangular, UtilService){
      
      $scope.form = {};
      $scope.modalFilho = {};

      $scope.novoFilho = function(){
        $scope.modalFilho = {};
        $scope.form.filho.$setPristine();
        $('#modalFilho').modal('show');
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
        delete this.modalFilho;
        $('#modalFilho').modal('hide');
      };

      $scope.removerFilho = function(filho){
        console.log(this.filhos);
        $scope.filhos = _.without($scope.filhos, filho);
      }

      $scope.editarFilho = function(varFilho){
        $('#modalFilho').modal('show');
        registro = _.clone(varFilho);
        $scope.modalFilho = registro;
        console.log(this.modalFilho);
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