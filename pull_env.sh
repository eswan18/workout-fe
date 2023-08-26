#!/bin/bash

# This script pulls the local development environment secrets from Infisical.
# Additionally, it lets you switch between a local, staging, or prod api backend for testing.

printf "Pulling local environment secrets from Infisical... "
infisical export -f dotenv -e dev > .env.local
echo "Done"

# These are the variables we need to replace for staging/prod
vars="STATIC_APPLICATION_KEY WORKOUT_API_URL"
pattern=$(echo "$vars" | sed "s/ /\\|/g")

# Check if the user passed the --staging or --prod flag
if [ "$1" == "--staging" ] || [ "$1" == "--prod" ]; then
    if [ "$1" == "--staging" ]; then
        export=$(infisical export -f dotenv -e staging)
        printf "Updating to staging API backend... "
    else
        export=$(infisical export -f dotenv -e prod)
        printf "Updating to prod API backend... "
    fi
    # Keep only the lines that start with the variables we need to replace
    updated_vars=$(echo "$export" | grep -E "^$pattern")
    # We just append to the file and node/nextjs is smart enough to use the last value.
    echo "$updated_vars" >> .env.local
    echo "Done"
fi