angular.module('Pais', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']).controller('ListarPaisCtrl', function($scope, $location, $timeout, Restangular, UtilService, toaster) {

	//Acessa o servidor RestFull e recupera toda listagem de paises.

	$scope.load = function(page) {
		Restangular.all('pais').one('pagina',page).get({busca: $scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.paises = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		}); 
	}

	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}

	$scope.removerPais = function(pais){
		if (confirm('Deseja deletar o pais '+pais.nome+' ?')) {
			pais.remove().then(function() {
				var msg = 'O país '+pais.nome+' excluído com sucesso!';
				$scope.load(1);
				$location.path('endereco/pais');				
				toaster.pop('success', "Pais", msg);
			},function(data) {
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir o país '+pais.nome+'!';
				toaster.pop('error', "Pais", msg);
			});
		}
	}
});

angular.module('Pais').controller('EditarPaisCtrl', function($scope, $location, $stateParams, Restangular, toaster){
	var idPais = $stateParams.idPais;
	//Recupera o registro que vai ser alterado
	Restangular.one('pais', idPais).get().then(function(data) {
		$scope.pais = data;
		$scope.objetoOrigem = Restangular.copy(data); 
	}); 
	
	$scope.salvarPais = function(varPais) {
		varPais.put().then(function() {
			var msg = 'O país '+varPais.nome+' foi alterado com sucesso!';
			$location.path('endereco/pais');
			toaster.pop('success', "Pais", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar o país '+varPais.nome+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('endereco/pais');
			toaster.pop('error', "Pais", msg);
		});
	};

});

angular.module('Pais').controller('CadastrarPaisCtrl', function($scope, $location, Restangular, toaster) {
	
	$scope.pais = {};
	$scope.objetoOrigem = Restangular.copy($scope.pais);
	
	$scope.salvarPais = function(varPais) {
		Restangular.all('pais').post(varPais).then(function() {
			var msg = 'O país '+varPais.nome+' foi cadastrado com sucesso!';
			$location.path('endereco/pais');
			toaster.pop('success', "Pais", msg);
		},function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar o país '+varPais.nome+'!';
			$location.path('endereco/pais');
			toaster.pop('error', "Pais", msg);
		});
	}
});

angular.module('Pais').controller('VisualizarPaisCtrl', function($scope, $stateParams, Restangular){
	var idPais = $stateParams.idPais;
	Restangular.one('pais', idPais).get().then(function(data) {
		$scope.pais = data;
	});

	$scope.visualizar = true;
});