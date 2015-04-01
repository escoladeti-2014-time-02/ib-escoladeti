angular.module('PerfilDeAcesso', ['fe-services', 'fe-directives', 'toaster', 'ui.utils'])
.controller('ListarPerfilDeAcessoCtrl', function($scope, $rootScope, $location, Restangular, UtilService, toaster){

	$scope.load = function(page) {
		Restangular.all('perfildeacesso').one('pagina',page).get({busca: $scope.busca}).then(function(data){
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.perfisDeAcesso = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		});
	};

	$scope.load(1);

	$scope.removerPerfilDeAcesso = function(perfilDeAcesso){
		if(confirm('Deseja deletar perfil de acesso '+perfilDeAcesso.nome+'?')){
			perfilDeAcesso.remove().then(function(){
				var msg = 'O perfil de acesso '+perfilDeAcesso.nome+' excluído com sucesso!';
				$scope.load(1);
				$location.path('acesso/perfildeacesso');
				toaster.pop('success', "Perfil de Acesso", msg);
			},function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluír o perfil de acesso '+perfilDeAcesso.nome+'!';
				toaster.pop('error', "Perfil de Acesso", msg);
			});
		}
	}
});

angular.module('PerfilDeAcesso').controller('CadastrarPerfilDeAcessoCtrl',function($scope, $rootScope, $location, Restangular, UtilService, toaster) {

	$scope.niveisDeAcesso = [
		{nivel:"Listar", selected: false},
		{nivel:"Adicionar", selected: false},
		{nivel:"Editar", selected: false},
		{nivel:"Excluir", selected: false}
	];

	$scope.perfilDeAcesso = {};	
	$scope.perfilDeAcesso.itensPerfilDeAcesso = [];
	
	Restangular.all('itemdeacesso').getList().then(function(itens) { 
		for (var int = 0; int < itens.length; int++) {
			 $scope.perfilDeAcesso.itensPerfilDeAcesso[int] = {
				itemDeAcesso: UtilService.limparDados(itens[int]),
				niveisDeAcesso: angular.copy($scope.niveisDeAcesso)
			 };
		}
		$scope.objetoOrigem = Restangular.copy($scope.perfilDeAcesso);
	});
	
	$scope.marcarTodos = function() {
    	angular.forEach($scope.perfilDeAcesso.itensPerfilDeAcesso, function(itemPerfilDeAcesso) {
    		angular.forEach(itemPerfilDeAcesso.niveisDeAcesso, function(nivelDeAcesso){
    			nivelDeAcesso.selected = !$scope.perfilDeAcesso.marcar;
    		});
    	});
  	};
		
	$scope.salvarPerfilDeAcesso = function(perfilDeAcesso){
		Restangular.all('perfildeacesso').post(perfilDeAcesso).then(function() {
			var msg = 'O perfil de acesso '+ perfilDeAcesso.nome +' foi cadastrado com sucesso!';
			$location.path('acesso/perfildeacesso');
			toaster.pop('success', "Perfil de Acesso", msg);
		}, function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar perfil de acesso ' + perfilDeAcesso.nome + '!';
			$location.path('acesso/perfildeacesso');
			toaster.pop('error', "Perfil de Acesso", msg);
		});
	};
    
});

angular.module('PerfilDeAcesso').controller('EditarPerfilDeAcessoCtrl',function($scope, $rootScope, $location, $stateParams, Restangular, toaster, UtilService){

	var idPerfilDeAcesso = $stateParams.idPerfilDeAcesso;

	Restangular.one('perfildeacesso',idPerfilDeAcesso).get().then(function(data){
		$scope.perfilDeAcesso = data;
		$scope.objetoOrigem = Restangular.copy(data);
	});
	
	$scope.marcarTodos = function() {
    	angular.forEach($scope.perfilDeAcesso.itensPerfilDeAcesso, function(itemPerfilDeAcesso) {
    		angular.forEach(itemPerfilDeAcesso.niveisDeAcesso, function(nivelDeAcesso){
    			nivelDeAcesso.selected = !$scope.perfilDeAcesso.marcar;
    		});
    	});
  	};
  	
	$scope.salvarPerfilDeAcesso = function(perfilDeAcesso){
		console.log(perfilDeAcesso);
		perfilDeAcesso.put().then(function(){
			var msg = 'O perfil de acesso '+perfilDeAcesso.nome+' foi alterado com sucesso!';
			$location.path('acesso/perfildeacesso');
			toaster.pop('success', "Perfil de Acesso", msg);
		},function(data){
			console.log('Erro ao gravar status:',data.status);
			var msg = 'Erro ao tentar salvar perfil de acesso '+perfilDeAcesso.nome+'!';
			$location.path('acesso/perfildeacesso');
			toaster.pop('error', "Perfil de Acesso", msg);
		});

	};
});

angular.module('PerfilDeAcesso').controller('VisualizarPerfilDeAcessoCtrl', function($scope, Restangular, UtilService){

	var idPerfilDeAcesso = $stateParams.idPerfilDeAcesso;

	Restangular.one('perfildeacesso', idPerfilDeAcesso).get().then(function(data) {
		$scope.perfilDeAcesso = UtilService.limparDados(data);
	});
	$scope.visualizar = true;
});
