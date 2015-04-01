//Criando o modulo Pessoa
angular.module('Pessoa', []);
	//Metodo executado quando o modulo Pessoa for carregado pelo modulo principal.

//Inserindo o controller ListarPessoaCtrl dentro do modulo Pessoa
angular.module('Pessoa').controller('ListarPessoaCtrl', function($scope) {

	console.log('Controller: Listar',$rootScope.pessoas);

	$scope.removerPessoa = function(varPessoa){
		var index = $rootScope.pessoas.indexOf(varPessoa);
		if (confirm("Deseja excluir a pessoa " + $rootScope.pessoas[index].nome + "?")) {
			$rootScope.pessoas.splice(index,1);
		};
	}
	

});

//Inserindo o controller EditarPessoaCtrl dentro do modulo Pessoa
/*O parametro idPessoa, é informado através da URL(/endereco/pessoa/editar/1) e será enviado pelo 
$routeProvider(objeto que controla o roteamento de URL)*/
angular.module('Pessoa').controller('EditarPessoaCtrl', function($scope, $location, idPessoa/*Parametro informado na URL*/){
	
	//Debug
	console.log('Controller: Editar');
	console.log('idPessoa informado na URL: ' + idPessoa);


		for (var i = $rootScope.pessoas.length - 1; i >= 0; i--) {
			if ($rootScope.pessoas[i].idPessoa == idPessoa) {
				$scope.pessoa = angular.copy($rootScope.pessoas[i]);
			};
		};
		
		$scope.salvarPessoa = function(varPessoa){
		var registro = angular.copy(varPessoa);

		for (var i = $rootScope.pessoas.length - 1; i >= 0; i--) {
			if ($rootScope.pessoas[i].idPessoa == registro.idPessoa) {
				$rootScope.pessoas[i] = registro;
				$location.path('pessoa/');
			};			
		};
	}

});

//Inserindo o controller CadastrarsPessoaCtrl dentro do modulo Pessoa
angular.module('Pessoa').controller('CadastrarPessoaCtrl', function($scope, $location) {
	console.log('Controller: Cadastrar');

	$scope.pessoa = {tipo:'fisica'};
	
	$scope.salvarPessoa = function(varPessoa){	
		/*var registro = angular.copy(varPessoa);

		var maiorId = 0;
		for (var i = 0; i < $rootScope.pessoas.length; i++) {
			if ($rootScope.pessoas[i].idPessoa > maiorId) {
				maiorId = $rootScope.pessoas[i].idPessoa;
			};
		}
		registro.idPessoa = maiorId + 1;
		
		$rootScope.pessoas.push(registro);
		console.log(registro);

		$location.path('pessoa/');
		*/
		alert('ok');
		console.log($scope.formPessoa);
	}

	$scope.validarFormPorTipo = function(formPessoa, tipoPessoa){
		console.log("Função validarFormPorTipo");
		console.log("Tipo da pessoa: ",tipoPessoa);
		console.log("Objeto form: ", formPessoa);
	}

});
