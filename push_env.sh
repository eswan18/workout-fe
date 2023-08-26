#!/bin/bash

# This script takes all environment secrets from Infisical and pushes them to Vercel.

# Staging
echo "Pushing staging environment secrets..."
printf "\n"
data=$(infisical export -f dotenv -e staging)
for line in $data; do
    # Split the line on the equal sign into name and value
    IFS='=' read -r name value <<< "$line"
    # Strip single quotes from the value
    value=$(echo $value | sed "s/'//g")

    # This step might fail if the environment variable doesn't exist yet -- no big deal.
    echo "Removing old value for $name..."
    vercel env rm -y $name preview staging

    echo "Pushing new value for $name... "
    echo "$value" | vercel env add $name preview staging
    # If the above step failed, that's a problem and we should halt.
    if [ $? -ne 0 ]; then
        echo "Failed to push $name to production. Exiting."
        exit 1
    fi
    echo "Done"
    printf "\n"
done


# Production
echo "Pushing production environment secrets..."
printf "\n"
data=$(infisical export -f dotenv -e prod)
for line in $data; do
    # Split the line on the equal sign into name and value
    IFS='=' read -r name value <<< "$line"
    # Strip single quotes from the value
    value=$(echo $value | sed "s/'//g")

    # This step might fail if the environment variable doesn't exist yet -- no big deal.
    echo "Removing old value for $name..."
    vercel env rm -y $name production

    echo "Pushing new value for $name... "
    echo "$value" | vercel env add $name production
    # If the above step failed, that's a problem and we should halt.
    if [ $? -ne 0 ]; then
        echo "Failed to push $name to production. Exiting."
        exit 1
    fi
    echo "Done"
    printf "\n"
done