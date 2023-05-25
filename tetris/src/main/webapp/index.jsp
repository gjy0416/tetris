<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/index.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<div id="tetris_box">
		<table>
			<c:forEach begin="1" end="24" varStatus="outer_status">
				<tr>
					<c:forEach begin="1" end="10" varStatus="inner_status">
						<td class="tetris_background" id="${outer_status.count}_${inner_status.count}">
						</td>
					</c:forEach>
				</tr>
			</c:forEach>
		</table>
	</div>
	<script src="js/index.js"></script>
</body>
</html>