#!/usr/bin/env bash

# change to script's directory
cd "$(dirname "$0")/eosio_docker"

if [ -e "data/initialized" ]
then
  script="./scripts/continue_blockchain.sh"
else
  script="./scripts/init_blockchain.sh"
fi

echo "=== run docker container from the eosio-agro:eos2.0.0-cdt1.6.3 image ==="
docker run --rm --name eosio_container -d \
-p 8888:8888 -p 9876:9876 \
--mount type=bind,src="$(pwd)"/contracts,dst=/opt/eosio/bin/contracts \
--mount type=bind,src="$(pwd)"/scripts,dst=/opt/eosio/bin/scripts \
--mount type=bind,src="$(pwd)"/data,dst=/mnt/dev/data \
-w "/opt/eosio/bin/" eosio-agro:eos2.0.0-cdt1.6.3 /bin/bash -c "$script"

if [ "$1" != "--nolog" ]
then
  echo "=== follow eosio_container logs ==="
  docker logs eosio_container --follow
fi
