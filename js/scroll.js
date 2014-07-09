(function() {
    var scrolls = function(target_element_id, options) {			
//        console.log(":::START:::");
        registerEvent = function(target_element, eventName, context, bubble) {
            target_element.addEventListener(eventName, context, bubble);
        };
		
        Scrolls	=	function(target_element_id, options) {
			
            this.target_element_id = target_element_id;
			
            //extract the options hash
			
            this.section_class          =	options.section_class || "section";
            this.active_link_class 	=	options.active_link_class || "active";
            this.scrollable_element_id 	=	options.scrollable_element_id;
            this.scrollabel_area		=	window.document;
			
            //callback method
            this.changeSelectionHandler = options.changeSelectionHandler;
			
            this.initScrolls();
        }
		
        Scrolls.prototype = {
			
            initScrolls: function() {
				
                this.target_element = document.getElementById(this.target_element_id);
				
                //Get tab header links - <a>
                this.links = this.target_element.getElementsByTagName("a");
//                console.log("::this.links ::::"+this.links );
				
                this.scrollable_element = document.getElementById(this.scrollable_element_id);
                this.sections = this.scrollable_element.getElementsByClassName(this.section_class);
				
                //map the links and sections
				
                var _sections 	= this.sections,
                _links 		= this.links,
                _section_id, _link_href, tmp = {};
				
                for(var i = 0; i < _sections.length; i++) {
                    _section_id = "#"+_sections[i].id;
                   // console.log("::::::: _seciotn_id   "+_section_id);
					
                    for(var j = 0; j < _links.length; j++) {
                        _link_href = _links[j];
						
                        if(_section_id === _link_href.getAttribute("href")) {
                            tmp[_section_id] = _links[j];
//                            console.log(":::::tep ::::"+tmp)
                        }
                    }
                }
				
                
                /*
                 * the hash will be like this
                     {<section_id> : <header_link_elemenr>}
                     
                     example: 
                     tmp = { 
                     "#header": "<a href="#header">header</a> 
                     "#body": "<a href="#body">header</a> 
                     "#footer": "<a href="#footer">header</a> 
                     }
                 */
                this.sectionsAndLinksHash = tmp;
                
				
                //register scroll event;
				
                registerEvent(this.scrollabel_area, "scroll", this, false);
            },
			
            //default event hanlder for addEventListener;
			
            handleEvent: function (e) {
                this._handleScrollEvent(e);
                e.preventDefault;
            },
			
            _handleScrollEvent: function(e) {
             //   console.log("DEBUG :::: _handleScrollEvent ");
				
                var sections            =	this.sections,
                scrolledHeight		=	this.scrollabel_area.body.scrollTop,
                currentSectionStartPos	=	0,
                currentSectionHeight	=	0,
                currentSectionEndPos	=	0,
                currentSection;
                
                for(var i = 0; i < sections.length; i++) {
                   // console.log(":::sections[i]    "+sections[i])
                    currentSection 			=	sections[i];
                    currentSectionHeight 	=	currentSection.clientHeight;
                    currentSectionEndPos 	=	currentSectionStartPos + currentSectionHeight;
					
                    if(scrolledHeight >= currentSectionStartPos && scrolledHeight <= currentSectionEndPos) {
//                        console.log("DEBUG CHECK :::")
                        this.handleSelection(currentSection);
                        
                        break;
                    }
                    currentSectionStartPos =   currentSectionEndPos;             
                }
				
            },
            handleSelection: function(currentSection) {
                
              //  console.log(":::sectionsAndLinksHash::::"+this.sectionsAndLinksHash);
                var _prev_section_id = this.current_section_id,
                _current_section_id = "#"+currentSection.id;
				
                if(_prev_section_id) {
                    var previous_link_ele = this.sectionsAndLinksHash[_prev_section_id];
                    previous_link_ele.className = "";							//removes the active class;
                }		
                
				
				
                var current_link_ele = this.sectionsAndLinksHash[_current_section_id];
//                console.log(":::current_link_ele    "+current_link_ele);
                current_link_ele.className = this.active_link_class;
                this.current_section_id = _current_section_id;
				
                if(_prev_section_id !== _current_section_id) {	
                    if(typeof this.changeSelectionHandler === "function") {
                        this.changeSelectionHandler(_current_section_id);
                    }
                }
            }
        }
		
        new Scrolls(target_element_id, options);
    }
	
    window.scrolls = scrolls;			//Sets scrolls as global
}());

//scrolls("top-band", {"scrollable_element_id" : "scrollable_area"});

//scrolls("top-band", {"scrollable_element_id" : "content"});
