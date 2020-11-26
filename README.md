# Search Engine to search for Dubai Municipality services using Image / Voice recognition

 
![Dubai Municipality Logo](https://github.com/dubaimunicipalityitd/ImageRecognitionAI/blob/main/dmLogo.png)


## About the project

This project contains a search engine to find Dubai municipality services data based on Image and Voice recognition presented from Information Technology department, Dubai Municipality.


## Functionality

The Image and audio data processing takes place in 3 main sequences in order to return successful search hits.

- Label Detection from images using Google's Cloud Vision API. Voice recognition using Google's speech to text API. 
- Keywords Extraction using Rapid Automatic Keyword Extraction algorithm.
- Fuzzy searches using Elastic Search component to retrieve matched services.



The base 64 encoded image data is sent to Google Vision API for annotation and feature detection. Using Machine learning models, the images are classified and labels identifiying objects, locations etc in the image data are returned in the response body.

The Audio files are sent to Google's Voice to Text API for speech recognition. The API uses machine learning models to transcribe the audio files to text in real time. The request to the API will contain the WAV file and specifies Google's 'command_and_search' machine model to transcribe short voice speeches to text. The response will contain the transcribed words.

As next step, The images labels or Voice texts are run through a keyword extraction module as part of Natural Language processing. The code uses 'Retext-Keywords' javascript plugins that use the RAPID Automatic Keyword Extraction algorithm. Candidate Keywords and phrases are extracted.

The services data is stored within an Elastic Search program. It performs fast searches using indexing and custom text analysers. The keywords are sent to Elastic search as query strings. They undergo a process of tokenization and normalization. Services details that match the normalized keywords are returned as successful hits in the response.


## Technology/ Platform details

The code is built on Node.js V8.13 platform. It employes Elastic Search V1.7.3 downloadable at https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.3.zip
