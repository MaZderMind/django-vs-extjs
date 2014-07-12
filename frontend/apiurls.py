from django.conf.urls import patterns, url
from frontend import views

urlpatterns = patterns('',
	url(r'^auth/permissions/$', views.permissions, name='permissions'),
)
