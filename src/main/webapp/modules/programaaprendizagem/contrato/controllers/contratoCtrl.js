angular.module('Contrato', ['fe-services', 'fe-directives', 'toaster', 'ui.utils', 'brasil.filters', 'ngCpfCnpj']);

angular.module('Contrato').controller('ListarContratoCtrl', function($scope, Restangular, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('contrato').one('pagina',page).get({busca: $scope.busca}).then(function(data){
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.contratos = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		});
	};
	
	$scope.filtrarPorData = function(page) {
		
		Restangular.all('contrato/filtrarPorData').one('pagina',page).get({busca: $scope.busca, dataInicio: $scope.filtroData.dataInicio, dataTermino: $scope.filtroData.dataTermino}).then(function(data){
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.contratos = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
			console.log($scope.contratos);
		});
	};
	
	$scope.load(1);	
	
	$scope.buscar = function() {
		UtilService.buscar($scope);
	}
	
	$scope.removerContato = function(contrato) {
		if(confirm('Deseja deletar contrato?')){
			contrato.remove().then(function(){
				var msg = 'Contrato excluído com sucesso!';
				$scope.load(1);
				$location.path('programaaprendizagem/contrato');
				toaster.pop('success', "Contrato", msg);
			},function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir o contrato '+contrato.id+'!';
				toaster.pop('error', "Contrato", msg);
			});
		}
	}
	
	  $scope.limparFiltro = function() {
		    $scope.filtroData = {};
		    $scope.load(1);
	  }

});

angular.module('Contrato').controller('EditarContratoCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){

	var idContrato = $stateParams.idContrato;
	
	$scope.filtro = {};


	Restangular.one('contrato',idContrato).get().then(function(data){
		$scope.contrato = data;
		$scope.objetoOrigem = Restangular.copy(data);
		
		Restangular.one('turma/filtrarPorAluno/' + $scope.contrato.aluno.id).get().then(function(data){
			$scope.filtro.turma = data;
		});
	});


	$scope.salvarContrato = function(contrato) {
		Restangular.all('contrato').post(contrato).then(function() {
			var msg = 'O contrato foi cadastrado com sucesso!';
			$location.path('programaaprendizagem/contrato');
			toaster.pop('success', "Contrato", msg);
		}, function(data) {
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar contrato!';
			$location.path('programaaprendizagem/contrato');
			toaster.pop('error', "Contrato", msg);
		});
	};
});

angular.module('Contrato').controller('CadastrarContratoCtrl', function($scope,  $location, Restangular, UtilService, toaster) {
	
	$scope.getTurmas = function(filtro) {
	    return Restangular.all('turma/findTurmaByNome')
	    	.getList({nome: filtro}).then(function(data) {
	      		return data;
   		 	});
  	}
	
	$scope.getAlunos = function(filtro) {
		if(filtro)
		    return Restangular.all('turma/alunos/' + $scope.filtro.turma.id )
	    	.getList().then(function(data) {
	      		return data;
			 	});
  	}
	
	$scope.atualizaCampos = function () {
		if($scope.contrato.aluno != null) {
			$scope.contrato.dataInicio = $scope.filtro.turma.dataInicio;
			$scope.contrato.dataTermino = $scope.filtro.turma.dataEncerramento;
		}
	}
	
	
	$scope.salvarContrato = function(contrato) {
		Restangular.all('contrato').post(contrato).then(function() {
			var msg = 'O contrato foi cadastrado com sucesso!';
			$location.path('programaaprendizagem/contrato');
			toaster.pop('success', "Contrato", msg);
		}, function(data) {
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar contrato!';
			$location.path('programaaprendizagem/contrato');
			toaster.pop('error', "Contrato", msg);
		});
	};
    
});

angular.module('Contrato').controller('VisualizarContratoCtrl', function($scope, Restangular, $stateParams, UtilService, toaster) {
	var idContrato = $stateParams.idContrato;
	
	$scope.filtro = {};

	Restangular.one('contrato',idContrato).get().then(function(data){
		$scope.contrato = data;
		$scope.objetoOrigem = Restangular.copy(data);
		
		Restangular.one('turma/filtrarPorAluno/' + $scope.contrato.aluno.id).get().then(function(data){
			$scope.filtro.turma = data;
		});
	});
	$scope.visualizar = true;
});
