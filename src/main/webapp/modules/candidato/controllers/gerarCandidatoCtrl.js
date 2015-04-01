angular.module('Candidato').controller('GerarCandidatoCtrl', function($scope, $timeout, Restangular, UtilService /*, growl*/) {

  $scope.salvarCandidato = function(varCandidato) {
    Restangular.all('candidato').post(varCandidato).then(function(data) {
     var msg = 'O Candidato '+varCandidato.nome+' foi cadastrado com sucesso!';
     $scope.quantGerados++;
     if ($scope.quantGerados == $scope.quantGerar) {
      $scope.quantGerar = 0;
      $scope.quantGerados = 0;
      $scope.gerandoCandidatos = false;
     };
    },function(data){
     console.log('Erro ao gravar status:', data.status);
     var msg = 'Erro ao tentar salvar o candidato '+varCandidato.nome+'!';
     $scope.quantGerados++;
     if ($scope.quantGerados == $scope.quantGerar) {
      $scope.quantGerar = 0;
      $scope.quantGerados = 0;
      $scope.gerandoCandidatos = false;
     };
    });
  }

  $scope.getTodosLogradouros = function() {
    Restangular.all('logradouro').getList().then(function(data) {
      $scope.logradouros = UtilService.limparDados(data);     
    });
  }

  $scope.getInstituicoesEnsino = function() {
    Restangular.all('instituicaoEnsino').getList().then(function(data) {
      $scope.instituicoes = UtilService.limparDados(data);   
    });
  }

  $scope.getEnderecoRandom = function() {
    var logradouro = chance.pick($scope.logradouros);
    var bairro = logradouro.faixasDeCep[0].bairro;
    var endereco = {
      'bairro': bairro,
      'logradouro': logradouro,
      'numero': chance.integer({min: 1, max: 999})
    };
    return endereco;
  }

  $scope.getEnderecoLatLng = function(endereco, callback){
    //console.log('callback',  callback);
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
          if(((results[0].geometry.location.lat()!=-23.4209995)&&(results[0].geometry.location.lng()!=-51.933055800000034))&&((results[0].geometry.location.lat()!=-25.4308366)&&(results[0].geometry.location.lng()!=-49.27365320000001)))
          {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();  
            callback({latitude: latitude, longitude: longitude});
          } else {
            console.log('Endereço não encontrado!');
            $scope.quantGerados++;
            if ($scope.quantGerados == $scope.quantGerar) {
             $scope.quantGerar = 0;
             $scope.quantGerados = 0;
             $scope.gerandoCandidatos = false;
            };
            $scope.gerarCandidatos(1);
          }    
              //console.log({lat: latitude, lng: longitude});
              return {latitude: latitude, longitude: longitude};
        } else {
            console.log('A requisição falhou!');
            $scope.quantGerados++;
             if ($scope.quantGerados == $scope.quantGerar) {
              $scope.quantGerar = 0;
              $scope.quantGerados = 0;
              $scope.gerandoCandidatos = false;
             };
             //$scope.gerarCandidatos(1);
        }
      });
    }   
    console.log(stringEndereco);
  }

  $scope.getSocioEconomicosRandom = function() {
    var residentes = chance.integer({min: 1, max: 6});
    var objeto = {
      "moraComResponsavel":true,
      "auxilioGovernamental":true,
      "numeroResidentesNaCasa":residentes,
      "quantasPessoasTrabalham":chance.integer({min: 1, max: residentes}),
      "beneficioSocial": chance.pick(['Bolsa Família']),
      "valorBeneficio": chance.integer({min: 300, max: 800}),
      "rendaPerCapita": chance.integer({min: 300, max: 800})
    }
    return objeto;
  }

  $scope.getCPF = function() {
    var randomiza =  function(n) {
      var ranNum = Math.round(Math.random()*n);
      return ranNum;
    }
    
    var mod = function(dividendo,divisor) {
      return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
    }
    
    var gerarCPF = function() {
      comPontos = false; // TRUE para ativar e FALSE para desativar a pontuação.
      
      var n = 9;
      var n1 = randomiza(n);
      var n2 = randomiza(n);
      var n3 = randomiza(n);
      var n4 = randomiza(n);
      var n5 = randomiza(n);
      var n6 = randomiza(n);
      var n7 = randomiza(n);
      var n8 = randomiza(n);
      var n9 = randomiza(n);
      var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
      d1 = 11 - ( mod(d1,11) );
      if (d1>=10) d1 = 0;
      var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
      d2 = 11 - ( mod(d2,11) );
      if (d2>=10) d2 = 0;
      retorno = '';
      if (comPontos) cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
      else cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
    
      return cpf;
    }
    
    return gerarCPF();
  }

  $scope.getCandidatoRandom = function() {
    var instituicao = chance.pick($scope.instituicoes);
    //var cpf = chance.integer({min: 10000000000, max: 99999999999});
    var cpf = $scope.getCPF();
    var rg = chance.integer({min: 100000000, max: 999999999});
    var nis = chance.integer({min: 100000000, max: 999999999});
    var pis = chance.integer({min: 10000000000, max: 99999999999});
    var telefone = chance.integer({min: 4430000000, max: 4439999999});
    var dataNascimento = chance.birthday({ year: chance.year({ min: 1995, max: 2000 }) });
    var sexo = chance.gender();
    var sexoString = sexo == 'Male' ? 'Masculino' : 'Feminino';
    var pai = {'nome': chance.name({ gender: 'male' }) };
    var mae = {'nome': chance.name({ gender: 'female' }) };
    var objeto = {
      "instituicaoEnsino":instituicao,
      "etnia": chance.pick(['Amarela', 'Branca', 'Negra', 'Parda', 'Indigena']),
      "habilidadeManual": chance.pick(['Destro', 'Canhoto', 'Ambidestro']),
      "estadoCivil": chance.pick(['Casado', 'Solteiro', 'Divorciado']),
      "email": chance.email({domain: 'exemplo.com.br'}),
      "mae": mae,
      "pai": pai,
      "temFilhos":false,
      "documentos":[{"type":"cpf","numero": cpf},{"type":"rg", "numero": rg},{"type":"carteiraTrabalho", "numero": nis, "pis": pis},{"type":"certidaoNascimento","dataNascimento": dataNascimento}],
      "telefones":[{"tipoTelefone":{"id":1,"descricaoTipo":"Comercial"},"numero": telefone}],
      "enderecos":[$scope.getEnderecoRandom()],
      "nome": chance.name({ gender: sexo }),
      "sexo":sexoString,
      "dadosSocioEconomicos": $scope.getSocioEconomicosRandom(),
      "serieEscolar": chance.integer({min: 1, max: 3}),
      "turno": chance.pick(['Tarde', 'Manha', 'Noite'])
    };
    return objeto;
  }

  $scope.gerarCandidatos = function(quantidade) {
    if($scope.quantGerar==0) {
      $scope.quantGerar = quantidade;
    } else {
      $scope.quantGerar += quantidade;
    }
    $scope.gerandoCandidatos = true;
    for (var i = 0; i < quantidade; i++) {
      $timeout(function() {
        candidato = $scope.getCandidatoRandom();
        $scope.getEnderecoLatLng(candidato.enderecos[0], function(dado){
          angular.extend(candidato.enderecos[0], {'geoLocalizacao': dado});
          $scope.salvarCandidato(candidato);  
        });  
      }, 1000 * i);          
    };
  }

  $scope.init = function() {
    $scope.logradouros = [];
    $scope.instituicoes = [];
    $scope.getTodosLogradouros();
    $scope.getInstituicoesEnsino();
    $scope.quantGerar = 0;
    $scope.quantGerados = 0;
    $scope.gerandoCandidatos = false;
  };

  $scope.init();

});