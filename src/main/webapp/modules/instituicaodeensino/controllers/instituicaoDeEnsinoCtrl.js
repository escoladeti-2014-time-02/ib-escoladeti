//Criando o modulo Cidade
angular.module('InstituicaoDeEnsino', ['brasil.filters', 'fe-services', 'fe-directives', 'toaster', 'ui.utils', 'ngCpfCnpj'])

angular.module('InstituicaoDeEnsino').controller('ListarInstituicaoDeEnsinoCtrl', function($scope, Restangular, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('instituicaoEnsino').one('pagina',page).get({busca:$scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.instituicoes = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
            console.log($scope.instituicoes);
		}); 
	};
	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	};

	//Debug
	console.log('Controller: Listar');
	console.log('Array de Instituições:');


	/*Função removerInstituicaoEnsino, recebe como parametro a instituição que deve ser excluída, localiza
	 e remove o registro no array $rootScope.instituicoes */
	$scope.removerInstituicaoEnsino = function(varInstituicao){
		if (confirm("Deseja excluir a instituição " + varInstituicao.nome + "?")) {
			varInstituicao.remove().then(function() {
				var msg = 'A instituição '+varInstituicao.nome+' foi excluída com sucesso!';
				toaster.pop('success', "Instituição de Ensino", msg);
				Restangular.all('instituicaoEnsino').getList().then(function(data) {
					$scope.instituicoes = data;
				}); 
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir a instituição '+varInstituicao.nome+'!';
				toaster.pop('error', "Instituição de Ensino", msg);
			});
		};
	};
});

angular.module('InstituicaoDeEnsino').controller('EditarInstituicaoDeEnsinoCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster) {
//		Inicializa o objeto
	var idInstituicaoDeEnsino = $stateParams.idInstituicaoEnsino;
	$scope.instituicao = {};
        $scope.instituicao.telefones = [];
        $scope.instituicao.telefones[0] = {};
        $scope.tipoTelefone = {};
        console.log('Controller: Editar');
        Restangular.one('instituicaoEnsino', idInstituicaoDeEnsino).get().then(function(data) {
        	$scope.instituicao = data;
// 		$scope.getTiposTelefone($scope.instituicao.telefones[0].tipoTelefone.id);
        	$scope.objetoOrigem = angular.copy(data);
        }); 

	Restangular.all('tipotelefone').getList().then(function(data) {
		$scope.tiposTelefone = UtilService.limparDados(data);
	}); 

//	$scope.getTiposTelefone = function(idTipoTelefone){
//		Restangular.all('tipotelefone').one(idTipoTelefone).getList().then(function(data){
//			$scope.instituicao.telefones[0].tipoTelefone = UtilService.limparDados(data);
//		});
//	};
       
	$scope.salvarInstituicaoEnsino = function(varInstituicao) {
                console.log('aaaa');
		varInstituicao.put().then(function() {
			var msg = 'A instituição '+varInstituicao.nome+' foi alterada com sucesso!';
			$location.path('/instituicaoensino');
			toaster.pop('success', "Instituição de Ensino", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar a varInstituicao '+varInstituicao.nome+'!';
			$location.path('/instituicaoensino');
			toaster.pop('error', "Instituição de Ensino", msg);
			console.log('Erro ao gravar status:', response);
		});
	}

});
//Inserindo o controller CadastrarUfCtrl dentro do modulo Uf
angular.module('InstituicaoDeEnsino').controller('CadastrarInstituicaoDeEnsinoCtrl', function($scope, $location, Restangular, toaster, UtilService) {
	console.log('Controller: Cadastrar');

	//Inicializa o objeto
	$scope.instituicao = {};
		$scope.instituicao.enderecos = [];
        $scope.instituicao.telefones = [];
        $scope.tipoTelefone = {};
        $scope.objetoOrigem = angular.copy($scope.instituicao);

	Restangular.all('tipotelefone').getList().then(function(data) {
		$scope.tiposTelefone = UtilService.limparDados(data);
	}); 
        
	/* Função salvarInstituicaoEnsino, recebe como parametro a instituição que deve ser cadastrada,
	e insere o registro no array $rootScope.instituicoes */
	$scope.salvarInstituicaoEnsino = function(varInstituicao) {
//		varInstituicao = {"nome":"asdasd","telefones":[{"tipoTelefone":{"id":1,"descricaoTipo":"Comercial"},"numero":"222"}]};
		Restangular.all('instituicaoEnsino').post(varInstituicao).then(function() {
			var msg = 'A instituição '+varInstituicao.nome+' foi cadastrada com sucesso!';
			$location.path('/instituicaoensino');
			toaster.pop('success', "Instituição de Ensino", msg);
		}, function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a instituição '+varInstituicao.nome+'!';
			$location.path('/instituicaoensino');
			toaster.pop('error', "Instituição de Ensino", msg);
		});
	}
});



angular.module('InstituicaoDeEnsino').controller('VisualizarInstituicaoDeEnsinoCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster) {
	console.log('Controller: Visualizar');
	var idInstituicaoDeEnsino = $stateParams.idInstituicaoEnsino;
    Restangular.one('instituicaoEnsino', idInstituicaoDeEnsino).get().then(function(data) {
		$scope.instituicao = data;
		$scope.getTiposTelefone($scope.instituicao.telefone[0].tipoTelefone.id);
	}); 

	Restangular.all('tipotelefone').getList().then(function(data) {
		$scope.tiposTelefone = UtilService.limparDados(data);
	}); 


	$scope.getTiposTelefone = function(idTipoTelefone){
		Restangular.all('tipotelefone').one(idTipoTelefone).getList().then(function(data){
			$scope.instituicao.telefone[0].tipoTelefone = UtilService.limparDados(data);
		});
	};
	


	$scope.visualizar = true;
});
