function $(id){return (typeof(id) == "string") ? document.getElementById(id) : id;}

var data_ele = $("area_outer");
if(data_ele)
{
	var html = '<table id="areaTable">';
	html += '	<tr class="tr_header">';
	html += '		<th>';
	html += '			<span>ʡ/��</span>';
	html += '			<span class="a"><a href="javascript:void(0)" target="_self" onclick="area_addAll()">ȫ�����</a></span>';
	html += '		</th>';
	html += '		<th>';
	html += '			<span>��ѡ����λ��</span>';
	html += '			<span class="a"><a href="javascript:void(0)" target="_self" onclick="area_clearAll()">ȫ��ɾ��</a></span>';
	html += '		</th>';
	html += '	</tr>';
	html += '	<tr class="tr_data">';
	html += '		<td class="td_data_source">';
	html += '			<div id="area_source"></div>';
	html += '		</td>';
	html += '		<td class="td_data_destination">';
	html += '			<div id="area_destination"></div>';
	html += '		</td>';
	html += '	</tr>';
	html += '	<tr class="tr_control">';
	html += '		<td>';
	html += '			<button id="area_submit">���</button>';
	html += '			<button id="area_reset" onclick="area_clearAll()">ȡ��</button>';
	html += '		</td>';
	html += '		<td class="save">';
	html += '			<button id="area_save">����</button>';
	html += '			<button id="area_recover">�ָ�</button>';
	html += '		</td>';
	html += '	</tr>';
	html += '</table>';
	html += '<div id="area_reault"></div>';
	data_ele.innerHTML = html;

	document.writeln("<style type=\"text/css\">");
	document.writeln("#areaTable{overflow:hidden;width:800px;height:320px;color:#333;background:#F7FCFF;}");
	document.writeln("#areaTable a{text-decoration:underline;color:#217CD3;}");
	document.writeln("#areaTable tr,#areaTable th,#areaTable td{border:1px solid #DCE4E7;}");
	document.writeln("#areaTable th{width:50%;overflow:hidden;}");
	document.writeln("#areaTable .tr_header{height:35px;background:#F9F9F9;}");
	document.writeln("#areaTable .tr_header span{float:left;display:inline;width:295px;height:35px;line-height:35px;font-weight:normal;text-align:center;}");
	document.writeln("#areaTable .tr_header span.a{width:100px;border-left:1px solid #DCE4E7;}");
	document.writeln("#areaTable .tr_data{height:250px;}");
	document.writeln("#areaTable .td_data_source{background:#E8F6FF;}");
	document.writeln("#areaTable .td_data_source div{z-index:1;width:380px;height:250px;overflow-x:visible;overflow-y:scroll;background:#fff;}");
	document.writeln("#areaTable .td_data_source li{float:left;display:inline;overflow:visible;width:83px;height:30px;padding-left:8px;border-bottom:1px solid #DCE4E7;line-height:30px;}");
	document.writeln("#areaTable .td_data_source li.hover{font-weight:bold;color:#FF0D0D;}");
	document.writeln("#areaTable .td_data_source li.sele{font-weight:bold;color:#E8A51F;}");
	document.writeln("#areaTable .td_data_source li input{height:28px;outline:none;margin-right:2px;vertical-align:middle;}");
	document.writeln("#areaTable .td_data_source li ul{position:absolute;left:80px;top:0;z-index:10;display:none;overflow-x:hidden;overflow-y:auto;width:120px;height:248px;border:1px solid #DB9B15;font-size:12px;background:#fff;}");
	document.writeln("#areaTable .td_data_source li ul li{overflow:hidden;width:115px;height:25px;padding-left:5px;border-bottom:0;line-height:25px;}");
	document.writeln("#areaTable .td_data_source li.hover ul li,#areaTable .td_data_source li.sele ul li{font-weight:normal;color:#333;}");
	document.writeln("#areaTable .td_data_source li ul li input{height:23px;}");
	document.writeln("#areaTable .td_data_destination{background:url(images/arrow_right.png) no-repeat 8px center;}");
	document.writeln("#areaTable .td_data_destination div{position:relative;width:341px;height:250px;padding-left:55px;overflow-x:hidden;overflow-y:scroll;}");
	document.writeln("#areaTable .td_data_destination li{float:left;display:inline;overflow:visible;width:368px;height:auto;border:1px solid #DCE4E7;border-width:1px 0 0 1px;line-height:30px;background:#fff;}");
	document.writeln("#areaTable .td_data_destination li span{position:relative;float:left;display:inline;width:275px;height:30px;text-indent:20px;}");
	document.writeln("#areaTable .td_data_destination li.all span{font-weight:bold;}");
	document.writeln("#areaTable .td_data_destination li span strong{position:absolute;left:0;top:0;width:20px;font-size:14px;text-indent:0;text-align:center;color:#0389C9;cursor:pointer;}");
	document.writeln("#areaTable .td_data_destination li a{float:left;display:inline;width:40px;height:30px;}");
	document.writeln("#areaTable .td_data_destination li ul li{height:30px;border-left:0;}");
	document.writeln("#areaTable .td_data_destination li ul li span{text-indent:40px;}");
	document.writeln("#areaTable .tr_control{height:35px;}");
	document.writeln("#areaTable .tr_control td.save{text-align:right;}");
	document.writeln("#areaTable .tr_control button{width:50px;height:26px;border:1px solid #898D90;border-radius:2px;margin-left:10px;background:#F8FAF7;}");
	document.writeln("#areaTable .tr_control button:hover{color:#2189CE;background:#DBDEDE;}");
	document.writeln("#areaTable .tr_control button#area_recover{margin-right:25px;}");
	document.writeln("#area_reault{overflow:auto;width:790px;height:60px;padding:5px;border-top:1px solid #DCE4E7;line-height:20px;}");
	document.writeln("</style>");

	//���浱ǰ����
	$("area_save").onclick = function()
	{
		area_saveData();
		alert("����ɹ���");
	}
	//�ָ����������
	$("area_recover").onclick = function()
	{
		area_init();
	}

	//�����������
	var data_jsonarea  ={ "options":"[{\"n\":\"������\",\"c\":[\"������\",\"������\",\"������\",\"������\",\"������\",\"��̨��\",\"ʯ��ɽ��\",\"������\",\"��ͷ����\",\"��ɽ��\",\"ͨ����\",\"˳����\",\"��ƽ��\",\"������\",\"������\",\"ƽ����\",\"������\",\"������\"]},{\"n\":\"�Ϻ���\",\"c\":[\"������\",\"¬����\",\"�����\",\"������\",\"������\",\"������\",\"բ����\",\"�����\",\"������\",\"������\",\"��ɽ��\",\"�ζ���\",\"�ֶ�����\",\"��ɽ��\",\"�ɽ���\",\"������\",\"�ϻ���\",\"������\",\"������\"]},{\"n\":\"�����\",\"c\":[\"��ƽ��\",\"�Ӷ���\",\"������\",\"�Ͽ���\",\"�ӱ���\",\"������\",\"������\",\"������\",\"�����\",\"������\",\"������\",\"������\",\"������\",\"������\",\"������\",\"������\",\"������\",\"����\"]},{\"n\":\"������\",\"c\":[\"������\",\"������\",\"������\",\"��ɿ���\",\"������\",\"ɳƺ����\",\"��������\",\"�ϰ���\",\"������\",\"��ʢ��\",\"˫����\",\"�山��\",\"������\",\"ǭ����\",\"������\",\"�뽭��\",\"������\",\"ͭ����\",\"������\",\"�ٲ���\",\"�ɽ��\",\"��ƽ��\",\"�ǿ���\",\"�ᶼ��\",\"�潭��\",\"��¡��\",\"����\",\"����\",\"������\",\"�����\",\"��ɽ��\",\"��Ϫ��\",\"ʯ����\",\"��ɽ��\",\"������\",\"��ˮ��\",\"������\",\"�ϴ���\",\"������\",\"�ϴ���\"]},{\"n\":\"�ӱ�ʡ\",\"c\":[\"ʯ��ׯ��\",\"��ɽ��\",\"�ػʵ���\",\"������\",\"��̨��\",\"������\",\"�żҿ���\",\"�е���\",\"������\",\"�ȷ���\",\"��ˮ��\"]},{\"n\":\"ɽ��ʡ\",\"c\":[\"̫ԭ��\",\"��ͬ��\",\"��Ȫ��\",\"������\",\"������\",\"˷����\",\"������\",\"�˳���\",\"������\",\"�ٷ���\",\"������\"]},{\"n\":\"���ɹ�\",\"c\":[\"���ͺ�����\",\"��ͷ��\",\"�ں���\",\"�����\",\"ͨ����\",\"������˹��\",\"���ױ�����\",\"�����׶���\",\"�����첼��\",\"�˰���\",\"���ֹ�����\",\"��������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"������\",\"��ɽ��\",\"��˳��\",\"��Ϫ��\",\"������\",\"������\",\"Ӫ����\",\"������\",\"������\",\"�̽���\",\"������\",\"������\",\"��«����\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"������\",\"��ƽ��\",\"��Դ��\",\"ͨ����\",\"��ɽ��\",\"��ԭ��\",\"�׳���\",\"�ӱ߳�����������\"]},{\"n\":\"������\",\"c\":[\"��������\",\"���������\",\"������\",\"�׸���\",\"˫Ѽɽ��\",\"������\",\"������\",\"��ľ˹��\",\"��̨����\",\"ĵ������\",\"�ں���\",\"�绯��\",\"���˰������\"]},{\"n\":\"����ʡ\",\"c\":[\"�Ͼ���\",\"������\",\"������\",\"������\",\"������\",\"��ͨ��\",\"���Ƹ���\",\"������\",\"�γ���\",\"������\",\"����\",\"̩����\",\"��Ǩ��\"]},{\"n\":\"�㽭ʡ\",\"c\":[\"������\",\"������\",\"������\",\"������\",\"������\",\"������\",\"����\",\"������\",\"��ɽ��\",\"̨����\",\"��ˮ��\"]},{\"n\":\"����ʡ\",\"c\":[\"�Ϸ���\",\"�ߺ���\",\"������\",\"������\",\"��ɽ��\",\"������\",\"ͭ����\",\"������\",\"��ɽ��\",\"������\",\"������\",\"������\",\"������\",\"������\",\"������\",\"������\",\"������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"������\",\"������\",\"������\",\"Ȫ����\",\"������\",\"��ƽ��\",\"������\",\"������\"]},{\"n\":\"����ʡ\",\"c\":[\"�ϲ���\",\"��������\",\"Ƽ����\",\"�Ž���\",\"������\",\"ӥ̶��\",\"������\",\"������\",\"�˴���\",\"������\",\"������\"]},{\"n\":\"ɽ��ʡ\",\"c\":[\"������\",\"�ൺ��\",\"�Ͳ���\",\"��ׯ��\",\"��Ӫ��\",\"��̨��\",\"Ϋ����\",\"������\",\"̩����\",\"������\",\"������\",\"������\",\"������\",\"������\",\"�ĳ���\",\"������\",\"������\"]},{\"n\":\"����ʡ\",\"c\":[\"֣����\",\"������\",\"������\",\"ƽ��ɽ��\",\"������\",\"�ױ���\",\"������\",\"������\",\"�����\",\"�����\",\"�����\",\"����Ͽ��\",\"������\",\"������\",\"������\",\"�ܿ���\",\"פ�����\"]},{\"n\":\"����ʡ\",\"c\":[\"�人��\",\"��ʯ��\",\"ʮ����\",\"�˲���\",\"�差��\",\"������\",\"������\",\"Т����\",\"������\",\"�Ƹ���\",\"������\",\"������\",\"��ʩ����������������\",\"������\",\"Ǳ����\",\"������\",\"��ũ������\"]},{\"n\":\"����ʡ\",\"c\":[\"��ɳ��\",\"������\",\"��̶��\",\"������\",\"������\",\"������\",\"������\",\"�żҽ���\",\"������\",\"������\",\"������\",\"������\",\"¦����\",\"��������������������\"]},{\"n\":\"�㶫ʡ\",\"c\":[\"������\",\"�ع���\",\"������\",\"�麣��\",\"��ͷ��\",\"��ɽ��\",\"������\",\"տ����\",\"ï����\",\"������\",\"������\",\"÷����\",\"��β��\",\"��Դ��\",\"������\",\"��Զ��\",\"��ݸ��\",\"��ɽ��\",\"������\",\"������\",\"�Ƹ���\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"������\",\"������\",\"������\",\"������\",\"���Ǹ���\",\"������\",\"�����\",\"������\",\"��ɫ��\",\"������\",\"�ӳ���\",\"������\",\"������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"������\",\"��ָɽ��\",\"����\",\"������\",\"�Ĳ���\",\"������\",\"������\",\"������\",\"�Ͳ���\",\"������\",\"�ٸ���\",\"��ɳ����������\",\"��������������\",\"�ֶ�����������\",\"��ˮ����������\",\"��ͤ��������������\",\"������������������\",\"��ɳȺ��\",\"��ɳȺ��\",\"��ɳȺ���ĵ������亣��\"]},{\"n\":\"�Ĵ�ʡ\",\"c\":[\"�ɶ���\",\"�Թ���\",\"��֦����\",\"������\",\"������\",\"������\",\"��Ԫ��\",\"������\",\"�ڽ���\",\"��ɽ��\",\"�ϳ���\",\"üɽ��\",\"�˱���\",\"�㰲��\",\"������\",\"�Ű���\",\"������\",\"������\",\"���Ӳ���Ǽ��������\",\"���β���������\",\"��ɽ����������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"����ˮ��\",\"������\",\"��˳��\",\"ͭ�ʵ���\",\"ǭ���ϲ���������������\",\"�Ͻڵ���\",\"ǭ�������嶱��������\",\"ǭ�ϲ���������������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"������\",\"��Ϫ��\",\"��ɽ��\",\"��ͨ��\",\"������\",\"˼é��\",\"�ٲ���\",\"��������������\",\"��ӹ���������������\",\"��ɽ׳������������\",\"��˫���ɴ���������\",\"�������������\",\"�º���徰����������\",\"ŭ��������������\",\"�������������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"��������\",\"ɽ�ϵ���\",\"�տ������\",\"��������\",\"�������\",\"��֥����\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"ͭ����\",\"������\",\"������\",\"μ����\",\"�Ӱ���\",\"������\",\"������\",\"������\",\"������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"��������\",\"�����\",\"������\",\"��ˮ��\",\"������\",\"��Ҵ��\",\"ƽ����\",\"��Ȫ��\",\"������\",\"������\",\"¤����\",\"���Ļ���������\",\"���ϲ���������\"]},{\"n\":\"�ຣʡ\",\"c\":[\"������\",\"��������\",\"��������������\",\"���ϲ���������\",\"���ϲ���������\",\"�������������\",\"��������������\",\"�����ɹ������������\"]},{\"n\":\"����ʡ\",\"c\":[\"������\",\"ʯ��ɽ��\",\"������\",\"��ԭ��\",\"������\"]},{\"n\":\"�½�ʡ\",\"c\":[\"��³ľ����\",\"����������\",\"��³������\",\"���ܵ���\",\"��������������\",\"���������ɹ�������\",\"���������ɹ�������\",\"�����յ���\",\"�������տ¶�����������\",\"��ʲ����\",\"�������\",\"���������������\",\"���ǵ���\",\"����̩����\",\"ʯ������\",\"��������\",\"ͼľ�����\",\"�������\"]},{\"n\":\"̨��ʡ\",\"c\":[\"̨����\",\"������\",\"��¡��\",\"������\",\"̨����\",\"������\",\"̨����\",\"̨����\",\"��԰��\",\"������\",\"������\",\"̨����\",\"�û���\",\"��Ͷ��\",\"������\",\"������\",\"̨����\",\"������\",\"������\",\"������\",\"������\",\"̨����\",\"�����\",\"������\",\"������\"]},{\"n\":\"���\",\"c\":[\"������\",\"����\",\"����\",\"������\",\"��������\",\"������\",\"��ˮ����\",\"�ƴ�����\",\"�ͼ�����\",\"�뵺��\",\"������\",\"����\",\"������\",\"ɳ����\",\"������\",\"������\",\"������\",\"Ԫ����\"]},{\"n\":\"����\",\"c\":[\"�����л���������\",\"������ʥ����������\",\"�����д�����\",\"��������������\",\"�����з�˳����\",\"�����м�ģ����\",\"������ʥ���ø�����\"]},{\"n\":\"����\",\"c\":[]},{\"n\":\"����\",\"c\":[]}]"};
	var data_area = eval(data_jsonarea.options);
	var data_choose = [];                           //����������ѡ������Ĳ���ֵ
	var data_source = $("area_source");             //ԭ���ݴ��DIV
	var data_destination = $("area_destination");   //Ŀ�����ݴ��DIV
	var data_text = "";								//����������ѡ��������ַ������ֵ����ʽΪ��"ʡ1:����1,����2,..,����n;ʡ2:;ʡ3:����1,����2,...,����3"����ѡ���ʡ�����г���ʱ������в��ֵ�����Ϊ�գ��硰ʡ2:;����������Ҫ��������������
	var data_textBak = "";							//��������data_text���ַ�������ֵ	
	var data_result = $("area_reault");				//ѡ��������ʾ��Ŵ�
	data_result.innerHTML = "";

	area_generateStructure();	//��ȡ�������ݣ�������HTML�ṹ
	area_bindEleEvent();		//ΪԪ������¼�������
}

//��ʼ������
function area_init()
{
	if(data_textBak != "")
	{
		var _li = data_source.children[0].children;

		for(var i = 0; i < data_choose.length; i++)
		{
			var isSelected = false; //�����ж�ʡ���Ƿ��е���ѡ��

			var labels = _li[i].getElementsByTagName("label");
			var input_0 = labels[0].getElementsByTagName("input")[0]
			var innerText = getInnerText(labels[0]) ;

			var idx_1 = data_textBak.indexOf(innerText + ":;");
			var idx_2 = data_textBak.indexOf(innerText + ":");
			var n =  (idx_1 != -1 || idx_2 == (data_textBak.length - innerText.length -1)) ? true : false;	//ʡ�ݵ����г����Ƿ��ѱ�ѡ��

			var str_citys = "";
			if(idx_2 != -1 && idx_2 != (data_textBak.length - innerText.length -1) && idx_1 == -1)
			{
				//��ֻѡ���˲��ֳ���
				var idx_end = data_textBak.indexOf(";", idx_2);  //��ʡ�ݳ���ѡ����Ϣ�Ľ���λ�ã�
				str_citys = data_textBak.substring(idx_2 + innerText.length + 1, (idx_end == -1 ? data_textBak.length : idx_end)) + ",";
			}

			data_choose[i].n = n;
			input_0.checked = n;
			isSelected = n;

			var c = data_choose[i].c;
			for(var j = 0; j < c.length; j++)
			{
				var _bool = n ? true : ((str_citys.indexOf(getInnerText(labels[j + 1]) + ",") != -1) ? true : false);
				c[j] = _bool;
				labels[j + 1].getElementsByTagName("input")[0].checked = _bool;
				isSelected = _bool ? true : isSelected;
			}

			if(isSelected)
			{
				input_0.parentLi.className += " sele";
			}
			else
			{
				input_0.parentLi.className = input_0.parentLi.className.replace(/\s*sele/, "");
			}
		}
		area_showDestination();
	}
}

//��������
function area_saveData()
{
	data_textBak = data_text;
}

//ѡ��ȫ��
function area_addAll()
{
	var input = data_source.getElementsByTagName("input");
	for(var i = 0; i < input.length; i++)
	{
		input[i].checked = true;
		input[i].parentLi.className = input[i].parentLi.className.replace(/\s*sele/g, "");
		input[i].parentLi.className += " sele";
		input[i].parentLi.extend = true;
	}

	for(var i = 0; i < data_choose.length; i++)
	{
		var obj = data_choose[i];
		obj.n = true;
		for(var j = 0; j < obj.c.length; j++)
		{
			obj.c[j] = true;
		}
	}

	area_showDestination();
}

//ȡ��ȫ��ѡ��
function area_clearAll()
{
	var input = data_source.getElementsByTagName("input");
	for(var i = 0; i < input.length; i++)
	{
		input[i].checked = false;
		input[i].parentLi.className = input[i].parentLi.className.replace(/\s*sele/g, "");
		input[i].parentLi.extend = true;
	}

	for(var i = 0; i < data_choose.length; i++)
	{
		var obj = data_choose[i];
		obj.n = false;
		for(var j = 0; j < obj.c.length; j++)
		{
			obj.c[j] = false;
		}
	}

	area_showDestination();
}

//�ж��Ƿ�ѡ����Ŀ��ʡ�ݵ����г���
function area_isSeletAll(obj)
{
	var selectNone = true;
	var input = obj.getElementsByTagName("input");
	for(var i = 0; i < input.length; i++)
	{
		if(input[i].checked)
		{
			selectNone = false;
			break;
		}
	}

	if(!selectNone)
	{
		//ֻҪĿ��ʡ���г��д���ѡ��״̬���ͽ�Ŀ��ʡ�ݱ�ʶΪ��sele��
		obj.className = obj.className.replace(/\s*sele/g, "");
		obj.className += " sele";
	}
	else
	{
		//��û�г���ѡ��ʱ��ȡ��ʡ�ݵġ�sele����ʶ
		obj.className = obj.className.replace(/\s*sele/g, "");
		obj.extend = true;
	}
}

//��ȡ�������ݣ�������HTML�ṹ
function area_generateStructure()
{
	var areaInner = "<ul>";
	for(var i = 0; i < data_area.length; i++)
	{
		data_choose[i] = {};
		data_choose[i].n = false;
		data_choose[i].c = [];
		areaInner += "<li><label><input type='checkbox' />" + data_area[i].n + "</label>";
		if(data_area[i].c.length > 0)
		{
			var citys = data_area[i].c;
			areaInner += "<ul>";
			for(var j = 0; j < citys.length; j++)
			{
				data_choose[i].c[j] = false;
				areaInner += "<li><label><input type='checkbox' />" + citys[j] + "</label></li>";
			}
			areaInner += "</ul>";
		}
		areaInner += "</li>";
	}
	areaInner += "</ul>";
	data_source.innerHTML = areaInner;
}

//ΪԪ������¼�������
function area_bindEleEvent()
{
	var s_ul = data_source.getElementsByTagName("ul");
	var s_li = [];
	if(s_ul.length > 0)
	{
		s_li = s_ul[0].children;
	}
	data_source.s_li = s_li;
	for(var i = 0; i < s_li.length; i++)
	{
		var obj = s_li[i];
		obj.extend = true;			//������ע�Ƿ�ʹ���ֳ���ѡ��ʱ��ʡ�ݴ��ڡ�-��������չ״̬(Ĭ��״̬��Ϊ��չ��ʾ״̬)��
		var input = obj.getElementsByTagName("input");
		input[0].i = i;
		input[0].parentLi = obj;
		input[0].onclick = function()
		{
			data_choose[this.i].n = this.checked;
			if(this.checked)
			{
				this.parentLi.className += " sele";
			}
			else
			{
				this.parentLi.className = this.parentLi.className.replace(/\s*sele/g, "");
				this.parentLi.extend = true;
			}
			var _ul = this.parentNode.parentNode.getElementsByTagName("ul");
			if(_ul.length > 0)
			{
				var _input = _ul[0].getElementsByTagName("input");
				for(var j = 0; j < _input.length; j++)
				{
					_input[j].checked = this.checked;
					data_choose[_input[j].i].c[_input[j].j] = this.checked;
				}
			}
			area_showDestination();
		}
		for(var j = 1; j < input.length; j++)
		{
			input[j].i = i;
			input[j].j = j - 1;
			input[j].parentLi = obj;
			input[j].onclick = function()
			{
				data_choose[this.i].c[this.j] = this.checked;
				if(!this.chekced)
				{
					var parentInput = this.parentLi.getElementsByTagName("input")[0];
					parentInput.checked = false;
					data_choose[parentInput.i].n = false;
				}
				area_isSeletAll(this.parentLi);
				area_showDestination();
			}
		}

		obj.onmouseover = function(e)
		{
			this.className += " hover";
			var citysUL = this.getElementsByTagName("ul");
			if(citysUL.length > 0)
			{
				this.citysUL = citysUL[0];
				this.citys = citysUL[0].children;
				var left = this.getBoundingClientRect().left + this.offsetWidth*0.8 + (document.body.scrollLeft || document.documentElement.scrollLeft);
				var top = (this.parentNode.parentNode.getBoundingClientRect().top > 0) ?  this.parentNode.parentNode.getBoundingClientRect().top : (document.body.scrollTop || document.documentElement.scrollTop);
				citysUL[0].style.display = "block";
				citysUL[0].style.left = left + "px";
				citysUL[0].style.top = top + "px";
			}
		}

		obj.onmouseout = function(e)
		{
			e = e || window.event;
			var target = e.toElement || e.relatedTarget;

			if(!this.contains(target))
			{
				this.className = this.className.replace(/\s*hover/g, "");
				if(this.citys)
				{
					this.citysUL.style.display = "none";
				}
			}
		}
	}
}

//��ʾ����ѡ����
function area_showDestination()
{
	var _li = data_source.children[0].children;
	var areaInner = "<ul>";
	data_text = "";
	for(var i = 0; i < data_area.length; i++)
	{
		if(data_choose[i].n)
		{
			//ѡ����ȫʡ����
			areaInner += "<li class='all'><span>" + data_area[i].n + "</span> <a href='javascript:void(0)' target='_self' del='" + i + "'>ɾ��</a></li>";
			data_text += data_area[i].n + ":;";
		}
		else
		{
			//ѡ���˲��ֳ���
			var liText = "";
			var dText = "";	//����Ŀ������
			var citys = data_choose[i].c;
			for(var j = 0; j < citys.length; j++)
			{
				if(citys[j])
				{
					liText += "<li><span>" + data_area[i].c[j] + "</span> <a href='javascript:void(0)' target='_self' del='" + i + "," + j + "'>ɾ��</a></li>";
					dText += data_area[i].c[j] + ",";
				}
			}
			if(liText != "")
			{
				liText = "<ul" + (_li[i].extend ? "" : " style='display:none;'") + ">" + liText + "</ul>";
				liText = "<li><span><strong>" + (_li[i].extend ? "-" : "+") + "</strong>" + data_area[i].n + "</span>" + liText + "</li>";
			}
			if(dText != "")
			{
				data_text += data_area[i].n + ":" + dText.substring(0, dText.length - 1) + ";"
			}
			areaInner += liText;
		}
	}
	areaInner += "</ul>";
	data_destination.innerHTML = areaInner;
	data_text = data_text.substring(0, data_text.length - 1);
	data_result.innerHTML = data_text;

	var _a = data_destination.getElementsByTagName("a");
	for(var i = 0; i < _a.length; i++)
	{
		_a[i].onclick = function()
		{
			var del = this.getAttribute("del");
			var checkBox = null;
			if(del.indexOf(",") == -1)
			{
				checkBox = data_source.s_li[del].getElementsByTagName("input")[0];
			}
			else
			{
				checkBox = data_source.s_li[del.split(",")[0]].getElementsByTagName("ul")[0].getElementsByTagName("input")[del.split(",")[1]];
			}
			checkBox.checked = false;
			checkBox.onclick.call(checkBox);
			area_showDestination();
		}
	}
	var _s = data_destination.getElementsByTagName("strong");
	for(var i = 0; i < _s.length; i++)
	{
		_s[i].onclick = function()
		{
			var _t = this.innerHTML == "-";
			this.parentNode.parentNode.getElementsByTagName("ul")[0].style.display = _t ? "none" : "block";
			this.innerHTML = _t ? "+" : "-";
			data_source.children[0].children[this.parentNode.parentNode.getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("del").split(",")[0]].extend = _t ? false : true;
		}
	}
}

//���ڻ�ȡĿ��Ԫ�صĴ��ı�����
function getInnerText(id)
{
	var obj = $(id);
	if(obj)
	{
		return ("innerText" in obj) ? obj.innerText : obj.textContent;
	}
}