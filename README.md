# Experiment Widget Template

Welcome to TREAT experiment widget template. You can find some starter code here to help you get started.

To start a development server, run `npm start`.

When you are ready to publish the widget, run `npm run build`.

## Folder Structure

* .treat - Developer tools
* src - Widget source, this is the folder your code will reside
    * treatconfig.json - Widget configuration
    * widget.css - Stylesheet for your widget
    * widget.html - Template for your widget
    * widget.js - Logic for your widget

## Widget Configuration

The first thing you want to do is probably modify the configuration file. The config file is called `treatconfig.json`.

* name - Widget name, you want this to be unique.
* author - Widget author
* template - Template file
* script - Script file
* style - Stylesheet file

## Writing Templates

Widget templates are Vue.js templates. You can use everything that Vue.js supports.

## Writing Logic

Logic are very similar to Vue.js. Inside your script file, you export a default object containing the following keys:

* data - Internal state
* input - Input of the widget
* output - Output of the widget
* methods - Functions to use in your widget

You should never mutate inputs, but feel free to set a default value.