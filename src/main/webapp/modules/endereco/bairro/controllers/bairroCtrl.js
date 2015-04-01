//Criando o modulo Bairro
angular.module('Bairro', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']);

//Inserindo o controller ListarBairroCtrl dentro do modulo Bairro
angular.module('Bairro').controller('ListarBairroCtrl', function($scope, Restangular, UtilService, toaster) {
	//Debug
	console.log('Controller: Listar');

	$scope.load = function(page) {
		Restangular.all('bairro').one('pagina',page).get({busca:$scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.bairros = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
			console.log($scope.bairros);
		}); 
	}

	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}

	$scope.removerBairro = function(varBairro){
		if (confirm("Deseja excluir o bairro " + varBairro.nome + "?")) {
			varBairro.remove().then(function() {
				var msg = 'O bairro '+varBairro.nome+' foi excluída com sucesso!';
				toaster.pop('success', "Bairro", msg);
				Restangular.all('bairro').getList().then(function(data) {
					$scope.bairros = data;
				}); 
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir o bairro '+varBairro.nome+'!';
				toaster.pop('error', "Bairro", msg);
			});
		};
	}

});

//Inserindo o controller EditarBairroCtrl dentro do modulo Bairro
/*O parametro idBairro, é informado através da URL(/endereco/bairro/editar/1) e será enviado pelo 
$routeProvider(objeto que controla o roteamento de URL)*/
angular.module('Bairro').controller('EditarBairroCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){
	
	var idBairro = $stateParams.idBairro;

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	$scope.getUfs = function(idPais){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
			$scope.ufs = UtilService.limparDados(data);
		});
	}

	$scope.getCidades = function(idUf){
		Restangular.all('cidade').one('listarPorUf',idUf).getList().then(function(data){
			$scope.cidades = UtilService.limparDados(data);
		});
	}
	
	Restangular.one('bairro', idBairro).get().then(function(data) {
		$scope.bairro = data;
		//inicilizacao
		$scope.bairro.filtro = {};
		$scope.getUfs($scope.bairro.cidade.unidadeFederativa.pais.id);
		$scope.getCidades($scope.bairro.cidade.unidadeFederativa.id);
		$scope.bairro.filtro.unidadeFederativa = $scope.bairro.cidade.unidadeFederativa;
		$scope.bairro.filtro.pais = $scope.bairro.cidade.unidadeFederativa.pais;
		$scope.objetoOrigem = Restangular.copy($scope.bairro);
	}); 


	/* Função salvarUf, recebe como parametro o estado que dever ser salvo, localiza
	e substitui o registro no array $rootScope.ufs */
	$scope.salvarBairro = function(varBairro){
		console.log(varBairro);
		varBairro.put().then(function() {
			var msg = 'O bairro '+varBairro.nome+' foi alterada com sucesso!';
			$location.path('endereco/bairro');
			toaster.pop('success', "Bairro", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar o bairro '+varBairro.nome+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('endereco/bairro');
			toaster.pop('error', "Bairro", msg);
		});
	}

});

//Inserindo o controller CadastrarsBairroCtrl dentro do modulo Bairro
angular.module('Bairro').controller('CadastrarBairroCtrl', function($scope, $location, Restangular, UtilService, toaster) {
	console.log('Controller: Cadastrar');
	$scope.bairro = {};
	$scope.objetoOrigem = Restangular.copy($scope.bairro);

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	$scope.getUfs = function(idPais){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
			$scope.ufs = UtilService.limparDados(data);
		});
	}

	$scope.getCidades = function(idUf){
		Restangular.all('cidade').one('listarPorUf',idUf).getList().then(function(data){
			$scope.cidades = UtilService.limparDados(data);
		});
	}

	$scope.salvarBairro = function(varBairro) {		
		Restangular.all('bairro').post(varBairro).then(function() {
			var msg = 'O bairro ' + varBairro.nome + ' foi cadastrada com sucesso!';
			$location.path('endereco/bairro');
			toaster.pop('success', "Bairro", msg);
		}, function(data) {
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a bairro '+varBairro.nome+'!';
			$location.path('endereco/bairro');
			toaster.pop('error', "Bairro", msg);
		});
	}

});

angular.module('Bairro').controller('VisualizarBairroCtrl', function($scope, $stateParams, Restangular, UtilService){

	var idBairro = $stateParams.idBairro;

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	$scope.getUfs = function(idPais){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
			$scope.ufs = UtilService.limparDados(data);
		});
	}

	$scope.getCidades = function(idUf){
		Restangular.all('cidade').one('listarPorUf',idUf).getList().then(function(data){
			$scope.cidades = UtilService.limparDados(data);
		});
	}

	Restangular.one('bairro', idBairro).get().then(function(data) {
		$scope.bairro = data;
		$scope.getUfs($scope.bairro.cidade.unidadeFederativa.pais.id);
		$scope.getCidades($scope.bairro.cidade.unidadeFederativa.id);
	});

	$scope.visualizar = true;
});