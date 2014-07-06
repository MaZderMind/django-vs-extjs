from django.conf.urls import patterns, include, url
from rest_framework import viewsets, routers

# admin ui
from django.contrib import admin
admin.autodiscover()

# routers for the rest-api
restrouter = routers.DefaultRouter()

# add api-routers for the polls application
from polls import rest as pollsapi
pollsapi.register(restrouter)

# root-level url patterns
urlpatterns = patterns('',
	# frontpage
	url(r'^', include('frontend.urls')),

	# admin-ui
	url(r'^admin/', include(admin.site.urls)),

	# provide a login-link in the browsable api
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

	# base for the browsable api
	url(r'^api/', include(restrouter.urls)),
)
