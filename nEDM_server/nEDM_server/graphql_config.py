from ariadne import make_executable_schema, load_schema_from_path, gql
from histograms.resolvers import query, mutation

schema_files = ["nEDM_server/schema.graphql", 
                "histograms/schema.graphql"]

type_defs = []

for file in schema_files:
    type_defs.append( gql( load_schema_from_path(file) ) )

schema = make_executable_schema(type_defs, query, mutation)