from django.http import HttpResponse
from django.shortcuts import render
import json

def index(request):
	return render(request, 'frontend/index.html')

def username(request):
	return HttpResponse(json.dumps(
		request.user.username if request.user.is_authenticated() else False
	), content_type="application/json")
