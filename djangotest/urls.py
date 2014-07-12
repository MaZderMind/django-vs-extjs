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
	url(r'^api/ui-auth/', include('rest_framework.urls', namespace='rest_framework')),

	# login for rest-api
	url(r'^api/auth/', include('rest_auth.urls')),

	# login for rest-api
	url(r'^api/', include('frontend.apiurls')),

	# base for the browsable- the rest-api
	url(r'^api/', include(restrouter.urls)),
)
