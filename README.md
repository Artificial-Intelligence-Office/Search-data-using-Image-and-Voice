# Search Engine to search for Dubai Municipality services using Image / Voice recognition

 
![Dubai Municipality Logo](https://github.com/dubaimunicipalityitd/ImageRecognitionAI/blob/main/dmLogo.png)


## About the project

This project contains a search engine to find Dubai municipality services data based on Image and Voice recognition from Information Technology department, Dubai Municipality


## Functionality

The functionality consists of 4 major components 

- Label Extraction from images and text recognition from Voice using Google cloud vision/speech to text APIs
- Keywords Extraction using Rapid Automatic Keyword Extraction algorithm
- Fuzzy searches using Elastic Search component
- return of matched Dubai Municipality Services


The base 64 encoded image data is sent to Google Vision API for annotation and feature detection. Using Machine learning models, the images are classified and labels identifiying objects, locations etc in the image data are returned in the response body.
As next step. The labels are run through a keyword extraction module as part of Natural Language processing. The code uses 'Retext-Keywords' javascript plugins using RApid Automatic Keyword Extraction algorithm. Candidate Keywords or phrases are extracted.

The services data is stored and indexed within an Elastic Search program. It performs fast searches using indexing and text analysis. The keywords are sent to Elastic search as query strings. They undergo a process of tokenization and normalization. Services details that match the query are returned as successful hits in the response.


## Technology/ Platform details

The code is built on Node.js V8.13 platform. It employes Elastic Search V1.7.3 downloadable at https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.3.zip
