from ariadne import ObjectType, ScalarType
from .models import Histogram
from dateutil.parser import parse as dateParse
from django.utils.timezone import make_aware

datetime_scalar = ScalarType("Datetime")

@datetime_scalar.serializer
def serialize_datetime(value):
    return value.isoformat()

query = ObjectType("Query")

@datetime_scalar.value_parser
def parse_datetime_value(value):
    if value:
        return dateParse(value)

@datetime_scalar.literal_parser
def parse_datetime_literal(ast):
    value = str(ast.value)
    return make_aware( parse_datetime_value(value) )

@query.field("listHistograms")
def list_histograms(*_):
    '''Lists the IDs of all histograms in the database
    '''
    return Histogram.objects.all().values_list('id', flat=True)

@query.field("getHistogram")
def resolve_histogram(*_, id):
    histogram = Histogram.objects.get(id=id)
    histogram.data = commsep_to_int( histogram.data )
    return histogram

@query.field("getHistograms")
def resolve_histograms(*_, ids=None, types=None,
                            minDate=None, maxDate=None, 
                            minBins=None, maxBins=None):
    queryset = Histogram.objects.all()
    if ids:
        queryset = queryset.filter(id__in=ids)
    if types:
        queryset = queryset.filter(type__in=types)
    if minDate:
        queryset = queryset.filter(created__gte=minDate)
    if maxDate:
        queryset = queryset.filter(created__lte=maxDate)
    if minBins:
        queryset = queryset.filter(nbins__gte=minBins)
    if maxBins:
        queryset = queryset.filter(nbins__lte=maxBins)

    histograms = []
    if queryset.exists():
        for hist in queryset:
            hist.data = commsep_to_int( hist.data )
            histograms.append(hist)
    return histograms

mutation = ObjectType("Mutation")

@mutation.field("createHistogram")
def create_histogram(*_, hist):
    clean_hist = clean_hist_input(hist)
    Histogram.objects.create(id = clean_hist['id'], data=clean_hist['data'],
                             nbins=clean_hist['nbins'], type=clean_hist['type'])
    return histogram_payload(f'created hist {clean_hist["id"]}')


@mutation.field("updateHistogram")
def update_histogram(*_, id, hist):
    '''Updates non-empty fields from hist object'''
    new_hist = clean_hist_input(hist)
    in_database = Histogram.objects.get(id=id)
    if new_hist['data']:
        in_database.data = new_hist['data']
        in_database.nbins = len(hist.get('data'))
    if new_hist['type']:
        in_database.type = new_hist['type']
    in_database.save()
    return histogram_payload(f'updated hist {id}')

@mutation.field("deleteHistogram")
def delete_histogram(*_, id):
    Histogram.objects.get(id=id).delete()
    return histogram_payload(f'deleted hist {id}')

def histogram_payload( message, success=True ):
    return {'message': message, 
            'success': success,
            }

def clean_hist_input( hist ):
    '''Takes histogram input from graphQL resolver and prepares to put it into the database
    '''
    nbins = hist.get('nbins')
    data = hist.get('data')
    if nbins is None:
        nbins = len(data)
    return {
            'id': hist['id'],
            'data': int_to_commsep( data ),
            'nbins': nbins,
            'type': hist.get('type'),
            }


def int_to_commsep( list_of_ints ):
    '''Converts a list of integers into a comma separated integer list
    '''
    if list_of_ints:
        return ','.join([str(i) for i in list_of_ints])
    else:
        return None

def commsep_to_int( string ):
    '''Converts a string of comma separated integers into a list of ints
    '''
    return [int(x) for x in string.split(',')]