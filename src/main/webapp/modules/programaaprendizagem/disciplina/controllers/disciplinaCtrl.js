angular.module('Disciplina', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']).controller('ListarDisciplinaCtrl', function($scope, Restangular, $location, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('disciplina').one('pagina',page).get({busca: $scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.disciplinas = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		}); 
	}

	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}

	$scope.removerDisciplina = function(varDisciplina){
		if (confirm('Deseja deletar a disciplina '+varDisciplina.nome+' ?')) {
			varDisciplina.remove().then(function() {
				var msg = 'A disciplina '+varDisciplina.nome+' excluída com sucesso!';
				$scope.load(1);
				$location.path('programaaprendizagem/disciplina');				
				toaster.pop('success', "Disciplina", msg);
			},function(data) {
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir a disciplina '+varDisciplina.nome+'!';
				toaster.pop('error', "Disciplina", msg);
			});
		}
	}

});

angular.module('Disciplina').controller('EditarDisciplinaCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){
	//Recupera o registro que vai ser alterado
	var idDisciplina = $stateParams.idDisciplina;
	Restangular.one('disciplina', idDisciplina).get().then(function(data) {
		$scope.disciplina = data;
		$scope.objetoOrigem = Restangular.copy(data); 
	}); 
	
	$scope.salvarDisciplina = function(varDisciplina) {
		varDisciplina.put().then(function() {
			var msg = 'A disciplina '+varDisciplina.nome+' foi alterada com sucesso!';
			$location.path('programaaprendizagem/disciplina');
			toaster.pop('success', "Disciplina", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar a disciplina '+varDisciplina.nome+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('programaaprendizagem/disciplina');
			toaster.pop('Error', "Disciplina", msg);
		});
	};
});

angular.module('Disciplina').controller('CadastrarDisciplinaCtrl', function($scope,  $location, Restangular, UtilService, toaster) {
	

	$scope.disciplina = {};
	$scope.objetoOrigem = Restangular.copy($scope.disciplina); 

	
	$scope.salvarDisciplina = function(varDisciplina) {
		Restangular.all('disciplina').post(varDisciplina).then(function() {
			var msg = 'A disciplina '+varDisciplina.nome+' foi cadastrada com sucesso!';
			$location.path('programaaprendizagem/disciplina');
			toaster.pop('success', "Disciplina", msg);
		}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar salvar disciplina ' + varDisciplina.nome + '!';
				$location.path('programaaprendizagem/disciplina');
				toaster.pop('error', "Disciplina", msg);
		});
	};

});

angular.module('Disciplina').controller('VisualizarDisciplinaCtrl', function($scope, $stateParams, Restangular, UtilService, toaster) {
	var idDisciplina = $stateParams.idDisciplina;
	Restangular.one('disciplina', idDisciplina).get().then(function(data) {
		$scope.disciplina = data;
	});

	$scope.visualizar = true;
});

 

