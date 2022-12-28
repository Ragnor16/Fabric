from neo4j import GraphDatabase
graphdb=GraphDatabase.driver(uri="bolt://localhost:7687",auth=("neo4j","ironman3"))
session=graphdb.session()
ql="MATCH (x:Person) RETURN x"
nodes=session.run(ql)

for node in nodes:
    print(list(node))
