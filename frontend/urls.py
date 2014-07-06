from django.conf.urls import patterns, url
from frontend import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^username/', views.username, name='username'),
)
