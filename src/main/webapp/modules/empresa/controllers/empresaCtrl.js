angular.module('Empresa', ['brasil.filters', 'fe-services', 'fe-directives', 'toaster', 'ui.utils', 'ngCpfCnpj'])

//Inserindo o controller ListarEmpresaCtrl dentro do modulo Empresa
angular.module('Empresa').controller('ListarEmpresaCtrl', function($scope, Restangular, UtilService, toaster) {
	//Debug
	console.log('Controller: Listar');

	$scope.load = function(page) {
		Restangular.all('empresa').one('pagina',page).get({busca: $scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.empresas = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
			angular.forEach($scope.empresas, function(empresa){
				if (empresa.empresa != null) {
					empresa.route = 'filial';					
				};
			});
			console.log('Empresas recuperadas do banco de dados: 1' + $scope.empresas);
            console.log($scope.empresas);
		}); 
	};
	$scope.load(1);

	$scope.buscar = function(){
	  UtilService.buscar($scope);
	}
	
	$scope.removerEmpresa = function(varEmpresa){
		if (confirm("Deseja excluir a Empresa " + varEmpresa.fantasia + "?")) {
			varEmpresa.remove().then(function() {
				var msg = 'A empresa '+varEmpresa.fantasia+' foi excluída com sucesso!';
				toaster.pop('success', "Empresa", msg);
				Restangular.all('pessoajuridica').getList().then(function(data) {
					$scope.empresas = data;
				}); 
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir a Empresa '+varEmpresa.fantasia+'!';
				toaster.pop('error', "Empresa", msg);	
			});
		};
	}

});
angular.module('Empresa').controller('EditarEmpresaCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){

	var idEmpresa = $stateParams.idEmpresa;

	$scope.empresa = {};
	$scope.empresa.enderecos = [];
    $scope.empresa.telefones = [];
    Restangular.one('empresa', idEmpresa).get().then(function(data) {
    	$scope.empresa = data;
    	$scope.empresa.isFilial = ($scope.empresa.empresa != null);
    	$scope.objetoOrigem = angular.copy(data);
    }); 
    
    //Trazendo empresas matrizes para o combobox de filial
    Restangular.all('empresa').one('listarEmpresas').getList().then(function(data) {                 
    	$scope.matrizes = UtilService.limparDados(data);
	});
    console.log(Restangular.oneUrl('routeName', 'http://absolute.url').get());
    
//    Restangular.one('distrito').customPUT({teste:'teste'},'').then(function(data){
//        
//      });
	$scope.salvarEmpresa = function() {
		this.nomeEntidade = this.empresa.isFilial ? 'filial' : 'empresa';
		console.log(this.nomeEntidade);
	
		Restangular.one(this.nomeEntidade, $scope.empresa.id).customPUT($scope.empresa).then(function() {
			var msg = 'A Empresa '+$scope.empresa.fantasia+' foi alterada com sucesso!';
			$location.path('/empresa');
			toaster.pop('success', "Empresa", msg);

		},function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a empresa '+$scope.empresa.fantasia+'!';
			$location.path('/empresa');
			toaster.pop('error', "Empresa", msg);
		});
	};

});

angular.module('Empresa').controller('CadastrarEmpresaCtrl', function($scope, $location, Restangular, toaster, UtilService, $injector) {
	
	$scope.empresa = {};
	$scope.empresa.enderecos = [];
    $scope.empresa.telefones = [];
    $scope.objetoOrigem = angular.copy($scope.empresa);
    console.log($scope.modalInstance);
    
    //Trazendo empresas matrizes para o combobox de filial
	Restangular.all('empresa').getList().then(function(data) {
		$scope.matrizes = UtilService.limparDados(data);
	}); 
    
	$scope.salvarEmpresa = function() {
		this.nomeEntidade = this.empresa.isFilial ? 'filial' : 'empresa';
		console.log(this.nomeEntidade);
		Restangular.all(this.nomeEntidade).post($scope.empresa).then(function(empresa) {
//		Restangular.all('empresa').post($scope.empresa).then(function(empresa) {
			var msg = 'A empresa '+$scope.empresa.fantasia+' foi cadastrada com sucesso!';
			if(!$scope.modalInstance){
				$location.path('/empresa');
			} else {
				$scope.modalInstance.close(empresa);
			}			
			toaster.pop('success', "Empresa", msg);
		},function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar a empresa '+$scope.empresa.fantasia+'!';
			$location.path('/empresa');
			toaster.pop('error', "Empresa", msg);
		});
	}

});

angular.module('Empresa').controller('VisualizarEmpresaCtrl', function($scope, $stateParams, Restangular){
	console.log('Controller: Visualizar');

	var idEmpresa = $stateParams.idEmpresa;

	Restangular.one('empresa', idEmpresa).get().then(function(data) {
		$scope.empresa = data;
	});

	$scope.visualizar = true;
});