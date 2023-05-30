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
		<p>테트리스</p>
		<div id="box">
			<table id="tetris_table">
				<c:forEach begin="1" end="24" varStatus="outer_status">
					<c:choose>
						<c:when test="${outer_status.count <= 4}">
							<tr style="display:none;">
								<c:forEach begin="1" end="10" varStatus="inner_status">
									<td class="tetris_hidden_background" id="${outer_status.count}_${inner_status.count}">
									</td>
								</c:forEach>
							</tr>
						</c:when>
						<c:otherwise>
							<tr>
								<c:forEach begin="1" end="10" varStatus="inner_status">
									<td class="tetris_background" id="${outer_status.count}_${inner_status.count}">
									</td>
								</c:forEach>
							</tr>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</table>
			<div id="next_tetris">
				<p>다음 모양</p>
				<table>
					<c:forEach begin="1" end="4" varStatus="status">
						<tr>
							<td class="next_tetris_background" id="${status.count}-1"></td>
							<td class="next_tetris_background" id="${status.count}-2"></td>
							<td class="next_tetris_background" id="${status.count}-3"></td>
							<td class="next_tetris_background" id="${status.count}-4"></td>
						</tr>
					</c:forEach>
				</table>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
	<script src="js/index.js"></script>
</body>
</html>