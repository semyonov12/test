<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);
	
	$mail->isSMTP(); 
	$mail->Host = 'smtp.gmail.com'; 
	$mail->SMTPAuth = true;
    $mail->Username = 'websitemywebsite1@gmail.com'; 
    $mail->Password = 'hxpjamkjqgjohcsb'; 
    $mail->SMTPSecure = 'TLS';
    $mail->Port = 587;


	$mail->setFrom('websitemywebsite1@gmail.com', 'Neuro 3L Agency');
	
	
	$mail->addAddress('neuro3lagency@mail.ru');
	
	$mail->Subject = 'Заявка с сайта';
	



	$body = '';

	if (!empty($_POST['name'])) {
		$body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
	}
	
	if (!empty($_POST['tel'])) {
		$body .= '<p><strong>Телефон:</strong> ' . $_POST['tel'] . '</p>';
	}
	



	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Форма отправлена!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);