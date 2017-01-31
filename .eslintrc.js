module.exports = {

    "parser": "babel-eslint",
    "env": {

        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {

        "ecmaFeatures": {

            "experimentalObjectRestSpread": true,
            "modules": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [

        "react",
        "react-native",
    ],
    "rules": {

        "indent": [

            "error",
            "tab"
        ],
        "linebreak-style": [

            "error",
            "windows",
        ],
        "quotes": [

            "error",
            "double"
        ],
        "semi": [

            "error",
            "always"
        ],
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
    }
};