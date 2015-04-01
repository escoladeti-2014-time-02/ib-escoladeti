/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, appRequires) {
  'use strict';

  App.controller = $controllerProvider.register;
  App.directive  = $compileProvider.directive;
  App.filter     = $filterProvider.register;
  App.factory    = $provide.factory;
  App.service    = $provide.service;
  App.constant   = $provide.constant;
  App.value      = $provide.value;

  // LAZY MODULES
  // ----------------------------------- 

  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: appRequires.modules
  });


  // defaults to dashboard
  $urlRouterProvider.otherwise('/app/dashboard');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '',
        abstract: true,
        templateUrl: basepath('app.html'),
        controller: 'AppController',
        resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'store', 'classyloader', 'toaster', 'csspiner')
    })
    // .state('app.dashboard', {
    //     url: '/dashboard',
    //     title: 'Dashboard',
    //     templateUrl: basepath('dashboard.html'),
    //     resolve: resolveFor('flot-chart','flot-chart-plugins')
    // })
    .state('app.candidatoListar', {
        url: '/candidato',
        title: 'Candidato',
        templateUrl: basepathModules('candidato', 'gridCandidato.html'),
        controller: 'ListarCandidatoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato', 'chancerandom')
    })
    .state('app.candidatoCadastrar', {
        url: '/candidato/cadastrar',
        title: 'Candidato',
        templateUrl: basepathModules('candidato', 'formCandidatoSimplificado.html'),
        controller: 'CadastrarCandidatoCtrl',
        resolve: resolveFor('inputmask', 'loadGoogleMapsJS','uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato')
    })
    .state('app.candidatoEditar', {
        url: '/candidato/editar/:idCandidato',
        title: 'Candidato',
        templateUrl: basepathModules('candidato', 'formCandidatoSimplificado.html'),
        controller: 'EditarCandidatoCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato')
    })
    .state('app.candidatoVisualizar', {
        url: '/candidato/visualizar/:idCandidato',
        title: 'Candidato',
        templateUrl: basepathModules('candidato', 'formCandidatoSimplificado.html'),
        controller: 'VisualizarCandidatoCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato')
    })
    .state('app.candidatoPerfil', {
        url: '/candidato/perfil/:idCandidato',
        title: 'Instituição de Ensino',
        templateUrl: basepathModules('candidato', 'perfilCandidato.html'),
        controller: 'PerfilCandidatoCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato')
    })
    .state('app.instituicaoEnsinoListar', {
        url: '/instituicaoensino',
        title: 'Instituição de Ensino',
        templateUrl: basepathModules('instituicaodeensino', 'gridInstituicaoDeEnsino.html'),
        controller: 'ListarInstituicaoDeEnsinoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'InstituicaoDeEnsino')
    })
    .state('app.instituicaoEnsinoCadastrar', {
        url: '/instituicaoensino/cadastrar',
        title: 'Instituição de Ensino',
        templateUrl: basepathModules('instituicaodeensino', 'formInstituicaoDeEnsino.html'),
        controller: 'CadastrarInstituicaoDeEnsinoCtrl',
        resolve: resolveFor('inputmask', 'loadGoogleMapsJS','uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'InstituicaoDeEnsino')
    })
    .state('app.instituicaoEnsinoEditar', {
        url: '/instituicaoensino/editar/:idInstituicaoEnsino',
        title: 'Instituição de Ensino',
        templateUrl: basepathModules('instituicaodeensino', 'formInstituicaoDeEnsino.html'),
        controller: 'EditarInstituicaoDeEnsinoCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'InstituicaoDeEnsino')
    })
    .state('app.instituicaoEnsinoVisualizar', {
        url: '/instituicaoensino/visualizar/:idInstituicaoEnsino',
        title: 'Instituição de Ensino',
        templateUrl: basepathModules('instituicaodeensino', 'formInstituicaoDeEnsino.html'),
        controller: 'VisualizarInstituicaoDeEnsinoCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'InstituicaoDeEnsino')
    })
    .state('app.empresaListar', {
        url: '/empresa',
        title: 'Empresa',
        templateUrl: basepathModules('empresa', 'gridEmpresa.html'),
        controller: 'ListarEmpresaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Empresa')
    })
    .state('app.empresaCadastrar', {
        url: '/empresa/cadastrar',
        title: 'Empresa',
        templateUrl: basepathModules('empresa', 'formEmpresa.html'),
        controller: 'CadastrarEmpresaCtrl',
        resolve: resolveFor('inputmask', 'loadGoogleMapsJS','uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'Empresa')
    })
    .state('app.empresaEditar', {
        url: '/empresa/editar/:idEmpresa',
        title: 'Empresa',
        templateUrl: basepathModules('empresa', 'formEmpresa.html'),
        controller: 'EditarEmpresaCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'Empresa')
    })
    .state('app.empresaVisualizar', {
        url: '/empresa/visualizar/:idEmpresa',
        title: 'Empresa',
        templateUrl: basepathModules('empresa', 'formEmpresa.html'),
        controller: 'VisualizarEmpresaCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'Empresa')
    })
    .state('app.processoSeletivoListar', {
        url: '/processoseletivo',
        title: 'Processo Seletivo',
        templateUrl: basepathModules('processoseletivo', 'gridProcessoSeletivo.html'),
        controller: 'ListarProcessoSeletivoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'ProcessoSeletivo')
    })
    .state('app.processoSeletivoCadastrar', {
        url: '/processoseletivo/cadastrar',
        title: 'Processo Seletivo',
        templateUrl: basepathModules('processoseletivo', 'cadastrarProcessoSeletivo.html'),
        controller: 'CadastrarProcessoSeletivoCtrl',
        resolve: resolveFor('inputmask', 'loadGoogleMapsJS','uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'ProcessoSeletivo')
    })
    .state('app.processoSeletivoEditar', {
        url: '/processoseletivo/:idProcessoSeletivo',
        title: 'Processo Seletivo',
        templateUrl: basepathModules('processoseletivo', 'processoSeletivo.html'),
        controller: 'ProcessoSeletivoCtrl',
        controllerAs: 'PSCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'AngularGM', 'fontawesomemarkers', 'randomcolor', 'Empresa', 'ProcessoSeletivo')
    })
    .state('app.processoSeletivoVisualizar', {
        url: '/processoseletivo/visualizar/:idProcessoSeletivo',
        title: 'Processo Seletivo',
        templateUrl: basepathModules('processoseletivo', 'processoSeletivo.html'),
        controller: 'VisualizarProcessoSeletivoCtrl',
        resolve: resolveFor('inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'AngularGM', 'fontawesomemarkers', 'randomcolor', 'ProcessoSeletivo')
    })
    .state('app.disciplinaListar', {
        url: '/programaaprendizagem/disciplina',
        title: 'Disciplina',
        templateUrl: basepathModules('programaaprendizagem/disciplina', 'gridDisciplina.html'),
        controller: 'ListarDisciplinaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'Disciplina')
    })
    .state('app.disciplinaCadastrar', {
        url: '/programaaprendizagem/disciplina/cadastrar',
        title: 'Disciplina',
        templateUrl: basepathModules('programaaprendizagem/disciplina', 'formDisciplina.html'),
        controller: 'CadastrarDisciplinaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'Disciplina')
    })
    .state('app.disciplinaEditar', {
        url: '/programaaprendizagem/disciplina/editar/:idDisciplina',
        title: 'Disciplina',
        templateUrl: basepathModules('programaaprendizagem/disciplina', 'formDisciplina.html'),
        controller: 'EditarDisciplinaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'Disciplina')
    })
    .state('app.disciplinaVisualizar', {
        url: '/programaaprendizagem/disciplina/visualizar/:idDisciplina',
        title: 'Disciplina',
        templateUrl: basepathModules('programaaprendizagem/disciplina', 'formDisciplina.html'),
        controller: 'VisualizarDisciplinaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'Disciplina')
    })
    .state('app.colaboradorListar', {
        url: '/programaaprendizagem/colaborador',
        title: 'Colaborador',
        templateUrl: basepathModules('programaaprendizagem/colaborador', 'gridColaborador.html'),
        controller: 'ListarColaboradorCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Colaborador')
    })
    .state('app.colaboradorCadastrar', {
        url: '/programaaprendizagem/colaborador/cadastrar',
        title: 'Colaborador',
        templateUrl: basepathModules('programaaprendizagem/colaborador', 'formColaborador.html'),
        controller: 'CadastrarColaboradorCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Colaborador')
    })
    .state('app.colaboradorEditar', {
        url: '/programaaprendizagem/colaborador/editar/:idColaborador',
        title: 'Colaborador',
        templateUrl: basepathModules('programaaprendizagem/colaborador', 'formColaborador.html'),
        controller: 'EditarColaboradorCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Colaborador')
    })
    .state('app.colaboradorVisualizar', {
        url: '/programaaprendizagem/colaborador/visualizar/:idColaborador',
        title: 'Colaborador',
        templateUrl: basepathModules('programaaprendizagem/colaborador', 'formColaborador.html'),
        controller: 'VisualizarColaboradorCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Colaborador')
    })
    .state('app.moduloListar', {
        url: '/programaaprendizagem/modulo',
        title: 'Modulo',
        templateUrl: basepathModules('programaaprendizagem/modulo', 'gridModulo.html'),
        controller: 'ListarModuloCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Modulo')
    })
    .state('app.moduloCadastrar', {
        url: '/programaaprendizagem/modulo/cadastrar',
        title: 'Modulo',
        templateUrl: basepathModules('programaaprendizagem/modulo', 'formModulo.html'),
        controller: 'CadastrarModuloCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Modulo')
    })
    .state('app.moduloEditar', {
        url: '/programaaprendizagem/modulo/editar/:idModulo',
        title: 'Modulo',
        templateUrl: basepathModules('programaaprendizagem/modulo', 'formModulo.html'),
        controller: 'EditarModuloCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Modulo')
    })
    .state('app.moduloVisualizar', {
        url: '/programaaprendizagem/modulo/visualizar/:idModulo',
        title: 'Modulo',
        templateUrl: basepathModules('programaaprendizagem/modulo', 'formModulo.html'),
        controller: 'VisualizarModuloCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Modulo')
    })
    .state('app.cursoListar', {
        url: '/programaaprendizagem/curso',
        title: 'Curso',
        templateUrl: basepathModules('programaaprendizagem/curso', 'gridCurso.html'),
        controller: 'ListarCursoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Curso')
    })
    .state('app.cursoCadastrar', {
        url: '/programaaprendizagem/curso/cadastrar',
        title: 'Curso',
        templateUrl: basepathModules('programaaprendizagem/curso', 'formCurso.html'),
        controller: 'CadastrarCursoCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Curso')
    })
    .state('app.cursoEditar', {
        url: '/programaaprendizagem/curso/editar/:idCurso',
        title: 'Curso',
        templateUrl: basepathModules('programaaprendizagem/curso', 'formCurso.html'),
        controller: 'EditarCursoCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Curso')
    })
    .state('app.cursoVisualizar', {
        url: '/programaaprendizagem/curso/visualizar/:idCurso',
        title: 'Curso',
        templateUrl: basepathModules('programaaprendizagem/curso', 'formCurso.html'),
        controller: 'VisualizarCursoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Curso')
    })
    .state('app.turmaListar', {
        url: '/programaaprendizagem/turma',
        title: 'Turma',
        templateUrl: basepathModules('programaaprendizagem/turma', 'gridTurma.html'),
        controller: 'ListarTurmaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Turma')
    })
    .state('app.turmaCadastrar', {
        url: '/programaaprendizagem/turma/cadastrar',
        title: 'Turma',
        templateUrl: basepathModules('programaaprendizagem/turma', 'formTurma.html'),
        controller: 'CadastrarTurmaCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Turma')
    })
    .state('app.turmaEditar', {
        url: '/programaaprendizagem/turma/editar/:idTurma',
        title: 'Turma',
        templateUrl: basepathModules('programaaprendizagem/turma', 'formTurma.html'),
        controller: 'EditarTurmaCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Turma')
    })
    .state('app.turmaVisualizar', {
        url: '/programaaprendizagem/turma/visualizar/:idTurma',
        title: 'Turma',
        templateUrl: basepathModules('programaaprendizagem/turma', 'formTurma.html'),
        controller: 'VisualizarTurmaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Turma')
    })
    .state('app.aulaListar', {
        url: '/programaaprendizagem/aula',
        title: 'Aula',
        templateUrl: basepathModules('programaaprendizagem/aula', 'gridAula.html'),
        controller: 'ListarAulaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Aula')
    })
    .state('app.aulaCadastrar', {
        url: '/programaaprendizagem/aula/cadastrar',
        title: 'Aula',
        templateUrl: basepathModules('programaaprendizagem/aula', 'formAula.html'),
        controller: 'CadastrarAulaCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato', 'Aula')
    })
    .state('app.aulaEditar', {
        url: '/programaaprendizagem/aula/editar/:idAula',
        title: 'Aula',
        templateUrl: basepathModules('programaaprendizagem/aula', 'formAula.html'),
        controller: 'EditarAulaCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'imagecrop', 'Candidato', 'Aula')
    })
    .state('app.aulaVisualizar', {
        url: '/programaaprendizagem/aula/visualizar/:idAula',
        title: 'Aula',
        templateUrl: basepathModules('programaaprendizagem/aula', 'formAula.html'),
        controller: 'VisualizarAulaCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Aula')
    })
    .state('app.logradouroListar', {
        url: '/endereco/logradouro',
        title: 'Logradouro',
        templateUrl: basepathModules('endereco/logradouro', 'gridLogradouro.html'),
        controller: 'ListarLogradouroCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Logradouro')
    })
    .state('app.logradouroCadastrar', {
        url: '/endereco/logradouro/cadastrar',
        title: 'Logradouro',
        templateUrl: basepathModules('endereco/logradouro', 'formLogradouro.html'),
        controller: 'CadastrarLogradouroCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Logradouro')
    })
    .state('app.logradouroEditar', {
        url: '/endereco/logradouro/editar/:idLogradouro',
        title: 'Logradouro',
        templateUrl: basepathModules('endereco/logradouro', 'formLogradouro.html'),
        controller: 'EditarLogradouroCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Logradouro')
    })
    .state('app.logradouroVisualizar', {
        url: '/endereco/logradouro/visualizar/:idLogradouro',
        title: 'Logradouro',
        templateUrl: basepathModules('endereco/logradouro', 'formLogradouro.html'),
        controller: 'VisualizarLogradouroCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Logradouro')
    })
    .state('app.bairroListar', {
        url: '/endereco/bairro',
        title: 'Bairro',
        templateUrl: basepathModules('endereco/bairro', 'gridBairro.html'),
        controller: 'ListarBairroCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Bairro')
    })
    .state('app.bairroCadastrar', {
        url: '/endereco/bairro/cadastrar',
        title: 'Bairro',
        templateUrl: basepathModules('endereco/bairro', 'formBairro.html'),
        controller: 'CadastrarBairroCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Bairro')
    })
    .state('app.bairroEditar', {
        url: '/endereco/bairro/editar/:idBairro',
        title: 'Bairro',
        templateUrl: basepathModules('endereco/bairro', 'formBairro.html'),
        controller: 'EditarBairroCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Bairro')
    })
    .state('app.bairroVisualizar', {
        url: '/endereco/bairro/visualizar/:idBairro',
        title: 'Bairro',
        templateUrl: basepathModules('endereco/bairro', 'formBairro.html'),
        controller: 'VisualizarBairroCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Bairro')
    })
    .state('app.cidadeListar', {
        url: '/endereco/cidade',
        title: 'Cidade',
        templateUrl: basepathModules('endereco/cidade', 'gridCidade.html'),
        controller: 'ListarCidadeCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Cidade')
    })
    .state('app.cidadeCadastrar', {
        url: '/endereco/cidade/cadastrar',
        title: 'Cidade',
        templateUrl: basepathModules('endereco/cidade', 'formCidade.html'),
        controller: 'CadastrarCidadeCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Cidade')
    })
    .state('app.cidadeEditar', {
        url: '/endereco/cidade/editar/:idCidade',
        title: 'Cidade',
        templateUrl: basepathModules('endereco/cidade', 'formCidade.html'),
        controller: 'EditarCidadeCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Cidade')
    })
    .state('app.cidadeVisualizar', {
        url: '/endereco/cidade/visualizar/:idCidade',
        title: 'Cidade',
        templateUrl: basepathModules('endereco/cidade', 'formCidade.html'),
        controller: 'VisualizarCidadeCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Cidade')
    })
    .state('app.ufListar', {
        url: '/endereco/uf',
        title: 'Uf',
        templateUrl: basepathModules('endereco/uf', 'gridUf.html'),
        controller: 'ListarUfCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Uf')
    })
    .state('app.ufCadastrar', {
        url: '/endereco/uf/cadastrar',
        title: 'Uf',
        templateUrl: basepathModules('endereco/uf', 'formUf.html'),
        controller: 'CadastrarUfCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Uf')
    })
    .state('app.ufEditar', {
        url: '/endereco/uf/editar/:idUf',
        title: 'Uf',
        templateUrl: basepathModules('endereco/uf', 'formUf.html'),
        controller: 'EditarUfCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Uf')
    })
    .state('app.ufVisualizar', {
        url: '/endereco/uf/visualizar/:idUf',
        title: 'Uf',
        templateUrl: basepathModules('endereco/uf', 'formUf.html'),
        controller: 'VisualizarUfCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Uf')
    })
    .state('app.paisListar', {
        url: '/endereco/pais',
        title: 'Pais',
        templateUrl: basepathModules('endereco/pais', 'gridPais.html'),
        controller: 'ListarPaisCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Pais')
    })
    .state('app.paisCadastrar', {
        url: '/endereco/pais/cadastrar',
        title: 'Pais',
        templateUrl: basepathModules('endereco/pais', 'formPais.html'),
        controller: 'CadastrarPaisCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Pais')
    })
    .state('app.paisEditar', {
        url: '/endereco/pais/editar/:idPais',
        title: 'Pais',
        templateUrl: basepathModules('endereco/pais', 'formPais.html'),
        controller: 'EditarPaisCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Pais')
    })
    .state('app.paisVisualizar', {
        url: '/endereco/pais/visualizar/:idPais',
        title: 'Pais',
        templateUrl: basepathModules('endereco/pais', 'formPais.html'),
        controller: 'VisualizarPaisCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Pais')
    })
    .state('app.usuarioListar', {
        url: '/acesso/usuario',
        title: 'Usuário',
        templateUrl: basepathModules('acesso/usuario', 'gridUsuario.html'),
        controller: 'ListarUsuarioCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Usuario')
    })
    .state('app.usuarioCadastrar', {
        url: '/acesso/usuario/cadastrar',
        title: 'Usuário',
        templateUrl: basepathModules('acesso/usuario', 'formUsuario.html'),
        controller: 'CadastrarUsuarioCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Usuario')
    })
    .state('app.usuarioEditar', {
        url: '/acesso/usuario/editar/:idUsuario',
        title: 'Usuário',
        templateUrl: basepathModules('acesso/usuario', 'formUsuario.html'),
        controller: 'EditarUsuarioCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Usuario')
    })
    .state('app.usuarioVisualizar', {
        url: '/acesso/usuario/visualizar/:idUsuario',
        title: 'Usuário',
        templateUrl: basepathModules('acesso/usuario', 'formUsuario.html'),
        controller: 'VisualizarUsuarioCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Usuario')
    })
    .state('app.perfildeacessoListar', {
        url: '/acesso/perfildeacesso',
        title: 'Perfil de Acesso',
        templateUrl: basepathModules('acesso/perfildeacesso', 'gridPerfilDeAcesso.html'),
        controller: 'ListarPerfilDeAcessoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'PerfilDeAcesso')
    })
    .state('app.perfildeacessoCadastrar', {
        url: '/acesso/perfildeacesso/cadastrar',
        title: 'Perfil de Acesso',
        templateUrl: basepathModules('acesso/perfildeacesso', 'formPerfilDeAcesso.html'),
        controller: 'CadastrarPerfilDeAcessoCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'PerfilDeAcesso')
    })
    .state('app.perfildeacessoEditar', {
        url: '/acesso/perfildeacesso/editar/:idPerfilDeAcesso',
        title: 'Perfil de Acesso',
        templateUrl: basepathModules('acesso/perfildeacesso', 'formPerfilDeAcesso.html'),
        controller: 'EditarPerfilDeAcessoCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'PerfilDeAcesso')
    })
    .state('app.perfildeacessoVisualizar', {
        url: '/acesso/perfildeacesso/visualizar/:idPerfilDeAcesso',
        title: 'Perfil de Acesso',
        templateUrl: basepathModules('acesso/perfildeacesso', 'formPerfilDeAcesso.html'),
        controller: 'VisualizarPerfilDeAcessoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'PerfilDeAcesso')
    })
    .state('app.parametro', {
        url: '/acesso/parametro',
        title: 'Parâmetros',
        templateUrl: basepathModules('acesso/parametro', 'formParametro.html'),
        controller: 'CadastrarParametroCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Parametro')
    })
    ;


    // Set here the base of the relative path
    // for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }

    function basepathModules(module, uri) {
      return './modules/' + module + '/views/' + uri;
    }
    
    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    function resolveFor() {
      var _args = arguments;
      return {
        deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
          // Creates a promise chain for each argument
          var promise = $q.when(1); // empty promise
          for(var i=0, len=_args.length; i < len; i ++){
            promise = andThen(_args[i]);
          }
          return promise;

          // creates promise to chain dynamically
          function andThen(_arg) {
            // also support a function that returns a promise
            if(typeof _arg == 'function')
                return promise.then(_arg);
            else
                return promise.then(function() {
                  // if is a module, pass the name. If not, pass the array
                  var whatToLoad = getRequired(_arg);
                  // simple error check
                  if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  // finally, return a promise
                  return $ocLL.load( whatToLoad );
                });
          }
          // check and returns required data
          // analyze module items with the form [name: '', files: []]
          // and also simple array of script files (for not angular js)
          function getRequired(name) {
            if (appRequires.modules)
                for(var m in appRequires.modules)
                    if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                        return appRequires.modules[m];
            return appRequires.scripts && appRequires.scripts[name];
          }

        }]};
    }

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }]).config(['RestangularProvider', function(RestangularProvider){
    RestangularProvider.setBaseUrl('./rest/');
    RestangularProvider.setDefaultRequestParams({});
    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    RestangularProvider.setRestangularFields({ id: 'id' });
  }])
.controller('NullController', function() {});
