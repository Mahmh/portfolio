#!/bin/bash
if [ "$1" == "--prod" ]; then
    echo 'Running production server'
    sudo COMPOSE_BAKE=true docker compose -f compose.yml up --build -d
elif [ "$1" == "--staging" ]; then
    echo 'Running staging server'
    sudo COMPOSE_BAKE=true docker compose -f compose.staging.yml up --build
else
    echo 'Running dev server'
    sudo COMPOSE_BAKE=true docker compose -f compose.dev.yml up --build
fi