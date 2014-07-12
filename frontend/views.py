from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
import json

@ensure_csrf_cookie
def index(request):
	return render(request, 'frontend/index.html')

def permissions(request):
	print(request.user.user_permissions.all())
	return HttpResponse(json.dumps(
		{
			'is_superuser': request.user.is_superuser,
			'user_permissions': list(map(lambda x:str(x.codename), request.user.user_permissions.all()))
		}
	), 'application/json')
