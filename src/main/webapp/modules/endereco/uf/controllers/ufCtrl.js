//Criando o modulo Uf
angular.module('Uf', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']);

//Inserindo o controller ListarUfCtrl dentro do modulo Uf
angular.module('Uf').controller('ListarUfCtrl', function($scope, Restangular, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('uf').one('pagina',page).get({busca:$scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.ufs = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		}); 
	}
	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}

	//Debug
	console.log('Controller: Listar');
	console.log('Array de Estados:');


	/*Função removerUf, recebe como parametro o estado que deve ser excluído, localiza
	 e remove o registro no array $rootScope.ufs */
	$scope.removerUf = function(varUf){
		if (confirm("Deseja excluir a unidade federativa " + varUf.nome + "?")) {
			varUf.remove().then(function() {
				var msg = 'A unidade federativa '+varUf.nome+' foi excluída com sucesso!';
				toaster.pop('success', "Unidade Federativa", msg);
				Restangular.all('uf').getList().then(function(data) {
					$scope.ufs = data;
				}); 
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir a unidade federativa '+varUf.nome+'!';
				toaster.pop('error', "Unidade Federativa", msg);	
			});
		};
	}

});

//Inserindo o controller EditarUfCtrl dentro do modulo Uf
/*O parametro idUf, é informado através da URL(/endereco/uf/editar/1) e será enviado pelo 
$routeProvider(objeto que controla o roteamento de URL)*/
angular.module('Uf').controller('EditarUfCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){

	var idUf = $stateParams.idUf;

	Restangular.one('uf', idUf).get().then(function(data) {
		$scope.uf = data;
		$scope.objetoOrigem = Restangular.copy(data);
	}); 

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	//Debug
	console.log('Controller: Editar');
	console.log('idUf informado na URL: ' + idUf);
	console.log('Objeto Uf:');
	//console.log($scope.uf);

	
	/* Função salvarUf, recebe como parametro o estado que dever ser salvo, localiza
	e substitui o registro no array $rootScope.ufs */
	$scope.salvarUf = function(varUf){
		$scope.uf.put().then(function() {
			var msg = 'A unidade federativa '+$scope.uf.nome+' foi alterada com sucesso!';
			$location.path('endereco/uf');
			toaster.pop('success', "Unidade Federativa", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar a unidade federativa '+$scope.uf.nome+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('endereco/uf');
			toaster.pop('error', "Unidade Federativa", msg);
		});
	}
});

//Inserindo o controller CadastrarUfCtrl dentro do modulo Uf
angular.module('Uf').controller('CadastrarUfCtrl', function($scope,  $location, Restangular, toaster, UtilService) {
	console.log('Controller: Cadastrar');

	//Inicializa o objeto
	$scope.uf = {};
	$scope.objetoOrigem = Restangular.copy($scope.uf);

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	/* Função salvarUf, recebe como parametro o estado que deve ser cadastrado,
	e insere o registro no array $rootScope.ufs */
	$scope.salvarUf = function(varUf) {
		
		Restangular.all('uf').post(varUf).then(function() {
			var msg = 'A unidade federativa '+varUf.nome+' foi cadastrada com sucesso!';
			$location.path('endereco/uf');
			toaster.pop('success', "Unidade Federativa", msg);
		}, function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a unidade federativa '+varUf.nome+'!';
			$location.path('endereco/uf');
			toaster.pop('error', "Unidade Federativa", msg);
		});

	}

});

angular.module('Uf').controller('VisualizarUfCtrl', function($scope, $stateParams, Restangular, UtilService){
	
	var idUf = $stateParams.idUf;

	Restangular.one('uf', idUf).get().then(function(data) {
		$scope.uf = data;
		$scope.getPaises($scope.pais.id);
	}); 

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 


	$scope.getPaises = function(idPais){
		Restangular.all('pais').one('listarPorPais',idPais).getList().then(function(data){
			$scope.paises = UtilService.limparDados(data);
		});
	}
	


	$scope.visualizar = true;
});