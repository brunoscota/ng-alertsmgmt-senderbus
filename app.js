var azure = require('azure');
require('dotenv').load();
var serviceBusService = azure.createServiceBusService();

sendMessage = async function () {
   
    var message = {
        body: '',
        customProperties: {
            testproperty: 'TestValue',
            messagenumber: 0
        }
    };
    
    for (i = 0;i < 5;i++) {
        message.customProperties.messagenumber=i;
        message.body='Notification Type: PROBLEM #'+i;        
        await serviceBusService.sendTopicMessage(process.env.TOPIC, message, function(error) {
          if (error) {
            console.log(error);
          }
          console.log("Mensagem Enviada: "+ message.body);
        });
    }


    // serviceBusService.createTopicIfNotExists('opmon',function(error){
    //     if(!error){
    //         // Topic was created or exists
    //         console.log('topic created or exists.');
    //     }
    // });

    // serviceBusService.sendTopicMessage('opmon', message, function(error) {
    //     if (error) {
    //       console.log(error);
    //     }
    //     else{
    //         console.log("Mensagem Enviada: "+ message.body);
    //     }
    //   });
    
    // serviceBusService.sendQueueMessage('opmon', message, function (error) {
    //     if (!error) {
    //         // message sent
    //     }
    // });
    //console.log("Mensagem Enviada: "+ message.body);
}



setInterval(sendMessage, process.env.FETCH_INTERVAL);