
#!/usr/bin/env bash
SRC_DIR="ios"
NODE_MODULES="node_modules"
set -ex

    # cd "ios"
    export PATH=$PATH:~./fastlane/bin:/usr/local/bin:/~./npm/bin:/usr/local/bin

    if [ ! -d ${NODE_MODULES} ]; then
        # echo "Project: ${NODE_MODULES}"
        npm install
        npm link
    fi

    export LC_ALL=en_US.UTF-8
    export LANG=en_US.UTF-8
    # fastlane -v
    # npm -v
#     npm run d-b-a
npm run ios



