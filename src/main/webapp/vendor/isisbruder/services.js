angular.module('fe-services', []).service('UtilService', function(Restangular, $timeout) {
	var self = this;
    this.limparObjeto = function(objeto){
    	return _.omit(objeto,[
			'$fromServer',
			'addRestangularMethod',
			'all',
			'allUrl',
			'clone',
			'customDELETE',
			'customGET',
			'customGETLIST',
			'customOperation',
			'customPOST',
			'customPUT',
			'doDELETE',
			'doGET',
			'doGETLIST',
			'doPOST',
			'doPUT',
			'get',
			'getList',
			'getRequestedUrl',
			'getRestangularUrl',
			'getParentList',
			'head',
			'length',
			'one',
			'oneUrl',
			'options',
			'parentResource',
			'patch',
			'post',
			'put',
			'putElement',
			'remove',
			'reqParams',
			'restangularCollection',
			'route',
			'several',
			'trace',
			'withHttpConfig'
		]);
    };
    this.limparDados = function(data) {
	  	if(angular.isArray(data)){
	  		angular.forEach(data, function(valor, indice){
				data[indice] = self.limparObjeto(valor);
			});
	  	} else {
	  		data = self.limparObjeto(data);
	  	}	  	
	  	return data;     
    };
    this.tratarObjetoPaginado = function(objeto){
    	var route = objeto.getRestangularUrl().split('/')[2];
    	var array = Restangular.restangularizeCollection(null, objeto.list, route);
		var page = {
			pageNumber: objeto.pageNumber,
			pagesAround: objeto.pagesAround,
			pageCount: objeto.pageCount
		};
		return [array, page];
    }

    this.getPaises = function(){
    	return Restangular.all('pais').getList().$object;
    }

    this.getUfsPorPais = function(idPais){
    	//return Restangular.all('uf').one('listarPorPais',idPais).getList().$object;
    	Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
    		return data;
    	});
    }

    this.buscar = function(scope) {
    	if(scope.timeBusca) {
			$timeout.cancel(scope.timeBusca);
		};
		scope.timeBusca = $timeout( function(){
			scope.load(1);
		},800);
    }
    
 });
angular.module('fe-services').service('EnderecoService', function(Restangular, UtilService) {
	var self = this;

	this.getPaises = function(callback){
		Restangular.all('pais').getList().then(function(data) {
		  var dados = UtilService.limparDados(data);
		  callback(dados);
		});
	};

	this.getUfs = function(idPais, callback){
		Restangular.all('uf').one('listarPorPais',idPais).getList().then(function(data){
		  var dados = UtilService.limparDados(data);
		  callback(dados);
		});
	};

	this.getCidades = function(idUf, callback){
	  Restangular.all('cidade').one('listarPorUf',idUf).getList().then(function(data){
	    var dados = UtilService.limparDados(data);
	    callback(dados);
	  });
	};

	this.getBairros = function(idCidade, callback){
	  Restangular.all('bairro').one('listarPorCidade',idCidade).getList().then(function(data){
	    var dados = UtilService.limparDados(data);
	    callback(dados);
	  });
	};

	this.getLogradouros = function(idBairro, callback){
	  Restangular.all('logradouro').one('listarPorBairro', idBairro).getList().then(function(data){
	    var dados = UtilService.limparDados(data);
	    callback(dados);
	  });
	};

	this.getTiposLogradouro = function(callback){
		Restangular.all('logradouro').one('listarTiposLogradouro').getList().then(function(data) {
		  var dados = UtilService.limparDados(data);
		  callback(dados);
		})
	};

});