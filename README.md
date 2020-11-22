# ImageRecognitionAI

A Search Engine application to find matches for  Dubai Municipality services using Image and Voice.

Setting up DM Search Engine on Windows :

.I.	Install Node.js
1.	Install Node.js 8.13 LTS from https://nodejs.org/dist/latest-v8.x/node-v8.13.0-x64.msi
2.	Make sure that Nodejs is added to the system Path environment variable (normally it will be set automatically by the installer, verify just in case) and that you can run the npm command in PowerShell.
3.	Install PM2 packages using npm via : npm install -g pm2 pm2-windows-startup
4.	(Optional) Install Yarn package manager using “npm install -g yarn” command.

.II.	Install JAVA Runtime
•	Install Java 1.8 runtime and make sure it is correctly set in the system Path environment variable.

.III.	Install Elasticsearch
1.	Install ElasticSearch version 1.7.3 from https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.3.zip
2.	decompress the downloaded zip file to where you want to install it.
3.	Set elasticsearch in the system Path environment variable.
4.	Copy “synonyms.txt” from the Search Engine folder to “/elasticsearch-1.7.3/config/” (elasticsearch installation folder).
5.	Start elasticsearch server with PowerShell using the command : elasticsearch
6.	(Recommended) For convenience, you can install elasticsearch as a service :
1.	Go to elasticsearch-1.7.3/bin/
2.	Using Powershell run the program : service.bat install
3.	With Windows + R open the run prompt and enter this command : services.msc
4.	From the list of services, find elasticsearch, start it and then modify its properties so that it will start automatically.


.IV.	Install Node.js dependencies
•	Under the Search Engine folder install Node.js dependencies using : npm install or yarn

.V.	Initialize Elasticsearch index
•	Under the Search Engine package run the initElasticSearch.js script file using the command : node .\initElasticSearch.js
•	At this level if any error occur it must be due to Node.js dependencies or elasticsearch server problem.
.VI.	Run DM Search Engine API
•	Finally just start the DM Search Engine API using PM2 manager via the command:
pm2 start index.js -- 5050

.VII.	Install DM Search Engine as a Windows Service
•	Now that we have our Search Engine started with pm2, the last thing to do is to make it run automatically using :
1.	In a Powershell window run : pm2-windows-startup
2.	Then : pm2 save
•	Now the DM Search Engine will start automatically along with elasticsearch server.
