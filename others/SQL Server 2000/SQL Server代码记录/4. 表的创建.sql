USE  ���ݿ�����							--�����������ڵ����ݿ�����ƣ����������������ü�[]
GO

Create Table  [�������]					--������������ƣ����������������ü�[]
(
	�ֶ�1  ��������   ������NULL|NOT NULL��,
	�ֶ�2  ��������   ������NULL|NOT NULL��,
	........
	�ֶ�n  ��������	 ������NULL|NOT NULL��,

	Constraint PK_�������� Primary Key(��Ӧ�ֶ�)  Clustered|NONClustered,				--���������������Ϣ�������������ֶ�һͬ��������

	Constraint FK_������� Foreign Key(��Ӧ�ֶΣ� References ���õı�(��Ӧ�ֶ�),		--��������������Ϣ!

	Constraint IX_UNIQUEԼ������ Unique Clustered|NONClustered (UNIQUEԼ��������),   	--���������UNIQUEԼ��

	Constraint CK_�������� Check(����Լ�����ʽ),										--��������ļ���Լ����
) 
On FileGroup		--������������һ�ļ����У�ʡ����Ĭ��Ϊ���ļ��飡
