
angular.module('ProcessoSeletivo').controller('MapaProcessoSeletivoCtrl', function($scope, $location, $timeout, Restangular, UtilService, angulargmUtils, angulargmContainer, growl) {
	console.log('Mapa Processo Seletivo');

    $scope.filtro = {};
    $scope.filtro.raioEmpresa = 2;
    $scope.filtro.candidatoSelecionados = true;
    $scope.filtro.candidatoNaoSelecionados = true;

	$scope.getEnderecoLatLng = function(endereco, callback){
		console.log('callback',  callback);
		if(endereco){
			var stringEndereco = 
			endereco.logradouro.tipoLogradouro.nome + ' ' +
			endereco.logradouro.nome + ', ' +
			endereco.numero + ' - ' +
			endereco.bairro.cidade.nome + ' - ' +
			endereco.bairro.cidade.unidadeFederativa.nome;	
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': stringEndereco }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
			        //console.log({lat: latitude, lng: longitude});
			        callback({lat: latitude, lng: longitude});
			        return {lat: latitude, lng: longitude};
			    } else {
			    	alert(stringEndereco )
			    }
			});
		}		
		console.log(stringEndereco);
	}

	$scope.setCorEscolaCandidato = function(candidatos) {
		$scope.escolas = [];
		var newCandidatos = [];
		angular.forEach(candidatos, function(candidato){
			var escola = _.find($scope.escolas, function(escola){
				return escola.id == candidato.instituicaoEnsino.id;
			});
			if(escola) {
				candidato.instituicaoEnsino.cor = escola.cor;
				newCandidatos.push(candidato);
			} else {
				candidato.instituicaoEnsino.cor = $scope.getRandomColor();	
				$scope.escolas.push(candidato.instituicaoEnsino);
				newCandidatos.push(candidato);
			}			
		})
		console.log('novo candidatos', $scope.escolas);
		return newCandidatos;
	}

	// $scope.getCandidatos = function() {
	// 	Restangular.all('candidato').getList().then(function(data) {
	// 		$scope.candidatos = $scope.setCorEscolaCandidato(data);
	// 		console.log('Candidatos recuperados do banco de dados: ', $scope.candidatos);
 //            $scope.raioEmpresas();
	// 		$scope.atualizarMapa();
	// 	});
	// };

	$scope.atualizarMapa = function() {
		$scope.$broadcast('gmMarkersRedraw', 'candidatos');
		$scope.$broadcast('gmMarkersRedraw', 'candidatosSelecionados');
		$scope.$broadcast('gmMarkersRedraw', 'escolas');
		$scope.$broadcast('gmMarkersRedraw', 'empresasProcesso');
	}

	$scope.novaCorCandidatos = function() {
		$scope.candidatos = $scope.setCorEscolaCandidato($scope.candidatos);
		$scope.atualizarMapa();
	}

	$scope.raioEmpresas = function() {
        console.log('Raio de Empresas');
		if(!$scope.circlesEmpresas) {
			$scope.circlesEmpresas = [];
		} else {
			angular.forEach($scope.circlesEmpresas, function(circle){
				circle.setMap(null);
			});
			$scope.circlesEmpresas = [];
		}
		var map = angulargmContainer.getMap('mapaProcessoSeletivo');
		angular.forEach($scope.empresasProcesso, function(empresaProcesso) {
			var center = new google.maps.LatLng(empresaProcesso.empresa.enderecos[0].geoLocalizacao.latitude, empresaProcesso.empresa.enderecos[0].geoLocalizacao.longitude)
			var circleOptions = {
			  strokeColor: '#96281B',
			  strokeOpacity: 0.8,
			  strokeWeight: 2,
			  fillColor: '#96281B',
			  fillOpacity: 0.35,
			  map: map,
			  center: center,
			  radius: $scope.filtro.raioEmpresa * 500
			};
			var circle = new google.maps.Circle(circleOptions);
			$scope.circlesEmpresas.push(circle);
		});
	
	}

    $scope.$watch('empresasProcesso', function() {
        $scope.raioEmpresas();
    });

    $scope.$watch('filtro.raioEmpresa', function() {
        $scope.raioEmpresas();
    });
	

	//$scope.getCandidatos();
	
	//$scope.getLatLng('Av. São Paulo, 458 - Maringá-PR');

	$scope.getRandomColor = function() {
		//return '#'+Math.floor(Math.random()*16777215).toString(16);
		return randomColor({luminosity: 'dark'});
	}

	$scope.iconConfigNaoSelecionado = {
		scale: 0.5,
		strokeWeight: 3,
		fillColor: '#D5D5D5',
	};

	$scope.iconConfig = {
		scale: 0.5,
		strokeWeight: 1,
		strokeColor: 'black'
	};

	$scope.iconConfigEscola = {
		scale: 0.6,
		strokeWeight: 1,
		strokeColor: 'black',
		strokeOpacity: 0.3,
		anchor: new google.maps.Point(19, -15),
		fillOpacity: 0.9
	};

	$scope.getConfigMarkerEmpresa = function(object) {
		var opts = {
			title: object.empresa.fantasia,
				icon: {
				scale: 0.7,
				strokeWeight: 1,
				strokeColor: 'black',
				strokeOpacity: 0.3,
				fillOpacity: 0.9,
                anchor: new google.maps.Point(19, -15),
				path: fontawesome.markers.BUILDING, 
				fillColor: '#96281B'
			}
		}
		return opts;
	}

	$scope.getConfigMarkerCandidato = function(object, filtro) {
		if(!filtro) {
			var icon = {
				fillOpacity: 0,
				strokeOpacity: 0,
			};			
		} else {
			var icon = {
				fillOpacity: 0.9,
				strokeOpacity: 0.3,
			};
		}
		icon = _.extend({
			path: fontawesome.markers.USER, 
			fillColor: object.instituicaoEnsino.cor
		}, icon);
		console.log('icon:', icon);
		var opts = {
			title: object.nome,
			icon: _.extend(icon, $scope.iconConfig)
		}
		return opts;
	}

	$scope.getConfigMarkerCandidatoNaoSelecionado = function(object, filtro) {
		if(filtro  === undefined) filtro = true;

		if(!filtro) {
			var icon = {
				fillOpacity: 0,
				strokeOpacity: 0,
			};			
		} else {
			var icon = {
				fillOpacity: 0.9,
				strokeOpacity: 1,
			};
		}
		icon = _.extend({
			path: fontawesome.markers.USER, 
			strokeColor: object.candidato.instituicaoEnsino.cor
		}, icon);
		var opts = {
			title: object.candidato.nome,
			icon: _.extend(icon, $scope.iconConfigNaoSelecionado)
		}
		return opts;
	}

	$scope.getConfigMarkerEscola = function(object) {
		var opts = {
			title: object.nome,
			icon: _.extend({path: fontawesome.markers.UNIVERSITY, fillColor: object.cor }, $scope.iconConfigEscola)
		}
		return opts;
	}

	$scope.getIconLegendColor = function(candidato) {
		return {
			color: candidato.instituicaoEnsino.cor
		}
	}

	$scope.getBorderLegendColor = function(candidato) {
		return {
			'border-color': candidato.instituicaoEnsino.cor
		}
	}

	$scope.options = {
		map: {
			center: new google.maps.LatLng(-23.42, -51.93),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	};

	//$scope.mapaProcessoSeletivo = {};

	$scope.triggerOpenInfoWindow = function(candidato) {
		console.log('trigger open', candidato);
		$scope.candidatoInfoWindow = candidato;
		var geoLocalizacao = {
			lat: candidato.enderecos[0].geoLocalizacao.latitude,
			lgn: candidato.enderecos[0].geoLocalizacao.longitude
		}
		console.log('geoLocalizacao', geoLocalizacao);
		$scope.markerEvents = [
		{
			event: 'openinfowindow',
			locations: [angulargmUtils.objToLatLng({lat: candidato.enderecos[0].geoLocalizacao.latitude, lng: candidato.enderecos[0].geoLocalizacao.longitude})]
		},
		];
	}

	$scope.candidatoGoLegend = function(id) {		
	  var item = $('#' + id);
	  var lista = $('#candidatos-legend');	  
	  if(item) 
	    lista.scrollTop(lista.scrollTop() + item.position().top - 15);	
	}

	//$scope.candidatosSelecionados = [];

	// $scope.selecionarCandidato = function(candidato) {
	// 	$scope.candidatosSelecionados.push(candidato);
	// 	$scope.candidatos = _.without($scope.candidatos, candidato);
	// 	$scope.atualizarMapa();
	// }

	// $scope.retirarSelecaoCandidato = function(candidato) {
	// 	$scope.candidatos.push(candidato);
	// 	$scope.candidatosSelecionados = _.without($scope.candidatosSelecionados, candidato);
	// 	$scope.atualizarMapa();
	// }
});