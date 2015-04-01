<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
	<head>
		<meta charset="UTF-8">
        <script type="text/javascript" src="./resources/js/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="./resources/js/bootstrap.min.js"></script>    
        <link rel="stylesheet" href="./resources/css/bootstrap.min.css" >
        <link rel="stylesheet" href="./resources/css/login.css" >
        <title>Fundação Isis Bruder</title>
	</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="login-painel">
						<div class="row">
							<div class="col-md-12 login-logo">
								<img class="center-block" src="./resources/img/logo-isis-bruder-grande.png">
							</div>
						</div>
						<form name='f' action="j_spring_security_check" method='POST'>
							<div class="row">
								<div class="col-md-12 form-group">
									<label>Login</label>
									<input type="text" class="form-control" placeholder="Usuário" name="j_username"/>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 form-group">
									<label>Senha</label>
									<input type="password" class="form-control" placeholder="Senha" name="j_password"/>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 form-group">
									<div class="login-botao pull-right">
										<button class="btn btn-success">Login</button>	
									</div>									
								</div>
							</div>
						</form>
						<c:if test="${loginError}">
				            <div class="row">
								<div class="col-md-10 col-md-offset-1 alert alert-danger text-center">
									Falha na autenticação.
								</div>
							</div>
						</c:if>
						<c:if test="${logoutSuccess}">
				            <div class="row">
								<div class="col-md-10 col-md-offset-1 alert alert-success text-center">
									Acesso encerrado
								</div>
							</div>
						</c:if>
					</div>
				</div>
			</div>
		</div>			
	</body>
</html>