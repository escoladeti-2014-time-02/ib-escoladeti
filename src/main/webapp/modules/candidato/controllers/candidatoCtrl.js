angular.module('Candidato', ['brasil.filters', 'fe-services', 'fe-directives', 'toaster', 'ui.utils', 'ngCpfCnpj', 'ImageCropper']).controller('ListarCandidatoCtrl', function($scope, $modal, Restangular, UtilService, toaster) {

  $scope.randomCandidato = function() {
    $modal.open({
      templateUrl: './modules/candidato/views/gerarCandidato.html',
      controller: 'GerarCandidatoCtrl',
      size: 'lg'
    });

  }
 
  console.log('Controller: Listar',$scope.candidatos);	

  $scope.load = function(page) {
    Restangular.all('candidato').one('pagina', page).get({busca: $scope.busca}).then(function(data) {
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      $scope.candidatos = $scope.tratarCandidato(objetoPaginado[0]);
      $scope.page = objetoPaginado[1];
      console.log('Candidatos recuperados do banco de dados: ' + $scope.candidatos);
      console.log($scope.candidatos);
    });
  };

  $scope.load(1);

  $scope.buscar = function(){
    UtilService.buscar($scope);
  }

  $scope.removerCandidato = function(varCandidato){
    console.log('Remover Candidato');
    if (confirm("Deseja excluir o candidato " + varCandidato.nome + "?")) {
      varCandidato.remove().then(function() {
        var msg = 'O candidato '+varCandidato.nome+' foi excluído com sucesso!';
        toaster.pop('success', "Candidato", msg); 
        $scope.load(1);
      }, function(data){
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar excluir o candidato '+varCandidato.nome+'!';
        toaster.pop('error', "Candidato", msg); 
      });
    };
  }

  $scope.tratarCandidato = function(candidatos){
    var arrayDocumentos = ['cpf', 'rg', 'carteiraTrabalho', 'certidaoNascimento'];
    angular.forEach(candidatos, function(candidato){
      if(candidato.documentos){
        var auxDocumentos = [];
        for (var i = 0; i < candidato.documentos.length; i++) {
          var index = arrayDocumentos.indexOf(candidato.documentos[i].type);
          console.log('type', i);
          console.log('index', index);
          auxDocumentos[index] = candidato.documentos[i];
        };
        candidato.documentos = auxDocumentos;
      }
    })
    return candidatos;
  }
});

angular.module('Candidato').controller('EditarCandidatoCtrl', function($scope, $location, $modal, $stateParams, /* idCandidato Parametro informado na URL, */ Restangular, UtilService, toaster){

  console.log('Controller: Editar');
  console.log('idCandidato informado na URL: ', $stateParams);

  $scope.init = function() {

    var idCandidato = $stateParams.idCandidato;

    Restangular.all('instituicaoEnsino').getList().then(function(data) {
      $scope.instituicoes = UtilService.limparDados(data);
    }); 

    Restangular.one('candidato', idCandidato).get().then(function(data) {
      $scope.candidatoSimplificado = data;
      $scope.candidatoSimplificado.temFilhos = $scope.candidatoSimplificado.filhos.length > 0; 
      if($scope.candidatoSimplificado.documentos){
       var arrayDocumentos = ['cpf', 'rg', 'carteiraTrabalho', 'certidaoNascimento'];
       var auxDocumentos = [];
       for (var i = 0; i < $scope.candidatoSimplificado.documentos.length; i++) {
        var index = arrayDocumentos.indexOf($scope.candidatoSimplificado.documentos[i].type);
        auxDocumentos[index] = $scope.candidatoSimplificado.documentos[i];
      };
      $scope.candidatoSimplificado.documentos = auxDocumentos;
      var auxDocumentos = [];
      for (var i = 0; i < arrayDocumentos.length; i++) {
        if($scope.candidatoSimplificado.documentos[i]){
         auxDocumentos[i] = $scope.candidatoSimplificado.documentos[i];
       } else {
         auxDocumentos[i] = {'type':arrayDocumentos[i]};
       }
     };
     $scope.candidatoSimplificado.documentos = auxDocumentos;
     if($scope.candidatoSimplificado.filhos.length==0) delete $scope.candidatoSimplificado.filhos;
     if ($scope.candidatoSimplificado.mae.documentos[0]) {
    	 $scope.candidatoSimplificado.mae.documentos[0] = {'type':'cpf', 'numero':$scope.candidatoSimplificado.mae.documentos[0].numero};
    	 $scope.candidatoSimplificado.mae.documentos[1] = {'type':'rg', 'numero':$scope.candidatoSimplificado.mae.documentos[1].numero, 'orgaoExpedidor':$scope.candidatoSimplificado.mae.documentos[1].orgaoExpedidor}; 
     }
     else {
    	 $scope.candidatoSimplificado.mae.documentos[0] = {'type':'cpf'};
    	 $scope.candidatoSimplificado.mae.documentos[1] = {'type':'rg'};
     }	 
   }
  });

  }
  
  $scope.init();
  

console.log('candadidATO')
$scope.calculoRendaPercapta = function() {  
  var qtd = $scope.candidatoSimplificado.dadosSocioEconomicos.numeroResidentesNaCasa;
  var renda = $scope.candidatoSimplificado.dadosSocioEconomicos.rendaFamiliar;
  console.log('quantidade', qtd)
  console.log('renda', renda)
  if(qtd) {
    var result = renda / qtd;
    $scope.candidatoSimplificado.dadosSocioEconomicos.rendaPerCapita = result
  } else {
    $scope.candidatoSimplificado.dadosSocioEconomicos.rendaPerCapita = renda
  }
} 

  $scope.tratarCandidato = function(candidato){
    var auxCandidato = angular.copy(candidato);
    for (var i = candidato.documentos.length - 1; i >= 0; i--) {
      console.log(i);
      console.log(candidato.documentos[i]);
      if(!candidato.documentos[i].hasOwnProperty('numero')){
        auxCandidato.documentos.splice(i,1);
      }
    };
    console.log(auxCandidato);
    return auxCandidato;
  }

  $scope.salvarCandidato = function(varCandidato) {
    var dados = $scope.tratarCandidato(varCandidato);
    console.log(dados);
    dados.put().then(function() {
      var msg = 'O candidato '+dados.nome+' foi alterado com sucesso!';
      $location.path('candidato');
      toaster.pop('success', "Candidato", msg);
    },function(data){
      console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar salvar o candidato '+dados.nome+'!';
      toaster.pop('error', "Candidato", msg);
      $location.path('candidato');
    });
  };

  $scope.alterarFoto = function() {
    console.log('Alterar Foto');
    var imageCropController = function($scope, $modalInstance) {
      console.log('Scope', $scope);
      $scope.base64 = {};
      $scope.salvarFoto = function(){
        $modalInstance.close($scope.base64);
      }
      $scope.fecharModal = function(){
        $modalInstance.dismiss('Cancelado');
      }
    }
    var modalInstance  = $modal.open({
      templateUrl: './modules/candidato/views/partials/imageCrop.html',
      controller: imageCropController,
      backdrop: 'static',
      size: 'lg'
    });

    modalInstance.result.then(function (base64) {
      if(!$scope.candidatoSimplificado.foto) $scope.candidatoSimplificado.foto = {};
      $scope.candidatoSimplificado.foto.base64 = base64;
    }, function () {
      //Modal foi fechado sem o cadastro completo
    });
  }

});

angular.module('Candidato').controller('CadastrarCandidatoCtrl', function($scope,  $location, $modal, Restangular, UtilService, toaster) {

$scope.candidatoSimplificado =  {"instituicaoEnsino": null, "mae": null, "pai": null, 'temFilhos': false/*, 'dadosSocioEconomicos': {'moraComResponsavel': false, 'auxilioGovernamental': false}*/};
$scope.candidatoSimplificado.documentos = [{'type':'cpf'}, {'type':'rg'}, {'type':'carteiraTrabalho'}, {'type':'certidaoNascimento'}];
$scope.candidatoSimplificado.mae = {'documentos':[{'type':'cpf'}, {'type':'rg'}, {'type':'carteiraTrabalho'}]};
$scope.candidatoSimplificado.telefones = [];
$scope.candidatoSimplificado.enderecos = [];
//$scope.candidatoSimplificado.foto = {};

$scope.tratarCandidato = function(candidato){
  var auxCandidato = angular.copy(candidato);
  for (var i = candidato.documentos.length - 1; i >= 0; i--) {
    console.log(i);
    console.log(candidato.documentos[i]);
    if(!candidato.documentos[i].hasOwnProperty('numero')&&!candidato.documentos[i].hasOwnProperty('dataNascimento')){
      auxCandidato.documentos.splice(i,1);
    }
  };
  console.log(auxCandidato);
  return auxCandidato;
}

Restangular.all('instituicaoEnsino').getList().then(function(data) {
  $scope.instituicoes = UtilService.limparDados(data);
}); 

console.log('candadidATO')
$scope.calculoRendaPercapta = function() {  
  var qtd = $scope.candidatoSimplificado.dadosSocioEconomicos.numeroResidentesNaCasa;
  var renda = $scope.candidatoSimplificado.dadosSocioEconomicos.rendaFamiliar;
  console.log('quantidade', qtd)
  console.log('renda', renda)
  if(qtd) {
    var result = renda / qtd;
    $scope.candidatoSimplificado.dadosSocioEconomicos.rendaPerCapita = result
  } else {
    $scope.candidatoSimplificado.dadosSocioEconomicos.rendaPerCapita = renda
  }
} 

$scope.salvarCandidato = function(varCandidato) {
  var dados = $scope.tratarCandidato(varCandidato);
  Restangular.all('candidato').post(dados).then(function(data) {
    var msg = 'O Candidato '+varCandidato.nome+' foi cadastrado com sucesso!';
    $location.path('candidato');
    toaster.pop('success', "Candidato", msg);
  },function(data){
    console.log('Erro ao gravar status:', data.status);
    var msg = 'Erro ao tentar salvar o candidato '+varCandidato.nome+'!';
    toaster.pop('error', "Candidato", msg);
  });
}

$scope.alterarFoto = function() {
  console.log('Alterar Foto');
  var imageCropController = function($scope, $modalInstance) {
    console.log('Scope', $scope);
    $scope.base64 = {};
    $scope.salvarFoto = function(){
      $modalInstance.close($scope.base64);
    }
    $scope.fecharModal = function(){
      $modalInstance.dismiss('Cancelado');
    }
  }
  var modalInstance  = $modal.open({
    templateUrl: './modules/candidato/views/partials/imageCrop.html',
    controller: imageCropController,
    backdrop: 'static',
    size: 'lg'
  });

  modalInstance.result.then(function (base64) {
    if(!$scope.candidatoSimplificado.foto) $scope.candidatoSimplificado.foto = {};
    $scope.candidatoSimplificado.foto.base64 = base64;
  }, function () {
    //Modal foi fechado sem o cadastro completo
  });
}

});

angular.module('Candidato').controller('PerfilCandidatoCtrl', function($scope, $location, $stateParams, $timeout, $modal, $rootScope, $filter, Restangular, toaster) {

  console.log('Controller: Perfil');

  $scope.eventoHide = [];
  $scope.form = {};

  Restangular.all('evento').one('listarTipos').get().then(function(data) {
    $scope.tiposEvento = data;
  }); 

  $scope.calcularIdade = function(candidato){
    var today = new Date();
    var birthDate = new Date(candidato.documentos[3].dataNascimento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  Restangular.all('candidato').one($stateParams.idCandidato).get().then(function(data) {
    $scope.candidato = data;
      $scope.candidato.temFilhos = $scope.candidato.filhos.length > 0; 
      if($scope.candidato.documentos){
       var arrayDocumentos = ['cpf', 'rg', 'carteiraTrabalho', 'certidaoNascimento'];
       var auxDocumentos = [];
       for (var i = 0; i < $scope.candidato.documentos.length; i++) {
        var index = arrayDocumentos.indexOf($scope.candidato.documentos[i].type);
        auxDocumentos[index] = $scope.candidato.documentos[i];
      };
      $scope.candidato.documentos = auxDocumentos;
      var auxDocumentos = [];
      for (var i = 0; i < arrayDocumentos.length; i++) {
        if($scope.candidato.documentos[i]){
         auxDocumentos[i] = $scope.candidato.documentos[i];
        } else {
         auxDocumentos[i] = {'type':arrayDocumentos[i]};
        }
      };
      $scope.candidato.documentos = auxDocumentos;
    }
    $scope.candidato.idade = $scope.calcularIdade($scope.candidato);
    console.log($scope.candidato);
  }); 

  $scope.loadEventos = function(){
    Restangular.all('evento').all($stateParams.idCandidato).getList().then(function(data) {
      $scope.eventos = data;
    });
  }    

  $scope.loadEventos();

  $scope.openEventoModal = function(){
    var modalScope = $rootScope.$new();
    modalScope.idCandidato = $stateParams.idCandidato;
    modalScope.tipoEventoHover = {};
    modalScope.eventoModal = {};
    var date = new Date();
    modalScope.eventoModal.dataEvento = $filter('date')(date, 'yyyy-MM-dd')

    var modalInstance  = $modal.open({
      templateUrl: './modules/candidato/views/partials/modalEventoTimeLine.html',
      controller: 'EventoCandidatoCtrl',
      backdrop: 'static',
      scope: modalScope
    });

    modalInstance.result.then(function (evento) {      
      $scope.eventos.push(evento);
    }, function (response) {
      console.log('erro modal '+response.status)
    });

  }

  $scope.openEditarEventoModal = function(evento){
    var modalScope = $rootScope.$new();
    modalScope.idCandidato = $stateParams.idCandidato;
    modalScope.tipoEventoHover = {};
    modalScope.eventoModal = Restangular.copy(evento);
    modalScope.eventoModal.dataEvento = $filter('date')(evento.dataEvento, 'yyyy-MM-dd')

    var modalInstance  = $modal.open({
      templateUrl: './modules/candidato/views/partials/modalEventoTimeLine.html',
      controller: 'EventoCandidatoCtrl',
      backdrop: 'static',
      scope: modalScope
    });

    modalInstance.result.then(function (evento) {      
      $scope.loadEventos();
    }, function (response) {
      console.log('erro modal '+response.status)
    });
  }

  $scope.removerEvento = function(evento){
    console.log(evento);
    if(confirm('Deseja remover o evento ' + evento.titulo +'?'))
    {
      evento.remove().then(function() {
        var msg = 'O evento '+evento.titulo+' excluído com sucesso!';
        $scope.loadEventos();
        $location.path('candidato/perfil/' + $stateParams.idCandidato);   
        toaster.pop('success', "Evento", msg);
      },function(data) {
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar excluir o evento '+evento.titulo+'!';
        toaster.pop('error', "Evento", msg);  
      });
    }
  }

  $scope.setColorLegend = function(objeto){
    return $scope.eventoHide[objeto.id] ? '' : {'background-color':objeto.cor};
  }

  $scope.hoverTpEvento = function(element, cor) {
    console.log(angular.element(element.srcElement).css('display'),cor);
    angular.element(element.srcElement).css('background-color', cor);
  }

  $scope.changeTabPanel = function(element) {
    var changeColor = function() {
      var cor = $('.nav-tabs').children(".active").children('a').css('background');
      $('.tab-content').css('background', cor);
    };
    $timeout(changeColor, 50);    
  }

});
angular.module('Candidato').controller('EventoCandidatoCtrl', function($scope, $modalInstance, Restangular, UtilService, toaster) {
  
  $scope.init = function() {
    Restangular.all('evento').one('listarTipos').get().then(function(data) {
      $scope.tiposEvento = data;
    }); 
  }
  $scope.init();

  $scope.adicionarEvento =  function(evento) {
    if(evento.hasOwnProperty('id')){
      evento.put().then(function(data) {
        var msg = 'O evento '+evento.titulo+' foi alterado com sucesso!';
        toaster.pop('success', "Evento", msg);
        $modalInstance.close(data);
      },function(data){
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar salvar o evento '+evento.titulo+'!';
        toaster.pop('error', "Evento", msg);
      });
    } else {
      Restangular.all('evento').all($scope.idCandidato).post(evento).then(function(data) {
        var msg = 'O evento '+evento.titulo+' foi cadastrado com sucesso!';
        toaster.pop('success', "Evento", msg);
        $modalInstance.close(data);
      },function(data){
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar salvar o evento '+evento.titulo+'!';
        toaster.pop('error', "Evento", msg);
      });
    }    
  }

  $scope.cancelar = function () {
    $modalInstance.dismiss('Cancelado');
  };

});
angular.module('Candidato').controller('VisualizarCandidatoCtrl', function($scope, $stateParams, Restangular, UtilService, toaster) {
  console.log('Controller: VisualizarCandidatoCtrl');
  var idCandidato = $stateParams.idCandidato;
  console.log('Id do candidato:' , idCandidato);

  $scope.visualizar = true;
  
  Restangular.all('instituicaoEnsino').getList().then(function(data) {
    $scope.instituicoes = UtilService.limparDados(data);
  }); 

  Restangular.one('candidato', idCandidato).get().then(function(data) {
    $scope.candidatoSimplificado = data;
    $scope.candidatoSimplificado.temFilhos = $scope.candidatoSimplificado.filhos.length > 0; 
    if($scope.candidatoSimplificado.documentos){
      var arrayDocumentos = ['cpf', 'rg', 'carteiraTrabalho', 'certidaoNascimento'];
      var auxDocumentos = [];
      for (var i = 0; i < $scope.candidatoSimplificado.documentos.length; i++) {
        var index = arrayDocumentos.indexOf($scope.candidatoSimplificado.documentos[i].type);
        auxDocumentos[index] = $scope.candidatoSimplificado.documentos[i];
      };
      $scope.candidatoSimplificado.documentos = auxDocumentos;
      var auxDocumentos = [];
      for (var i = 0; i < arrayDocumentos.length; i++) {
        if($scope.candidatoSimplificado.documentos[i]){
         auxDocumentos[i] = $scope.candidatoSimplificado.documentos[i];
        } else {
         auxDocumentos[i] = {'type':arrayDocumentos[i]};
        }
      };
      $scope.candidatoSimplificado.documentos = auxDocumentos;
    }
  });

});
