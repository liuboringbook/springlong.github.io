//��JSON��ʽ�ַ���ת��ΪJSON�����磺{"status":0,"msg":"�Ժ������ӵ����ǵĵ绰����ͨ��������ȫ��ѣ�����Ľ�����"}
Extend.parseJSON = function(str)
{
    try
    {
        if(!str || typeof(str) !== "string")
        {
            return null;
        }
        
        if(window.JSON === undefined)
        {
            return eval("(" + str + ")");
        }
        return window.JSON.parse(str);
    }
    catch(e)
    {
        return null;
    }
}