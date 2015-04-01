angular.module('Colaborador', ['fe-services', 'fe-directives', 'toaster', 'ui.utils', 'brasil.filters', 'ngCpfCnpj']);

angular.module('Colaborador').controller('ListarColaboradorCtrl', function($scope, Restangular, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('colaborador').one('pagina',page).get({busca: $scope.busca}).then(function(data){
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.colaboradores = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		});
	};
	
	$scope.load(1);

	$scope.buscar = function() {
		UtilService.buscar($scope);
	}

	$scope.removerColaborador = function(colaborador){
		if(confirm('Deseja deletar colaborador '+colaborador.pessoaFisica.nome+'?')){
			colaborador.remove().then(function(){
				var msg = 'O colaborador '+colaborador.pessoaFisica.nome+' excluído com sucesso!';
				$scope.load(1);
				$location.path('programaaprendizagem/colaborador');
				toaster.pop('success', "Colaborador", msg);
			},function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluír o colaborador '+colaborador.pessoaFisica.nome+'!';
				toaster.pop('error', "Colaborador", msg);
			});
		}
	};

});

angular.module('Colaborador').controller('EditarColaboradorCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){

	var idColaborador = $stateParams.idColaborador;

	Restangular.one('colaborador',idColaborador).get().then(function(data){
		$scope.colaborador = data;
		$scope.objetoOrigem = Restangular.copy(data);
	});

	$scope.salvarColaborador = function(colaborador){
		colaborador.put().then(function(){
			var msg = 'O Colaborador '+colaborador.pessoaFisica.nome+' foi alterado com sucesso!';
			$location.path('programaaprendizagem/colaborador');
			toaster.pop('success', "Colaborador", msg);
		},function(data){
			console.log('Erro ao gravar status:',data.status);
			var msg = 'Erro ao tentar salvar Colaborador '+colaborador.pessoaFisica.nome+'!';
			$location.path('programaaprendizagem/colaborador');
			toaster.pop('error', "Colaborador", msg);
		});
	};

});

angular.module('Colaborador').controller('CadastrarColaboradorCtrl', function($scope,  $location, Restangular, UtilService, toaster) {

	$scope.colaborador = {};	
	$scope.colaborador.pessoaFisica = {};
	$scope.colaborador.pessoaFisica.telefones = [];
	$scope.colaborador.pessoaFisica.enderecos = [];
	$scope.colaborador.pessoaFisica.documentos = [{'type':'cpf'}, {'type':'rg'}, {'type':'carteiraTrabalho'}, {'type':'certidaoNascimento'}];
	
	$scope.getPessoa = function(cpfPessoa){
		if (cpfPessoa) {
			Restangular.all('pessoafisica').one('findbycpf',cpfPessoa).get().then(function(data){
				if (data) 
					$scope.colaborador.pessoaFisica = UtilService.limparDados(data);
				console.log($scope.colaborador)
			});
		}
	};	

	posicaoCpfInDocumentos = function(){
    	var retorno = 0;
    	angular.forEach($scope.colaborador.pessoaFisica.documentos, function(documento, index) {
    		if(documento.type == 'cpf'){
    			retorno = index;
    		}
		});
		return retorno;
    } 

	tratarDocumentoCpfColaborador = function(colaborador){
		if(colaborador.pessoaFisica.cpf)
			colaborador.pessoaFisica.documentos[posicaoCpfInDocumentos()] = {'type': 'cpf', numero: $scope.colaborador.pessoaFisica.documentos[0]};
	}
		
	$scope.salvarColaborador = function(colaborador){
		//tratarDocumentoCpfColaborador(colaborador);
		//console.log(colaborador);
		Restangular.all('colaborador').post(colaborador).then(function(data) {
			var msg = 'O Colaborador '+ colaborador.pessoaFisica.nome +' foi cadastrado com sucesso!';
			if(!$scope.modalInstance){
				$location.path('programaaprendizagem/colaborador');
			} else {
				$scope.modalInstance.close(data);
			}
			toaster.pop('success', "Colaborador", msg);
		},function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar Colaborador ' + colaborador.pessoaFisica.nome + '!';
			$location.path('programaaprendizagem/colaborador');
			toaster.pop('error', "Colaborador", msg);
		});
	};
    
});

angular.module('Colaborador').controller('VisualizarColaboradorCtrl', function($scope, Restangular, $stateParams, UtilService, toaster) {
	var idColaborador = $stateParams.idColaborador;
	Restangular.one('colaborador', idColaborador).get().then(function(data) {
		$scope.colaborador = UtilService.limparDados(data);
	});
	$scope.visualizar = true;
});
