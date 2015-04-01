angular.module('Modulo', ['fe-services', 'fe-directives', 'toaster', 'ui.utils', 'brasil.filters', 'ngCpfCnpj']).controller('ListarModuloCtrl', function($scope, Restangular, UtilService, toaster) {

  $scope.load = function(page) {
    Restangular.all('modulo').one('pagina',page).get({busca:$scope.busca}).then(function(data) {
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      $scope.modulos = objetoPaginado[0];
      $scope.page = objetoPaginado[1];
      angular.forEach($scope.modulos, function(modulo){
        if (modulo != null) {
          modulo.route = 'modulo';          
        };
      });
    }); 
  }
  $scope.load(1);

  $scope.buscar = function(){
    UtilService.buscar($scope);
  } 

  $scope.removerModulo = function(varModulo){
    if (confirm("Deseja excluir o modulo " + varModulo.nome + "?")) {
      varModulo.remove().then(function() {
        var msg = 'O modulo '+varModulo.nome+' foi excluído com sucesso!';
        toaster.pop('success', "Modulo", msg);
        $scope.load(1);
      }, function(data){
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar excluir o modulo '+varModulo.nome+'!';
         toaster.pop('error', "Modulo", msg); 
      });
    };
  }

});

angular.module('Modulo').controller('EditarModuloCtrl', function($scope, $location, $rootScope, $modal, $stateParams, Restangular, UtilService, toaster){
  console.log('Editar Modulo')
  $scope.init = function(){
    var idModulo = $stateParams.idModulo;
    $scope.selectDisciplina = {};
    $scope.selectColaboradores = {};
    $scope.disciplinaAux = {};
    $scope.colaboradorAux = {};
    $scope.colaboradoresAux = [];
    $scope.disciplinaAux.colaboradores = [];
    $scope.gridDisciplina = true;
    Restangular.one('modulo', idModulo).get().then(function(data) {
      console.log('GET MODULO', data)
      $scope.modulo = data;
      $scope.objetoOrigem = angular.copy(data);
    });

    Restangular.all('disciplina').getList().then(function(data) {
      $scope.selectDisciplina = UtilService.limparDados(data);
      $scope.disciplinasAux = $scope.selectDisciplina;
    });
    Restangular.all('colaborador').getList().then(function(data) {
      $scope.selectColaboradores = UtilService.limparDados(data);
      $scope.colaboradoresAux =  $scope.selectColaboradores;   
    }); 
  } 

  $scope.init();

  $scope.modalNovoColaborador = function () {
    var modalScope = $rootScope.$new();
    modalScope.modalInstance  = $modal.open({
      templateUrl: './modules/programaaprendizagem/colaborador/views/formColaborador.html',
      controller: 'CadastrarColaboradorCtrl',
      size: 'lg',
      backdrop: 'static',
      scope: modalScope
    });
    modalScope.modalInstance.result.then(function (colaborador) {      
      $scope.selectColaboradores.push(colaborador);
    }, function () {
      console.log('FECHO COLABORADOR')
    });
  }

  $scope.adicionarColaborador = function(objColaborador){
    $scope.disciplinaAux.colaboradores.push(objColaborador);
    $scope.selectColaboradores = _.without($scope.selectColaboradores, objColaborador);
    $scope.colaboradorAux = {};
    $scope.modalColaborador.$setPristine();
  }

  $scope.removerColaborador = function(objColab) {
    $scope.disciplinaAux.colaboradores = _.without($scope.disciplinaAux.colaboradores, objColab);
    $scope.selectColaboradores.push(objColab);
  }

  $scope.modalNovaDisciplina = function () {
    var modalScope = $rootScope.$new();
    modalScope.modalInstance  = $modal.open({
      templateUrl: './modules/programaaprendizagem/disciplina/views/formDisciplina.html',
      controller: 'CadastrarDisciplinaCtrl as CadastrarModal',
      size: 'lg',
      scope: modalScope
    });
    modalScope.modalInstance.result.then(function (disciplina) {      
      $scope.disciplina.push(disciplina);
      console.log('disciplina', disciplina)
    }, function () {
      console.log('FECHO COLABORADOR')
   });
  }

  $scope.adicionarNovaDisciplina = function(){
    $scope.colaboradorAux = {};
    $scope.disciplinaAux = {};
    $scope.disciplinaAux.colaboradores = [];
    $scope.modalColaborador.$setPristine();
    $scope.gridDisciplina = false;
    $scope.selectColaboradores = $scope.colaboradoresAux;
    $scope.retirarDisciplinas();
  }

  $scope.salvarDisciplina = function(objDisciplina) {
    indice = _.indexOf($scope.modulo.disciplinasModulo, objDisciplina);
    console.log('indice', indice);
    if(indice!=-1) {
      $scope.modulo.disciplinasModulo[indice] = objDisciplina;
    }
    else {
      $scope.modulo.disciplinasModulo.push(objDisciplina);
    }    
    $scope.disciplinaAux = {};
    $scope.modalDisciplina.$setPristine();
    $scope.gridDisciplina = true;
  } 

  $scope.editarDisciplina = function(objModuloDisciplina) {
    console.log('editar disciplina', objModuloDisciplina)
    $scope.gridDisciplina = false;
    $scope.disciplinaAux = objModuloDisciplina;
    $scope.retirarDisciplinas();
    $scope.selectDisciplina.push(objModuloDisciplina.disciplina);
    $scope.retirarColaboradores(objModuloDisciplina);
  }

  $scope.removerDisciplina = function(disciplina) {
    $scope.modulo.disciplinasModulo = _.without($scope.modulo.disciplinasModulo, disciplina);
    if($scope.modulo.disciplinasModulo.length<=0){
      $scope.adicionarNovaDisciplina();
    }
  }  

  $scope.salvarModulo = function(objModulo) {
    console.log('Salvar Modulo', objModulo)
    objModulo.put().then(function() {
      var msg = 'O Modulo '+objModulo.nome+' foi alterado com sucesso!';
      $location.path('programaaprendizagem/modulo');
       toaster.pop('success', "Modulo", msg);
    },function(data){
      console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar salvar o modulo '+$scope.modulo.nome+'!';
      $location.path('programaaprendizagem/modulo');
       toaster.pop('error', "Modulo", msg);
    });
  }

  $scope.retirarDisciplinas = function(){
    $scope.selectDisciplina = $scope.disciplinasAux;
    angular.forEach($scope.modulo.disciplinasModulo, function(disciplinaModulo){
      if(disciplinaEncontrada = _.find($scope.selectDisciplina, function(disciplina){
        return disciplina.id === disciplinaModulo.disciplina.id;
      })){
        $scope.selectDisciplina = _.without($scope.selectDisciplina, disciplinaEncontrada);
      }
    })
  }

  $scope.retirarColaboradores = function(disciplinaModulo) {
    $scope.selectColaboradores = $scope.colaboradoresAux;
    angular.forEach(disciplinaModulo.colaboradores, function(disciplinaModuloColaborador){
      if(colaboradorEncontrado = _.find($scope.selectColaboradores, function(colaborador){
        return colaborador.id === disciplinaModuloColaborador.id;
      })) {
        $scope.selectColaboradores = _.without($scope.selectColaboradores, colaboradorEncontrado);
      }
    })
  }

});

angular.module('Modulo').controller('CadastrarModuloCtrl', function($scope,  $location, $rootScope, $modal,Restangular, UtilService, toaster) {

  $scope.init = function() {
    $scope.selectDisciplina = {};
    $scope.selectColaboradores = {};
    $scope.modulo = {};
    $scope.modulo.disciplinasModulo = [];
    $scope.disciplinaAux = {};
    $scope.colaboradorAux = {};
    $scope.colaboradoresAux = [];
    $scope.disciplinaAux.colaboradores = [];
    $scope.visualizar = false;

    Restangular.all('disciplina').getList().then(function(data) {
      $scope.selectDisciplina = UtilService.limparDados(data);
      $scope.disciplinasAux = $scope.selectDisciplina;
    });
    Restangular.all('colaborador').getList().then(function(data) {
      $scope.selectColaboradores = UtilService.limparDados(data);
      $scope.colaboradoresAux =  $scope.selectColaboradores;   
    }); 
  }  

  $scope.init();

  $scope.modalNovoColaborador = function () {
    var modalScope = $rootScope.$new();
    modalScope.modalInstance  = $modal.open({
      templateUrl: './modules/programaaprendizagem/colaborador/views/formColaborador.html',
      controller: 'CadastrarColaboradorCtrl',
      size: 'lg',
      backdrop: 'static',
      scope: modalScope
    });
    modalScope.modalInstance.result.then(function (colaborador) {      
      $scope.selectColaboradores.push(colaborador);
    }, function () {
      console.log('FECHO COLABORADOR')
    });
  }

  $scope.adicionarColaborador = function(objColaborador){
    if(objColaborador){
      $scope.disciplinaAux.colaboradores.push(objColaborador);
      $scope.selectColaboradores = _.without($scope.selectColaboradores, objColaborador);
    }
    $scope.colaboradorAux = {};
    $scope.modalColaborador.$setPristine();
  }

  $scope.removerColaborador = function(objColab) {
    $scope.disciplinaAux.colaboradores = _.without($scope.disciplinaAux.colaboradores, objColab);
    $scope.selectColaboradores.push(objColab);
  }

  $scope.modalNovaDisciplina = function () {
    var modalScope = $rootScope.$new();
    modalScope.modalInstance  = $modal.open({
      templateUrl: './modules/programaaprendizagem/disciplina/views/formDisciplina.html',
      controller: 'CadastrarDisciplinaCtrl as CadastrarModal',
      size: 'lg',
      scope: modalScope
    });
    modalScope.modalInstance.result.then(function (disciplina) {      
      $scope.disciplina.push(disciplina);
      console.log('disciplina', disciplina)
    }, function () {
      console.log('FECHO COLABORADOR')
   });
  }

  $scope.adicionarNovaDisciplina = function(){
    $scope.colaboradorAux = {};
    $scope.disciplinaAux = {};
    $scope.disciplinaAux.colaboradores = [];
    $scope.modalColaborador.$setPristine();
    $scope.gridDisciplina = false;
    $scope.selectColaboradores = $scope.colaboradoresAux;
    $scope.retirarDisciplinas();
  }

  $scope.salvarDisciplina = function(objDisciplina) {
    indice = _.indexOf($scope.modulo.disciplinasModulo, objDisciplina);
    console.log('indice', indice);
    if(indice!=-1) {
      $scope.modulo.disciplinasModulo[indice] = objDisciplina;
    }
    else {
      $scope.modulo.disciplinasModulo.push(objDisciplina);
    }    
    $scope.disciplinaAux = {};
    $scope.modalDisciplina.$setPristine();
    $scope.gridDisciplina = true;
  } 

  $scope.editarDisciplina = function(objModuloDisciplina) {
    console.log('editar disciplina', objModuloDisciplina)
    $scope.gridDisciplina = false;
    $scope.disciplinaAux = objModuloDisciplina;
    $scope.retirarDisciplinas();
    $scope.selectDisciplina.push(objModuloDisciplina.disciplina);
    $scope.retirarColaboradores();
  }

  $scope.removerDisciplina = function(disciplina) {
    $scope.modulo.disciplinasModulo = _.without($scope.modulo.disciplinasModulo, disciplina);
    if($scope.modulo.disciplinasModulo.length<=0){
      $scope.gridDisciplina = false;
    }
  }

  $scope.salvarModulo = function(objModulo) {
    console.log('Salvar Modulo', objModulo)
    Restangular.all('modulo').post(objModulo).then(function() {
      var msg = 'O Modulo '+objModulo.nome+' foi cadastrado com sucesso!';
      $location.path('programaaprendizagem/modulo');
      toaster.pop('success', "Modulo", msg);
    },function(data){
      console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar salvar o modulo '+$scope.modulo.nome+'!';
      $location.path('programaaprendizagem/modulo');
      toaster.pop('error', "Modulo", msg);
    });
  }

  $scope.retirarDisciplinas = function(){
    $scope.selectDisciplina = $scope.disciplinasAux;
    angular.forEach($scope.modulo.disciplinasModulo, function(disciplinaModulo){
      if(disciplinaEncontrada = _.find($scope.selectDisciplina, function(disciplina){
        return disciplina.id === disciplinaModulo.disciplina.id;
      })){
        $scope.selectDisciplina = _.without($scope.selectDisciplina, disciplinaEncontrada);
      }
    })
  }

  $scope.retirarColaboradores = function(disciplinaModulo) {
    $scope.selectColaboradores = $scope.colaboradoresAux;
    angular.forEach(disciplinaModulo.colaboradores, function(disciplinaModuloColaborador){
      if(colaboradorEncontrado = _.find($scope.selectColaboradores, function(colaborador){
        return colaborador.id === disciplinaModuloColaborador.id;
      })) {
        $scope.selectColaboradores = _.without($scope.selectColaboradores, colaboradorEncontrado);
      }
    })
  }  

});

angular.module('Modulo').controller('VisualizarModuloCtrl', function($scope, $stateParams, Restangular, UtilService, toaster) {

  $scope.init = function() {
    var idModulo = $stateParams.idModulo;
    Restangular.one('modulo', idModulo).get().then(function(data) {
      $scope.modulo = data;
    });

    $scope.visualizar = true;
    $scope.gridDisciplina = true;
  }

  $scope.init();

});
