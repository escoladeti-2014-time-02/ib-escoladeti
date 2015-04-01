angular.module('Aula', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']).controller('ListarAulaCtrl', function($scope, $filter, Restangular, $location, UtilService, toaster) {
  
  $scope.select = {};

  $scope.load = function(page) {
    Restangular.all('aula').one('pagina',page).get({busca:$scope.busca}).then(function(data) {
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      $scope.aulas = objetoPaginado[0];
      $scope.page = objetoPaginado[1];
      angular.forEach($scope.aulas, function(aula){
        if (aula != null) {
          aula.route = 'aula';          
        };
      });
    }); 
  }

  //http://localhost:8080/springrest/rest/aula/turma/1200/modulo/1050/disciplina/850/data/2014-12-02/pagina/1
  $scope.filtrar = function(page) {
    var data = $filter('date')($scope.filtro.data, 'yyyy-MM-dd')
    Restangular.all('aula').one('turma', $scope.filtro.turma.id).one('modulo', $scope.filtro.modulo.id).one('disciplina', $scope.filtro.disciplina.id).one('data', data).one('pagina',page).get().then(function(data){
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      $scope.aulas= objetoPaginado[0];
      $scope.page = objetoPaginado[1];
    });
  };

  $scope.limparFiltro = function() {
    $scope.filtro = {};
    $scope.load(1);
  }

  Restangular.all('turma').getList().then(function(data) {
    $scope.select.turmas = UtilService.limparDados(data); 
  }, function erroCallBack(response) {
      alert("Erro from server: " + response.status);
  }); 

  $scope.load(1);

  $scope.buscar = function(){
    UtilService.buscar($scope);
  } 

  $scope.getModulos = function(turma) {
    $scope.select.modulos = turma.curso.modulos;
  }

  $scope.getDisciplinas = function(modulo) {
    $scope.select.disciplinas = [];
    angular.forEach(modulo.disciplinasModulo, function(disciplinaModulo){
      $scope.select.disciplinas.push(disciplinaModulo.disciplina);
    });    
  }  

  $scope.removerAula = function(aula) {
    if(confirm('Deseja deletar aula ?')){
      aula.remove().then(function(){
        var msg = 'A aula foi excluída com sucesso!';
        $scope.load(1);
        $location.path('programaaprendizagem/aula');
        toaster.pop('success', "Aula", msg);
      },function(data){
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar excluír a aula!';
        toaster.pop('error', "Aula", msg);
      });
    }
  }

});

angular.module('Aula').controller('EditarAulaCtrl', function($scope, $rootScope, $location, $stateParams, $modal, $filter, Restangular, UtilService, toaster){
  
  var idAula = $stateParams.idAula;
  $scope.moduloAux = {};
  $scope.moduloAux.modulos = [];

  $scope.disciplinasAux = [];

  $scope.alunosAux = {};

  $scope.selectAux = {};
  //$scope.alunosAux.presenca = [];

  $scope.checkAux = true;

  Restangular.all('turma').getList().then(function(data) {
    $scope.turmas = UtilService.limparDados(data);
    console.log('turma', $scope.turmas)    
    $scope.alunosAux = $scope.turmas.alunos;
  }, function erroCallBack(response) {
      alert("Erro from server: " + response.status);
  }); 

  Restangular.all('colaborador').getList().then(function(data) {
    $scope.colaboradores = UtilService.limparDados(data);
    console.log('colaborador', $scope.colaboradores)    
  }, function erroCallBack(response) {
      alert("Erro from server: " + response.status);
  });

  Restangular.one('aula', idAula).get().then(function (data) {
    $scope.aula = data;
    $scope.objetoOrigem = angular.copy($scope.aula);
    $scope.selectAux.turma = $scope.aula.turma;
    $scope.selectAux.modulo = $scope.aula.modulo;
    $scope.selectAux.disciplina = $scope.aula.disciplina;
    $scope.selectAux.colaborador = $scope.aula.colaborador;
    $scope.getModulosTurma($scope.aula.turma);
    $scope.getDisciplinaTurma($scope.aula.modulo);
  });
  
  $scope.getModulosTurma = function(objTurma) {
    console.log('objTurma', objTurma)
      $scope.moduloAux.modulos = objTurma.curso.modulos;
  }

  $scope.checkAll = function(check) {
    angular.forEach($scope.aula.alunoAula, function(alunoAula){
      alunoAula.presenca = !check;
    })
  }
  
  $scope.getDisciplinaTurma = function(objModulo) {
    angular.forEach(objModulo.disciplinasModulo, function(disciplinaModulo){
      $scope.disciplinasAux.push(disciplinaModulo.disciplina);
    });    
  }    

  $scope.salvarAula = function (objAula) {
    $scope.aula.turma = $scope.selectAux.turma; 
    $scope.aula.modulo = $scope.selectAux.modulo;
    $scope.aula.disciplina = $scope.selectAux.disciplina;
    $scope.aula.colaborador = $scope.selectAux.colaborador;
    Restangular.all('aula').post(objAula).then(function() {
      var msg = 'A aula foi alterada com sucesso!';
      $location.path('programaaprendizagem/aula');
      toaster.pop('success', "Aula", msg);
    }, function(data) {
   console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar alterar a aula!';
      toaster.pop('error', "Aula", msg);
      $location.path('programaaprendizagem/aula');
    });
  }

  $scope.openEventoModal = function(aluno){
    var modalScope = $rootScope.$new();
    modalScope.idCandidato = aluno.candidato.id;
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
      
    }, function (response) {
      console.log('erro modal '+response.status)
    });

  }

});

angular.module('Aula').controller('CadastrarAulaCtrl', function($scope, $rootScope, $location, $stateParams, $modal, $filter, Restangular, UtilService, toaster) {
  

  //aula/idTurma/idModulo/IdDisciplina
  $scope.moduloAux = {};
  $scope.moduloAux.modulos = [];

  $scope.disciplinaAux = {};
  $scope.disciplinasAux = [];

  $scope.aula = {};
  $scope.aula.alunoAula = [];

  $scope.checkAux = true;
  $scope.aula.dataAula = new Date();
  
  Restangular.all('turma').getList().then(function(data) {
    $scope.turmas = UtilService.limparDados(data);
    console.log('turma', $scope.turmas)    
    $scope.alunosAux = $scope.turmas.alunos;
  }, function erroCallBack(response) {
      alert("Erro from server: " + response.status);
  });  

  Restangular.all('colaborador').getList().then(function(data) {
    $scope.colaboradores = UtilService.limparDados(data);
    console.log('colaborador', $scope.colaboradores)    
  }, function erroCallBack(response) {
      alert("Erro from server: " + response.status);
  });
  
  $scope.getModulosTurma = function(objTurma) {
    $scope.moduloAux.modulos = objTurma.curso.modulos;
  }
  
  $scope.checkAll = function(check) {
    angular.forEach($scope.aula.alunoAula, function(alunoAula){
      alunoAula.presenca = !check;
    })
  }

  $scope.getDisciplinaTurma = function(objModulo) {
    angular.forEach(objModulo.disciplinasModulo, function(disciplinaModulo){
      $scope.disciplinasAux.push(disciplinaModulo.disciplina);
    });    
  }  

  $scope.getAlunosTurma = function(objTurma) {
    angular.forEach(objTurma.aluno, function(aluno){
      $scope.aula.alunoAula.push({
        aluno: aluno,
        presenca: true
      });
    })
  }  

  $scope.salvarAula = function (objAula) {
    console.log('AULA', objAula)
    var idTurma = $scope.selectAux.turma.id;
    var idModulo = $scope.selectAux.modulo.id;
    var idDisciplina = $scope.selectAux.disciplina.id;
    var idColaborador = $scope.selectAux.colaborador.id;
    console.log(idTurma.toString());
    Restangular.all('aula').one(idTurma.toString()).one(idModulo.toString()).one(idDisciplina.toString()).one(idColaborador.toString()).customPOST(objAula, '').then(function() {
      var msg = 'A aula foi cadastrada com sucesso!';
      $location.path('programaaprendizagem/aula');
      toaster.pop('success', "Aula", msg);
    }, function(data) {
   console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar salvar a aula!';
      $location.path('programaaprendizagem/aula');
      toaster.pop('error', "Aula", msg);
    });
  }

  $scope.openEventoModal = function(aluno){
    var modalScope = $rootScope.$new();
    modalScope.idCandidato = aluno.candidato.id;
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
      
    }, function (response) {
      console.log('erro modal '+response.status)
    });

  }


});

angular.module('Aula').controller('VisualizarAulaCtrl', function($scope, $stateParams, Restangular, UtilService, toaster) {
  
  $scope.visualizar = true;

  var idAula = $stateParams.idAula;

  $scope.selectAux = {};
  $scope.moduloAux = {};
  $scope.disciplinasAux = [];

  Restangular.all('turma').getList().then(function(data) {
    $scope.turmas = UtilService.limparDados(data);
    console.log('turma', $scope.turmas)    
    $scope.alunosAux = $scope.turmas.alunos;
  }, function erroCallBack(response) {
      alert("Erro from server: " + response.status);
  }); 

  Restangular.one('aula', idAula).get().then(function (data) {
    $scope.aula = data;
    $scope.objetoOrigem = angular.copy($scope.aula);
    $scope.selectAux.turma = $scope.aula.turma;
    $scope.selectAux.modulo = $scope.aula.modulo;
    $scope.selectAux.disciplina = $scope.aula.disciplina;
    $scope.getModulosTurma($scope.aula.turma);
    $scope.getDisciplinaTurma($scope.aula.modulo);
  });
  
  $scope.getModulosTurma = function(objTurma) {
    console.log('objTurma', objTurma)
      $scope.moduloAux.modulos = objTurma.curso.modulos;
  }

  $scope.checkAll = function(check) {
    angular.forEach($scope.aula.alunoAula, function(alunoAula){
      alunoAula.presenca = !check;
    })
  }
  
  $scope.getDisciplinaTurma = function(objModulo) {
    angular.forEach(objModulo.disciplinasModulo, function(disciplinaModulo){
      $scope.disciplinasAux.push(disciplinaModulo.disciplina);
    });    
  }    

});

 

