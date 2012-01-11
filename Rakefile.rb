require 'rubygems'
require 'mongo'

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

task :refreshTestData => [:eraseTestData] do
  
  puts `node web/data/loadTestData.js`
  
end     

task :eraseTestData do

  @conn = Mongo::Connection.new
  @db   = @conn['mobileMingle']
  @coll = @db['journeys']
  @coll.remove
  
end
