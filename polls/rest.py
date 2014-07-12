from rest_framework import viewsets, routers, serializers
from rest_framework_chain import ChainedFilterSet, AllLookupsFilter
from polls.models import Poll

# the serializer specifies how the records are serialized in the list or detail-views
class PollSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Poll
		fields = ('id', 'url', 'question', 'pub_date', )

# Just a regular FilterSet
class PollFilter(ChainedFilterSet):
	question = AllLookupsFilter(name='question')

	class Meta:
		model = Poll

# the viewset defines urls and views for list and detail-viwes
class PollViewSet(viewsets.ModelViewSet):
	queryset = Poll.objects.all()
	serializer_class = PollSerializer
	filter_class = PollFilter

# register viewsets for the rest-api
def register(restrouter):
	restrouter.register(r'polls', PollViewSet)
