angular.module('time02').controller('MainCtrl', function($rootScope, EnderecoService) {
	
  console.log("Main Controller")

  $rootScope.getPaises = function(){
    EnderecoService.getPaises(function(dados){
      $rootScope.paises = dados;
    });
  }

  $rootScope.getUfs = function(idPais){
    console.log("GetUfs");
    EnderecoService.getUfs(idPais, function(dados){
      $rootScope.ufs = dados;
    });
	}

	$rootScope.getCidades = function(idUf){
    EnderecoService.getCidades(idUf, function(dados){
      $rootScope.cidades = dados;
    });
	}

	$rootScope.getBairros = function(idCidade){
    EnderecoService.getBairros(idCidade, function(dados){
      $rootScope.bairros = dados;
    });
	}

	$rootScope.getLogradouros = function(idBairro){
    EnderecoService.getLogradouros(idBairro, function(dados){
      $rootScope.logradouros = dados;
    });
	}

});