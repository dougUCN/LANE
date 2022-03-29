from ariadne import make_executable_schema, load_schema_from_path, gql
from histograms.resolvers import query, mutation
from ariadne_jwt import GenericScalar
from users.resolvers import mutation as ariadne_jwt_mutation

schema_files = ["nEDM_server/schema.graphql", 
                "histograms/schema.graphql",
                "users/schema.graphql"]

type_defs = []

for file in schema_files:
    type_defs.append( gql( load_schema_from_path(file) ) )

schema = make_executable_schema(type_defs, query, mutation, ariadne_jwt_mutation, GenericScalar)