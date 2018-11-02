var inputEvent = (function(d, w, $) {
    var inputEvent = inputEvent || {};
    var sChecked = 'checked'

    var setName = function($this){
    	var name = $this.attr('name');
    	return name;
    };

    //*******************************************************************************
    //체크 박스 
    var checkbox = function() {

        //모두 체크
        var all_chk = function() {
            var checking = function($this, bool) {
                var name = setName($this);
                $('input[name=' + name + ']:checkbox').each(function() {
                    $(this).attr(sChecked, bool);
                });
            };

            $(".all_chk").click(function() {
                var boolean = $(this).attr(sChecked) == sChecked;
                boolean ? checking($(this), boolean) : checking($(this), boolean)
            });
        };

        var checkInit = function() {
            all_chk();
        };

        checkInit();
    };
    //*******************************************************************************

    var setFocus = function(option){
    	switch(option) {
	    	case 'add':
	    		var addFocus = function(){
			    	$('body').addClass('show-focus-outlines');
	    		};
	    		setTimeout(addFocus);
		    break;
		  	case 'remove':
		  		$('body').removeClass('show-focus-outlines');
		    break;
        }
    };

    var focusRing = function(){
        document.addEventListener('keydown', function(e) {
          if (e.keyCode === 9 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) {
            setFocus('add');
          }
        });

        document.addEventListener('click', function(e) {
          setFocus('remove');
        });
    };

    var validation = function() {
    	var actSuccess;
    	var $btn_validation = $('.btn_validation')
	    var fail = function($this){
    		var txt = '선택해주세요';
    		alert(txt);
    		setFocus('add');
    		$this.find('input').eq(0).focus();
    	};

    	var success = function(){
    		// alert('통과')
    		// $btn_validation.attr('href', 'javascript:' + actSuccess + ';')
    	};

/*    	var minimumOne = function($el){
            var chk = $el.find('input[type="checkbox"]');
            var Cnt = 0;
            for (i = 0; i < chk.length; i++) {
                if (chk[i].checked) Cnt += 1;
            }
            if (Cnt == 0) {
                return false;
            } else {
                return true;
            }
        };

        var loop = function($el){
        	var chkCount = 0;

        	var typeChk = function($this, name){
        		var common = function(condition){
        			if (condition) {
                        fail($this);
                        return false;
                    } 
                    return chkCount +=1;
        		};

        		switch($this.find('input').attr('type')){
	    			case 'radio' : 
	    				return common(!$this.find('input:radio[name=' + name + ']').is(':checked'))
	    			break;

	    			case 'checkbox' : 
	    				return common(!minimumOne($this))
	    			break;

	    			case 'text' : 
	    				return common($.trim($this.find('input:text').val()) === '')
	    			break;
	    		}
        	};

        	var loopInit = function(){
        		$el.each(function(){
		    		var name = setName($(this).find('input').eq(0));
		    		return typeChk($(this),name)
		    	});

		    	if(chkCount == $el.length) success();
        	};

        	loopInit();
        };

        $btn_validation.on('click',function(){
        	actSuccess = $(this).attr('data-click');
			loop($('section > div:not(.unnecessary)'));
        });*/



        var sChecking = 'checking',
            sCheckbox = '.checkbox';

        

        var checking = function($el){

            var $unnecessary = $($el).not('.unnecessary');
            
            function select_box($el1) { 
                var chk = $el1.find('input[type="checkbox"]'); 
                chk.css('outline','1px solid blue')
                var Cnt = 0; 
                for(i=0;i<chk.length;i++) { 
                    if(chk[i].checked) Cnt += 1; 
                } 
                if(Cnt==0) { 
                    return false; 
                } 
                else { 
                    return true; 
                };
            };

            var pushResult = function(bool, $box){
                var $result = $box || $('.result');
                setTimeout(function(){
                    var checkingSize = $('.'+sChecking).length;
                    $result.find('.now').text(checkingSize)
                    if(bool){
                        $result.find('.all').text($($el).length);
                        $result.find('.necessary').text($unnecessary.length);
                    }
                })
            };

            var typeCommonAct = function(condition, $element){
                switch(condition){
                    case 'radio' : 
                        var name = $($element.find('input[type=radio]')[0]).attr('name');
                        $element.find('input:radio[name=' + name + ']').each(function(i) {
                            if ($(this).is(':checked')) {
                                $element.addClass(sChecking);
                            } 
                        });
                    break;

                    case 'checkbox' : 
                        setTimeout(function(){
                            if(select_box($element)){
                                $element.addClass(sChecking);
                            } else {
                                $element.removeClass(sChecking);
                            }
                        })
                    break;

                    case 'text' : 
                        if(!$.trim($element.find('input[type="text"]').val()) == "") {
                            $element.addClass(sChecking);
                        } else {
                            $element.removeClass(sChecking);
                        }
                    break;
                }
            };

            var initCheking = function(){
                $('section > div').each(function(i){
                    typeCommonAct($(this).find('input').attr('type'), $(this))
                }); 

                pushResult(true);
            };

            var eventCheking = function(){
                $(document).on('click focus blur keydown keyup', 'input[type="text"], input[type="radio"], input[type="radio"] + label, input[type="checkbox"], input[type="checkbox"] + label, textarea', function(e){
                    typeCommonAct($(this).attr('type') || $(this).prev().attr('type'), $(this).parents($el))
                    pushResult();

                    if($result.find('now').text() === $unnecessary.length) {

                    }
                })

           /*     if(){

                }*/
            };

            initCheking();
            eventCheking();
        };

        

        // checking('section > div:not(.unnecessary)');
        checking('section > div');

    };





    var inputInit = function() {
        checkbox();
        validation();
        focusRing();
    }




    inputEvent.init = function() {
        inputInit();
    };

    return inputEvent;

})(document, window, jQuery);

$(document).ready(function() {
    inputEvent.init();
});