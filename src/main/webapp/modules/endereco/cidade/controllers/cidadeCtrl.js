//Criando o modulo Cidade
angular.module('Cidade', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']);

//Inserindo o controller ListarCidadeCtrl dentro do modulo Cidade
angular.module('Cidade').controller('ListarCidadeCtrl', function($scope, Restangular, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('cidade').one('pagina',page).get({busca:$scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.cidades = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
			angular.forEach($scope.cidades, function(cidade){
				if (cidade.cidade != null) {
					cidade.route = 'distrito';					
				};
			});
			console.log($scope.cidades);
		}); 
	}
	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}

	$scope.removerCidade = function(varCidade){
		if (confirm("Deseja excluir a cidade " + varCidade.nome + "?")) {
			varCidade.remove().then(function() {
				var msg = 'A cidade '+varCidade.nome+' foi excluída com sucesso!';
				toaster.pop('success', "Cidade", msg);
				Restangular.all('cidade').getList().then(function(data) {
					$scope.cidades = data;
				}); 
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir a cidade '+varCidade.nome+'!';
				toaster.pop('error', "Cidade", msg);
			});
		};
	}
});

//Inserindo o controller EditarCidadeCtrl dentro do modulo Cidade
/*O parametro idCidade, é informado através da URL(/endereco/cidade/editar/1) e será enviado pelo 
$routeProvider(objeto que controla o roteamento de URL)*/
angular.module('Cidade').controller('EditarCidadeCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){	

	var idCidade = $stateParams.idCidade;

	Restangular.one('cidade', idCidade).get().then(function(data) {
		$scope.cidade = data;	
		$scope.cidade.filtro = {};
		$scope.getUfs($scope.cidade.unidadeFederativa.pais.id);
		$scope.getCidades($scope.cidade.unidadeFederativa.id);
		$scope.cidade.filtro.pais = $scope.cidade.unidadeFederativa.pais;	
		$scope.cidade.isDistrito = ($scope.cidade.cidade != null);
		$scope.objetoOrigem = Restangular.copy($scope.cidade);
	});

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	$scope.getUfs = function(idPais){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
			$scope.ufs = UtilService.limparDados(data);
		});
	}

	$scope.getCidades = function(idUf) {
        Restangular.all('cidade').one('listarCidades').getList().then(function(data) {                 
        	$scope.cidades = UtilService.limparDados(data);
		});
	}
	
	$scope.salvarCidade = function(varCidade){
		varCidade.put().then(function() {
			var msg = 'A cidade '+varCidade.nome+' foi alterada com sucesso!';
			$location.path('endereco/cidade');
			toaster.pop('success', "Cidade", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar a cidade '+varCidade.nome+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('endereco/cidade');
			toaster.pop('error', "Cidade", msg);
		});
	}

});

//Inserindo o controller CadastrarsCidadeCtrl dentro do modulo Cidade
angular.module('Cidade').controller('CadastrarCidadeCtrl', function($scope, $location, Restangular, UtilService, toaster) {
	$scope.cidade = {};
	$scope.objetoOrigem = Restangular.copy($scope.cidade);
	
	console.log('Controller: Cadastrar');

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	$scope.getUfs = function(idPais){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
			$scope.ufs = UtilService.limparDados(data);
		});
	};

	$scope.getCidades = function(idUf) {
        Restangular.all('cidade').one('listarCidades').getList().then(function(data) {
            $scope.cidades = UtilService.limparDados(data);
		});
	};

	$scope.salvarCidade = function(objetoDaView) {
		$scope.nomeEntidade = this.cidade.isDistrito ? 'distrito' : 'cidade';
		console.log(objetoDaView);

		Restangular.all(this.nomeEntidade).post(objetoDaView).then(function() {
			var msg = objetoDaView.nome + ' foi cadastrado com sucesso!';
			$location.path('endereco/cidade');
			toaster.pop('success', "Cidade", msg);
		}, function(data) {
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a cidade ' + objetoDaView.nome + '!';
			$location.path('endereco/cidade');
			toaster.pop('error', "Cidade", msg);
		});
	}
});

angular.module('Cidade').controller('VisualizarCidadeCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster) {
       $scope.filtro = {};

    var idCidade = $stateParams.idCidade;

	Restangular.one('cidade', idCidade).get().then(function(data) {
		$scope.cidade = data;
		$scope.getUfs($scope.cidade.unidadeFederativa.pais.id);
		$scope.getCidades($scope.cidade.unidadeFederativa.id);
		$scope.filtro.pais = $scope.cidade.unidadeFederativa.pais;	
		$scope.isDistrito = ($scope.cidade.cidade != null);
	});

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	$scope.getUfs = function(idPais){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
			$scope.ufs = UtilService.limparDados(data);
		});
	}

	$scope.getCidades = function(idUf) {
                Restangular.all('cidade').one('listarCidades').getList().then(function(data) {
                    $scope.cidades = UtilService.limparDados(data);
		});
	}
    
        Restangular.one('cidade', idCidade).get().then(function(data) {
		$scope.cidade = data;
	});

	$scope.visualizar = true;
});
