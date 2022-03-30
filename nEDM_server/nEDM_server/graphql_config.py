from ariadne import make_executable_schema, load_schema_from_path, gql
from histograms.schema import query as h_query
from histograms.schema import mutation as h_mutation
from histograms.schema import datetime_scalar
from ariadne_jwt import GenericScalar
from users.schema import mutation as u_mutation

schema_files = ["nEDM_server/schema.graphql", 
                "histograms/schema.graphql",
                "users/schema.graphql"]

type_defs = []



for file in schema_files:
    type_defs.append( gql( load_schema_from_path(file) ) )

schema = make_executable_schema(type_defs, 
                                h_query, h_mutation, 
                                u_mutation, GenericScalar,
                                datetime_scalar,)
