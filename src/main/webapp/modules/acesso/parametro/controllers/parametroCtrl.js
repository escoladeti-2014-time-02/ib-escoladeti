angular.module('Parametro', ['fe-services', 'fe-directives', 'toaster', 'ui.utils', 'brasil.filters', 'ngCpfCnpj']);

angular.module('Parametro').controller('CadastrarParametroCtrl', function($scope, $location, Restangular, UtilService, toaster) {
	$scope.parametro = {};
	$scope.objetoOrigem = Restangular.copy($scope.parametro);
	Restangular.all('parametro').one('buscarParametro').get().then(function(data) {
		$scope.parametro = UtilService.limparDados(data);
	});
	
	$scope.salvarParametro = function(varParametro) {

		Restangular.all('parametro').post(varParametro).then(function(data) {
		  var msg = 'Os Parametros foram salvos com sucesso!';
		  $location.path('/acesso/parametro');
		  toaster.pop('success', "Parâmetros", msg);
		},function(data){
		  console.log('Erro ao gravar status:', data.status);
		  var msg = 'Erro ao tentar salvar os parametros!';
		  $location.path('/acesso/parametro');
		  toaster.pop('error', "Parâmetros", msg);
		});
	};
	
});
