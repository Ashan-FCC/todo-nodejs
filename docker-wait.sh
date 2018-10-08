#!/bin/bash
set -e

timeout=${DOCKER_RUN_MAX_WAIT_SECS:=120}
sleep_interval=3

timeout_or_wait() {
  if [[ $(( timeout -= $sleep_interval )) -lt 0 ]] ; then
    echo "Timeout while waiting for linked containers to start"
    exit -1
  fi
  echo $1
  sleep $sleep_interval
}

tcp_connect()
{
  (echo > /dev/tcp/$1/$2) >/dev/null 2>&1
  return $?
}

while ! tcp_connect cache 6379; do
  timeout_or_wait "waiting for cache"
done

$@
