task :copyToPhoneGapWWW do 
             
  puts `cp -r web/* phoneGap/mobileMingle/www`
                      
end   

task :cleanPhoneGapWWW do
 
 puts `rm -rf phoneGap/mobileMingle/www/*`  
 
end     

task :updateBaseURL do

  text = File.read('web/index.html')
  more = text.gsub(/(^\s*<base href=")(.*)("\/>$)/,'\1\3')
  File.open('web/index.html', "w"){|f| f.puts more } 

end