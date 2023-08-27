#!/bin/bash

# The API spins down on inactivity. This script pings the API every 30 seconds to keep it alive during development.
# We need to parse the env file and remove single quotes.
api_url=$(cat .env.local | grep WORKOUT_API_URL | tail -1 | awk -F '=' '{print $2}' | sed "s/'//g")

while true; do
    echo "Pinging $api_url"
    curl -X GET --connect-timeout 15 $api_url
    if [ $? -eq 0 ]; then
        echo "API is up"
    else
        echo "API is down"
    fi
    sleep 30
done
```