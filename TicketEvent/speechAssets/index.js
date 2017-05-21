/*
 var festivals = '{ "festivals2017" : [' +
 '{ "name":"Flow Festival 2017" , "date":"12th and 13th of August, 2017", "location":"Chasséveld, Breda, The Netherlands" }';
 ']}';

 //festival = JSON.parse(festivals);
 */


var festivals = {
    flowfestival2017 : {
        "name" : "Flow Festival 2017",
        "date": "12th and 13th of August, 2017",
        "location": "Chasseveld, Breda"
    }
};



// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

        if (event.session.application.applicationId !== "amzn1.ask.skill.df405f74-9d5c-496b-9b6f-eb1e0f219046") {
            context.fail("Invalid Application ID");
        }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == "FestivalIntent") {
        handleEventResponse(intent, session, callback);
    } else if (intentName == "AMAZON.YesIntent") {
        handleYesResponse(intent, session, callback);
    } else if (intentName == "AMAZON.NoIntent") {
        handleNoResponse(intent, session, callback);
    } else if (intentName == "AMAZON.HelpIntent") {
        handleGetHelpRequest(intent, session, callback);
    } else if (intentName == "AMAZON.StopIntent") {
        handleFinishSessionRequest(intent, session, callback);
    } else if (intentName == "AMAZON.CancelIntent") {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome to Ticket Event! Would you like to know what the upcoming events are?";

    var reprompt = "Would you like to have some information about the upcoming events?";

    var header = "Ticket Event";

    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
    };

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));

}

function handleEventResponse(intent, session, callback) {
    var festival = intent.slots.Festival.value;

    if (!festivals[festival]) {
        var speechOutput = "This event is not available yet";
        var repromptText = "Try asking about another event";
        var header = "No Event Yet";

        callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText));

    } else {

        var name = festivals[festival].name;
        var date = festivals[festival].date;
        var location = festivals[festival].location;
        var speechOutput1 = " The first upcoming event is " + name + " on " + date + " and the location is: " + location + ". Do you want to hear about other events?";
        var repromptText1 = "Do you want to hear about other events?";
        var header1 = capitalizeFirst(festival);


        var shouldEndSession = false;

        callback(session.attributes, buildSpeechletResponse(header1, speechOutput1, repromptText1, shouldEndSession));
    }
}

function handleYesResponse(intent, session, callback) {

    var festivalName = festivals.flowfestival2017.name;
    var speechOutput = "Great! The first upcoming event is " + festivalName + ". Would you like to buy tickets for " + festivalName + "?";
    var repromptText = "The first upcoming event is ...";
    var header = "First upcoming event";
    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : repromptText
    };

    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession));
    //callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));


    //callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession));

}

function handleNoResponse(intent, session, callback){
    handleFinishSessionRequest(intent, session, callback);
}

function handleGetHelpRequest(intent, session, callback){
    if (!session.attributes){
        session.attributes = {};
    }
    var speechOutput = "I can tell you information about upcoming events";
    var repromptText = speechOutput;
    var shouldEndSession = false;

    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback){
    callback(session.attributes, buildSpeechletResponseWithoutCard("Good bye! Thank you for using Ticket Event!", "", true));

}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}