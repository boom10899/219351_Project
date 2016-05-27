import re
listbook = []
with open('list', 'r') as content_file:
	list_of_file = content_file.readlines()
	# print(x for i in list_of_file)
	# list_of_file = ['10001.txt','wldsp10.txt']
	print (len(list_of_file))
	content=''
	for x in list_of_file:
		x= x.split('\n')[0]
		# print(x)
		Q = open('./Downloads/GTBTXT/'+x,'r')
		try: 
			Z = Q.read()	
			# try:
			# 	name_of_book =	x.replace('.txt','')
			# 	# name_of_book = Z.split('Title: ')[1].split('\n')[0].replace(' ','_').replace('\n','').replace('\r','')
			# 	content = Z.replace('\n',' ')
			# 	# print("x")
				
			# except:
			name_of_book =	x.replace('.txt','')
			content = Z.replace('\n',' ').replace('\r','').replace('\t',' ')
			content = re.sub(' +',' ',content)			
			listbook.append(name_of_book)

			output = name_of_book+"\t"+content
			file = open('./NewBook/'+str(name_of_book),'w+')
			file.write(output)
			file.close()	
		except:
			print("error : "+x)
				
print(len(listbook))
print(len(list (set(listbook))))
