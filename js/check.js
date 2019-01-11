        function resultTerm(){
            $('.choice_term input').click(function(){
                var yearSelected = 'select:first-child option:selected'

                function reset($el, msg){
                    alert(msg)
                    resultToggle._hide()
                    $el.focus();
                };

                function flag(){
                    var idx = 0;
                    $('.choice_term select:enabled').each(function(i){
                        if($(this).find('option:eq(0)').is(':selected')){
                            reset($(this), '값을 선택해주세요')
                            return false;
                        } else if($('.choice_term > div:first-child').find(yearSelected).text() > $('.choice_term > div:nth-child(3)').find(yearSelected).text()){
                            reset($('.choice_term > div:nth-child(3) select:first-child'), '하위 연은 선택 할 수 없습니다.')
                            return false;
                        } else {
                            idx += 1;
                        }
                    })

                    if(idx == $('.choice_term select:enabled').length){
                        return true;
                    }

                };
                
                if(flag()){
                    $('.choice_term select:enabled').each(function(i){
                        var selectedVal = $(this).find('option:selected').text();
                        resultToggle._show();
                        $('.result_term span.visible').eq(i).text(selectedVal);
                    });                
                }
            });
        };