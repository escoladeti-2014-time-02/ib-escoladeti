angular.module('ProcessoSeletivo', ['brasil.filters', 'fe-services', 'fe-directives', 'toaster', 'ui.utils']).controller('ListarProcessoSeletivoCtrl', function($scope, $location, $timeout, $modal, $rootScope, $stateParams,  Restangular, UtilService, toaster) {
  $scope.load = function(page) {
    Restangular.all('processoseletivo').one('pagina', page).get({busca: $scope.busca}).then(function(data) {
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      $scope.processosSeletivos = objetoPaginado[0];
      $scope.page = objetoPaginado[1];
      console.log('Processos Seletivos recuperados do banco de dados: ' + $scope.processosSeletivos);
      console.log($scope.processosSeletivos);
    });
  };

  $scope.load(1);

  $scope.buscar = function(){
    UtilService.buscar($scope);
  }

  $scope.removerProcessoSeletivo = function(varProcessoSeletivo){
    if (confirm("Deseja excluir o Processo Seletivo " + varProcessoSeletivo.descricao + "?")) {
      varProcessoSeletivo.remove().then(function() {
        var msg = 'O Processo Seletivo '+varProcessoSeletivo.descricao+' foi excluído com sucesso!';
        toaster.pop('success', "Processo Seletivo", msg); 
        $scope.load(1);
      }, function(data){
        console.log('Erro ao gravar status:', data.status);
        var msg = 'Erro ao tentar excluir o Processo Seletivo '+varProcessoSeletivo.descricao+'!';
        toaster.pop('error', "Processo Seletivo", msg);    
      });
    };
  }

});

angular.module('ProcessoSeletivo').controller('CadastrarProcessoSeletivoCtrl', function($scope, $location, $timeout, $modal, $rootScope, $stateParams,  Restangular, UtilService,  toaster) {
  
  $scope.salvarProcessoSeletivo = function(varProcessoSeletivo) {
    var dados = angular.copy(varProcessoSeletivo);
    Restangular.all('processoseletivo').post(dados).then(function(data) {
      var msg = 'O processo seletivo '+ dados.descricao +' foi cadastrado com sucesso!';
      $location.path('processoseletivo/' + data.id);
      toaster.pop('success', "Processo Seletivo", msg); 
    },function(data){
      console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar salvar o processo seletivo '+dados.descricao+'!';
      toaster.pop('error', "Processo Seletivo", msg); 
    });
  }  

  $scope.getCandidatosPre = function(perfilCandidato) {   
    Restangular.all('processoseletivo').one('previsualizarPerfil')
        .get(perfilCandidato).then(function(data) {
      $scope.candidatosPerfil = data;
    });  
  };

  $scope.calcularIdade = function(dataNascimento){
    var today = new Date();
    var birthDate = new Date(dataNascimento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  $scope.datePicker = {
    opened: [false , false],
    config: {
      formatYear: 'yy',
      startingDay: 1
    },
    configPopup: {
      currentText: 'Hoje'
    }  
  };    

});
angular.module('ProcessoSeletivo').controller('ProcessoSeletivoCtrl', function($scope, $location, $timeout, $modal, $rootScope, $stateParams,  Restangular, UtilService, angulargmUtils, angulargmContainer, toaster) {
 
  console.log('Id do Processo Seletivo', $stateParams.idProcessoSeletivo);

  $scope.init = function(){
    $scope.empresaProcessoSeletivo = {};
    $scope.modalConfig = {};   
    $scope.candidatosSelecionados = [];
    $scope.candidatosNaoSelecionados = [];
    $scope.loadProcessoSeletivo(); 
    $scope.datePicker = {
      opened: [false , false, false, false],
      config: {
        formatYear: 'yy',
        startingDay: 1
      },
      configPopup: {
        currentText: 'Hoje'
      }  
    }; 

    $scope.filtro = {};
    $scope.filtro.raioEmpresa = 2;
    $scope.filtro.candidatoSelecionados = true;
    $scope.filtro.candidatoNaoSelecionados = true;
    $scope.escolas = []; 
    $scope.exibirMapa = false;

    $("document").ready(function($){
        var nav = $('#fixed-bar');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 310) {
                nav.addClass("fixed-bar-show");
            } else {
                nav.removeClass("fixed-bar-show");
            }
        });
    });

  }

  $scope.loadProcessoSeletivo = function() {
    Restangular.one('processoseletivo', $stateParams.idProcessoSeletivo).get().then(function(data) {
      $scope.processoSeletivo = data;
       $scope.loadCandidatosNaoSelecionados(1);
       $scope.loadCandidatosSelecionados(1);
       $scope.getEmpresasDisponiveis();
       $scope.getEmpresasProcesso();
    });
  }

  $scope.calcularIdade = function(dataNascimento){
    var today = new Date();
    var birthDate = new Date(dataNascimento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  $scope.init();

  $scope.getEmpresasDisponiveis = function() {
    Restangular.all('processoseletivo').one('listarEmpresasDisponiveis', $scope.processoSeletivo.id).getList().then(function(data) {
      $scope.empresas =  UtilService.limparDados(data);
    });
  }

  $scope.getCanidatoAdd = function(filtro) {
    console.log('filtro',filtro);
    var nome = {
      nome: filtro.toString()
    }

    return Restangular.all('processoseletivo').one('listarCandidatosForaProcesso',$scope.processoSeletivo.id).get(nome).then(function(data) {
      return data;
    });
  }

  $scope.getEmpresasProcesso = function() {
    Restangular.all('processoseletivo').one('listarEmpresasProcesso', $scope.processoSeletivo.id).getList().then(function(data) {
      $scope.empresasProcesso =  UtilService.limparDados(data);
      $scope.atualizarMapa();
      $timeout(function(){
        $scope.atualizarMapa();
      }, 3000);
    });
  }

  $scope.getCandidatosPorNivel = function(nivel, pagina, cb) {
    console.log('Nivel', nivel);
    console.log('Pagina', pagina);
    var idProcessoSeletivo = $scope.processoSeletivo.id;
    //Restangular.all('processoseletivo').one('listarPorNivel').one(idProcessoSeletivo.toString()).one(nivel.toString()).one(pagina.toString()).get().then(function(data) {
    Restangular.all('processoseletivo').one('listarPorNivel')
        .one(idProcessoSeletivo.toString()).one(pagina.toString())
            .get({niveis: nivel}).then(function(data) {
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      cb(objetoPaginado[0],objetoPaginado[1]);
    });
  };

  $scope.setCandidatosNivel = function(niveisAtuais, novoNivel, cb) {
    var idProcessoSeletivo = $scope.processoSeletivo.id;
    //Restangular.all('processoseletivo').one('listarPorNivel').one(idProcessoSeletivo.toString()).one(nivel.toString()).one(pagina.toString()).get().then(function(data) {
    Restangular.all('processoseletivo').one('alterarNivelCandidatos')
        .one(idProcessoSeletivo.toString()).one(novoNivel.toString())
            .get({niveisAtuais: niveisAtuais}).then(function(data) {
      objetoPaginado = UtilService.tratarObjetoPaginado(data);
      cb(objetoPaginado[0],objetoPaginado[1]);
    });
  };

  $scope.desselecionarTodosCandidatos = function() {
    //var nivel = $scope.processoSeletivo.statusProcessoSeletivo + 1;
    var niveisAtuais = [];
    var novoNivel = $scope.processoSeletivo.statusProcessoSeletivo;
    for (var i = ($scope.processoSeletivo.statusProcessoSeletivo+1); i <= 4; i++) {
      niveisAtuais.push(i);
    };
    console.log('Niveis', niveisAtuais);
    $scope.setCandidatosNivel(niveisAtuais, novoNivel, function(list, page) {
      $scope.candidatosNaoSelecionados = list;
      $scope.pageNaoSelecionados = page;
      $scope.getCandidatosPorNivelMapa(novoNivel, function(list) {
        console.log(list);
        $scope.candidatosMapaNaoSelecionados = $scope.setCorEscolaCandidato(list);
      });
      $scope.candidatosSelecionados = [];
      $scope.candidatosMapaSelecionados = [];
      $timeout(function(){
        $scope.scrollNaoSelecionados();
      }, 500);
    });    
  }

  $scope.selecionarTodosCandidatos = function() {
    //var nivel = $scope.processoSeletivo.statusProcessoSeletivo + 1;
    var niveisAtuais = [];
    var novoNivel = $scope.processoSeletivo.statusProcessoSeletivo + 1;
    for (var i = ($scope.processoSeletivo.statusProcessoSeletivo); i > 0; i--) {
      niveisAtuais.push(i);
    };
    console.log('Niveis', niveisAtuais);
    $scope.setCandidatosNivel(niveisAtuais, novoNivel, function(list, page) {
      $scope.candidatosSelecionados = list;
      $scope.pageSelecionados = page;
      $scope.getCandidatosPorNivelMapa(novoNivel, function(list) {
        console.log(list);
        $scope.candidatosMapaSelecionados = $scope.setCorEscolaCandidato(list);
      });
      $scope.candidatosNaoSelecionados = [];
      $scope.candidatosMapaNaoSelecionados = [];
      $timeout(function(){
        $scope.scrollSelecionados();
      }, 500);
    });    
  }

  $scope.getCandidatosPorNivelMapa = function(nivel, cb) {
    console.log('Nivel', nivel);
    var idProcessoSeletivo = $scope.processoSeletivo.id;
    //Restangular.all('processoseletivo').one('listarPorNivel').one(idProcessoSeletivo.toString()).one(nivel.toString()).one(pagina.toString()).get().then(function(data) {
    Restangular.all('processoseletivo').one('listarPorNivel')
        .one(idProcessoSeletivo.toString()).get({niveis: nivel}).then(function(data) {
      cb(data);
    });
  };

  $scope.loadCandidatosNaoSelecionados = function(pagina) {
    var nivel = $scope.processoSeletivo.statusProcessoSeletivo;
    $scope.getCandidatosPorNivel(nivel, pagina, function(list, page) {
      console.log(list);
      $scope.candidatosNaoSelecionados = list;
      $scope.pageNaoSelecionados = page;
    });
    $scope.getCandidatosPorNivelMapa(nivel, function(list) {
      console.log(list);
      $scope.candidatosMapaNaoSelecionados = $scope.setCorEscolaCandidato(list);
    });
  }

  $scope.loadCandidatosSelecionados = function(pagina) {
    //var nivel = $scope.processoSeletivo.statusProcessoSeletivo + 1;
    var nivel = [];
    for (var i = ($scope.processoSeletivo.statusProcessoSeletivo+1); i <= 4; i++) {
      nivel.push(i);
    };
    console.log('Niveis', nivel);
    $scope.getCandidatosPorNivel(nivel, pagina, function(list, page) {
      $scope.candidatosSelecionados = list;
      $scope.pageSelecionados = page;
    });
    $scope.getCandidatosPorNivelMapa(nivel, function(list) {
      console.log(list);
      $scope.candidatosMapaSelecionados = $scope.setCorEscolaCandidato(list);
    });
  }

  $scope.tratarCandidato = function(candidatos){
    var arrayDocumentos = ['cpf', 'rg', 'carteiraTrabalho', 'certidaoNascimento'];
    angular.forEach(candidatos, function(candidato){
      if(candidato.documentos){
        var auxDocumentos = [];
        for (var i = 0; i < candidato.documentos.length; i++) {
          var index = arrayDocumentos.indexOf(candidato.documentos[i].type);
          console.log('type', i);
          console.log('index', index);
          auxDocumentos[index] = candidato.documentos[i];
        };
        candidato.documentos = auxDocumentos;
      }
    })
    return candidatos;
  }

  $scope.disabledStatusProcesso = function(status) {
    if(status==2){
      return !($scope.processoSeletivo.statusProcessoSeletivo>1||$scope.candidatosSelecionados.length > 0);  
    } else {
      return !($scope.processoSeletivo.statusProcessoSeletivo>2||$scope.candidatosSelecionados.length > 0);  
    }    
  }

  $scope.salvarProcessoSeletivo = function(varProcessoSeletivo) {
    var dados = angular.copy(varProcessoSeletivo);
    console.log(dados.statusProcessoSeletivo)
    dados.put().then(function(data) {
      var msg = 'O processo seletivo '+ dados.descricao +' foi alterado com sucesso!';
      toaster.pop('success', "Processo Seletivo", msg); 
      //$scope.processoSeletivo = data;
      $scope.loadProcessoSeletivo();
      $('#configuracoesProcessoSeletivo').modal('hide'); 
      $scope.loadCandidatosNaoSelecionados(1);
    },function(data){
      console.log('Erro ao gravar status:', data.status);
      var msg = 'Erro ao tentar salvar o processo seletivo '+dados.descricao+'!';
      toaster.pop('error', "Processo Seletivo", msg); 
    });
   
  }

  $scope.abrirModalConfig = function(modalConfig){
    
    if($scope.processoSeletivo){
      var registro = Restangular.copy($scope.processoSeletivo);
      var modalConfigCtrl = function($scope, $modalInstance){
        $scope.salvarProcessoSeletivo = function(processoSeletivo) {
          $modalInstance.close(processoSeletivo);
        }
      }

       var modalScope = $rootScope.$new();
       modalScope.configModal = registro;

       modalInstance = $modal.open({
         templateUrl: './modules/processoseletivo/views/partials/modalConfiguracoes.html',
         controller: modalConfigCtrl,
         size: 'lg',
         scope: modalScope
       });

       modalInstance.result.then(function (processoSeletivo) {
         $scope.salvarProcessoSeletivo(processoSeletivo);
       }, function () {
         //Modal foi fechado sem o cadastro completo
       });
    }
  }
  
  $scope.checkCandidatoUp = function(obj) {
    var nivel = $scope.processoSeletivo.statusProcessoSeletivo +1;
    $scope.atualizarNivelCandidato(obj.id, nivel);
	}

  $scope.checkCandidatoUpGrid = function(obj) {
    $scope.checkCandidatoUp(obj);
    $scope.scrollNaoSelecionados();
  }


  $scope.checkCandidatoDown = function(obj) {
    var nivel = $scope.processoSeletivo.statusProcessoSeletivo;
    $scope.atualizarNivelCandidato(obj.id, nivel);
  }
  
  $scope.checkCandidatoDownGrid = function(obj) {
    $scope.checkCandidatoDown(obj);
    $scope.scrollSelecionados();
  }

  $scope.atualizarNivelProcesso = function(processo, etapa) {
    var processoSeletivo = Restangular.all('processoseletivo')
        .one("atualizarEtapaProcesso", processo.id).one(etapa.toString());
    processoSeletivo.customPOST(null, '').then(function(data){
      $scope.processoSeletivo = data;
      $scope.loadCandidatosNaoSelecionados(1);
      $scope.loadCandidatosSelecionados(1);
      //$scope.getProcessoClasseStatus(processoSeletivo.statusProcessoSeletivo)
    })
  }

  $scope.atualizarNivelCandidato = function(idCandidatoProcesso ,nivel) {
    var processoSeletivo = Restangular.all('processoseletivo')
        .one("atualizarCandidatoProcesso", idCandidatoProcesso).one(nivel.toString());
    processoSeletivo.customPOST(null, '').then(function(data){
      $scope.loadCandidatosNaoSelecionados(1);
      $scope.loadCandidatosSelecionados(1);
    })
  }

  $scope.adicionarCandidato = function(candidato, nivel){
    var processoSeletivo = Restangular.all('processoseletivo').one("adicionarCandidatoProcesso", $scope.processoSeletivo.id).one(candidato.id.toString(),nivel.toString());
    processoSeletivo.customPOST(null, '').then(function(data){
      $scope.loadCandidatosNaoSelecionados(1);
      $scope.loadCandidatosSelecionados(1);
      delete $scope.addNaoCandidato;
      delete $scope.addCandidato;
    })
  }

  $scope.editarEmpresa = function(empresaProcesso){
    $scope.empresaProcessoSeletivo = empresaProcesso;
    var processoSeletivo = Restangular.all('processoseletivo').one("adicionarEmpresa", $scope.processoSeletivo.id);
    $scope.empresas = _.without(empresaProcesso, $scope.empresasProcessoSeletivo.empresa);
    $scope.getEmpresasDisponiveis();
  }

  $scope.adicionarEmpresa = function(empresaProcesso){
    console.log('BeforePUT', empresaProcesso)
    var processoSeletivo = Restangular.all('processoseletivo').one("adicionarEmpresa", $scope.processoSeletivo.id);
    processoSeletivo.customPOST(empresaProcesso, '').then(function(data){
        var array = angular.copy($scope.empresasProcesso);
        array.push(data);
        $scope.empresasProcesso = array;
        $scope.getEmpresasDisponiveis();
    })
  }

  $scope.removerEmpresa = function(empresaProcesso){
    var processoSeletivo = Restangular.all('processoseletivo').one("removerEmpresa");
    processoSeletivo.customDELETE(empresaProcesso.id).then(function(data){
      $scope.getEmpresasDisponiveis();
      $scope.empresasProcesso = _.without($scope.empresasProcesso, empresaProcesso);
    })
    //$scope.empresasProcesso = _.without($scope.empresasProcesso, empresa);
  }

  $scope.cadastrarEmpresa = function () {
    var modalScope = $rootScope.$new();
     modalScope.modalInstance  = $modal.open({
       templateUrl: './modules/empresa/views/formEmpresa.html',
       controller: 'CadastrarEmpresaCtrl',
       size: 'lg',
       scope: modalScope
     });

     modalScope.modalInstance.result.then(function (empresa) {
       //$scope.selected = selectedItem;
       $scope.empresas.push(empresa);
     }, function () {
       //Modal foi fechado sem o cadastro completo
     });
  };

  $scope.salvarAvaliacao = function(candidatoProcesso){
    var processoSeletivo = Restangular.all('processoseletivo').one("avaliacao", candidatoProcesso.id);
    processoSeletivo.customPOST(candidatoProcesso.avaliacao, '').then(function(data){
      var msg = 'Avaliação salva com sucesso!';
      toaster.pop('success', "Processo Seletivo", msg);
      findCandidato = _.find($scope.candidatosSelecionados, function(find) {
        return candidatoProcesso.id === find.id;
      });
      if(!findCandidato) {
        findCandidato = _.find($scope.candidatosNaoSelecionados, function(find) {
          return candidatoProcesso.id === find.id;
        });
      }
      findCandidato.avaliacao = data;
      //$('#modalAvaliacao').modal('hide');
    })
  }

  $scope.deletarAvaliacao = function(candidatoProcesso){
    var registro = angular.copy(candidatoProcesso);
    candidatoProcesso = {};
    var processoSeletivo = Restangular.all('processoseletivo').one("avaliacao");
    processoSeletivo.customDELETE(registro.id).then(function(data){
      var msg = 'Avaliação excluída com sucesso!';
      toaster.pop('success', "Processo Seletivo", msg); 
      $scope.loadCandidatosNaoSelecionados(1);
      $scope.loadCandidatosSelecionados(1);
    })
  }

  $scope.abrirModalAvaliacao = function(candidatoProcesso) {
    var modalScope = $rootScope.$new();
    modalScope.avaliacaoModal = candidatoProcesso;
    var avaliacaoModalCtrl = function($scope, $modalInstance) {
      console.log('Objeto', $scope.avaliacaoModal);
      $scope.salvarAvaliacao = function(candidatoProcesso){
        var retorno = {
          operacao: 'salvar',
          dados: candidatoProcesso
        }
        $modalInstance.close(retorno);
      }
      $scope.deletarAvaliacao = function(candidatoProcesso){
        var retorno = {
          operacao: 'excluir',
          dados: candidatoProcesso
        }
        $modalInstance.close(retorno);
      }
      $scope.fecharModal = function(){
        $modalInstance.dismiss('Cancelado');
      }
    }
    var modalInstance  = $modal.open({
      templateUrl: './modules/processoseletivo/views/partials/modalAvaliacao.html',
      controller: avaliacaoModalCtrl,
      scope: modalScope,
      backdrop: 'static',
      size: 'lg'
    });

    modalInstance.result.then(function (retorno) {
      console.log('Candidato Processo', retorno.dados);
      if(retorno.operacao == 'salvar') {
        $scope.salvarAvaliacao(retorno.dados);
      } else if(retorno.operacao == 'excluir') {
        $scope.deletarAvaliacao(retorno.dados);
      }      
    }, function () {
      //Modal foi fechado sem o cadastro completo
    });
  }

  $scope.abrirModalEntrevista = function(candidatoProcesso) {
    var modalScope = $rootScope.$new();
    modalScope.entrevistaModal = candidatoProcesso;
    var entrevistaModalCtrl = function($scope, $modalInstance) {
      console.log('Objeto', $scope.entrevistaModal);
      $scope.salvarEntrevista = function(candidatoProcesso){
        var retorno = {
          operacao: 'salvar',
          dados: candidatoProcesso
        }
        $modalInstance.close(retorno);
      }
      $scope.deletarEntrevista = function(candidatoProcesso){
        var retorno = {
          operacao: 'excluir',
          dados: candidatoProcesso
        }
        $modalInstance.close(retorno);
      }
      $scope.fecharModal = function(){
        $modalInstance.dismiss('Cancelado');
      }
    }
    var modalInstance  = $modal.open({
      templateUrl: './modules/processoseletivo/views/partials/modalEntrevista.html',
      controller: entrevistaModalCtrl,
      scope: modalScope,
      backdrop: 'static',
      size: 'lg'
    });

    modalInstance.result.then(function (retorno) {
      console.log('Candidato Processo', retorno.dados);
      if(retorno.operacao == 'salvar') {
        $scope.salvarEntrevista(retorno.dados);
      } else if(retorno.operacao == 'excluir') {
        $scope.deletarEntrevista(retorno.dados);
      }      
    }, function () {
      //Modal foi fechado sem o cadastro completo
    });
  }

  $scope.salvarEntrevista = function(candidatoProcesso){
    var processoSeletivo = Restangular.all('processoseletivo').one("entrevista", candidatoProcesso.id);
    processoSeletivo.customPOST(candidatoProcesso.entrevista, '').then(function(data){
      var msg = 'Entrevista salva com sucesso!';
      toaster.pop('success', "Processo Seletivo", msg); 
      findCandidato = _.find($scope.candidatosSelecionados, function(find) {
        return candidatoProcesso.id === find.id;
      });
      if(!findCandidato) {
        findCandidato = _.find($scope.candidatosNaoSelecionados, function(find) {
          return candidatoProcesso.id === find.id;
        });
      }
      findCandidato.entrevista = data;
    })
  }

  $scope.deletarEntrevista = function(candidatoProcesso){
    // var registro = angular.copy(candidatoProcesso);
    // candidatoProcesso = {};
    var processoSeletivo = Restangular.all('processoseletivo').one("entrevista");
    processoSeletivo.customDELETE(candidatoProcesso.id).then(function(data){
      var msg = 'Entrevista excluída com sucesso!';
      toaster.pop('success', "Processo Seletivo", msg); 
      delete candidatoProcesso.entrevista;
      //$scope.loadCandidatosNaoSelecionados(1);
      //$scope.loadCandidatosSelecionados(1);
      $('#modalEntrevista').modal('hide');
    })
  }
    

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

  $scope.setCorEscolaCandidato = function(candidatosProcesso) {
    
    var newCandidatos = [];
    angular.forEach(candidatosProcesso, function(candidatoProcesso){
      var escola = _.find($scope.escolas, function(escola){
        return escola.id == candidatoProcesso.candidato.instituicaoEnsino.id;
      });
      if(escola) {
        candidatoProcesso.candidato.instituicaoEnsino.cor = escola.cor;
        newCandidatos.push(candidatoProcesso);
      } else {
        candidatoProcesso.candidato.instituicaoEnsino.cor = $scope.getRandomColor();  
        $scope.escolas.push(candidatoProcesso.candidato.instituicaoEnsino);
        newCandidatos.push(candidatoProcesso);
      }     
    })
    console.log('Escolas: ', $scope.escolas);
    return newCandidatos;
  }

  // $scope.getCandidatos = function() {
  //  Restangular.all('candidato').getList().then(function(data) {
  //    $scope.candidatos = $scope.setCorEscolaCandidato(data);
  //    console.log('Candidatos recuperados do banco de dados: ', $scope.candidatos);
 //            $scope.raioEmpresas();
  //    $scope.atualizarMapa();
  //  });
  // };

  $scope.atualizarMapa = function() {
    $scope.$broadcast('gmMarkersRedraw', 'candidatosMapaNaoSelecionados');
    $scope.$broadcast('gmMarkersRedraw', 'candidatosMapaSelecionados');
    $scope.$broadcast('gmMarkersRedraw', 'escolas');
    $scope.$broadcast('gmMarkersRedraw', 'empresasProcesso');
  }

  $scope.novaCorCandidatos = function() {
    $scope.escolas = [];
    $scope.candidatosMapaSelecionados = $scope.setCorEscolaCandidato($scope.candidatosMapaSelecionados);
    $scope.candidatosMapaNaoSelecionados = $scope.setCorEscolaCandidato($scope.candidatosMapaNaoSelecionados);
    $scope.atualizarMapa();
  }

  $scope.raioEmpresas = function() {
        console.log('Raio de Empresas');
    if(!$rootScope.circlesEmpresas) {
      $rootScope.circlesEmpresas = [];
    } else {
      angular.forEach($rootScope.circlesEmpresas, function(circle){
        circle.setMap(null);
      });
      $rootScope.circlesEmpresas = [];
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
      $rootScope.circlesEmpresas.push(circle);
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
      strokeColor: object.instituicaoEnsino.cor
    }, icon);
    var opts = {
      title: object.nome,
      icon: _.extend(icon, $scope.iconConfigNaoSelecionado)
    }
    return opts;
  }

  $scope.getConfigMarkerEscola = function(object) {
    console.log('Cor da Escola', object.cor);
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

  $scope.getProcessoClasseStatus = function(nivelProcesso) {
    console.log('ok');
    //$('.statusPreSelecao').removeClass("btn-primary");
    //$('.statusPreSelecao').removeClass("btn-primary");
    if(nivelProcesso==1){
      $('.statusPreSelecao').removeClass("btn-default");
      $('.statusPreSelecao').addClass("btn-primary");
      $('.statusSelecao').removeClass("btn-primary");
      $('.statusSelecao').addClass("btn-default");
      $('.statusAvaliacao').removeClass("btn-primary");
      $('.statusAvaliacao').addClass("btn-default");
    } else if(nivelProcesso == 2) {
      $('.statusSelecao').removeClass("btn-default");
      $('.statusSelecao').addClass("btn-primary");
      $('.statusPreSelecao').removeClass("btn-primary");
      $('.statusPreSelecao').addClass("btn-default");
      $('.statusAvaliacao').removeClass("btn-primary");
      $('.statusAvaliacao').addClass("btn-default");
    }  else if(nivelProcesso == 3) {
      $('.statusAvaliacao').removeClass("btn-default");
      $('.statusAvaliacao').addClass("btn-primary");
      $('.statusPreSelecao').removeClass("btn-primary");
      $('.statusPreSelecao').addClass("btn-default");
      $('.statusSelecao').removeClass("btn-primary");
      $('.statusSelecao').addClass("btn-default");
    }  
  }

  $scope.scrollSelecionados = function() {
    $('html, body').animate({
          scrollTop: ($('#panelSelecionados').offset().top -125)
      },500);
  }

  $scope.scrollNaoSelecionados = function() {
    $('html, body').animate({
          scrollTop: ($('#panelNaoSelecionados').offset().top -125)
      },500);
  }

  $scope.scrollTop = function() {
    $('html, body').animate({
          scrollTop: (0)
      },500);
  }

  $scope.scrollMapa = function(exibirMapa) {
    console.log(exibirMapa);
    if(exibirMapa){      
      $timeout(function(){
        $('html, body').animate({
            scrollTop: ($('#panelMapa').offset().top -125)
        },500);
      }, 200);
    }    
  }


  });

angular.module('ProcessoSeletivo').controller('VisualizarProcessoSeletivoCtrl', function($scope, $stateParams,  Restangular){
	
	$scope.visualizar = true;

});

