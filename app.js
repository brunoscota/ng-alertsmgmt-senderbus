var azure = require('azure');
require('dotenv').load();
var serviceBusService = azure.createServiceBusService();

sendMessage = async function () {
   
    var message = {
        body: '!!!TESTE!!!-NGPROXY_US/NGProxyUS_Filas_Status_Erro is CRITICAL',
        customProperties: {
            hostname: "NGPROXY_US",
            service: "NGProxyUS_Filas_Status_Erro",
            address: "127.0.0.1",
            state: "CRITICAL",
            datetime: "10-10-2018 22:46:31",            
            additionalInfo: "SQLGENERIC CRITICAL - 1"
        }
    };
    
    for (i = 0;i < 5;i++) {      
        await serviceBusService.sendTopicMessage(process.env.TOPIC, message, function(error) {
          if (error) {
            console.log(error);
          }
          console.log("Mensagem Enviada: "+JSON.stringify(message));
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