import pytest
import urllib.parse
import urllib.error
import urllib.request
import json


def test_api_parse_succeeds(client):
    # TODO: Finish this test. Send a request to the API and confirm that the
    # data comes back in the appropriate format.
    address_string = '123 main st chicago il'
    query = urllib.parse.quote_plus(address_string)
    url = f'http://172.17.0.1:8000/api/parse/?address={query}'

    with urllib.request.urlopen(url) as r:
        data = json.loads(r.read())
        assert data['address_type'] == 'Street Address'


def test_api_parse_raises_error(client):
    # TODO: Finish this test. The address_string below will raise a
    # RepeatedLabelError, so ParseAddress.parse() will not be able to parse it.
    address_string = '123 main st chicago il 123 main st'
    query = urllib.parse.quote_plus(address_string)
    url = f'http://172.17.0.1:8000/api/parse/?address={query}'

    with urllib.request.urlopen(url) as r:
        data = json.loads(r.read())
        assert data['address_type'] == 'Error'
