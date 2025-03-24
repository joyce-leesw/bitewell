# generate a base layer for the Lmabda functions

# remove the container first (if it exists)
docker rm bitewell-layer-container || true

# build the base layer
docker build -t base-layer .

# rename it to bitewell-layer-container
docker run --name bitewell-layer-container base-layer

# copy the generated zip artifact so our CDK can use it
docker cp bitewell-layer-container:layer.zip . && echo "Created layer.zip with updated base layer."