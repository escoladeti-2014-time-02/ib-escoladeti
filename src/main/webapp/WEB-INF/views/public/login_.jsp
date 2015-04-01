<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <script type="text/javascript" src="./resources/js/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="./resources/js/bootstrap.min.js"></script>    
        <link rel="stylesheet" href="./resources/css/bootstrap.min.css" >
        <title>Escola de TI - 2014</title>
	</head>

	<body>
		<div class="container">
			<div class="row text-center">
	            <div class="form-group col-md-4 col-md-offset-4">
					<h1>Login</h1>
				</div>
			</div>
			<form name='f' action="j_spring_security_check" method='POST'>
				<div class="row">
		            <div class="form-group col-md-4 col-md-offset-4">
		                <input type="text" class="form-control" placeholder="Usuário" name="j_username"/>
		            </div>
				</div>
				<div class="row">
		            <div class="form-group col-md-4 col-md-offset-4">
		                <input type="password" class="form-control" placeholder="Senha" name="j_password"/>
		            </div>
				</div>
	            <div class="row">
	                <div class="form-group col-md-4 col-md-offset-4">
	                    <button type="submit" class="btn btn-success form-control"><i class="glyphicon glyphicon-ok"></i> Entrar</button>
	                </div>
	            </div>
				<c:if test="${loginError}">
		            <div class="row">
						<div class="col-md-4 col-md-offset-4 alert alert-danger text-center">
							Falha na autenticação.
						</div>
					</div>
				</c:if>
			</form>
		</div>	
	</body>
</html>