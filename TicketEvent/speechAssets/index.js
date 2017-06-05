/*
 var festivals = '{ "festivals2017" : [' +
 '{ "name":"Flow Festival 2017" , "date":"12th and 13th of August, 2017", "location":"Chasséveld, Breda, The Netherlands" }';
 ']}';

 //festival = JSON.parse(festivals);
 */
if (!counter) {
    var counter = 0;
}

if (!amountoftickets){
    var amountoftickets = 0;
}
if (!phonenumber){
    var phonenumber = "";
}

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

        if (event.session.application.applicationId !== "amzn1.ask.skill.d2ee6d17-355b-4dfb-bd68-0531661a0c11") {
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
    } else if (intentName == "ZeroTicketIntent") {
        handleZeroTicketResponse(intent, session, callback);
    } else if (intentName == "OneTicketIntent") {
        handleOneTicketResponse(intent, session, callback);
    } else if (intentName == "TwoTicketIntent"){
        handleTwoTicketResponse(intent, session, callback);
    } else if (intentName == "ThreeTicketIntent") {
        handleThreeTicketResponse(intent, session, callback);
    } else if (intentName == "FourTicketIntent") {
        handleFourTicketResponse(intent, session, callback);
    } else if (intentName == "FiveTicketIntent") {
        handleFiveTicketResponse(intent, session, callback);
    } else if (intentName == "SixTicketIntent") {
        handleSixTicketResponse(intent, session, callback);
    } else if (intentName == "SevenTicketIntent") {
        handleSevenTicketResponse(intent, session, callback);
    } else if (intentName == "EightTicketIntent") {
        handleEightTicketResponse(intent, session, callback);
    } else if (intentName == "NineTicketIntent") {
        handleNineTicketResponse(intent, session, callback);
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
    var festivalName;
    var speechOutput;
    var repromptText;
    var header;
    var shouldEndSession;
    var sessionAttributes;
    if(counter === 0){
        festivalName = festivals.flowfestival2017.name;
        speechOutput = "Great! The first upcoming event is " + festivalName + ". Would you like to buy tickets for " + festivalName + "?";
        repromptText = "The first upcoming event is " + festivalName + ". Would you like to buy tickets for this event?";
        header = "First upcoming event";
        shouldEndSession = false;
        sessionAttributes = {
            "speechOutput" : speechOutput,
            "repromptText" : repromptText
        };
        counter = 1;
    }
    else if(counter === 1){
        festivalName = festivals.flowfestival2017.name;
        speechOutput = "Okay! How many tickets would you like to buy for " + festivalName + " ?";
        repromptText = "Would you like to buy tickets for " + festivalName + " ?";
        header = "First upcoming event";
        shouldEndSession = false;

        sessionAttributes = {
            "speechOutput" : speechOutput,
            "repromptText" : repromptText
        };
        counter = 2;
    }

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
    var speechOutput = "I can tell you information about upcoming events. Would you like to hear about events?";
    var repromptText = speechOutput;
    var shouldEndSession = false;

    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback){
    callback(session.attributes, buildSpeechletResponseWithoutCard("Good bye! Thank you for using Ticket Event!", "", true));

}

function handleZeroTicketResponse(intent, session, callback){
    if (counter===2){
        if (amountoftickets===0){
            speechOutput = "Okay! It seems like you don't want to buy a ticket. Would you like to hear about the upcoming events?";
            repromptText = "Would you like to hear about the upcoming events?";
            header = "Zero tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };

        }
        counter = 0;
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "0";
        }

        else if(phonenumber.length === 10){
            phonenumber.toString();
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));

}

function handleOneTicketResponse(intent, session, callback){
    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy one ticket. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be one ticket for you. The price for one ticket is 20 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for one ticket is 20 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "1";
        }

        else if(phonenumber.length === 10){
            phonenumber.toString();
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleTwoTicketResponse(intent, session, callback){

    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy two tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be two tickets for you. The price for two tickets is 40 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for two tickets is 200 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "2";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));

}

function handleThreeTicketResponse(intent, session, callback){


    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy three tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be three tickets for you. The price for three tickets is 60 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for three tickets is 60 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "3";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));


}

function handleFourTicketResponse(intent, session, callback){

    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy four tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be four tickets for you. The price for four tickets is 80 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for four tickets is 80 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "4";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));


}

function handleFiveTicketResponse(intent, session, callback){


    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy five tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be five tickets for you. The price for five tickets is 80 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for five tickets is 100 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "5";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));


}

function handleSixTicketResponse(intent, session, callback){


    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy six tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be six tickets for you. The price for six tickets is 120 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for six tickets is 120 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "6";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));


}

function handleSevenTicketResponse(intent, session, callback){

    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy seven tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be seven tickets for you. The price for seven tickets is 140 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for seven tickets is 140 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "7";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));


}

function handleEightTicketResponse(intent, session, callback){

    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy eight tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be eight tickets for you. The price for eight tickets is 160 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for eight tickets is 160 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "8";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));

}

function handleNineTicketResponse(intent, session, callback){

    if(counter === 2){
        if(amountoftickets === 0){
            speechOutput = "Okay! So you would like to buy nine tickets. Could you please say the number of tickets again for confirmation?";
            repromptText = "Could you please say the number of tickets again for confirmation?";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 1;
        }

        else if(amountoftickets === 1){
            speechOutput = "Alright! That'll be nine tickets for you. The price for nine tickets is 180 euro. Please give us your phone number for handling the payment-service.";
            repromptText = "The price for nine tickets is 180 euro. Please give us your phone number for handling the payment-service.";
            header = "Amount of tickets";
            shouldEndSession = false;
            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            amountoftickets = 2;
            counter = 3;
        }
    }

    else if(counter === 3){
        if(phonenumber.length != 10){
            speechOutput = "Give me the next diget of your phone number.";
            repromptText = "enter your phone number!";
            header = "Phone numbert";
            shouldEndSession = false;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
            phonenumber = phonenumber + "9";
        }

        else if(phonenumber.length === 10){
            speechOutput = "Thank you for entering your phone number! Your phone number is:" + phonenumber;
            repromptText = "enter your phone number!";
            header = "Phone number";
            shouldEndSession = false;
            phonenumber = 0;

            sessionAttributes = {
                "speechOutput" : speechOutput,
                "repromptText" : repromptText
            };
        }

    }
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));

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
};