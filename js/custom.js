$(document).ready(addContactEventHandlers);

function addContactEventHandlers(){
    $("#sendMessage").click(validateContactForm);
}

function validateContactForm(){
    const tests = [
        {
            element: "input[name=contactemail]",
            pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: 'must be a valid email address'
        },
        {
            element: "input[name=subject]",
            pattern: /^[a-zA-Z0-9 ]{4,}$/,
            message: "subject can only be letters or numbers, and must be 4 characters"
        },
        {
            element: "textarea[name=message]",
            pattern: /^\w{3,}$/,
            message: "please enter a message of at least 3 characters"
        }
    ];

    if( tests.length === tests.filter( validateInputAndDisplayError).length){
        //send message
        sendEmail();
    }
    // let correctCount = 0;
    // for( let testIndex = 0; testIndex < tests.length; testIndex++){
    //     let thisTest = tests[testIndex];
    //     if(validateInputAndDisplayError( thisTest)){
    //         correctCount++
    //     }
    // }
    // if(correctCount=== tests.length){
    //     //send message
    // }

}

function sendEmail(){
    $.ajax({
        url: 'http://localhost:4444/sendemail',
        data: {
            contactemail: $('input[name=contactemail]').val(),
            subject: $('input[name=subject]').val(),
            message: $('textarea[name=message]').val()
        }
    });
}

function validateInputAndDisplayError(testData){

    const value = $(testData.element).val();
    const result = testData.pattern.test(value);
    if (!testData.pattern.test(value)){
        $(testData.element).next().text(testData.message);
    } else {
        $(testData.element).next().text('');
    }
    return result;
}