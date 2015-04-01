angular.module('Curso', ['fe-services', 'fe-directives', 'toaster', 'ui.utils']).controller('ListarCursoCtrl', function($scope, Restangular, $location, UtilService, toaster) {
	
	$scope.load = function(page) {
		Restangular.all('curso').one('pagina',page).get({busca: $scope.busca}).then(function(data) {
			objetoPaginado = UtilService.tratarObjetoPaginado(data);
			$scope.cursos = objetoPaginado[0];
			$scope.page = objetoPaginado[1];
		});
	}

	$scope.load(1);

	$scope.buscar = function(){
		UtilService.buscar($scope);
	}

	$scope.modalNovoModulo = function() {
	    console.log('modal');
	  $('#modalNovoModulo').modal('show'); 
	}

	$scope.removerCurso = function(varCurso){
		if(confirm('Deseja excluir o curso'+varCurso.nome+' ?')) {
			varCurso.remove().then(function() {
				var msg = 'O curso'+varCurso.nome+' foi excluído com sucesso!';
				$scope.load(1);
				$location.path('programaaprendizagem/curso');
				toaster.pop('success', "Curso", msg);
			},function(data) {
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar excluir o curso '+varCurso.nome+'!';
				toaster.pop('error', "Curso", msg);
			});
		}
	}

});

angular.module('Curso').controller('EditarCursoCtrl', function($scope, $location, $stateParams, Restangular, UtilService, toaster){
	var idCurso = $stateParams.idCurso;

	Restangular.all('modulo').getList().then(function(data) {
    	$scope.modulos = UtilService.limparDados(data);
  	});
	
	$scope.curso = {};
	$scope.curso.modulo = {};

	Restangular.one('curso', idCurso).get().then(function(data) {
		$scope.curso = data;
		$scope.objetoOrigem = Restangular.copy(data);
	});

	$scope.salvarCurso = function(varCurso) {
		varCurso.put().then(function() {
			var msg = 'O curso '+varCurso.nome+' foi alterado com sucesso!';
			$location.path('programaaprendizagem/curso');
			toaster.pop('success', "Curso", msg);
		},function(response){
			var msg = 'Erro ao tentar salvar o curso '+varCurso.nome+'!';
			console.log('Erro ao gravar status:', data.status);
			$location.path('programaaprendizagem/curso');
			toaster.pop('success', "Curso", msg);
		});
	};

});

angular.module('Curso').controller('CadastrarCursoCtrl', function($scope,  $location, $rootScope, $modal, Restangular, UtilService, toaster) {
	
	$scope.curso = {};
	$scope.curso.modulos = [];

	$scope.objetoOrigem = angular.copy($scope.curso);

	Restangular.all('modulo').getList().then(function(data) {
    	$scope.selectModulos = UtilService.limparDados(data);
  	}); 


	$scope.salvarCurso = function(varCurso) {
		Restangular.all('curso').post(varCurso).then(function() {
			var msg = 'O curso '+varCurso.nome+' foi cadastrado com sucesso!';
			$location.path('programaaprendizagem/curso');
			toaster.pop('success', "Curso", msg);
		}, function(data){
				console.log('Erro ao gravar status:', data.status);
				var msg = 'Erro ao tentar salvar o curso ' + varCurso.nome + '!';
				$location.path('programaaprendizagem/curso');
				toaster.pop('success', "Curso", msg);
		});
	};

	$scope.modalNovoModulo = function () {
	  var modalScope = $rootScope.$new();
	   modalScope.modalInstance  = $modal.open({
	     templateUrl: './modules/programaaprendizagem/modulo/views/formModulo.html',
	     controller: 'CadastrarModuloCtrl',
	     size: 'lg',
	     scope: modalScope
	   });

	   modalScope.modalInstance.result.then(function (modulo) {      
	     $scope.modulos.push(modulo);
	     console.log('modulo', modulos)
	   }, function () {
	     console.log('FECHOU MODULO')
	   });
	};

	$scope.adicionarModulo = function(modulo){
     	$scope.curso.modulos.push(modulo);
     	$scope.formModulo.$setPristine();
     	console.log($scope.curso.modulos);
     	$scope.selectModulos = _.without($scope.selectModulos, modulo);
    }

    // $scope.salvarModalModulo = function(modulo) {
    // 	$scope.curso.modulos.push(modulo);
    // 	$scope.formModulo.$setPristine();
    // } 

    $scope.removerModulo = function(modulo){
        $scope.curso.modulos = _.without($scope.curso.modulos, modulo);
        $scope.selectModulos.push(modulo);
    }

	console.log('ObjModulo',$scope.curso.modulos);



});

angular.module('Curso').controller('VisualizarCursoCtrl', function($scope, $stateParams, Restangular, UtilService, toaster) {
	var idCurso = $stateParams.idCurso;
	Restangular.one('curso', idCurso).get().then(function(data) {
		$scope.curso = data;
	});

	$scope.visualizar = true;
});

 

