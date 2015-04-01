//Criando o modulo Usuario
angular.module('Usuario', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']);
	//Metodo executado quando o modulo Usuario for carregado pelo modulo principal.
	

//Inserindo o controller ListarUsuarioCtrl dentro do modulo Usuario
angular.module('Usuario').controller('ListarUsuarioCtrl', function($scope, Restangular, UtilService, toaster) {

	$scope.load = function(page) {
		Restangular.all('usuario').one('pagina',page).get().then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.usuarios = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
			console.log($scope.usuarios);
		}); 
	}
	$scope.load(1);

	//Debug
	console.log('Controller: Listar');
	console.log('Array de Usuarios');

	$scope.removerUsuario = function(varUsuario) {
		if (confirm("Deseja excluir o usuario " + varUsuario.login + "?")) {
			varUsuario.remove().then(function() {
				var msg = 'O usuario '+varUsuario.login+' foi excluído com sucesso!';
				Restangular.all('usuario').getList().then(function(data) {
					$scope.usuarios = data;
				}); 
				toaster.pop('success', "Usuário", msg);
			}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir o usuario '+varUsuario.login+'!';
				toaster.pop('error', "Usuário", msg);	
			});
		};

	}

});

//Inserindo o controller EditarUsuarioCtrl dentro do modulo Usuario
/*O parametro idUsuario, é informado através da URL(/acesso/usuario/editar/1) e será enviado pelo 
$routeProvider(objeto que controla o roteamento de URL)*/
angular.module('Usuario').controller('EditarUsuarioCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){

	var idUsuario = $stateParams.idUsuario;
	
	Restangular.one('usuario', idUsuario).get().then(function(data) {
		$scope.usuario = data;
		$scope.objetoOrigem = Restangular.copy(data);
	});
	
	Restangular.all('perfildeacesso').getList().then(function(data) {
		$scope.perfisDeAcesso = UtilService.limparDados(data);
	});

	//Função salvar usuario, localiza e substitui o registro
	$scope.salvarUsuario = function(varUsuario) {
		varUsuario.put().then(function() {
			var msg = 'O usuario '+varUsuario.login+' foi alterada com sucesso!';
			$location.path('acesso/usuario');
			toaster.pop('success', "Usuário", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar o usuario '+varUsuario.login+'!';
			console.log('Erro ao gravar status:', response);
			$location.path('acesso/usuario');
			toaster.pop('error', "Usuário", msg);
		});
	}
});

//Inserindo o controller CadastrarsUsuarioCtrl dentro do modulo Usuario
angular.module('Usuario').controller('CadastrarUsuarioCtrl', function($scope, $location, Restangular, toaster, UtilService) {
	console.log('Controller: Cadastrar');
	
	//Inicializa o objeto
	$scope.usuario = {};
	$scope.objetoOrigem = Restangular.copy($scope.usuario);

	Restangular.all('perfildeacesso').getList().then(function(data) {
		$scope.perfisDeAcesso = UtilService.limparDados(data);			
	});
	
	/* Função salvarUsuario, recebe como parametro o usuario que deve ser cadastrado,
	e insere o registro no array $rootScope.usuarios */
	$scope.salvarUsuario = function(varUsuario) {
		Restangular.all('usuario').post(varUsuario).then(function() {
			var msg = 'O Usuario '+varUsuario.login+' foi cadastrado com sucesso!';
			$location.path('acesso/usuario');
			toaster.pop('success', "Usuário", msg);
		}, function(data){
			console.log('Erro ao gravar status:', data.status);
			var msg = 'Erro ao tentar salvar o usuário '+varUsuario.login+'!';
			$location.path('acesso/Usuario');
			toaster.pop('error', "Usuário", msg);
		});
	}
});

angular.module('Usuario').controller('VisualizarUsuarioCtrl', function($scope, $stateParams, Restangular, UtilService){

	var idUsuario = $stateParams.idUsuario;
	
	Restangular.one('usuario', idUsuario).get().then(function(data) {
		$scope.usuario = data;
		console.log($scope.usuario);
		$scope.getPerfisDeAcesso($scope.usuario.perfilAcesso.id);
	});

//	Restangular.all('perfildeacesso').getList().then(function(data) {
//		$scope.perfisDeAcesso = UtilService.limparDados(data);
//	}); 
//	
	$scope.getPerfisDeAcesso = function(idPerfilDeAcesso){
		Restangular.all('perfildeacesso').getList().then(function(data){
     		$scope.perfisDeAcesso = UtilService.limparDados(data);
    	});
	}

	$scope.visualizar = true;
});


