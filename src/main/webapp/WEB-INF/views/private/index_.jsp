<!DOCTYPE html>
<html lang="pt-br" ng-app="time02">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/isisbruder/"/>

    <title>Fundação Isis Bruder</title>

    <!-- Core CSS - Include with every page -->
    <link href="./resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="./resources/fonts/font-awesome/css/font-awesome.css" rel="stylesheet">

    <!-- Page-Level Plugin CSS - Dashboard -->
    <link href="./resources/css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">
    <link href="./resources/css/plugins/timeline/timeline.css" rel="stylesheet">
    <link href="./resources/css/loading-bar.css" rel="stylesheet">

    <!-- SB Admin CSS - Include with every page -->
    <link href="./resources/css/sb-admin-v2.css" rel="stylesheet">
    <link href="./resources/css/isisBruder.css" rel="stylesheet">
    <link href="./resources/css/growl.css" rel="stylesheet">
    <link href="./resources/css/image-crop-styles.css" rel="stylesheet">

</head>

<body ng-controller="MainCtrl">
    <div id="wrapper">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">Menu</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
               <a href="./"><img class="logo-menu hidden-xs" src="./resources/img/logo-isis-bruder.png"></a>
               <a class="navbar-brand visible-xs" href="index.html">Fundação Isis Bruder</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="./logout"><i class="fa fa-sign-out fa-fw"></i> Sair</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default navbar-static-side" role="navigation">
                <div class="sidebar-collapse">
                    <hr>
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="./#/candidato"><i class="fa fa-user fa-fw"></i> Candidato</a>
                        </li>
                        <li>
                            <a href="./#/processoseletivo"><i class="fa fa-gears fa-fw"></i> Processo Seletivo</a>
                        </li>
                        <li>
                            <a href="./#/empresa"><i class="fa fa-building fa-fw"></i> Empresa</a>
                        </li>
                        <li>
                            <a href="./#/instituicaodeensino"><i class="fa fa-university fa-fw"></i> Instituição de Ensino</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-book fa-fw"></i> Programa de Aprendizagem<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li><a href="./#/programaaprendizagem/disciplina">Disciplina</a></li>
                                <li><a href="./#/programaaprendizagem/colaborador">Colaborador</a></li>
                                <li><a href="./#/programaaprendizagem/modulo">Módulo</a></li>
                                <li><a href="./#/programaaprendizagem/curso">Curso</a></li>
                                <li><a href="./#/programaaprendizagem/turma">Turma</a></li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-map-marker fa-fw"></i> Endereço<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li><a href="./#/endereco/logradouro">Logradouro</a></li>
                                <li><a href="./#/endereco/bairro">Bairro</a></li>
                                <li><a href="./#/endereco/cidade">Cidade</a></li>
                                <li><a href="./#/endereco/uf">Unidade Federativa</a></li>
                                <li><a href="./#/endereco/pais">País</a></li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-gear fa-fw"></i> Acesso<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li><a href="./#/acesso/usuario">Usuário</a></li>
				<li><a href="./#/acesso/perfildeacesso">Perfil de Acesso</a></li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                    </ul>
                    <!-- /#side-menu -->
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

    <div id="page-wrapper">
        <div growl></div>
        <div ng-view>
            
        </div>
    </div>
    <!-- /#wrapper -->

    <!-- Core Scripts - Include with every page -->
    
    <!-- Arquivos JavaScript -->
      <script src="./resources/js/jquery-1.11.0.min.js"></script>
      <script src="./resources/js/bootstrap.min.js"></script>
      <script src="./resources/js/underscore-min.js"></script>
      <script src="./resources/js/angular.min.js"></script>
      <script src="./resources/js/angular-animate.min.js"></script>
      <script src="./resources/js/angular-route.min.js"></script>
      <script src="./resources/js/angular-sanitize.min.js"></script>
      <script src="./resources/js/restangular.min.js"></script>
      <script src="./resources/js/angular.easypiechart.js"></script>     
      <script src="./resources/js/growl.js"></script>
      <script src="./resources/js/cpf.js"></script>
      <script src="./resources/js/cnpj.js"></script>
      <script src="./resources/js/ngCpfCnpj.js"></script>
      <script src="./resources/js/loading-bar.js"></script>
      <script src="./resources/js/ui-utils.min.js"></script>
      <script src="./resources/js/ui-bootstrap-tpls-0.11.0.min.js"></script>      
      <script src="./resources/js/ui-utils-ieshiv.min.js"></script>
      <script src="./resources/js/ng-filters-br.js"></script>
      <script src="./resources/js/image-crop.js"></script>
      <script src="//maps.googleapis.com/maps/api/js?sensor=false"></script> 
      <script src="./resources/js/angular-gm-0.2.0.min.js"></script>
      <script src="./resources/js/fontawesome-markers.js"></script>    
      <script src="./resources/js/randomColor.js"></script>
      <script src="./resources/js/chance.js"></script>



      <!-- Controller -->
        <script src="./modules/pais/controllers/paisCtrl.js"></script>
        <script src="./modules/uf/controllers/ufCtrl.js"></script>
        <script src="./modules/logradouro/controllers/logradouroCtrl.js"></script>
        <script src="./modules/bairro/controllers/bairroCtrl.js"></script>
        <script src="./modules/cidade/controllers/cidadeCtrl.js"></script>
        <script src="./modules/pessoa/controllers/pessoaCtrl.js"></script>
        <script src="./modules/candidato/controllers/candidatoCtrl.js"></script>
        <script src="./modules/candidato/controllers/gerarCandidatoCtrl.js"></script>
        <script src="./modules/usuario/controllers/usuarioCtrl.js"></script>
        <script src="./modules/perfildeacesso/controllers/perfilDeAcessoCtrl.js"></script>
        <script src="./modules/processoseletivo/controllers/processoSeletivoCtrl.js"></script>
        <script src="./modules/processoseletivo/controllers/mapaProcessoSeletivoCtrl.js"></script>
        <script src="./modules/empresa/controllers/empresaCtrl.js"></script>
        <script src="./modules/instituicaodeensino/controllers/instituicaoDeEnsinoCtrl.js"></script>
        <script src="./modules/empresa/controllers/empresaCtrl.js"></script>
        <script src="./modules/programaaprendizagem/disciplina/controllers/disciplinaCtrl.js"></script>
        <script src="./modules/programaaprendizagem/colaborador/controllers/colaboradorCtrl.js"></script>
        <script src="./modules/programaaprendizagem/modulo/controllers/moduloCtrl.js"></script>
        <script src="./modules/programaaprendizagem/curso/controllers/cursoCtrl.js"></script>
        <script src="./modules/programaaprendizagem/turma/controllers/turmaCtrl.js"></script>
        <script src="./modules/main/controllers/router.js"></script>
        <script src="./modules/main/controllers/mainCtrl.js"></script>
        <script src="./modules/main/controllers/directives.js"></script>
        <script src="./modules/main/controllers/services.js"></script>
        <script src="./modules/main/controllers/filters.js"></script>
      <!-- Fim Controllers -->
    <!-- Fim arquivos JavaScript -->

    <!-- Plugin Scripts - Dashboard -->
    <script src="./resources/js/plugins/morris/raphael-2.1.0.min.js"></script>
    <script src="./resources/js/plugins/morris/morris.js"></script>
    <script src="./resources/js/plugins/metisMenu/jquery.metisMenu.js"></script>

    <!-- SB Admin Scripts - Include with every page -->
    <script src="./resources/js/sb-admin.js"></script>

    <!-- Page-Level Demo Scripts - Dashboard - Use for reference -->

	</div>

</body>

</html>
