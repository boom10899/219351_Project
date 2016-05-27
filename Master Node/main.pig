REGISTER '/home/ubuntu/project/udfs.py' USING jython AS myudfs;

B = load 'book1line' USING PigStorage('\t') as  (name:chararray,content:chararray);
I = load '$input' as text:chararray;
crossed = CROSS B, I;
gen_crossed = FOREACH crossed GENERATE B::name as book, I::text as text, B::content as content;
filtered = FILTER gen_crossed BY myudfs.regex_find(content,text) == TRUE;

answer = FOREACH filtered GENERATE book,text;

dump answer;
