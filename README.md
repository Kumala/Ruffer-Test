# Ruffer-Test
# Ruffer Technical Test
run npm install 
# Install cucumber
npm install cucumber@1.3.3 --save-dev
#add chai-datetime assertion
npm install chai-datetime
# To run specific feature file:
cucumber.js features/customer-validation
# if the test not running with cucumber.js, please use cucumber-js
node_modules/.bin/cucumber-js features/customer-validation.feature
