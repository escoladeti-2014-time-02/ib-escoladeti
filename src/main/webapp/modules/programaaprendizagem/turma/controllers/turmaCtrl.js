angular.module('Turma', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']);

angular.module('Turma').controller('ListarTurmaCtrl', function($scope, Restangular, $location, UtilService, toaster) {
	
	$scope.load = function(page) {
		Restangular.all('turma').one('pagina',page).get({busca: $scope.busca}).then(function(data){
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.turmas = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		});
	};
	
	$scope.load(1);

	$scope.buscar = function() {
		UtilService.buscar($scope);
	}

	$scope.removerTurma = function(turma) {
		if(confirm('Deseja deletar turma '+turma.nome+'?')){
			turma.remove().then(function(){
				var msg = 'A turma ' + turma.nome + ' excluído com sucesso!';
				$scope.load(1);
				$location.path('programaaprendizagem/turma');
				toaster.pop('success', "Turma", msg);
			},function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluír o turma '+turma.nome+'!';
				toaster.pop('error', "Turma", msg);
			});
		}
	}

});

angular.module('Turma').controller('EditarTurmaCtrl', function($scope,  $rootScope, $modal, $http, $location, $stateParams, Restangular, UtilService, toaster){

	var idTurma = $stateParams.idTurma;

	$scope.empresaSelecionada = {};
	$scope.candidatoSelecionado = {};

	$scope.isGerarContrato = true;

	Restangular.one('turma', idTurma).get().then(function (data) {
		$scope.turma = data;
		$scope.objetoOrigem = angular.copy($scope.turma);
	});

	Restangular.all('empresa').getList().then(function(data) {
		$scope.empresas = UtilService.limparDados(data);
		$scope.empresasSelect = $scope.empresas;
	}, function erroCallBack(response) {
		alert("Erro from server: " + response.status);
	});	

	Restangular.all('curso').getList().then(function(data) {
		$scope.cursos = UtilService.limparDados(data);
	}, function erroCallBack(response) {
		alert("Erro from server: " + response.status);
	});	

	$scope.getCandidatos = function(filtro) {
	    return Restangular.all('candidato/findbynome')
	    	.getList({nome: filtro}).then(function(data) {
	      		return data;
   		 	});
  	}

  $scope.getQuantidadeVagasDisponiveis = function (empresaTurma) {
  	var vagas = empresaTurma.vagas;
  	angular.forEach($scope.turma.aluno, function(aluno, key) {
  		if (aluno.empresa.id == empresaTurma.empresa.id) {
  			--vagas;	
  		}
  	});
  	return vagas;
  }

  $scope.getTurmaEmpresas = function () {
  	if (!$scope.turma||!$scope.turma.empresaTurma) return [];
  	var empresas = [];
  	angular.forEach($scope.turma.empresaTurma, function(empresa, key) {
  		if ($scope.getQuantidadeVagasDisponiveis(empresa) != 0) {
  			empresas.push(empresa.empresa);
  		}
  	});
  	return empresas;
  	// var empresas = angular.copy($scope.empresas);
  	// angular.forEach($scope.empresas, function(empresa){
  	// 	var findEmpresa = _.find($scope.turma.empresaTurma, function(empresaTurma){
  	// 		return empresaTurma.empresa.id === empresa.id;
  	// 	})
  	// 	if(findEmpresa) {
  	// 		empresas = _.without(empresas, findEmpresa);
  	// 	}
  	// })
  	// $scope.empresasSelect = empresas;
  }

  $scope.addTurmaEmpresa = function (empresaTurma) {
  	if (empresaTurma.empresa && empresaTurma.vagas) {
  		var find = _.find($scope.turma.empresaTurma, function(objt){
  			return objt.empresa.id == empresaTurma.empresa.id;
  		});
  		if (find) {
  			var index = $scope.turma.empresaTurma.indexOf(find);
  			$scope.turma.empresaTurma[index] = angular.copy(empresaTurma);
  			$scope.empresaSelecionada = null;
  		} else {
  			$scope.turma.empresaTurma.push(empresaTurma);
  			$scope.empresaSelecionada = null;
  		}
  		$scope.formEmpresas.$setPristine();
  	}
	}

  $scope.removeTurmaEmpresa = function(turmaEmpresa){
    $scope.turma.empresaTurma = _.without($scope.turma.empresaTurma, turmaEmpresa);
    var findAlunos = _.filter($scope.turma.aluno, function(aluno){
    	return aluno.empresa.id == turmaEmpresa.empresa.id;
    })
    $scope.turma.aluno = _.difference($scope.turma.aluno, findAlunos);
  }

  $scope.addAluno = function(candidato) {
  	if (candidato.aluno && candidato.empresa &&
  		  candidato.inicioVigencia && candidato.fimVigencia) {
  		candidato = UtilService.limparDados(candidato);
  		var aluno = 
		  		{
		  			"candidato" : candidato.aluno,
		         "empresa" : candidato.empresa,
		         "inicioVigencia" : candidato.inicioVigencia,
		       	 "fimVigencia" : candidato.fimVigencia
		  	  };
  		var find = _.find($scope.turma.aluno, function(objt){
  			return objt.candidato.id == aluno.candidato.id;
  		});
  		if (find) {
  			var index = $scope.turma.aluno.indexOf(find);
  			$scope.turma.aluno[index] = aluno;
  			$scope.candidatoSelecionado = null;
  			$scope.formAlunos.$setPristine();
  		} else {
  			$scope.turma.aluno.push(aluno);
  			$scope.candidatoSelecionado = null;
  			$scope.formAlunos.$setPristine();
  		}
  	}
  }

  $scope.removeAluno = function(aluno){
    $scope.turma.aluno = _.without($scope.turma.aluno, aluno);
  }
    
	$scope.datePicker = {
	  opened: [false , false],
	  config: {
	    formatYear: 'yy',
	    startingDay: 1
	  },
	  configPopup: {
	    currentText: 'Hoje'
	  }  
	};

	$scope.modalNovoCurso = function () {
	  var modalScope = $rootScope.$new();
		modalScope.modalInstance  = $modal.open({
			templateUrl: './modules/programaaprendizagem/curso/views/formCurso.html',
			controller: 'CadastrarCursoCtrl as CadastrarModal',
			size: 'lg',
			scope: modalScope
		});
		modalScope.modalInstance.result.then(function (curso) {      
			$scope.cursos.push(curso);
			console.log('curso', curso);
		}, function (response) {
			console.log('erro modal curso'+response.status)
		});
	}

	$scope.salvarNovoCurso = function() {
	  Restangular.all('curso').post($scope.curso).then(function (curso) {
	    var msg = 'A curso '+$scope.curso.nome+' foi cadastrada com sucesso!';
	    if (!$scope.modalInstance) {
	      $location.path('/programaaprendizagem/turma/cadastrar');
	    } else {
	      $scope.modalInstance.close(curso);
	    }
	    toaster.pop('success', "Turma", msg);
	  }, function (data) {
	      console.log('Erro ao gravar status:', data.status);
	      var msg = 'Erro ao tentar salvar a curso ' + $scope.curso.nome + '!';
	      $location.path('/programaaprendizagem/turma/cadastrar');
	      toaster.pop('error', "Turma", msg);
	  });
	}

	$scope.importarProcesso = function() {
		var modalScope = $rootScope.$new();
		modalScope.turmaEmpresas = $scope.turma.empresaTurma;
		console.log('alunos turma', $scope.turma.aluno);
		modalScope.alunos = angular.copy($scope.turma.aluno);

		var modalInstance = $modal.open({
		  templateUrl: './modules/programaaprendizagem/turma/views/importarProcessoTurma.html',
		  controller: 'ImportarProcessoTurmaCtrl',
		  scope: modalScope,
		  size: 'lg'
		});

		modalInstance.result.then(function (alunos) {
			//Retorno do array
		  	$scope.turma.aluno = alunos;
		}, function () {
		  //Modal foi fechado sem o cadastro completo
		});
	}
  	
  $scope.salvarTurma = function(turma) {
		turma.put().then(function() {
			var msg = 'O Turma ' + turma.nome + ' foi alterado com sucesso!';
			$location.path('programaaprendizagem/turma');
			toaster.pop('success', "Turma", msg);
		},function(data){
			console.log('Erro ao gravar status:',data.status);
			var msg = 'Erro ao tentar salvar Turma '+turma.nome+'!';
			$location.path('programaaprendizagem/turma');
			toaster.pop('error', "Turma", msg);
		});
	}

	$scope.gerarContrato = function(aluno) {

		var gerarContratoCtrl = function($scope, $modalInstance, Restangular, toaster){
			$scope.salvarContrato = function(contrato) {
				Restangular.all('contrato').post(contrato).then(function() {
					var msg = 'O contrato do aluno '+ contrato.aluno.candidato.nome +' foi cadastrado com sucesso!';
					toaster.pop('success', "Contrato", msg);
					$modalInstance.close();
				}, function(data) {
					console.log('Erro ao gravar status:', data.status);
					var msg = 'Erro ao tentar salvar contrato!';
					toaster.pop('error', "Contrato", msg);
				});
			};

			$scope.fecharModal = function() {
				$modalInstance.dismiss();
			}
		}

		var modalScope = $rootScope.$new();
		modalScope.contrato = {
			dataInicio: aluno.inicioVigencia,
			dataTermino: aluno.fimVigencia,
			aluno: aluno
		}

		var modalInstance = $modal.open({
		  templateUrl: './modules/programaaprendizagem/contrato/views/modal-contrato.html',
		  controller: gerarContratoCtrl,
		  scope: modalScope
		});

		modalInstance.result.then(function () {
			//Retorno do array
		  	
		}, function () {
		  //Modal foi fechado sem o cadastro completo
		});
	}

});

angular.module('Turma').controller('CadastrarTurmaCtrl', function($scope, $rootScope, $modal, $http, $location, Restangular, UtilService, toaster) {

	$scope.turma = {aluno: []};	
	$scope.empresaSelecionada = {};
	$scope.candidatoSelecionado = {};
	$scope.turma.empresaTurma = [];
	$scope.objetoOrigem = angular.copy($scope.turma);

	Restangular.all('empresa').getList().then(function(data) {
		$scope.empresas = UtilService.limparDados(data);
		$scope.empresasSelect = $scope.empresas;
	}, function(response) {
		alert("Erro from server: " + response.status);
	});	

	Restangular.all('curso').getList().then(function(data) {
		$scope.cursos = UtilService.limparDados(data);
	}, function erroCallBack(response) {
		alert("Erro from server: " + response.status);
	});	

	$scope.getCandidatos = function(filtro) {
	    return Restangular.all('candidato/findbynome').getList({nome: filtro}).then(function(data) {
	    	var arrayCandidatos = [];
	    	angular.forEach(data, function(candidato) {
	    		var findCandidato = _.find($scope.turma.aluno, function(aluno){
	    			return aluno.candidato.id === candidato.id;
	    		})
	    		if(!findCandidato) {
	    			arrayCandidatos.push(candidato);
	    		}
	    	})
	    	return arrayCandidatos;
    	});
  	}

  $scope.getQuantidadeVagasDisponiveis = function (empresaTurma) {
  	var vagas = empresaTurma.vagas;
  	angular.forEach($scope.turma.aluno, function(aluno, key) {
  		if (aluno.empresa.id == empresaTurma.empresa.id) {
  			--vagas;	
  		}
  	});
  	return vagas;
  }

  $scope.getTurmaEmpresas = function () {
  	if (!$scope.turma||!$scope.turma.empresaTurma) return [];
  	var empresas = [];
  	angular.forEach($scope.turma.empresaTurma, function(empresa, key) {
  		if ($scope.getQuantidadeVagasDisponiveis(empresa) != 0) {
  			empresas.push(empresa.empresa);
  		}
  	});
  	return empresas;
  	// var empresas = angular.copy($scope.empresas);
  	// angular.forEach($scope.empresas, function(empresa){
  	// 	var findEmpresa = _.find($scope.turma.empresaTurma, function(empresaTurma){
  	// 		return empresaTurma.empresa.id === empresa.id;
  	// 	})
  	// 	if(findEmpresa) {
  	// 		empresas = _.without(empresas, findEmpresa);
  	// 	}
  	// })
  	// $scope.empresasSelect = empresas;
  }

  	$scope.addTurmaEmpresa = function (empresaTurma) {
	  	if (empresaTurma.empresa && empresaTurma.vagas) {
	  		var find = _.find($scope.turma.empresaTurma, function(objt){
	  			return objt.empresa.id == empresaTurma.empresa.id;
	  		});
	  		if (find) {
	  			var index = $scope.turma.empresaTurma.indexOf(find);
	  			$scope.turma.empresaTurma[index] = angular.copy(empresaTurma);
	  			$scope.empresaSelecionada = null;
	  		} else {
	  			var registro = angular.copy(empresaTurma);
	  			$scope.turma.empresaTurma.push(registro);
	  			$scope.empresaSelecionada = null;
	  		}
	  		$scope.formEmpresas.$setPristine();
	  	}
	}

  $scope.removeTurmaEmpresa = function(turmaEmpresa){
    $scope.turma.empresaTurma = _.without($scope.turma.empresaTurma, turmaEmpresa);
    var findAlunos = _.filter($scope.turma.aluno, function(aluno){
    	return aluno.empresa.id == turmaEmpresa.empresa.id;
    })
    $scope.turma.aluno = _.difference($scope.turma.aluno, findAlunos);
  }

  $scope.addAluno = function(candidato) {
  	if (candidato.aluno && candidato.empresa &&
  		  candidato.inicioVigencia && candidato.fimVigencia) {
  		candidato = UtilService.limparDados(candidato);
  		var aluno = 
		  		{
		  			"candidato" : candidato.aluno,
		         "empresa" : candidato.empresa,
		         "inicioVigencia" : candidato.inicioVigencia,
		       	 "fimVigencia" : candidato.fimVigencia
		  	  };
  		var find = _.find($scope.turma.aluno, function(objt){
  			return objt.candidato.id == aluno.candidato.id;
  		});
  		if (find) {
  			var index = $scope.turma.aluno.indexOf(find);
  			$scope.turma.aluno[index] = aluno;
  			$scope.candidatoSelecionado = null;
  			$scope.formAlunos.$setPristine();
  		} else {
  			$scope.turma.aluno.push(aluno);
  			$scope.candidatoSelecionado = null;
  			$scope.formAlunos.$setPristine();
  		}
  	}
  }

  $scope.removeAluno = function(aluno){
    $scope.turma.aluno = _.without($scope.turma.aluno, aluno);
  }

	$scope.salvarTurma = function(turma) {
		Restangular.all('turma').post(turma).then(function() {
			var msg = 'A turma '+ turma.nome +' foi cadastrado com sucesso!';
			$location.path('programaaprendizagem/turma');
			toaster.pop('success', "Turma", msg);
		}, function(data) {
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar turma ' + turma.nome + '!';
			$location.path('programaaprendizagem/turma');
			toaster.pop('error', "Turma", msg);
		});
	};
    
	$scope.datePicker = {
	  opened: [false , false],
	  config: {
	    formatYear: 'yy',
	    startingDay: 1
	  },
	  configPopup: {
	    currentText: 'Hoje'
	  }  
	};

	$scope.modalNovoCurso = function () {
	  var modalScope = $rootScope.$new();
		modalScope.modalInstance  = $modal.open({
			templateUrl: './modules/programaaprendizagem/curso/views/formCurso.html',
			controller: 'CadastrarCursoCtrl as CadastrarModal',
			size: 'lg',
			scope: modalScope
		});
		modalScope.modalInstance.result.then(function (curso) {      
			$scope.cursos.push(curso);
		}, function (response) {
			console.log('erro modal curso'+response.status)
		});
	}

	$scope.importarProcesso = function() {
		var modalScope = $rootScope.$new();
		modalScope.turmaEmpresas = $scope.turma.empresaTurma;
		console.log('alunos turma', $scope.turma.aluno);
		modalScope.alunos = angular.copy($scope.turma.aluno);

		var modalInstance = $modal.open({
		  templateUrl: './modules/programaaprendizagem/turma/views/importarProcessoTurma.html',
		  controller: 'ImportarProcessoTurmaCtrl',
		  scope: modalScope,
		  size: 'lg'
		});

		modalInstance.result.then(function (alunos) {
			//Retorno do array
		  	$scope.turma.aluno = alunos;
		}, function () {
		  //Modal foi fechado sem o cadastro completo
		});
	}

	$scope.salvarNovoCurso = function() {
	  Restangular.all('curso').post($scope.curso).then(function (curso) {
	    var msg = 'A curso '+$scope.curso.nome+' foi cadastrada com sucesso!';
	    if (!$scope.modalInstance) {
	      $location.path('/programaaprendizagem/turma/cadastrar');
	    } else {
	      $scope.modalInstance.close(curso);
	    }
	    toaster.pop('success', "Turma", msg);
	  }, function (data) {
	      console.log('Erro ao gravar status:', data.status);
	      var msg = 'Erro ao tentar salvar a curso ' + $scope.curso.nome + '!';
	      $location.path('/programaaprendizagem/turma/cadastrar');
	      toaster.pop('error', "Turma", msg);
	  });
	}

});

angular.module('Turma').controller('VisualizarTurmaCtrl', function($scope, $rootScope, $modal, $stateParams, Restangular, UtilService, toaster) {
	var idTurma = $stateParams.idTurma;

	Restangular.one('turma', idTurma).get().then(function(data) {
		$scope.turma = UtilService.limparDados(data);
	});
	$scope.visualizar = true;
	$scope.isGerarContrato = true;

	$scope.getQuantidadeVagasDisponiveis = function (empresaTurma) {
	  	var vagas = empresaTurma.vagas;
	  	angular.forEach($scope.turma.aluno, function(aluno, key) {
	  		if (aluno.empresa.id == empresaTurma.empresa.id) {
	  			--vagas;	
	  		}
	  	});
	  	return vagas;
	}	

	$scope.gerarContrato = function(aluno) {

		var gerarContratoCtrl = function($scope, $modalInstance, Restangular, toaster){
			$scope.salvarContrato = function(contrato) {
				Restangular.all('contrato').post(contrato).then(function() {
					var msg = 'O contrato do aluno '+ contrato.aluno.candidato.nome +' foi cadastrado com sucesso!';
					toaster.pop('success', "Contrato", msg);
					$modalInstance.close();
				}, function(data) {
					console.log('Erro ao gravar status:', data.status);
					var msg = 'Erro ao tentar salvar contrato!';
					toaster.pop('error', "Contrato", msg);
				});
			};

			$scope.fecharModal = function() {
				$modalInstance.dismiss();
			}
		}

		var modalScope = $rootScope.$new();
		modalScope.contrato = {
			dataInicio: aluno.inicioVigencia,
			dataTermino: aluno.fimVigencia,
			aluno: aluno
		}

		var modalInstance = $modal.open({
		  templateUrl: './modules/programaaprendizagem/contrato/views/modal-contrato.html',
		  controller: gerarContratoCtrl,
		  scope: modalScope
		});

		modalInstance.result.then(function () {
			//Retorno do array
		  	
		}, function () {
		  //Modal foi fechado sem o cadastro completo
		});
	}

});

angular.module('Turma').controller('ImportarProcessoTurmaCtrl', function($scope, $modalInstance, $filter, Restangular, UtilService) {
	console.log('ImportarProcessoTurmaCtrl');

	$scope.init = function() {
		Restangular.all('processoseletivo').one('listarProcessosConcluidos').getList().then(function(data) {
		  $scope.processosSeletivos = UtilService.limparDados(data);
		});

		$scope.dateInit();
		$scope.dateCandidatoInit();
		$scope.dateEmpresaInit();
	}

	$scope.dateInit = function() {
		var inicio = new Date();
		var fim = new Date();
		fim.setFullYear(fim.getFullYear()+1);

		$scope.dataTemp = {
			inicioVigencia: $filter('date')(inicio, 'yyyy-MM-dd'),
			fimVigencia: $filter('date')(fim, 'yyyy-MM-dd')
		};
		$scope.dataVaziaTemp = {
			inicioVigencia: null,
			fimVigencia: null
		};
	}

	$scope.dateCandidatoInit = function() {
		$scope.datasCandidatos = [];
		angular.forEach($scope.candidatos, function(candidato){
			var findAluno = _.find($scope.alunos, function(aluno){
				return aluno.candidato.id === candidato.id;
			})
			var data = findAluno ? { inicioVigencia: $filter('date')(findAluno.inicioVigencia, 'yyyy-MM-dd'), fimVigencia: $filter('date')(findAluno.fimVigencia, 'yyyy-MM-dd') } : $scope.dataVaziaTemp;
			$scope.datasCandidatos.push(angular.copy(data));
		});
		console.log($scope.datasCandidatos);
	}

	$scope.dateEmpresaInit = function() {
		$scope.datas = [];
		angular.forEach($scope.turmaEmpresas, function(){
			$scope.datas.push(angular.copy($scope.dataTemp));
		});
	}

	$scope.setVigenciaCandidato = function(data, candidato){
		var findAluno = _.find($scope.alunos,  function(aluno){
			return aluno.candidato.id === candidato.id
		});
		var index = $scope.alunos.indexOf(findAluno);
		$scope.alunos[index].inicioVigencia = data.inicioVigencia;
		$scope.alunos[index].fimVigencia = data.fimVigencia;
	}

	$scope.init();

	$scope.getVagas = function(turmaEmpresa) {
		var vagasDisponiveis = turmaEmpresa.vagas;
		angular.forEach($scope.alunos, function(aluno){
			if(aluno.empresa.id==turmaEmpresa.empresa.id)
				vagasDisponiveis--;
		});
		return vagasDisponiveis;
	}

	$scope.getCandidatoVinculado = function(candidato) {
		return _.isObject(_.find($scope.alunos, function(aluno){return candidato.id===aluno.candidato.id}));
	}	

	$scope.getCandidatos = function(idProcesso){
		if(idProcesso) {
			Restangular.all('processoseletivo').one('listarCandidatosAprovados', idProcesso).getList().then(function(data) {
				$scope.candidatos = UtilService.limparDados(data);
				$scope.dateCandidatoInit();
			});
		} else {
			$scope.candidatos = [];
			$scope.alunos = [];
			$scope.dateCandidatoInit();
		}

		
	} 

	$scope.getCandidatoVinculadoEmpresa = function(candidato, empresa) {
		return _.isObject(_.find($scope.alunos, function(aluno){return (candidato.id===aluno.candidato.id)&&(empresa.id!=aluno.empresa.id)}));
	}

	$scope.setCandidatoVinculo = function(candidato, turmaEmpresa) {
		var empresa = turmaEmpresa.empresa;
		var indexCandidato = $scope.candidatos.indexOf(candidato);
		var indexEmpresa = $scope.turmaEmpresas.indexOf(turmaEmpresa);
		if(candidatoFind = _.find($scope.alunos, function(aluno){return (candidato.id===aluno.candidato.id)&&(empresa.id===aluno.empresa.id)})) {
			$scope.alunos = _.without($scope.alunos, candidatoFind);
			$scope.datasCandidatos[indexCandidato] = {};
		}
		else {
			$scope.alunos.push({
				empresa: empresa,
				candidato: candidato,
				inicioVigencia: new Date(),
				fimVigencia: new Date()
			});
			$scope.datasCandidatos[indexCandidato] = angular.copy($scope.datas[indexEmpresa]);
		}
	}

	$scope.salvarAlunos = function() {
		$modalInstance.close($scope.alunos);
	}

	$scope.cancelar = function () {
	  	$modalInstance.dismiss('Cancelado');
	};
});
 
