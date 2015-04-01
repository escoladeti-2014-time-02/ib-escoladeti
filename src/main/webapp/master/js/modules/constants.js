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