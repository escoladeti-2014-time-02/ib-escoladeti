angular.module('time02', ['restangular', 'ngRoute', 'Pais', 'Uf', 'Cidade','Bairro', 'Logradouro', 'Candidato','PerfilDeAcesso', 'ProcessoSeletivo','Usuario', 'Empresa', 'InstituicaoDeEnsino','Disciplina','Colaborador','Modulo','Curso','Turma','Aula','Parametro','Contrato','fe-services', 'fe-directives', 'AngularGM','angular-growl','ngAnimate', 'angular-loading-bar', 'ui.utils', 'ui.bootstrap', 'ngCpfCnpj','ImageCropper', 'brasil.filters']).
  config(function($routeProvider, $locationProvider, RestangularProvider, growlProvider) {
    //Configurações do Roteador
    $routeProvider.

      //Rota da Home
      when('/', {
        templateUrl:'./modules/main/views/home.html',
        //controller:'ListarPaisCtrl'
      }).

      //Rotas da entidade Pais
      when('/endereco/pais', {
        templateUrl:'./modules/pais/views/gridPais.html',
        controller:'ListarPaisCtrl'
      }).
      when('/endereco/pais/visualizar/:idPais', {
        templateUrl:'./modules/pais/views/formPais.html',
        controller:'VisualizarPaisCtrl', 
        resolve: {
          idPais: function($route){
            return $route.current.params.idPais;
          }
        }
      }).
      when('/endereco/pais/cadastrar', {
        templateUrl:'./modules/pais/views/formPais.html',
        controller:'CadastrarPaisCtrl'
      }).
      when('/endereco/pais/editar/:idPais', {
        templateUrl:'./modules/pais/views/formPais.html',
        controller:'EditarPaisCtrl', 
        resolve: {
          idPais: function($route){
            return $route.current.params.idPais;
          }
        }
      }).

      //Rotas da entidade Uf
      when('/endereco/uf', {
        templateUrl:'./modules/uf/views/gridUf.html',
        controller:'ListarUfCtrl'
      }).
      when('/endereco/uf/visualizar/:idUf', {
        templateUrl:'./modules/uf/views/formUf.html',
        controller:'VisualizarUfCtrl', 
        resolve: {
          idUf: function($route){
            return $route.current.params.idUf;
          }
        }
      }).
      when('/endereco/uf/cadastrar', {
        templateUrl:'./modules/uf/views/formUf.html',
        controller:'CadastrarUfCtrl' 
      }).
      when('/endereco/uf/editar/:idUf', {
        templateUrl:'./modules/uf/views/formUf.html',
        controller:'EditarUfCtrl',
        resolve: {
          idUf: function ($route){
            return $route.current.params.idUf;
          }
        }
      }).

      //Rotas da entidade Cidade
      when('/endereco/cidade', {
        templateUrl:'./modules/cidade/views/gridCidadeDistrito.html',
        controller:'ListarCidadeCtrl'
      }).
      when('/endereco/cidade/visualizar/:idCidade', {
        templateUrl:'./modules/cidade/views/formCidadeDistrito.html',
        controller:'VisualizarCidadeCtrl', 
        resolve: {
          idCidade: function($route){
            return $route.current.params.idCidade;
          }
        }
      }).
      when('/endereco/cidade/cadastrar', {
        templateUrl:'./modules/cidade/views/formCidadeDistrito.html',
        controller:'CadastrarCidadeCtrl' 
      }).
      when('/endereco/cidade/editar/:idCidade', {
        templateUrl:'./modules/cidade/views/formCidadeDistrito.html',
        controller:'EditarCidadeCtrl',
        resolve: {
          idCidade: function($route){
            return $route.current.params.idCidade;
          }
        }
      }).

      //Rotas da entidade Bairro
      when('/endereco/bairro', {
        templateUrl:'./modules/bairro/views/gridBairro.html',
        controller:'ListarBairroCtrl'
      }).
      when('/endereco/bairro/visualizar/:idBairro', {
        templateUrl:'./modules/bairro/views/formBairro.html',
        controller:'VisualizarBairroCtrl', 
        resolve: {
          idBairro: function($route){
            return $route.current.params.idBairro;
          }
        }
      }).
      when('/endereco/bairro/cadastrar', {
        templateUrl:'./modules/bairro/views/formBairro.html',
        controller:'CadastrarBairroCtrl' 
      }).
      when('/endereco/bairro/editar/:idBairro', {
        templateUrl:'./modules/bairro/views/formBairro.html',
        controller:'EditarBairroCtrl',
        resolve: {
          idBairro: function($route){
            return $route.current.params.idBairro;
          }
        }
      }).

      //Rotas da entidade Logradouro
      when('/endereco/logradouro', {
        templateUrl:'./modules/logradouro/views/gridLogradouro.html',
        controller:'ListarLogradouroCtrl'
      }).
      when('/endereco/logradouro/visualizar/:idLogradouro', {
        templateUrl:'./modules/logradouro/views/formLogradouro.html',
        controller:'VisualizarLogradouroCtrl', 
        resolve: {
          idLogradouro: function($route){
            return $route.current.params.idLogradouro;
          }
        }
      }).
      when('/endereco/logradouro/cadastrar', {
        templateUrl:'./modules/logradouro/views/formLogradouro.html',
        controller:'CadastrarLogradouroCtrl'
      }).
      when('/endereco/logradouro/editar/:idLogradouro', {
        templateUrl:'./modules/logradouro/views/formLogradouro.html',
        controller:'EditarLogradouroCtrl',
        resolve: {
          idLogradouro: function($route){
            return  $route.current.params.idLogradouro;
          }
        }
      }).

      //Rotas da entidade Pessoa
      when('/pessoa', {
        templateUrl:'./modules/pessoa/views/gridPessoa.html',
        controller:'ListarPessoaCtrl'
      }).
      when('/pessoa/cadastrar', {
        templateUrl:'./modules/pessoa/views/formPessoa.html',
        controller:'CadastrarPessoaCtrl'
      }).
      when('/pessoa/editar/:idPessoa', {
        templateUrl:'./modules/pessoa/views/formPessoa.html',
        controller:'EditarPessoaCtrl',
        resolve: {
          idPessoa: function($route){
            return $route.current.params.idPessoa;
          }
        }
      }).

       //Rotas da entidade Candidato
      when('/candidato', {
        templateUrl:'./modules/candidato/views/gridCandidato.html',
        controller:'ListarCandidatoCtrl'
      }).
      when('/candidato/cadastrar', {
        templateUrl:'./modules/candidato/views/formCandidato.html',
        controller:'CadastrarCandidatoCtrl'
      }).
      when('/candidato/cadastrar/simplificado', {
        templateUrl:'./modules/candidato/views/formCandidatoSimplificado.html',
        controller:'CadastrarCandidatoCtrl'
      }).
      when('/candidato/editar/simplificado/:idCandidato', {
        templateUrl:'./modules/candidato/views/formCandidatoSimplificado.html',
        controller:'EditarCandidatoCtrl',
        resolve: {
          idCandidato: function($route){
            return $route.current.params.idCandidato;
          }
        }
      }).
      when('/candidato/editar/:idCandidato', {
        templateUrl:'./modules/candidato/views/formCandidato.html',
        controller:'EditarCandidatoCtrl',
        resolve: {
          idCandidato: function($route){
            return $route.current.params.idCandidato;
          }
        }
      }).
      when('/candidato/perfil/:idCandidato', {
        templateUrl:'./modules/candidato/views/perfilCandidato.html',
        controller:'PerfilCandidatoCtrl'
      }).
      when('/candidato/visualizar/:idCandidato', {
        templateUrl:'./modules/candidato/views/formCandidatoSimplificado.html',
        controller:'VisualizarCandidatoCtrl', 
        resolve: {
          idCandidato: function($route){
            return $route.current.params.idCandidato;
          }
        }
      }).

      //Rotas da entidade Processo Seletivo
      when('/processoseletivo/', {
        templateUrl:'./modules/processoseletivo/views/gridProcessoSeletivo.html',
        controller:'ListarProcessoSeletivoCtrl'
      }).
      when('/processoseletivo/cadastrar', {
        templateUrl:'./modules/processoseletivo/views/cadastrarProcessoSeletivo.html',
        controller:'CadastrarProcessoSeletivoCtrl'
      }).
       when('/processoseletivo/mapa', {
        templateUrl:'./modules/processoseletivo/views/mapaProcessoSeletivo.html',
        controller:'MapaProcessoSeletivoCtrl'
      }).
      when('/processoseletivo/:idProcessoSeletivo', {
        templateUrl:'./modules/processoseletivo/views/processoSeletivo.html',
        controller:'ProcessoSeletivoCtrl'
      }).


      //Rotas da entidade Empresa
      when('/empresa',{
        templateUrl:'./modules/empresa/views/gridEmpresa.html',
        controller:'ListarEmpresaCtrl'
      }).
      when('/empresa/visualizar/:idEmpresa', {
        templateUrl:'./modules/empresa/views/formEmpresa.html',
        controller:'VisualizarEmpresaCtrl',
        resolve: {
          idEmpresa: function($route){
            return $route.current.params.idEmpresa;
          }
        }
      }).
      when('/empresa/cadastrar', {
        templateUrl:'./modules/empresa/views/formEmpresa.html',
        controller:'CadastrarEmpresaCtrl',
      }).
      when('/empresa/editar/:idEmpresa', {
        templateUrl:'./modules/empresa/views/formEmpresa.html',
        controller:'EditarEmpresaCtrl',
        resolve: {
          idEmpresa: function($route){
            return $route.current.params.idEmpresa;
          }
        }
      }).

      //Rotas da entidade Curso
      when('/programaaprendizagem/curso',{
        templateUrl:'./modules/programaaprendizagem/curso/views/gridCurso.html',
        controller:'ListarCursoCtrl'
      }).
      when('/programaaprendizagem/curso/visualizar/:idCurso', {
        templateUrl:'./modules/programaaprendizagem/curso/views/formCurso.html',
        controller:'VisualizarCursoCtrl',
        resolve: {
          idCurso: function($route){
            return $route.current.params.idCurso;
          }
        }
      }).
      when('/programaaprendizagem/curso/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/curso/views/formCurso.html',
        controller:'CadastrarCursoCtrl',
      }).
      when('/programaaprendizagem/curso/editar/:idCurso', {
        templateUrl:'./modules/programaaprendizagem/curso/views/formCurso.html',
        controller:'EditarCursoCtrl',
        resolve: {
          idCurso: function($route){
            return $route.current.params.idCurso;
          }
        }
      }).

      //Rotas da entidade Disciplina
      when('/programaaprendizagem/disciplina',{
        templateUrl:'./modules/programaaprendizagem/disciplina/views/gridDisciplina.html',
        controller:'ListarDisciplinaCtrl'
      }).
      when('/programaaprendizagem/disciplina/visualizar/:idDisciplina', {
        templateUrl:'./modules/programaaprendizagem/disciplina/views/formDisciplina.html',
        controller:'VisualizarDisciplinaCtrl',
        resolve: {
          idDisciplina: function($route){
            return $route.current.params.idDisciplina;
          }
        }
      }).
      when('/programaaprendizagem/disciplina/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/disciplina/views/formDisciplina.html',
        controller:'CadastrarDisciplinaCtrl',
      }).
      when('/programaaprendizagem/disciplina/editar/:idDisciplina', {
        templateUrl:'./modules/programaaprendizagem/disciplina/views/formDisciplina.html',
        controller:'EditarDisciplinaCtrl',
        resolve: {
          idDisciplina: function($route){
            return $route.current.params.idDisciplina;
          }
        }
      }).

      //Rotas da entidade Colaborador
      when('/programaaprendizagem/colaborador',{
        templateUrl:'./modules/programaaprendizagem/colaborador/views/gridColaborador.html',
        controller:'ListarColaboradorCtrl'
      }).
      when('/programaaprendizagem/colaborador/visualizar/:idColaborador', {
        templateUrl:'./modules/programaaprendizagem/colaborador/views/formColaborador.html',
        controller:'VisualizarColaboradorCtrl',
        resolve: {
          idColaborador: function($route){
            return $route.current.params.idColaborador;
          }
        }
      }).
      when('/programaaprendizagem/colaborador/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/colaborador/views/formColaborador.html',
        controller:'CadastrarColaboradorCtrl',
      }).
      when('/programaaprendizagem/colaborador/editar/:idColaborador', {
        templateUrl:'./modules/programaaprendizagem/colaborador/views/formColaborador.html',
        controller:'EditarColaboradorCtrl',
        resolve: {
          idColaborador: function($route){
            return $route.current.params.idColaborador;
          }
        }
      }).
      
    //Rotas da entidade Turma
      when('/programaaprendizagem/turma',{
        templateUrl:'./modules/programaaprendizagem/turma/views/gridTurma.html',
        controller:'ListarTurmaCtrl'
      }).
      when('/programaaprendizagem/turma/visualizar/:idTurma', {
        templateUrl:'./modules/programaaprendizagem/turma/views/formTurma.html',
        controller:'VisualizarTurmaCtrl',
        resolve: {
          idTurma: function($route){
            return $route.current.params.idTurma;
          }
        }
      }).
      when('/programaaprendizagem/turma/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/turma/views/formTurma.html',
        controller:'CadastrarTurmaCtrl',
      }).
      when('/programaaprendizagem/turma/editar/:idTurma', {
        templateUrl:'./modules/programaaprendizagem/turma/views/formTurma.html',
        controller:'EditarTurmaCtrl',
        resolve: {
          idTurma: function($route){
            return $route.current.params.idTurma;
          }
        }
      }).


      when('/programaaprendizagem/aula',{
        templateUrl:'./modules/programaaprendizagem/aula/views/gridAula.html',
        controller:'ListarAulaCtrl'
      }).
      when('/programaaprendizagem/aula/visualizar/:idAula', {
        templateUrl:'./modules/programaaprendizagem/aula/views/formAula.html',
        controller:'VisualizarAulaCtrl',
        resolve: {
          idAula: function($route){
            return $route.current.params.idAula;
          }
        }
      }).
      when('/programaaprendizagem/aula/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/aula/views/formAula.html',
        controller:'CadastrarAulaCtrl',
      }).
      when('/programaaprendizagem/aula/editar/:idAula', {
        templateUrl:'./modules/programaaprendizagem/aula/views/formAula.html',
        controller:'EditarAulaCtrl',
        resolve: {
          idAula: function($route){
            return $route.current.params.idAula;
          }
        }
      }).


      //Rotas da entidade Modulo
      when('/programaaprendizagem/modulo',{
        templateUrl:'./modules/programaaprendizagem/modulo/views/gridModulo.html',
        controller:'ListarModuloCtrl'
      }).
      when('/programaaprendizagem/modulo/visualizar/:idModulo', {
        templateUrl:'./modules/programaaprendizagem/modulo/views/formModulo.html',
        controller:'VisualizarModuloCtrl',
        resolve: {
          idModulo: function($route){
            return $route.current.params.idModulo;
          }
        }
      }).
      when('/programaaprendizagem/modulo/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/modulo/views/formModulo.html',
        controller:'CadastrarModuloCtrl',
      }).
      when('/programaaprendizagem/modulo/editar/:idModulo', {
        templateUrl:'./modules/programaaprendizagem/modulo/views/formModulo.html',
        controller:'EditarModuloCtrl',
        resolve: {
          idModulo: function($route){
            return $route.current.params.idModulo;
          }
        }
      }).

       //Rotas da entidade Usuario
      when('/acesso/usuario', {
        templateUrl:'./modules/usuario/views/gridUsuario.html',
        controller:'ListarUsuarioCtrl'
      }).
      when('/acesso/usuario/visualizar/:idUsuario', {
        templateUrl:'./modules/usuario/views/formUsuario.html',
        controller:'VisualizarUsuarioCtrl', 
        resolve: {
          idUsuario: function($route){
            return $route.current.params.idUsuario;
          }
        }
      }).
      when('/acesso/usuario/cadastrar', {
        templateUrl:'./modules/usuario/views/formUsuario.html',
        controller:'CadastrarUsuarioCtrl' 
      }).
      when('/acesso/usuario/editar/:idUsuario', {
        templateUrl:'./modules/usuario/views/formUsuario.html',
        controller:'EditarUsuarioCtrl',
        resolve: {
          idUsuario: function($route){
            return $route.current.params.idUsuario;
          }
        }
      }).

       //Rotas da entidade Perfil de Acesso
      when('/acesso/perfildeacesso', {
        templateUrl:'./modules/perfildeacesso/views/gridPerfilDeAcesso.html',
        controller:'ListarPerfilDeAcessoCtrl'
      }).
      when('/acesso/perfildeacesso/visualizar/:idPerfilDeAcesso', {
        templateUrl:'./modules/perfildeacesso/views/formPerfilDeAcesso.html',
        controller:'VisualizarPerfilDeAcessoCtrl', 
        resolve: {
          idPerfilDeAcesso: function($route){
            return $route.current.params.idPerfilDeAcesso;
          }
        }
      }).
      when('/acesso/perfildeacesso/cadastrar', {
        templateUrl:'./modules/perfildeacesso/views/formPerfilDeAcesso.html',
        controller:'CadastrarPerfilDeAcessoCtrl' 
      }).
      when('/acesso/perfildeacesso/editar/:idPerfilDeAcesso', {
        templateUrl:'./modules/perfildeacesso/views/formPerfilDeAcesso.html',
        controller:'EditarPerfilDeAcessoCtrl',
        resolve: {
          idPerfilDeAcesso: function($route){
            return $route.current.params.idPerfilDeAcesso;
          }
        }
      }).
              
      //Rotas da entidade Instituição de Ensino
      when('/instituicaodeensino', {
        templateUrl:'./modules/instituicaodeensino/views/gridInstituicaoDeEnsino.html',
        controller:'ListarInstituicaoDeEnsinoCtrl'
      }).
      when('/instituicaodeensino/visualizar/:idInstituicaoDeEnsino', {
        templateUrl:'./modules/instituicaodeensino/views/formInstituicaoDeEnsino.html',
        controller:'VisualizarInstituicaoDeEnsinoCtrl', 
        resolve: {
          idInstituicaoDeEnsino: function($route){
            return $route.current.params.idInstituicaoDeEnsino;
          }
        }
      }).
      when('/instituicaodeensino/cadastrar', {
        templateUrl:'./modules/instituicaodeensino/views/formInstituicaoDeEnsino.html',
        controller:'CadastrarInstituicaoDeEnsinoCtrl'
      }).
      when('/instituicaodeensino/editar/:idInstituicaoDeEnsino', {
        templateUrl:'./modules/instituicaodeensino/views/formInstituicaoDeEnsino.html',
        controller:'EditarInstituicaoDeEnsinoCtrl',
        resolve: {
          idInstituicaoDeEnsino: function($route){
            return $route.current.params.idInstituicaoDeEnsino;
          }
        }
      }).
      
      //Rotas da entidade Parametro
      when('/acesso/parametro', {
          templateUrl:'./modules/parametro/views/formParametro.html',
          controller:'CadastrarParametroCtrl'
      }).
      
      //Rotas da entidade Contrato
      when('/programaaprendizagem/contrato', {
        templateUrl:'./modules/programaaprendizagem/contrato/views/gridContrato.html',
        controller:'ListarContratoCtrl'
      }).
      when('/programaaprendizagem/contrato/visualizar/:idPerfilDeAcesso', {
        templateUrl:'./modules/programaaprendizagem/contrato/views/formContrato.html',
        controller:'VisualizarContratoCtrl', 
        resolve: {
          idContrato: function($route){
            return $route.current.params.idContrato;
          }
        }
      }).
      when('/programaaprendizagem/contrato/cadastrar', {
        templateUrl:'./modules/programaaprendizagem/contrato/views/formContrato.html',
        controller:'CadastrarContratoCtrl' 
      }).
      when('/programaaprendizagem/contrato/editar/:idContrato', {
        templateUrl:'./modules/programaaprendizagem/contrato/views/formContrato.html',
        controller:'EditarContratoCtrl',
        resolve: {
          idContrato: function($route){
            return $route.current.params.idContrato;
          }
        }
      }).
      //Caso não encontre a URL nas rotas acima, redireciona para diretório raiz
      otherwise({redirectTo:'/'});
      //Retirar o '#' da URL
      //$locationProvider.html5Mode(true);
      

      //Configurações do RestAngular
      RestangularProvider.setBaseUrl('./rest/');
      RestangularProvider.setDefaultRequestParams({});
      RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
      RestangularProvider.setRestangularFields({
        id: 'id'
      });
     RestangularProvider.setRequestInterceptor(function(elem, operation, what, url) {
       /* if (operation === 'put') {
          elem.id = null;
          console.log(url);
          url = './rest/pais/';
          return url;
        }
        return url;*/
      })


     growlProvider.globalTimeToLive(5000);
  });
