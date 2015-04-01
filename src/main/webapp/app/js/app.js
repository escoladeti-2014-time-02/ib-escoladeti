/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }


// APP START
// ----------------------------------- 

var App = angular.module('angle', ['restangular', 'ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar'])
          .run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
              // Set reference to access them from any scope
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;

              // Scope Globals
              // ----------------------------------- 
              $rootScope.app = {
                name: 'Fundação Isis Bruder',
                description: 'Fundação Isis Bruder - Time 02',
                year: ((new Date()).getFullYear()),
                layout: {
                  isFixed: true,
                  isCollapsed: true,
                  isBoxed: false,
                  isRTL: false
                },
                viewAnimation: 'ng-fadeInUp'
              };
              $rootScope.user = {
                name:     'John',
                job:      'ng-Dev',
                picture:  'app/img/user/02.jpg'
              };
            }
          ]);

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
  $urlRouterProvider.otherwise('/candidato');

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
        resolve: resolveFor('AngularGM', 'inputmask', 'uiutils', 'isisbruder', 'brasilfilters', 'ngcpfcnpj', 'fontawesomemarkers', 'randomcolor', 'Empresa', 'ProcessoSeletivo')
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
    
        .state('app.contratoListar', {
        url: '/programaaprendizagem/contrato',
        title: 'Contrato',
        templateUrl: basepathModules('programaaprendizagem/contrato', 'gridContrato.html'),
        controller: 'ListarContratoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Contrato')
    })
    .state('app.contratoCadastrar', {
        url: '/programaaprendizagem/contrato/cadastrar',
        title: 'Contrato',
        templateUrl: basepathModules('programaaprendizagem/contrato', 'formContrato.html'),
        controller: 'CadastrarContratoCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Contrato')
    })
    .state('app.contratoEditar', {
        url: '/programaaprendizagem/contrato/editar/:idContrato',
        title: 'Contrato',
        templateUrl: basepathModules('programaaprendizagem/contrato', 'formContrato.html'),
        controller: 'EditarContratoCtrl',
        resolve: resolveFor('inputmask', 'isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Contrato')
    })
    .state('app.contratoVisualizar', {
        url: '/programaaprendizagem/contrato/visualizar/:idContrato',
        title: 'Contrato',
        templateUrl: basepathModules('programaaprendizagem/contrato', 'formContrato.html'),
        controller: 'VisualizarContratoCtrl',
        resolve: resolveFor('isisbruder', 'uiutils', 'brasilfilters', 'ngcpfcnpj', 'Contrato')
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

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    scripts: {
      'jquery':             ['./vendor/jquery/jquery.min.js'],
      'icons':              ['./vendor/skycons/skycons.js', './vendor/fontawesome/css/font-awesome.min.css','./vendor/simplelineicons/simple-line-icons.css', './vendor/weathericons/css/weather-icons.min.css'],
      'modernizr':          ['./vendor/modernizr/modernizr.js'],
      'fastclick':          ['./vendor/fastclick/fastclick.js'],
      'filestyle':          ['./vendor/filestyle/bootstrap-filestyle.min.js'],
      'csspiner':           ['./vendor/csspinner/csspinner.min.css'],
      'animo':              ['./vendor/animo/animo.min.js'],
      'sparklines':         ['./vendor/sparklines/jquery.sparkline.min.js'],
      'slimscroll':         ['./vendor/slimscroll/jquery.slimscroll.min.js'],
      'store':              ['./vendor/store/store+json2.min.js'],
      'screenfull':         ['./vendor/screenfull/screenfull.min.js'],
      'classyloader':       ['./vendor/classyloader/js/jquery.classyloader.min.js'],
      'vector-map':         ['./vendor/jvectormap/jquery-jvectormap-1.2.2.min.js', './vendor/jvectormap/maps/jquery-jvectormap-world-mill-en.js', './vendor/jvectormap/jquery-jvectormap-1.2.2.css'],
      'loadGoogleMapsJS':   ['./vendor/gmap/load-google-maps.js'],
      'google-map':         ['./vendor/gmap/jquery.gmap.min.js'],
      'flot-chart':         ['./vendor/flot/jquery.flot.min.js'],
      'flot-chart-plugins': ['./vendor/flot/jquery.flot.tooltip.min.js','./vendor/flot/jquery.flot.resize.min.js','./vendor/flot/jquery.flot.pie.min.js','./vendor/flot/jquery.flot.time.min.js','./vendor/flot/jquery.flot.categories.min.js','./vendor/flot/jquery.flot.spline.min.js'],
      'jquery-ui':          ['./vendor/jqueryui/js/jquery-ui-1.10.4.custom.min.js', './vendor/touch-punch/jquery.ui.touch-punch.min.js'],
      'chosen':             ['./vendor/chosen/chosen.jquery.min.js', './vendor/chosen/chosen.min.css'],
      'slider':             ['./vendor/slider/js/bootstrap-slider.js', './vendor/slider/css/slider.css'],
      'moment' :            ['./vendor/moment/min/moment-with-langs.min.js'],
      'fullcalendar':       ['./vendor/fullcalendar/fullcalendar.min.js', './vendor/fullcalendar/fullcalendar.css'],
      'codemirror':         ['./vendor/codemirror/lib/codemirror.js', './vendor/codemirror/lib/codemirror.css'],
      'codemirror-plugins': ['./vendor/codemirror/addon/mode/overlay.js','./vendor/codemirror/mode/markdown/markdown.js','./vendor/codemirror/mode/xml/xml.js','./vendor/codemirror/mode/gfm/gfm.js','./vendor/marked/marked.js'],
      'datetimepicker':     ['./vendor/datetimepicker/js/bootstrap-datetimepicker.min.js', './vendor/datetimepicker/css/bootstrap-datetimepicker.min.css'],
      'taginput' :          ['./vendor/tagsinput/bootstrap-tagsinput.min.js', './vendor/tagsinput/bootstrap-tagsinput.css'],
      'inputmask':          ['./vendor/inputmask/jquery.inputmask.bundle.min.js'],
      'bwizard':            ['./vendor/wizard/js/bwizard.min.js'],
      'parsley':            ['./vendor/parsley/parsley.min.js'],
      'datatables':         ['./vendor/datatable/media/js/jquery.dataTables.min.js', './vendor/datatable/extensions/datatable-bootstrap/css/dataTables.bootstrap.css'],
      'datatables-pugins':  ['./vendor/datatable/extensions/datatable-bootstrap/js/dataTables.bootstrap.js','./vendor/datatable/extensions/datatable-bootstrap/js/dataTables.bootstrapPagination.js','./vendor/datatable/extensions/ColVis/js/dataTables.colVis.min.js', './vendor/datatable/extensions/ColVis/css/dataTables.colVis.css'],
      'flatdoc':            ['./vendor/flatdoc/flatdoc.js'],
      'brasilfilters':      ['./vendor/ngfiltersbr/ng-filters-br.js'],
      'isisbruder':         ['./vendor/isisbruder/services.js', './vendor/isisbruder/directives.js' ],
      'ngcpfcnpj':          ['./vendor/ngCpfCnpj/cpf.js', './vendor/ngCpfCnpj/cnpj.js', './vendor/ngCpfCnpj/ngCpfCnpj.js'],
      'uiutils':            ['./vendor/ui-utils/ui-utils.min.js'],
      'imagecrop':          ['./vendor/image-crop/image-crop.js', './vendor/image-crop/image-crop-styles.css'],
      'chancerandom':       ['./vendor/chance/chance.js'],
      'randomcolor':        ['./vendor/randomcolor/randomColor.js'],
      'fontawesomemarkers': ['./vendor/fontawesome-markers/fontawesome-markers.js']
    },
    modules: [
      {name: 'Candidato',               files: ['./modules/candidato/style/Candidato.css', './modules/candidato/controllers/candidatoCtrl.js', './modules/candidato/controllers/gerarCandidatoCtrl.js'], serie: true},
      {name: 'InstituicaoDeEnsino',     files: ['./modules/instituicaodeensino/controllers/instituicaoDeEnsinoCtrl.js']},
      {name: 'Empresa',                 files: ['./modules/empresa/controllers/empresaCtrl.js']},
      {name: 'Disciplina',              files: ['./modules/programaaprendizagem/disciplina/controllers/disciplinaCtrl.js']},
      {name: 'Colaborador',             files: ['./modules/programaaprendizagem/colaborador/controllers/colaboradorCtrl.js']},
      {name: 'Modulo',                  files: ['./modules/programaaprendizagem/modulo/controllers/moduloCtrl.js']},
      {name: 'Curso',                   files: ['./modules/programaaprendizagem/curso/controllers/cursoCtrl.js']},
      {name: 'Turma',                   files: ['./modules/programaaprendizagem/turma/controllers/turmaCtrl.js']},
      {name: 'Contrato',                files: ['./modules/programaaprendizagem/contrato/controllers/contratoCtrl.js']},
      {name: 'Aula',                    files: ['./modules/programaaprendizagem/aula/controllers/aulaCtrl.js', './resources/css/perfilCandidato.css']},
      {name: 'Logradouro',              files: ['./modules/endereco/logradouro/controllers/logradouroCtrl.js']},
      {name: 'Bairro',                  files: ['./modules/endereco/bairro/controllers/bairroCtrl.js']},
      {name: 'Cidade',                  files: ['./modules/endereco/cidade/controllers/cidadeCtrl.js']},
      {name: 'Uf',                      files: ['./modules/endereco/uf/controllers/ufCtrl.js']},
      {name: 'Pais',                    files: ['./modules/endereco/pais/controllers/paisCtrl.js']},
      {name: 'Usuario',                 files: ['./modules/acesso/usuario/controllers/usuarioCtrl.js']},
      {name: 'PerfilDeAcesso',          files: ['./modules/acesso/perfildeacesso/controllers/perfilDeAcessoCtrl.js']},
      {name: 'Parametro',               files: ['./modules/acesso/parametro/controllers/parametroCtrl.js']},
      {name: 'ProcessoSeletivo',        files: ['./modules/processoseletivo/controllers/processoSeletivoCtrl.js']},
      {name: 'toaster',                 files: ['./vendor/toaster/toaster.js', './vendor/toaster/toaster.css']},
      {name: 'AngularGM',               files: ['./vendor/angular-gm/angular-gm.js'], serie: true}
    ]
  })
;
/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });

    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Hides/show user avatar on sidebar
    $scope.toggleUserBlock = function(){
      $scope.$broadcast('toggleUserBlock');
    };

    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // Applies animation to main view for the next pages to load
    $timeout(function(){
      $rootScope.mainViewAnimation = $rootScope.app.viewAnimation;
    });

}]);

/**=========================================================
 * Module: sidebar-menu.js
 * Provides a simple way to implement bootstrap collapse plugin using a target 
 * next to the current element (sibling)
 * Targeted elements must have [data-toggle="collapse-next"]
 =========================================================*/
App.controller('SidebarController', ['$rootScope', '$scope', '$location', '$http', '$timeout', 'APP_MEDIAQUERY', function($rootScope, $scope, $location, $http, $timeout, mq){

  var currentState = $rootScope.$state.current.name;
  var $win = $(window);
  var $html = $('html');
  var $body = $('body');

  // Adjustment on route changes
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    currentState = toState.name;
    // Hide sidebar automatically on mobile
    $('body.aside-toggled').removeClass('aside-toggled');

    $rootScope.$broadcast('closeSidebarMenu');
  });

  // Normalize state on resize to avoid multiple checks
  $win.on('resize', function() {
    if( isMobile() )
      $body.removeClass('aside-collapsed');
    else
      $body.removeClass('aside-toggled');
  });

  // Check item and children active state
  var isActive = function(item) {

    if(!item || !item.sref) return;

    var path = item.sref, prefix = '#';
    if(path === prefix) {
      var foundActive = false;
      angular.forEach(item.submenu, function(value, key) {
        if(isActive(value)) foundActive = true;
      });
      return foundActive;
    }
    else
      return (currentState === path);
  };

  // Load menu from json file
  // ----------------------------------- 
  
  $scope.getMenuItemPropClasses = function(item) {
    return (item.heading ? 'nav-heading' : '') +
           (isActive(item) ? ' active' : '') ;
  };

  $scope.loadSidebarMenu = function() {

    var menuJson = './app/sidebar-menu.json',
        menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
    $http.get(menuURL)
      .success(function(items) {
         $rootScope.menuItems = items;
      })
      .error(function(data, status, headers, config) {
        alert('Failure loading menu');
      });
   };

   $scope.loadSidebarMenu();

  // Handle sidebar collapse items
  // ----------------------------------- 
  var collapseList = [];

  $scope.addCollapse = function($index, item) {
    collapseList[$index] = !isActive(item);
  };

  $scope.isCollapse = function($index) {
    return (collapseList[$index]);
  };

  $scope.toggleCollapse = function($index) {

    // collapsed sidebar doesn't toggle drodopwn
    if( isSidebarCollapsed() && !isMobile() ) return true;
    // make sure the item index exists
    if( typeof collapseList[$index] === undefined ) return true;

    closeAllBut($index);
    collapseList[$index] = !collapseList[$index];
  
    return true;
  
    function closeAllBut($index) {
      angular.forEach(collapseList, function(v, i) {
        if($index !== i)
          collapseList[i] = true;
      });
    }
  };

  // Helper checks
  // ----------------------------------- 

  function isMobile() {
    return $win.width() < mq.tablet;
  }
  function isTouch() {
    return $html.hasClass('touch');
  }
  function isSidebarCollapsed() {
    return $body.hasClass('aside-collapsed');
  }
  function isSidebarToggled() {
    return $body.hasClass('aside-toggled');
  }
}]);

App.controller('UserBlockController', function($scope) {

  $scope.userBlockVisible = true;
  
  $scope.$on('toggleUserBlock', function(event, args) {

    $scope.userBlockVisible = ! $scope.userBlockVisible;
    
  });

});
/**=========================================================
 * Module: anchor.js
 * Disables null anchor behavior
 =========================================================*/

App.directive('href', function() {

  return {
    restrict: 'A',
    compile: function(element, attr) {
        return function(scope, element) {
          if(attr.ngClick || attr.href === '' || attr.href === '#'){
            element.on('click', function(e){
              e.preventDefault();
              e.stopPropagation();
            });
          }
        };
      }
   };
});
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

App.directive("animateEnabled", ["$animate", function ($animate) {
  return {
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return scope.$eval(attrs.animateEnabled, scope);
      }, function (newValue) {
        $animate.enabled(!!newValue, element);
      });
    }
  };
}]);
/**=========================================================
 * Module: chosen-select.js
 * Initializes the chose select plugin
 =========================================================*/

App.directive('chosen', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      if($.fn.chosen)
        $elem.chosen();
    }
  };
});
/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

App.directive('classyloader', function($timeout) {
  'use strict';

  var $scroller       = $(window),
      inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // run after interpolation  
      $timeout(function(){
  
        var $element = $(element),
            options  = $element.data();
        
        // At lease we need a data-percentage attribute
        if(options) {
          if( options.triggerInView ) {

            $scroller.scroll(function() {
              checkLoaderInVIew($element, options);
            });
            // if the element starts already in view
            checkLoaderInVIew($element, options);
          }
          else
            startLoader($element, options);
        }

      }, 0);

      function checkLoaderInVIew(element, options) {
        var offset = -20;
        if( ! element.hasClass(inViewFlagClass) &&
            $.Utils.isInView(element, {topoffset: offset}) ) {
          startLoader(element, options);
        }
      }
      function startLoader(element, options) {
        element.ClassyLoader(options).addClass(inViewFlagClass);
      }
    }
  };
});

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

App.directive('resetKey',  ['$state', function($state) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      resetKey: '='
    },
    link: function(scope, element, attrs) {
      
      scope.resetKey = attrs.resetKey;

    },
    controller: function($scope, $element) {
    
      if( !store || !store.enabled ) return;

      $element.on('click', function (e) {
          e.preventDefault();

          if($scope.resetKey) {
            store.remove($scope.resetKey);
            $state.go($state.current, {}, {reload: true});
          }
          else {
            $.error('No storage key specified for reset.');
          }
      });

    }

  };

}]);
/**=========================================================
 * Module: datepicker,js
 * DateTime Picker init
 =========================================================*/

App.directive('datetimepicker', function() {
  'use strict';

  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element),
          options = $elem.data(); // allow to set options via data-* attributes
      
      $elem.datetimepicker($.extend(
        options,
        { // support for FontAwesome icons
          icons: {
              time:   'fa fa-clock-o',
              date:   'fa fa-calendar',
              up:     'fa fa-arrow-up',
              down:   'fa fa-arrow-down'
          }
        }));

      // Force a dropdown hide when click out of the input
      $(document).on('click', function(){
        var dp = $elem.data('DateTimePicker');
        if(dp) dp.hide();
      });
      
    }
  };

});

/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

App.directive('filestyle', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      $elem.filestyle({
        classInput: $elem.data('classinput')
      });
    }
  };
});

/**=========================================================
 * Module: flatdoc.js
 * Creates the flatdoc markup and initializes the plugin
 =========================================================*/

App.directive('flatdoc', ['$location', function($location) {
  return {
    restrict: "EA",
    template: "<div role='flatdoc'><div role='flatdoc-menu'></div><div role='flatdoc-content'></div></div>",
    link: function(scope, element, attrs) {

      Flatdoc.run({
        fetcher: Flatdoc.file(attrs.src)
      });
      
      var $root = $('html, body');
      $(document).on('flatdoc:ready', function() {
        var docMenu = $('[role="flatdoc-menu"]');
        docMenu.find('a').on('click', function(e) {
          e.preventDefault(); e.stopPropagation();
          
          var $this = $(this);
          
          docMenu.find('a.active').removeClass('active');
          $this.addClass('active');

          $root.animate({
                scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
            }, 800);
        });

      });
    }
  };

}]);
/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/

App.directive('formWizard', function(){
  'use strict';

  if(!$.fn.bwizard) return;

  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      var wizard = $(element).children('.form-wizard'),
          validate = attrs.validateStep; // allow to set options via data-* attributes
      
      if(validate) {
        wizard.bwizard({
          clickableSteps: false,
          validating: function(e, ui) {

            var $this = $(this),
                form = $this.parent(),
                group = form.find('.bwizard-activated');

            if (false === form.parsley().validate( group[0].id )) {
              e.preventDefault();
              return;
            }
          }
        });
      }
      else {
        wizard.bwizard();
      }
      
    }
  };

});

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

App.directive('toggleFullscreen', function() {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      element.on('click', function (e) {
          e.preventDefault();

          if (screenfull.enabled) {
            
            screenfull.toggle();
            
            // Switch icon indicator
            if(screenfull.isFullscreen)
              $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
            else
              $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

          } else {
            $.error('Fullscreen not enabled');
          }

      });
    }
  };

});


/**=========================================================
 * Module: gmap.js
 * Init Google Map plugin
 =========================================================*/

App.directive('gmap', ['$window','gmap', function($window, gmap){
  'use strict';

  // Map Style definition
  // Get more styles from http://snazzymaps.com/style/29/light-monochrome
  // - Just replace and assign to 'MapStyles' the new style array
  var MapStyles = [{featureType:'water',stylers:[{visibility:'on'},{color:'#bdd1f9'}]},{featureType:'all',elementType:'labels.text.fill',stylers:[{color:'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
  
  gmap.setStyle( MapStyles );

  // Center Map marker on resolution change

  $($window).resize(function() {

    gmap.autocenter();

  });

  return {
    restrict: 'A',
    link: function (scope, element) {
      
      gmap.init(element);

    }
  };

}]);

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

App.directive('loadCss', function() {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function (e) {
          if(element.is('a')) e.preventDefault();
          var uri = attrs.loadCss,
              link;

          if(uri) {
            link = createLink(uri);
            if ( !link ) {
              $.error('Error creating stylesheet link element.');
            }
          }
          else {
            $.error('No stylesheet location defined.');
          }

      });

    }
  };

  function createLink(uri) {
    var linkId = 'autoloaded-stylesheet',
        oldLink = $('#'+linkId).attr('id', linkId + '-old');

    $('head').append($('<link/>').attr({
      'id':   linkId,
      'rel':  'stylesheet',
      'href': uri
    }));

    if( oldLink.length ) {
      oldLink.remove();
    }

    return $('#'+linkId);
  }


});
/**=========================================================
 * Module: markdownarea.js
 * Markdown Editor from UIKit adapted for Bootstrap Layout.
 =========================================================*/

App.directive('markdownarea', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var area         = $(element),
          Markdownarea = $.fn["markdownarea"],
          options      = $.Utils.options(attrs.markdownarea);
      
      var obj = new Markdownarea(area, $.Utils.options(attrs.markdownarea));

    }
  };
});





(function($, window, document){
    'use strict';

    var Markdownarea = function(element, options){

        var $element = $(element);

        if($element.data("markdownarea")) return;

        this.element = $element;
        this.options = $.extend({}, Markdownarea.defaults, options);

        this.marked     = this.options.marked || marked;
        this.CodeMirror = this.options.CodeMirror || CodeMirror;

        this.marked.setOptions({
          gfm           : true,
          tables        : true,
          breaks        : true,
          pedantic      : true,
          sanitize      : false,
          smartLists    : true,
          smartypants   : false,
          langPrefix    : 'lang-'
        });

        this.init();

        this.element.data("markdownarea", this);
    };

    $.extend(Markdownarea.prototype, {

        init: function(){

            var $this = this, tpl = Markdownarea.template;

            tpl = tpl.replace(/\{\:lblPreview\}/g, this.options.lblPreview);
            tpl = tpl.replace(/\{\:lblCodeview\}/g, this.options.lblCodeview);

            this.markdownarea = $(tpl);
            this.content      = this.markdownarea.find(".uk-markdownarea-content");
            this.toolbar      = this.markdownarea.find(".uk-markdownarea-toolbar");
            this.preview      = this.markdownarea.find(".uk-markdownarea-preview").children().eq(0);
            this.code         = this.markdownarea.find(".uk-markdownarea-code");

            this.element.before(this.markdownarea).appendTo(this.code);

            this.editor = this.CodeMirror.fromTextArea(this.element[0], this.options.codemirror);

            this.editor.markdownarea = this;

            this.editor.on("change", (function(){
                var render = function(){

                    var value   = $this.editor.getValue();

                    $this.currentvalue  = String(value);

                    $this.element.trigger("markdownarea-before", [$this]);

                    $this.applyPlugins();

                    $this.marked($this.currentvalue, function (err, markdown) {

                      if (err) throw err;

                      $this.preview.html(markdown);
                      $this.element.val($this.editor.getValue()).trigger("markdownarea-update", [$this]);
                    });
                };
                render();
                return $.Utils.debounce(render, 150);
            })());

            this.code.find(".CodeMirror").css("height", this.options.height);

            this._buildtoolbar();
            this.fit();

            $(window).on("resize", $.Utils.debounce(function(){
                $this.fit();
            }, 200));


            var previewContainer = $this.preview.parent(),
                codeContent      = this.code.find('.CodeMirror-sizer'),
                codeScroll       = this.code.find('.CodeMirror-scroll').on('scroll',$.Utils.debounce(function() {

                    if($this.markdownarea.attr("data-mode")=="tab") return;

                    // calc position
                    var codeHeight       = codeContent.height()   - codeScroll.height(),
                        previewHeight    = previewContainer[0].scrollHeight - previewContainer.height(),
                        ratio            = previewHeight / codeHeight,
                        previewPostition = codeScroll.scrollTop() * ratio;

                    // apply new scroll
                    previewContainer.scrollTop(previewPostition);
            }, 10));

            this.markdownarea.on("click", ".uk-markdown-button-markdown, .uk-markdown-button-preview", function(e){

                e.preventDefault();

                if($this.markdownarea.attr("data-mode")=="tab") {

                    $this.markdownarea.find(".uk-markdown-button-markdown, .uk-markdown-button-preview").removeClass("uk-active").filter(this).addClass("uk-active");

                    $this.activetab = $(this).hasClass("uk-markdown-button-markdown") ? "code":"preview";
                    $this.markdownarea.attr("data-active-tab", $this.activetab);
                }
            });

            this.preview.parent().css("height", this.code.height());
        },

        applyPlugins: function(){

            var $this   = this,
                plugins = Object.keys(Markdownarea.plugins),
                plgs    = Markdownarea.plugins;

            this.markers = {};

            if(plugins.length) {

                var lines = this.currentvalue.split("\n");

                plugins.forEach(function(name){
                    this.markers[name] = [];
                }, this);

                for(var line=0,max=lines.length;line<max;line++) {

                    (function(line){
                        plugins.forEach(function(name){

                            var i = 0;

                            lines[line] = lines[line].replace(plgs[name].identifier, function(){

                                var replacement =  plgs[name].cb({
                                    "area" : $this,
                                    "found": arguments,
                                    "line" : line,
                                    "pos"  : i++,
                                    "uid"  : [name, line, i, (new Date().getTime())+"RAND"+(Math.ceil(Math.random() *100000))].join('-'),
                                    "replace": function(strwith){
                                        var src   = this.area.editor.getLine(this.line),
                                            start = src.indexOf(this.found[0]);
                                            end   = start + this.found[0].length;

                                        this.area.editor.replaceRange(strwith, {"line": this.line, "ch":start}, {"line": this.line, "ch":end} );
                                    }
                                });

                                return replacement;
                            });
                        });
                    }(line));
                }

                this.currentvalue = lines.join("\n");

            }
        },

        _buildtoolbar: function(){

            if(!(this.options.toolbar && this.options.toolbar.length)) return;

            var $this = this, bar = [];

            this.options.toolbar.forEach(function(cmd){
                if(Markdownarea.commands[cmd]) {

                   var title = Markdownarea.commands[cmd].title ? Markdownarea.commands[cmd].title : cmd;

                   bar.push('<li><a data-markdownarea-cmd="'+cmd+'" title="'+title+'" data-toggle="tooltip">'+Markdownarea.commands[cmd].label+'</a></li>');

                   if(Markdownarea.commands[cmd].shortcut) {
                       $this.registerShortcut(Markdownarea.commands[cmd].shortcut, Markdownarea.commands[cmd].action);
                   }
                }
            });

            this.toolbar.html(bar.join("\n"));

            this.markdownarea.on("click", "a[data-markdownarea-cmd]", function(){
                var cmd = $(this).data("markdownareaCmd");

                if(cmd && Markdownarea.commands[cmd] && (!$this.activetab || $this.activetab=="code" || cmd=="fullscreen")) {
                    Markdownarea.commands[cmd].action.apply($this, [$this.editor]);
                }

            });
        },

        fit: function() {

            var mode = this.options.mode;

            if(mode=="split" && this.markdownarea.width() < this.options.maxsplitsize) {
                mode = "tab";
            }

            if(mode=="tab") {

                if(!this.activetab) {
                    this.activetab = "code";
                    this.markdownarea.attr("data-active-tab", this.activetab);
                }

                this.markdownarea.find(".uk-markdown-button-markdown, .uk-markdown-button-preview").removeClass("uk-active")
                                 .filter(this.activetab=="code" ? '.uk-markdown-button-markdown':'.uk-markdown-button-preview').addClass("uk-active");

            }

            this.editor.refresh();
            this.preview.parent().css("height", this.code.height());

            this.markdownarea.attr("data-mode", mode);
        },

        registerShortcut: function(combination, callback){

            var $this = this;

            combination = $.isArray(combination) ? combination : [combination];

            for(var i=0,max=combination.length;i < max;i++) {
                var map = {};

                map[combination[i]] = function(){
                    callback.apply($this, [$this.editor]);
                };

                $this.editor.addKeyMap(map);
            }
        },

        getMode: function(){
            var pos = this.editor.getDoc().getCursor();

            return this.editor.getTokenAt(pos).state.base.htmlState ? 'html':'markdown';
        }
    });

    //jQuery plugin

    $.fn.markdownarea = function(options){

        return this.each(function(){

            var ele = $(this);

            if(!ele.data("markdownarea")) {
                var obj = new Markdownarea(ele, options);
            }
        });
    };

    var baseReplacer = function(replace, editor){
        var text     = editor.getSelection(),
            markdown = replace.replace('$1', text);

        editor.replaceSelection(markdown, 'end');
    };

    Markdownarea.commands = {
        "fullscreen": {
            "title"  : 'Fullscreen',
            "label"  : '<i class="fa fa-expand"></i>',
            "action" : function(editor){

                editor.markdownarea.markdownarea.toggleClass("uk-markdownarea-fullscreen");

                // dont use uk- to avoid rules declaration
                $('html').toggleClass("markdownarea-fullscreen");
                $('html, body').scrollTop(0);

                var wrap = editor.getWrapperElement();

                if(editor.markdownarea.markdownarea.hasClass("uk-markdownarea-fullscreen")) {

                    editor.state.fullScreenRestore = {scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset, width: wrap.style.width, height: wrap.style.height};
                    wrap.style.width  = "";
                    wrap.style.height = editor.markdownarea.content.height()+"px";
                    document.documentElement.style.overflow = "hidden";

                } else {

                    document.documentElement.style.overflow = "";
                    var info = editor.state.fullScreenRestore;
                    wrap.style.width = info.width; wrap.style.height = info.height;
                    window.scrollTo(info.scrollLeft, info.scrollTop);
                }

                editor.refresh();
                editor.markdownarea.preview.parent().css("height", editor.markdownarea.code.height());
            }
        },

        "bold" : {
            "title"  : "Bold",
            "label"  : '<i class="fa fa-bold"></i>',
            "shortcut": ['Ctrl-B', 'Cmd-B'],
            "action" : function(editor){
                baseReplacer(this.getMode() == 'html' ? "<strong>$1</strong>":"**$1**", editor);
            }
        },
        "italic" : {
            "title"  : "Italic",
            "label"  : '<i class="fa fa-italic"></i>',
            "action" : function(editor){
                baseReplacer(this.getMode() == 'html' ? "<em>$1</em>":"*$1*", editor);
            }
        },
        "strike" : {
            "title"  : "Strikethrough",
            "label"  : '<i class="fa fa-strikethrough"></i>',
            "action" : function(editor){
                baseReplacer(this.getMode() == 'html' ? "<del>$1</del>":"~~$1~~", editor);
            }
        },
        "blockquote" : {
            "title"  : "Blockquote",
            "label"  : '<i class="fa fa-quote-right"></i>',
            "action" : function(editor){
                baseReplacer(this.getMode() == 'html' ? "<blockquote><p>$1</p></blockquote>":"> $1", editor);
            }
        },
        "link" : {
            "title"  : "Link",
            "label"  : '<i class="fa fa-link"></i>',
            "action" : function(editor){
                baseReplacer(this.getMode() == 'html' ? '<a href="http://">$1</a>':"[$1](http://)", editor);
            }
        },
        "picture" : {
            "title"  : "Picture",
            "label"  : '<i class="fa fa-picture-o"></i>',
            "action" : function(editor){
                baseReplacer(this.getMode() == 'html' ? '<img src="http://" alt="$1">':"![$1](http://)", editor);
            }
        },
        "listUl" : {
            "title"  : "Unordered List",
            "label"  : '<i class="fa fa-list-ul"></i>',
            "action" : function(editor){
                if(this.getMode() == 'markdown') baseReplacer("* $1", editor);
            }
        },
        "listOl" : {
            "title"  : "Ordered List",
            "label"  : '<i class="fa fa-list-ol"></i>',
            "action" : function(editor){
                if(this.getMode() == 'markdown') baseReplacer("1. $1", editor);
            }
        }
    };

    Markdownarea.defaults = {
        "mode"         : "split",
        "height"       : 500,
        "maxsplitsize" : 1000,
        "codemirror"   : { mode: 'gfm', tabMode: 'indent', tabindex: "2", lineWrapping: true, dragDrop: false, autoCloseTags: true, matchTags: true },
        "toolbar"      : [ "bold", "italic", "strike", "link", "picture", "blockquote", "listUl", "listOl" ],
        "lblPreview"   : "Preview",
        "lblCodeview"  : "Markdown"
    };

    Markdownarea.template = '<div class="uk-markdownarea uk-clearfix" data-mode="split">' +
                                '<div class="uk-markdownarea-navbar">' +
                                    '<ul class="uk-markdownarea-navbar-nav uk-markdownarea-toolbar"></ul>' +
                                    '<div class="uk-markdownarea-navbar-flip">' +
                                        '<ul class="uk-markdownarea-navbar-nav">' +
                                            '<li class="uk-markdown-button-markdown"><a>{:lblCodeview}</a></li>' +
                                            '<li class="uk-markdown-button-preview"><a>{:lblPreview}</a></li>' +
                                            '<li><a data-markdownarea-cmd="fullscreen" data-toggle="tooltip" title="Zen Mode"><i class="fa fa-expand"></i></a></li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="uk-markdownarea-content">' +
                                    '<div class="uk-markdownarea-code"></div>' +
                                    '<div class="uk-markdownarea-preview"><div></div></div>' +
                                '</div>' +
                            '</div>';

    Markdownarea.plugins   = {};
    Markdownarea.addPlugin = function(name, identifier, callback) {
        Markdownarea.plugins[name] = {"identifier":identifier, "cb":callback};
    };

    $.fn["markdownarea"] = Markdownarea;

    // init code
    $(function() {

        $("textarea[data-uk-markdownarea]").each(function() {
            var area = $(this), obj;

            if (!area.data("markdownarea")) {
                obj = new Markdownarea(area, $.Utils.options(area.attr("data-uk-markdownarea")));
            }
        });
    });

    return Markdownarea;

}(jQuery, window, document));

/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

App.directive('masked', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      if($.fn.inputmask)
        $elem.inputmask();
    }
  };
});

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }
  };

}]);


/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

App.directive('notify', function($window){

  return {
    restrict: 'A',
    controller: function ($scope, $element) {
      
      $element.on('click', function (e) {
        e.preventDefault();
        notifyNow($element);
      });

    }
  };

  function notifyNow(elem) {
    var $element = $(elem),
        message = $element.data('message'),
        options = $element.data('options');

    if(!message)
      $.error('Notify: No message specified');

    $.notify(message, options || {});
  }


});


/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document){

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            if(group) {
                for(var id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // @geedmo: alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if(this.timeout) clearTimeout(this.timeout);

            if(instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if(!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };


    $["notify"]          = notify;
    $["notify"].message  = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

App.directive("now", function(dateFilter){
    return {
      restrict: 'E',
      link: function(scope, element, attrs){
        
        var format = attrs.format;

        function updateTime() {
          var dt = dateFilter(new Date(), format);
          element.text(dt);
        }

        updateTime();
        setInterval(updateTime, 1000);
      }
    };
});
/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels. 
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

App.directive('paneltool', function($compile){
  var templates = {
    /* jshint multistr: true */
    collapse:"<a href='#' panel-collapse='' data-toggle='tooltip' title='Collapse Panel' ng-click='{{panelId}} = !{{panelId}}' ng-init='{{panelId}}=false'> \
                <em ng-show='{{panelId}}' class='fa fa-plus'></em> \
                <em ng-show='!{{panelId}}' class='fa fa-minus'></em> \
              </a>",
    dismiss: "<a href='#' panel-dismiss='' data-toggle='tooltip' title='Close Panel'>\
               <em class='fa fa-times'></em>\
             </a>",
    refresh: "<a href='#' panel-refresh='' data-toggle='tooltip' data-spinner='{{spinner}}' title='Refresh Panel'>\
               <em class='fa fa-refresh'></em>\
             </a>"
  };
  
  return {
    restrict: 'E',
    template: function( elem, attrs ){
      var temp = '';
      if(attrs.toolCollapse)
        temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
      if(attrs.toolDismiss)
        temp += templates.dismiss;
      if(attrs.toolRefresh)
        temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
      return temp;
    },
    // scope: true,
    // transclude: true,
    link: function (scope, element, attrs) {
      element.addClass('pull-right');
    }
  };
})
/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/
.directive('panelDismiss', function(){
  'use strict';
  return {
    restrict: 'A',
    controller: function ($scope, $element) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function () {

        // find the first parent panel
        var parent = $(this).closest('.panel');

        if($.support.animation) {
          parent.animo({animation: 'bounceOut'}, removeElement);
        }
        else removeElement();

        function removeElement() {
          // Trigger the event and finally remove the element
          $.when(parent.trigger(removeEvent, [parent]))
           .done(destroyPanel);
        }

        function destroyPanel() {
          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .trigger(removedEvent) // An event to catch when the panel has been removed from DOM
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

        }
      });
    }
  };
})
/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
.directive('panelCollapse', function($timeout){
  'use strict';
  
  var storageKeyName = 'panelState';
  
  return {
    restrict: 'A',
    // transclude: true,
    controller: function ($scope, $element) {

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== undefined) {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function() {

        savePanelState( panelId, !$scope[panelId] );

      });
    }
  };

  function savePanelState(id, state) {
    if(!id || !store || !store.enabled) return false;
    var data = store.get(storageKeyName);
    if(!data) { data = {}; }
    data[id] = state;
    store.set(storageKeyName, data);
  }

  function loadPanelState(id) {
    if(!id || !store || !store.enabled) return false;
    var data = store.get(storageKeyName);
    if(data) {
      return data[id];
    }
  }

})
/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/
.directive('panelRefresh', function(){
  'use strict';
  
  return {
    restrict: 'A',
    controller: function ($scope, $element) {
      
      var refreshEvent   = 'panel-refresh',
          csspinnerClass = 'csspinner',
          defaultSpinner = 'standard';

      // method to clear the spinner when done
      function removeSpinner() {
        this.removeClass(csspinnerClass);
      }

      // catch clicks to toggle panel refresh
      $element.on('click', function () {
        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(csspinnerClass + ' ' + spinner);

        // attach as public method
        panel.removeSpinner = removeSpinner;

        // Trigger the event and send the panel object
        $this.trigger(refreshEvent, [panel]);

      });

    }
  };
});


  /**
   * This function is only to show a demonstration
   * of how to use the panel refresh system via 
   * custom event. 
   * IMPORTANT: see how to remove the spinner.
   */
(function($, window, document){
  'use strict';

  $(document).on('panel-refresh', '.panel.panel-demo', function(e, panel){
    
    // perform any action when a .panel triggers a the refresh event
    setTimeout(function(){
      // when the action is done, just remove the spinner class
      panel.removeSpinner();
    }, 3000);

  });

}(jQuery, window, document));

/**=========================================================
 * Module: play-animation.js
 * Provides a simple way to run animation with a trigger
 * Requires animo.js
 =========================================================*/
 
App.directive('animate', function($window){

  'use strict';

  var $scroller = $(window).add('body, .wrapper');
  
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

      // Parse animations params and attach trigger to scroll
      var $elem     = $(elem),
          offset    = $elem.data('offset'),
          delay     = $elem.data('delay')     || 100, // milliseconds
          animation = $elem.data('play')      || 'bounce';
      
      if(typeof offset !== 'undefined') {
        
        // test if the element starts visible
        testAnimation($elem);
        // test on scroll
        $scroller.scroll(function(){
          testAnimation($elem);
        });

      }

      // Test an element visibilty and trigger the given animation
      function testAnimation(element) {
          if ( !element.hasClass('anim-running') &&
              $.Utils.isInView(element, {topoffset: offset})) {
          element
            .addClass('anim-running');

          setTimeout(function() {
            element
              .addClass('anim-done')
              .animo( { animation: animation, duration: 0.7} );
          }, delay);

        }
      }

      // Run click triggered animations
      $elem.on('click', function() {

        var $elem     = $(this),
            targetSel = $elem.data('target'),
            animation = $elem.data('play') || 'bounce',
            target    = $(targetSel);

        if(target && target) {
          target.animo( { animation: animation } );
        }
        
      });
    }
  };

});

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

App.directive('scrollable', function(){
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      var defaultHeight = 250;
      elem.slimScroll({
          height: (attrs.height || defaultHeight)
      });
    }
  };
});
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$window', 'APP_MEDIAQUERY', function($window, mq) {
  
  var $win  = $($window);
  var $html = $('html');
  var $body = $('body');
  var $scope;
  var $sidebar;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = isTouch() ? 'click' : 'mouseenter' ;
      $sidebar.on( eventName, '.nav > li', function() {
        if( isSidebarCollapsed() && !isMobile() )
          toggleMenuItem( $(this) );
      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
        $('.sidebar li.open').removeClass('open');
      });
    }
  };


  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return;
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return;
    }

    var $aside = $('.aside');
    var mar =  $scope.app.layout.isFixed ?  parseInt( $aside.css('margin-top'), 0) : 0;

    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

  }

  function removeFloatingNav() {
    $('.sidebar-subnav.nav-floating').remove();
  }

  function isTouch() {
    return $html.hasClass('touch');
  }
  function isSidebarCollapsed() {
    return $body.hasClass('aside-collapsed');
  }
  function isSidebarToggled() {
    return $body.hasClass('aside-toggled');
  }
  function isMobile() {
    return $win.width() < mq.tablet;
  }
}]);
/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

App.directive('skycon', function(){

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      var skycons = new Skycons({'color': (attrs.color || 'white')});

      element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');

      skycons.add(element.children()[0], attrs.skycon);

      skycons.play();

    }
  };
});
/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/
 
App.directive('sparkline', ['$timeout', '$window', function($timeout, $window){

  'use strict';

  return {
    restrict: 'A',
    controller: function ($scope, $element) {
      var runSL = function(){
        initSparLine($element);
      };

      $timeout(runSL);
    }
  };

  function initSparLine($element) {
    var options = $element.data();

    options.type = options.type || 'bar'; // default chart is bar
    options.disableHiddenCheck = true;

    $element.sparkline('html', options);

    if(options.resize) {
      $(window).resize(function(){
        $element.sparkline('html', options);
      });
    }
  }

}]);

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/

App.directive('checkAll', function() {
  'use strict';
  
  return {
    restrict: 'A',
    controller: function($scope, $element){
      
      $element.on('change', function() {
        var $this = $(this),
            index= $this.index() + 1,
            checkbox = $this.find('input[type="checkbox"]'),
            table = $this.parents('table');
        // Make sure to affect only the correct checkbox column
        table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
          .prop('checked', checkbox[0].checked);

      });
    }
  };

});
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

App.directive('tagsinput', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      if($.fn.tagsinput)
        $elem.tagsinput();
    }
  };
});

/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);

/**=========================================================
 * Module: masked,js
 * Initializes the jQuery UI slider controls
 =========================================================*/

App.directive('uiSlider', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      if($.fn.slider)
        $elem.slider();
    }
  };
});

/**=========================================================
 * Module: chosen-select.js
 * Initializes the chose select plugin
 =========================================================*/

App.directive('validateForm', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      if($.fn.parsley)
        $elem.parsley();
    }
  };
});

/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

App.directive('vectorMap', ['vectorMap', function(vectorMap){
  'use strict';

  var defaultColors = {
      markerColor:  '#23b7e5',      // the marker points
      bgColor:      'transparent',      // the background
      scaleColors:  ['#878c9a'],    // the color of the region in the serie
      regionFill:   '#bbbec6'       // the base region color
  };

  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {

      var mapHeight   = attrs.height || '300',
          options     = {
            markerColor:  attrs.markerColor  || defaultColors.markerColor,
            bgColor:      attrs.bgColor      || defaultColors.bgColor,
            scale:        attrs.scale        || 1,
            scaleColors:  attrs.scaleColors  || defaultColors.scaleColors,
            regionFill:   attrs.regionFill   || defaultColors.regionFill,
            mapName:      attrs.mapName      || 'world_mill_en'
          };
      
      element.css('height', mapHeight);
      
      vectorMap.init( element , options, scope.seriesData, scope.markersData);

    }
  };

}]);
App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: google-map.js
 * Services to share gmap functions
 =========================================================*/

App.service('gmap', function() {

  return {
    setStyle: function(style) {
      this.MapStyles = style;
    },
    autocenter: function() {
      var refs = this.gMapRefs;
      if(refs && refs.length) {
        for( var r in refs) {
          var mapRef = refs[r];
          var currMapCenter = mapRef.getCenter();
          if(mapRef && currMapCenter) {
              google.maps.event.trigger(mapRef, 'resize');
              mapRef.setCenter(currMapCenter);
          }
        }
      }
    },
    init: function (element) { //initGmap

      var self      = this,
          $element  = $(element),
          addresses = $element.data('address') && $element.data('address').split(';'),
          titles    = $element.data('title') && $element.data('title').split(';'),
          zoom      = $element.data('zoom') || 14,
          maptype   = $element.data('maptype') || 'ROADMAP', // or 'TERRAIN'
          markers   = [];

      if(addresses) {
        for(var a in addresses)  {
            if(typeof addresses[a] == 'string') {
                markers.push({
                    address:  addresses[a],
                    html:     (titles && titles[a]) || '',
                    popup:    true   /* Always popup */
                  });
            }
        }

        var options = {
            controls: {
                   panControl:         true,
                   zoomControl:        true,
                   mapTypeControl:     true,
                   scaleControl:       true,
                   streetViewControl:  true,
                   overviewMapControl: true
               },
            scrollwheel: false,
            maptype: maptype,
            markers: markers,
            zoom: zoom
            // More options https://github.com/marioestrada/jQuery-gMap
        };

        var gMap = $element.gMap(options);

        var ref = gMap.data('gMap.reference');
        // save in the map references list
        if( ! self.gMapRefs )
          self.gMapRefs = [];
        self.gMapRefs.push(ref);

        // set the styles
        if($element.data('styled') !== undefined) {
          
          ref.setOptions({
            styles: self.MapStyles
          });

        }
      }
    }
  };
});
/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', function() {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = store.get(storageKeyName);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      store.set(storageKeyName, data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = store.get(storageKeyName);
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      store.set(storageKeyName, data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = store.get(storageKeyName);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

});
/**=========================================================
 * Module: vector-map.js
 * Services to initialize vector map plugin
 =========================================================*/

App.service('vectorMap', function() {
  'use strict';
  return {
    init: function($element, opts, series, markers) {
          $element.vectorMap({
            map:             opts.mapName,
            backgroundColor: opts.bgColor,
            zoomMin:         2,
            zoomMax:         8,
            zoomOnScroll:    false,
            regionStyle: {
              initial: {
                'fill':           opts.regionFill,
                'fill-opacity':   1,
                'stroke':         'none',
                'stroke-width':   1.5,
                'stroke-opacity': 1
              },
              hover: {
                'fill-opacity': 0.8
              },
              selected: {
                fill: 'blue'
              },
              selectedHover: {
              }
            },
            focusOn:{ x:0.4, y:0.6, scale: opts.scale},
            markerStyle: {
              initial: {
                fill: opts.markerColor,
                stroke: opts.markerColor
              }
            },
            onRegionLabelShow: function(e, el, code) {
              if ( series && series[code] )
                el.html(el.html() + ': ' + series[code] + ' visitors');
            },
            markers: markers,
            series: {
                regions: [{
                    values: series,
                    scale: opts.scaleColors,
                    normalizeFunction: 'polynomial'
                }]
            },
          });
        }
  };
});