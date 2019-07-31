# Introduction
The mobile app interface of Astro, PwC's cognitive agent. Built on [Ionic Framework](https://ionicframework.com/), runs natively on iOS and Android.

# Getting Started
1. Documentation
 - We've documented a lot of knowledge and process in our [Onboarding Resources](https://docs.google.com/document/d/1OMVhy6OfdWe7upNF7QM7AefVUzqSj-abVVFG7bFPinE) doc.

2. Dependencies
 - Running the iOS build requires Xcode running on a Mac.
 - Running the Android build requires Android Studio, with an AVD built on API 26.
 - All other software dependencies should be installed by default the first time the app is built.

3. Installation process
 -   Install node 10 (LTS) and npm: [https://nodejs.org/](https://nodejs.org/en/)
 -   Install Ionic and Cordova
   `$ npm install -g ionic cordova@8`
 -   Install cocoapods
   `$ sudo gem install cocoapods && pod setup`
 -   clone the repo: [Cogagent-Mobile-Ionic](https://pwc-us-it-domain5.visualstudio.com/Project%20Astro/Pillar%203%20Red%20Team/_git/Cogagent-Mobile-Ionic)
  `$ git clone https://pwc-us-it-domain5.visualstudio.com/Project%20Astro/Pillar%203%20Red%20Team/_git/Cogagent-Mobile-Ionic`
 - Install node-gyp: `$ npm install node-gyp mode-pre-gyp -g`


# Build and Test

To create the finished platform project:

- `$ git reset --hard HEAD && git clean -fdx && git clean -fdx`
- `$ echo $(date) && npm run npm-pre-install && npm run ios-test-build` (where "test" is replaced by your intended environment and "ios" is replaced by your intended platform)

To create a release build, follow the same convention as above. It should look like this:

- `$ git reset --hard HEAD && git clean -fdx && git clean -fdx`
- `$ echo $(date) && npm run npm-pre-install && npm run ios-test-build-release` (where "test" is replaced by your intended environment and "ios" is replaced by your intended platform)

Now you should have an inflated project directory inside `/platforms` of the project root.

- `$ open platforms/ios/ -a Xcode` will open the iOS project in Xcode

To run the app in the simulator:

 - `$ npm install`
 - `$ ionic cordova run ios`
 - `$ ionic cordova run android`
 - When prompted to install project dependencies, proceed by pressing enter
 - You should see the iPhone simulator open and run the app

To test voice to speech:

- Tap the Microphone icon then speak your question
- Note Microphone icon turns from red to gray
- When you're finished speaking, tap the Microphone icon again
- Note Microphone icon turns red, your question is posted as text to the screen, and you should also see a response from the backend.

# Adding Dependencies

Developers: Please make sure that when you install a new @ionic/native package you ensure it is pinned. So the command would look like this if you were installing the device plugin for the first time: `npm install @ionic-native/device@4.20.0`


# Environment Config

As of today (August 22th, 2018) the current Ionic Cordova version doesn’t come with environment configurations by default, so we have to implement ours.
In order to do so, we have to create a webpack configuration file that is going to inherit the one created by ionic-script-add and make some changes to also incorporate other environments that are not the default environment.dev.ts or environment.prod.ts

In order to do this we should follow the next steps:
1-	Open package.json and include what it is going to be the location of our custom configuration file:
2-	"config": {
3-	    "ionic_webpack": "./config/webpack.config.js"
4-	  }

2- Let’s open tsconfig.json and include a new Alias into our code so we can call the environment constant from any place we need our alias under compilerOptions.
"baseUrl": "./src",
    "paths": {
      "@app/env": [
        "environments/environment"
      ]
    }

Note: If you are using a different baseUrl for you project, you need to modify your address of the environment.ts file that is going to hold your declarations.

3- Create the folder with the environment files under the address that we specify in tsconfig.js:

Note: Normally it will be: src/environments
You can create as many environments as you need.

4-	In your environment.ts file we will declare the ENV constant with the template properties that we will be using in the other environment files.
5-	export const ENV = {
6-	    mode: '',
7-	    apiSocket: '',
8-	    authenticate: true
9-	}

Note: The properties that you see here are some examples properties, it doesn’t means that you have to set these. Just take into consideration that when you call a property in this constant, if you don’t have it declare in some of the other environments, the compilation will have an error because it will return undefined.

5-	Create the config folder with the webpack configuration in it:
Note: You should create the file in the same location specified in step number 1 on package.json
6-	var chalk = require("chalk");
7-	var fs = require('fs');
8-	var path = require('path');
9-	var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
10-
11-	var env = process.env.RUN_ENV;
12-
13-	// Default to dev config
14-	if (!env) {
15-	    env = 'dev';
16-	}
17-
18-	useDefaultConfig.prod.resolve.alias = {
19-	  "@app/env": path.resolve(environmentPath('prod'))
20-	};
21-
22-	useDefaultConfig.dev.resolve.alias = {
23-	  "@app/env": path.resolve(environmentPath(env))
24-	};
25-
26-	if (env !== 'prod' && env !== 'dev' && env !== 'stage') {
27-	  useDefaultConfig[env] = useDefaultConfig.dev;
28-	  useDefaultConfig[env].resolve.alias = {
29-	    "@app/env": path.resolve(environmentPath(env))
30-	  };
31-	}
32-
33-	function environmentPath(env) {
34-	  var filePath = './src/environments/environment' + (env === 'prod' ? '.prod' : '.' + env) + '.ts';
35-	  if (!fs.existsSync(filePath)) {
36-	    console.log(chalk.red('\n' + filePath + ' does not exist!'));
37-	  } else {
38-	    return filePath;
39-	  }
40-	}
41-
42-	module.exports = function () {
43-	  return useDefaultConfig;
44-	};

Basically what these lines of code do, is they take the default webpack.config.js from ionic scripts and then we resolve the alias that we want to use to inject the corresponding environment file to the alias that we created in the TypeScript configuration file.

By default the system will use the dev environment, if we want to use the production environment file we still specify it using --prod.

In case that you want to switch environments in your code to use, for example, a stage environment like you can see in the code above. Before you run any of the build commands related to ionic cordova, you should set the temporary bash variable RUN_ENV=<name_of_the_environment>

If the variable it is not specified then all the code will be executed using development configurations.

6- Another solution to execute the run commands for an specific environment is to create a script in the package.json file that we can run using npm run and will execute our needed environment:
-	Just go to package.json and under scripts property enter:
o	“ios-dev-prepare”: “export RUN_ENV=dev && ionic cordova prepare ios” This will ensure that when we run npm run ios-dev-prepare, the environment variable will be there for this run instance.
o	You can specify as many environments and scripts as you need, just keep in mind to enter the run commands to run.
FINALLY:
In order to use you environments in your code work, you only need to import it in your code like this:
import { ENV } from '@app/env';

And then just call whatever you need inside it.

Happy coding!!
