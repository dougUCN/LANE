from ariadne import ObjectType, ScalarType
from .models import Histogram

datetime_scalar = ScalarType("Datetime")

@datetime_scalar.serializer
def serialize_datetime(value):
    return value.isoformat()

query = ObjectType("Query")

@query.field("listHistograms")
def list_histograms(*_):
    '''Lists the IDs of all histograms in the database
    '''
    #TODO: Empty list when database is empty
    return Histogram.objects.all().values_list('id', flat=True)

@query.field("getHistogram")
def resolve_histogram(*_, id):
    #TODO: Error handling for nonexistent histogram
    histogram = Histogram.objects.get(id=id)
    histogram.data = commsep_to_int( histogram.data )
    return histogram

mutation = ObjectType("Mutation")

@mutation.field("createHistogram")
def create_histogram(*_, hist):
    #TODO: Error handling for existing histogram
    clean_hist = clean_hist_input(hist)
    Histogram.objects.create(id = clean_hist['id'], data=clean_hist['data'], nbins=clean_hist['nbins'])
    return histogram_status(f'created hist {clean_hist["id"]}')

@mutation.field("updateHistogram")
def update_histogram(*_, id, hist):
    #TODO: Error handling for nonexistent histogram
    new_hist = clean_hist_input(hist)
    in_database = Histogram.objects.get(id=id)
    in_database.data = new_hist['data']
    in_database.nbins = len(new_hist['data'])
    in_database.type = new_hist['type']
    in_database.save()
    return histogram_status(f'updated hist {id}')

@mutation.field("deleteHistogram")
def delete_histogram(*_, id):
    #TODO: Error handling for nonexistent histogram
    Histogram.objects.get(id=id).delete()
    return histogram_status(f'deleted hist {id}')

def histogram_status( message):
    return {'message': message}

def clean_hist_input( hist ):
    '''Takes histogram input from graphQL resolver and prepares to put it into the database
    '''
    return {
            'id': hist['id'],
            'data': int_to_commsep( hist.get('data') ),
            'nbins': hist['nbins'],
            'type': hist.get('type'),
            }

def int_to_commsep( list_of_ints ):
    '''Converts a list of integers into a comma separated integer list
    '''
    if list_of_ints:
        return ','.join([str(i) for i in list_of_ints])
    else:
        return '0'

def commsep_to_int( string ):
    '''Converts a string of comma separated integers into a list of ints
    '''
    return [int(x) for x in string.split(',')]