#!/bin/bash
cd /home/kavia/workspace/code-generation/quickbite-campus-23999-9ada6926/quickbite_campus
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

