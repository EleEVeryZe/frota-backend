#!/bin/bash
echo "Testing endpoint"
     curl -4 http://localhost:4000/api/v1/users -v \
          -H "Content-type: application/json" \

echo -e "\n\nPress Enter to close this window..."
read