var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var CSDS=require("./CSDS.js");
var client=CSDS.getConection();
CSDS.checkConnection(client,base,function(msg,state,client)
{
	  if(!state)
	      {
		client.unbind();
		throw msg;
	      }
	  else
	     {
	       client.unbind();
	       console.log("Successfull connection");
		console.log("Call any of the modules from here");     
	   } 
}     
);

