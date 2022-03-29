from ariadne import ObjectType
from .models import Histogram

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
    return clean_hist['id']

@mutation.field("updateHistogram")
def update_histogram(*_, id, hist):
    #TODO: Error handling for nonexistent histogram
    data = clean_hist_input(hist).get('data')
    in_database = Histogram.objects.get(id=id)
    in_database.data = data
    in_database.nbins = len(data)
    in_database.save()
    return id

@mutation.field("deleteHistogram")
def delete_histogram(*_, id):
    Histogram.objects.get(id=id).delete()
    return id

def clean_hist_input( hist ):
    return {
            'id': hist['id'],
            'data': int_to_commsep( hist.get('data') ),
            'nbins': hist['nbins']
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