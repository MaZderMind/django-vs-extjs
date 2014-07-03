from rest_framework import viewsets, routers
from polls import models

# ViewSets define the rest-api behavior
class PollViewSet(viewsets.ModelViewSet):
	model = models.Poll

# register viewsets for the rest-api
def register(restrouter):
	restrouter.register(r'polls', PollViewSet)

