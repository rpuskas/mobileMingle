task :copyToPhoneGapWWW => [:cleanPhoneGapWWW] do 
             
  puts `cp -r web/client* phoneGap/mobileMingle/www` 
  Rake::Task['updateBaseURL'].invoke
                      
end   

task :cleanPhoneGapWWW do
 
 puts `rm -rf phoneGap/mobileMingle/www/*`  
 
end     

task :updateBaseURL do
   
  indexPath = 'phoneGap/mobileMingle/www/index.html'
  text = File.read(indexPath)
  more = text.gsub(/(^\s*<base href=")(.*)("\/>$)/,'\1\3')
  File.open(indexPath, "w"){|f| f.puts more } 

end     
