#!/bin/bash

# Replace blank space in filename with _
for f in *\ *; do mv "$f" "${f// /_}"; done
