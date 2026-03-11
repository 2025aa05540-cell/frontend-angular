As step 1:
Jenkins builds Angular
        ↓
Jenkins copies dist/ → /var/www/html/
(needs write permission = chown jenkins)
        ↓
Nginx reads /var/www/html/
(needs read permission = chmod 755)
        ↓
User visits http://20.244.84.188
        ↓
Nginx serves index.html ✅
Angular app loads! 🎉

sudo chown -R jenkins:jenkins /var/www/html
sudo chmod -R 755 /var/www/html
ls -la /var/www/
