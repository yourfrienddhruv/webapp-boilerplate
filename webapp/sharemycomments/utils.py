from django.http import HttpResponse
import json
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


def json_response(func):
    """
    A decorator that takes a view response and turns it
    into json. If a callback is added through GET or POST
    the response is JSONP.
    """

    def decorator(request, *args, **kwargs):
        from django.core.serializers.json import DjangoJSONEncoder

        objects = func(request, *args, **kwargs)
        status = objects.get('status', 200)
        if isinstance(objects, HttpResponse):
            return objects
        try:
            data = json.dumps(objects, cls=DjangoJSONEncoder)
            if 'callback' in request.REQUEST:
                # a jsonp response!
                data = '%s(%s);' % (request.REQUEST['callback'], data)
                return HttpResponse(data, 'text/javascript', status=status)
        except:
            data = json.dumps(str(objects), cls=DjangoJSONEncoder)
        return HttpResponse(data, 'application/json', status=status)


    return decorator