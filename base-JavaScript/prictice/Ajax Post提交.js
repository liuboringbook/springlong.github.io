
    /**
     * Ajax Post�ύ
     * @param  {String} url      �����URL
     * @param  {String} [params]   ���ݵĲ���ֵ
     * @param  {Function} [callBack] �ɹ��ύʱִ�еĻص�����
     * @return {undefined}
     */
    function ajaxPost(url, params, callBack)
    {
        var XHR, isAsync = true;

        //��������������
        if(typeof params === "function"){
            callback = params;
            params = "";
        }
        if(typeof callback !== "function"){
            callback = function(){};
        }

        //�������Ķ���
        if(window.XMLHttpRequest){
            //ΪIE7������IE�汾������Լ���IE���������Ajax���Ŀ�������
            XHR = new XMLHttpRequest();
        }else{
            try{
                //Ϊ���°汾�ķ�7��IE���������xmlHTTP����
                XHR = new ActiveXObject("Msxml2.xmlhttp");
            }catch(e){
                try{
                    //Ϊ���ϰ汾�ķ�7��IE���������xmlHTTP����
                    XHR = new ActiveXObject("Microsoft.xmlhttp");
                }catch(e2){}
            }
        }

        //��������
        XHR.open("post", url, isAsync);  //�������ã�
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //���뷽ʽ��
        XHR.onreadystatechange = function(){
            if(XHR.readyState == 4 && XHR.status == 200){
                callBack(XHR.responseText); //����������Ӧ�ɹ�������������ϣ������Ŀ�괦�����������ݷ���ֵ��Ϊ������
            }
        }
        XHR.send(params || "");
    }