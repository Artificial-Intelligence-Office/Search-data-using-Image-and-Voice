# Search Engine to search for Dubai Municipality services using Image / Voice recognition

 
![Dubai Municipality Logo](https://github.com/dubaimunicipalityitd/ImageRecognitionAI/blob/main/dmLogo.png)


## About the project

This project contains a Search Engine application that retrieves information on Dubai Municipality services using Image and Speech analysis based on machine learning.  To faciliate its usage, it exposes a simplified REST web service API that is consumed by the 'Dubai Municipality' Mobile app available in Apple Store and Google Play respectively. The project is presented from Information Technology Department, Dubai Municipality.


## Functionality

The Image and audio data processing takes place in 3 main sequences in order to return successful search hits of services data.

- Labels Detection in the captured images using Google's Cloud Vision API. Voice recognition from audio data using Google's speech to text API. 
- Keywords Extraction from the response text of above API calls using the Rapid Automatic Keyword Extraction algorithm.
- Fuzzy searches with the help of an Elastic Search component to retrieve matched services information for the user.


The base 64 encoded image data from the client app is sent to Google Vision API for annotation and feature detection. Using Machine learning models, the images are classified and labels identifiying objects, locations etc in the image data are returned in the response body.

Similarly, the Audio files are sent to Google's Voice to Text API for speech recognition. The API uses machine learning models to transcribe the audio data to text in real time. The request to the API will contain the WAV file and employs Google's 'command_and_search' machine model to transcribe short voice speeches to text. The response will contain the transcribed words.

As next step, The images labels or Voice texts are run through a keyword extraction module as part of Natural Language processing. The code operates with 'Retext-Keywords' javascript plugins that uses the RAPID Automatic Keyword Extraction algorithm to extract Candidate Keywords and phrases.

The services metadata is stored within the Elastic Search program. It performs fast searches using indexing and custom text analysers. The keywords are sent to Elastic search as query strings. They undergo a process of tokenization and normalization. Services details that match the normalized keywords are returned as successful hits in the response.


## Technology/ Platform details

The code is built on Node.js V8.13 platform. It employes Elastic Search V1.7.3 downloadable at https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.3.zip
