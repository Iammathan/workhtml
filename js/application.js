//OUR PROCESS ANIMATION

var currentCount=0;
            
//circles function start
var circles = function(target_element_id, options) {
                    
    this.target_element_id=target_element_id;
    this.milliSecond=parseInt(options.milliSecond) || 3000; 
    this.circleClassName=options.circleClassName || ""; 
    this.circleSubClassName=options.circleSubClassName || ""; 
    this.totalCircleCount=parseInt(options.totalCircleCount); 
    this.callback=options.callback; 
    this.circleElements=document.getElementsByClassName(this.circleClassName);
    
    /*** circle elements ***/
    
    this.totalCircles = document.getElementsByClassName(this.circleClassName).length;
    this.currentCircleIndex = 0;
    this.nextCircleIndex = 0;
    
    //Every 3 seconds the circle index will change from n to n+1
    
    window.setInterval("timeOut()",this.milliSecond);
    
    
    //circles.prototype=function(){
//    window.setInterval("timeOut()",this.milliSecond);
    //}
    
    timeOut = function() {
        
       // console.log("start ", this.currentCircleIndex);
        
        var currentIndex = this.currentCircleIndex,
            nextIndex  = this.currentCircleIndex + 1,
            previousIndex = this.currentCircleIndex - 1,
            totalCircleIndex = totalCircles - 1;
        
        if(nextIndex > totalCircleIndex) {
            nextIndex = 0;
        }
        
        if(previousIndex === -1) {
            previousIndex = totalCircleIndex;
        }
        
        
        
        $(this.circleElements[currentIndex]).addClass("circle-fade-out");
        $(this.circleElements[currentIndex]).removeClass("circle-fade-in");
        
        this.callback(currentIndex, totalCircleIndex);
        
        $(this.circleElements[previousIndex]).addClass("circle-fade-in");
        $(this.circleElements[previousIndex]).removeClass("circle-fade-out");
        
        setTimeout("subTimeOut('"+currentIndex+ "','"+previousIndex+ "')",2000);
        
        this.currentCircleIndex = nextIndex;
    
    };
    subTimeOut=function(currentCirlceIndex, previousCircleIndex){
        var subcircleElements=document.getElementsByClassName(this.circleSubClassName);
        
        $(subcircleElements[currentCirlceIndex]).addClass("move-left-to-right");
        $(subcircleElements[previousCircleIndex]).removeClass("move-left-to-right");
    };
    
//circles function end
};

//CIRCLE EFFECT CALLBACK FUNCITON()
function ourProcessCallback(currentSectionIndex, totalCircleIndex)
{

    var previewsSectionIndex = currentSectionIndex  - 1;
    
    if(previewsSectionIndex === -1) {
        previewsSectionIndex = totalCircleIndex;
    }
    
    //console.log("::::CURRENT SECTION >>>>>>"+currentSectionIndex);
    //console.log("::::PREVIOUS SECTION >>>>>>"+previewsSectionIndex);
    
    $("#processMsg"+previewsSectionIndex).hide();
    $("#processMsg"+currentSectionIndex).show();
}

//SCROLLS CALLBACK FUNCTIONS
function changeSelectionHandler(current_section_id) {
    console.log("call back functions for scroll sections::"+current_section_id); 
    if(current_section_id !=null && current_section_id === "#services")
    {
        document.getElementById("sidebar").style.boxShadow="1px 3px 3px -2px #ccc";
    }
    if(current_section_id !=null && current_section_id === "#home")
    {
        document.getElementById("sidebar").style.boxShadow="";
    }
                
}

//GENTRAL CONTACT US FIELDS
//COMMON VARIABLE
var creator_auth_token="1ebf718eafefd3705cd0969cd8f6f3fc";
var creator_formid="2034959000000012017";
var creator_form_sharedby="contact280";
function validateContact()
{
    var name,email,query;
    if(getIdObj("Input-Name") != null && getIdObj("Input-Name").value != "")
    {
        name=getIdObj("Input-Name").value;
        if(getIdObj("Input-Email") != null && getIdObj("Input-Email").value != "")
        {
            email=getIdObj("Input-Email").value;
            if(getIdObj("Input-Name") != null && getIdObj("Input-Name").value != "")
            {
                query=getIdObj("businessneed").value;
                sendRequest("https://creator.zoho.com/api/contact280/json/contactus/form/contactus/record/add/","contactCallback",{Name:name, Email:email,businessneed:query,formid:creator_formid,sharedBy:creator_form_sharedby,authtoken:creator_auth_token,scope:"creatorapi"},"POST");
            }
            else
            {
                alert("Please enter your business needs");
                return false;
            }
        }
        else
        {
            alert("Please enter your Email Address"); 
            return false;
        }
    }
    else
    {
        alert("Please enter your Name");
        return false;
    }
}

//AJAX REQUEST SENDER
function sendRequest(url,callback,paramObj,requestType)
{
    $.ajax({
    type: requestType,
    url: url,
    data: paramObj,
    complete: function(){
        
    $("#Input-Name").val("");
    $("#Input-Email").val("");
    $("#businessneed").val("");
    alert("Thanks for submit your message.please check your mail for further.");
    
   },
    success: callback
//    dataType: dataType
});
}


//COMMON GET ID RETURN FUNCTION
function getIdObj(idd)
{
    return document.getElementById(idd);
}

function contactCallback(result)
{
    alert("Thanks for submit your message.please check your mail for further.")
}
