#!/bin/bash

# This script tells Vercel to only build the staging and main branches.
# I copied it from here: https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel#with-environment-variables

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
