cd /var/www/production/plugins/dist/combined
echo Flushing combined plugins cache...
find ./ -type f -name \*.js -delete
echo done!