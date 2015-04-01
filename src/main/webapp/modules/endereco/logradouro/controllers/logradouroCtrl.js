
//Criando o modulo Logradouro
angular.module('Logradouro', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']);
	//Metodo executado quando o modulo Logradouro for carregado pelo modulo principal.
//Inserindo o controller ListarLogradouroCtrl dentro do modulo Logradouro
angular.module('Logradouro').controller('ListarLogradouroCtrl', function($scope, Restangular, UtilService, toaster) {
	//Debug
	console.log('Controller: Listar');

	$scope.load = function(page) {
		Restangular.all('logradouro').one('pagina', page).get({busca: $scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.logradouros = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
			console.log('Logradouros recuperados do banco de dados: ' + $scope.logradouros);
			console.log($scope.logradouros);
		});
	};

	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}
	
	$scope.removerLogradouro = function(varLogradouro){
		if (confirm("Deseja excluir o logradouro " + varLogradouro.nome + "?")) {
			varLogradouro.remove().then(function() {
				var msg = 'O logradouro '+varLogradouro.nome+' foi excluída com sucesso!';
				toaster.pop('success', "Logradouro", msg);
				$scope.load(1);
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir o logradouro '+varLogradouro.nome+'!';
				toaster.pop('error', "Logradouro", msg);
			});
		};
	}

});

//Inserindo o controller EditarLogradouroCtrl dentro do modulo Logradouro
/*O parametro idLogradouro, é informado através da URL(/endereco/logradouro/editar/1) e será enviado pelo 
$routeProvider(objeto que controla o roteamento de URL)*/
angular.module('Logradouro').controller('EditarLogradouroCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){

	var idLogradouro = $stateParams.idLogradouro;

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	});
	
	Restangular.all('logradouro').one('listarTiposLogradouro').getList().then(function(data) {
		$scope.tiposLogradouro = data;
	});

	Restangular.one('logradouro', idLogradouro).get().then(function(data) {
		$scope.logradouro = data;
		$scope.logradouro.filtro = {};
		console.log(data);
		$scope.getUfs($scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa.pais.id);
		$scope.getCidades($scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa.id);
		$scope.getBairros($scope.logradouro.faixasDeCep[0].bairro.cidade.id);
		$scope.logradouro.filtro.pais = $scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa.pais;
		$scope.logradouro.filtro.unidadeFederativa = $scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa;
		$scope.logradouro.filtro.cidade = $scope.logradouro.faixasDeCep[0].bairro.cidade;
		$scope.objetoOrigem = Restangular.copy($scope.logradouro);
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

	$scope.getBairros = function(idCidade){
		Restangular.all('bairro').one('listarPorCidade',idCidade).getList().then(function(data){
			$scope.bairros = UtilService.limparDados(data);
		});
	}

	$scope.salvarFaixaDeCep = function(faixaDeCep){
		obj = _.find(this.logradouro.faixasDeCep, function(fc){
			return fc === faixaDeCep;
		});
		if(!obj){
			var registro = angular.copy(faixaDeCep);
			this.logradouro.faixasDeCep.push(registro);
		}		
		delete this.modalFc;
		$('#modalFaixaDeCep').modal('hide');
	};

	$scope.removerFaixaDeCep = function(faixaDeCep){
		console.log(this.logradouro.faixasDeCep);
		this.logradouro.faixasDeCep = _.without(this.logradouro.faixasDeCep, faixaDeCep);
	}

	$scope.editarFaixaDeCep = function(faixaDeCep){
		$('#modalFaixaDeCep').modal('show');
		$scope.modalFc = faixaDeCep;
		console.log(this.modalFc);
	}

	$scope.novaFaixaDeCep = function(){
		delete this.modalFc;
		$('#modalFaixaDeCep').modal('show');
	}

	$scope.salvarLogradouro = function(varLogradouro) {
		varLogradouro.put().then(function() {
			var msg = 'O logradouro '+varLogradouro.nome+' foi alterada com sucesso!';
			$location.path('endereco/logradouro');
			toaster.pop('success', "Logradouro", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar o logradouro '+varLogradouro.nome+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('endereco/logradouro');
			toaster.pop('error', "Logradouro", msg);
		});
	}


});	


//Inserindo o controller CadastrarsLogradouroCtrl dentro do modulo Logradouro
angular.module('Logradouro').controller('CadastrarLogradouroCtrl', function($scope, $location, Restangular, UtilService, toaster) {
	console.log('Controller: Cadastrar');
        
        $scope.logradouro = {};
        $scope.logradouro.faixasDeCep = [];
        $scope.objetoOrigem = Restangular.copy($scope.logradouro);
	
	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	Restangular.all('logradouro').one('listarTiposLogradouro').getList().then(function(data) {
		$scope.tiposLogradouro = UtilService.limparDados(data);
		console.log($scope.tiposLogradouro);
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

	$scope.getBairros = function(idCidade){
		Restangular.all('bairro').one('listarPorCidade',idCidade).getList().then(function(data){
			$scope.bairros = UtilService.limparDados(data);
		});
	}

	$scope.salvarLogradouro = function(varLogradouro) {
		Restangular.all('logradouro').post(varLogradouro).then(function() {
			var msg = 'O logradouro ' + varLogradouro.nome + ' foi cadastrada com sucesso!';
			$location.path('endereco/logradouro');
			toaster.pop('success', "Logradouro", msg);
		}, function(data) {
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a logradouro '+varLogradouro.nome+'!';
			$location.path('endereco/logradouro');
			toaster.pop('success', "Logradouro", msg);
		});
	}

	$scope.salvarFaixaDeCep = function(faixaDeCep){
		var registro = angular.copy(faixaDeCep);
		this.logradouro.faixasDeCep.push(registro);
		delete this.modalFc;
		$('#modalFaixaDeCep').modal('hide');
	};

	$scope.removerFaixaDeCep = function(faixaDeCep){
		console.log(this.logradouro.faixasDeCep);
		this.logradouro.faixasDeCep = _.without(this.logradouro.faixasDeCep, faixaDeCep);
	}

	$scope.editarFaixaDeCep = function(faixaDeCep){
		$('#modalFaixaDeCep').modal('show');
		$scope.modalFc = faixaDeCep;
		console.log(this.modalFc);
	}

	$scope.novaFaixaDeCep = function(){
		delete this.modalFc;
		$('#modalFaixaDeCep').modal('show');
	}

});

angular.module('Logradouro').controller('VisualizarLogradouroCtrl', function($scope, $stateParams, Restangular, UtilService){
	$scope.filtro = {};

	var idLogradouro = $stateParams.idLogradouro;

	Restangular.all('pais').getList().then(function(data) {
		$scope.paises = UtilService.limparDados(data);
	}); 

	Restangular.all('logradouro').one('listarTiposLogradouro').getList().then(function(data) {
		$scope.tiposLogradouro = data;
		console.log($scope.tiposLogradouro);
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

	$scope.getBairros = function(idCidade){
		Restangular.all('bairro').one('listarPorCidade',idCidade).getList().then(function(data){
			$scope.bairros = UtilService.limparDados(data);
		});
	}

	Restangular.one('logradouro', idLogradouro).get().then(function(data) {
		$scope.logradouro = data;
		console.log(data);
		$scope.getUfs($scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa.pais.id);
		$scope.getCidades($scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa.id);
		$scope.getBairros($scope.logradouro.faixasDeCep[0].bairro.cidade.id);
		$scope.filtro.pais = $scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa.pais;
		$scope.filtro.unidadeFederativa = $scope.logradouro.faixasDeCep[0].bairro.cidade.unidadeFederativa;
		$scope.filtro.cidade = $scope.logradouro.faixasDeCep[0].bairro.cidade;
	});

	$scope.visualizar = true;
});
