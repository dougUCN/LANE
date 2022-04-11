from ariadne import QueryType, MutationType, SubscriptionType, ScalarType
from .models import Histogram
from dateutil.parser import parse as dateParse
from django.utils.timezone import make_aware
import asyncio

### Datetime scalar ###

datetime_scalar = ScalarType("Datetime")

@datetime_scalar.serializer
def serialize_datetime(value):
    return value.isoformat()

@datetime_scalar.value_parser
def parse_datetime_value(value):
    if value:
        return dateParse(value)

@datetime_scalar.literal_parser
def parse_datetime_literal(ast):
    value = str(ast.value)
    return make_aware( parse_datetime_value(value) )

### Queries ###

query = QueryType()

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


### Mutations ### 

mutation = MutationType()

@mutation.field("createHistogram")
def create_histogram(*_, hist):
    clean_hist = clean_hist_input(hist)
    new_hist = Histogram(id = clean_hist['id'], data=clean_hist['data'],
                             nbins=clean_hist['nbins'], type=clean_hist['type'],)
    new_hist.save(using = clean_hist['database'])
    return histogram_payload(f'created hist {clean_hist["id"]}')


@mutation.field("updateHistogram")
def update_histogram(*_, id, hist):
    '''Updates non-empty fields from hist object'''
    clean_hist = clean_hist_input(hist)
    in_database = Histogram.objects.get(id=id)
    if clean_hist['data']:
        in_database.data = clean_hist['data']
        in_database.nbins = len(hist.get('data'))
    if clean_hist['type']:
        in_database.type = clean_hist['type']
    in_database.save(using = clean_hist['database'])
    return histogram_payload(f'updated hist {id}')

@mutation.field("deleteHistogram")
def delete_histogram(*_, id, isLive):
    Histogram.objects.get(id=id).delete(using=chooseDatabase(isLive))
    return histogram_payload(f'deleted hist {id}')

### Subscriptions ###
# subscription = SubscriptionType()

# @subscription.source("getLiveHistograms")
# async def generate_live_histograms(*_):
#     '''Returns live histograms'''
#     # queryset = Histogram.objects.using('live').all()
#     # histograms = []
#     # if queryset.exists():
#     #     for hist in queryset:
#     #         hist.data = commsep_to_int( hist.data )
#     #         histograms.append(hist)
#     # return histograms
#     while True:
#         await asyncio.sleep(1)
#         # TODO: get the data from the database

# @subscription.field("getLiveHistograms")
# def resolve_live_histograms(*_, histograms):
#     return histograms



### Common histogram related functions ###

def histogram_payload( message, success=True ):
    return {'message': message, 
            'success': success,
            }

def clean_hist_input( hist ):
    '''Takes histogram input from graphQL resolver and prepares to put it into the database
    '''
    nbins = hist.get('nbins')
    data = hist.get('data')
    if (nbins is None) and data:
        nbins = len(data)
    elif data is None:
        nbins = 0 
    return {
            'id': hist['id'],
            'data': int_to_commsep( data ),
            'nbins': nbins,
            'type': hist.get('type'),
            'database': chooseDatabase( hist.get('isLive') ),
            }

def chooseDatabase( isLive ):
    '''Chooses whether to write to live database or default database
    '''
    if isLive: 
        return "live"
    else:
        return "default"

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