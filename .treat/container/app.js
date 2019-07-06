const WIDGET_STATIC_FILE_BASE = "widget";
const CONFIG_FILE_PATH = `${WIDGET_STATIC_FILE_BASE}/treatconfig.json`;

let CONFIG, TEMPLATE, SCRIPT, STYLE;

let exports = {};
let applications = {};

function loadConfiguration() {
    return new Promise((resolve) => {
        axios.get(CONFIG_FILE_PATH)
            .then(function(data) {
                resolve(data.data);
            });
    })
}

function loadTemplate() {
    return new Promise((resolve) => {
        axios.get(`${WIDGET_STATIC_FILE_BASE}/${CONFIG.template}`)
            .then(function(data) {
                resolve(data.data);
            })
    })
}

function loadScript() {
    return new Promise((resolve) => {
        axios.get(`${WIDGET_STATIC_FILE_BASE}/${CONFIG.script}`)
            .then(function(data) {
                resolve(data.data);
            })
    })
}

function loadStyle() {
    return new Promise((resolve) => {
        axios.get(`${WIDGET_STATIC_FILE_BASE}/${CONFIG.style}`)
            .then(function(data) {
                resolve(data.data);
            })
    })
}

function createApplication() {
    eval(SCRIPT);
    
    const applicationId = new Date().getTime();
    const canvasElement = document.getElementById("canvas");
    const innerAppDiv = document.createElement("div");


    applications[applicationId] = {};

    canvasElement.appendChild(innerAppDiv);
    innerAppDiv.innerHTML += `
        <div id="app-${applicationId}">
            ${TEMPLATE}
        </div>
        <style>
            ${STYLE}
        </style>
    `;

    applications[applicationId]["script"] = exports["default"];

    let dataObject = Object.assign({}, applications[applicationId]["script"].data);
    dataObject.outputs = applications[applicationId]["script"].outputs;
    dataObject.inputs = applications[applicationId]["script"].inputs;

    applications[applicationId].inputs = dataObject.inputs;
    applications[applicationId].outputs = dataObject.outputs;

    applications[applicationId]["app"] = new Vue({
        el: `#app-${applicationId}`,
        data: dataObject,
        methods: applications[applicationId]["script"].methods,
    });

    controlPanel.application = applications[applicationId];
}

loadConfiguration()
    .then(function(configuration) {
        CONFIG = configuration;
        return loadTemplate();
    })
    .then(function(template) {
        TEMPLATE = template;
        return loadScript();
    })
    .then(function(script) {
        SCRIPT = script;
        return loadStyle();
    })
    .then(function(script) {
        STYLE = script;
        createApplication();
    })

let controlPanel = new Vue({
    el: "#control",
    data: {
        application: null
    },
    methods: {
        onInputChange: function(e) {
            this.application.inputs[e.target.name] = e.target.value;
        }
    }
})
