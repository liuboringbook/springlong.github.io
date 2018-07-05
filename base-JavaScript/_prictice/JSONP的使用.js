
//Ajax��������
/*=================================================================
 *ʵ��ԭ��1. ����Ŀ�������Ӧ�õ���JSONPЭ�飬���е�Ajax�����ͨ��scriptԪ�ؽ��м��أ��Ӷ�����XmlHttpRequestЭ�鲻�ɿ���ľ����ԣ�
 *          2. ��������������������Ŀ��URLʱ����Ҫ����һ������������ʾ�ص����������ơ�������ͨ��Ϊcallback�����磺http://www.studytest.com/jsonptest/?a=1&b=2&callback=jsonphandle����
 *          3. ���������յ�������˵����󲢴�����Ϻ�����ͨ����JSON��ʽ���з��أ����磺{"a":1, "b":2}��
 *          4. �������ڽ�������ظ��������ʱ����Իص��������ƵĲ��������жϡ�����������Ժ������õ���ʽ���з��أ��磺jsonphandle({"a":1, "b":2})������ֱ�ӷ���JSON���ݡ�
 *---------------------
 *���ߣ���Ȫ
 *QQ��569320261
 *---------------------
 *����˵����
 *1. url: �����ͣ�string���ر��������url��ַ���ص�����������ʹ��=?����
 *2. charset�������ͣ�string����ѡ���ļ����룬Ĭ��Ϊutf-8�����û������������Ҫ����Ϊgb2312����gbk�Ļ������Բ����øò������ű����Զ������жϴ�����
 *3. callback�������ͣ�fcuntion���ر����ص�����
 *==================================================*/
Extend.getJSON = function(url, charset, callback)
{
    /*�����Լ������Ĵ���*/
    var callName, script, head = document.getElementsByTagName("head")[0];
    if(typeof(charset) !== "string")
    {
        //���charset��������Ϊ�ַ��������ʾΪ����ָ��������Ϊ�ص�����
        callback = charset;
        charset = "utf-8";
    }

    /*���ȫ�ֻص�����*/
    callName = "jsonpcallback_" + new Date().getTime();
    window[callName] = callback;

    /*script��ǩ��������*/
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", charset);
    script.setAttribute("async", "true");
    script.setAttribute("src", url.replace("=?", "=" + callName));

    /*script������Ϻ������������*/
    if("onload" in script)
    {
        //��׼ģʽ��IE9+��Firefox��Chrome��Safari��Opera
        script.onload = function()
        {
            head.removeChild(this);
            delete window[callName];
        }
    }
    else
    {
        //IE6/7/8
        script.onreadystatechange = function()
        {
            var state = this.readyState;
            if(state === "loaded" || state === "complete")
            {
                head.removeChild(this);
                window[callName] = null; //�޷�ʹ��delete����ɾ��
            }
        }
    }

    /*����script����*/
    head.appendChild(script);
}