#!/bin/bash

for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)
   VALUE="${ARGUMENT:${#KEY}+1}"
   VALUE="${VALUE//&/%26}"
   export "$KEY"="$VALUE"
done

PARSE_MODE="HTML"
HEADER="<b>UPDATE ⚙️</b>"
WHAT_CHANGED="<b>WHAT CHANGED?</b>"

if [ -z "$DETAILS" ]; then
   DETAILS="Developer left no comments"
fi

MESSAGE="$HEADER%0A%0A$PR_TITLE%0A%0A$WHAT_CHANGED%0A$DETAILS%0A%0A<code>repo</code> | $REPOSITORY_NAME%0A<code>user</code> | $DEVELOPER_LOGIN"
curl -s -X POST "https://api.telegram.org/bot$BOT_API_KEY/sendMessage" -d chat_id=$CHAT_ID -d text="$MESSAGE" -d parse_mode="$PARSE_MODE"
