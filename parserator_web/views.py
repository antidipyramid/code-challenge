import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer


class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # TODO: Flesh out this method to parse an address string using the
        # parse() method and return the parsed components to the frontend.

        address_components, address_type = {}, ''

        # in case the this endpoint is ever called without the
        # address parameter
        if 'address' not in request.query_params:
            return Response({'input_string': '',
                             'address_components': address_components,
                             'address_type': address_type,
                             'error': 'No address provided.'},
                            status=400)

        input_string = request.query_params['address']

        try:
            address_components, address_type = self.parse(input_string)
        except usaddress.RepeatedLabelError as e:
            address_components, address_type = e.parsed_string, 'Error'
        return Response({'input_string': input_string,
                         'address_components': address_components,
                         'address_type': address_type})

    def parse(self, address):
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress

        address_components, address_type = usaddress.tag(address)
        return (address_components, address_type)
