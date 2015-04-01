angular.module('Turma').controller('ImportarProcessoTurmaCtrl', function($scope, $modalInstance, $filter, Restangular, UtilService, growl) {
	console.log('ImportarProcessoTurmaCtrl');
	console.log('Alunos: ', $scope.alunos);

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
			var data = findAluno ? { inicioVigencia: findAluno.inicioVigencia, fimVigencia: findAluno.fimVigencia} : $scope.dataVaziaTemp;
			$scope.datasCandidatos.push(angular.copy($filter('date')(data, 'yyyy-MM-dd')));
		});
		console.log('Data Candidato', $scope.datasCandidatos);
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
			$scope.datasCandidatos[indexCandidato] = $scope.datas[indexEmpresa];
		}
	}

	$scope.salvarAlunos = function() {
		$modalInstance.close($scope.alunos);
	}

	$scope.cancelar = function () {
	  	$modalInstance.dismiss('Cancelado');
	};
});