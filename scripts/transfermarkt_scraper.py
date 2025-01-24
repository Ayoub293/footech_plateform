from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.service import Service
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options
from pymongo import MongoClient
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# إعداد Selenium
options = Options()
options.headless = True  # تشغيل المتصفح بدون واجهة رسومية
service = FirefoxService("/usr/local/bin/geckodriver")  # تأكد من صحة المسار

# فتح المتصفح
driver = webdriver.Firefox(service=service, options=options)

# الانتقال إلى صفحة الدوري المصري
url = 'https://www.transfermarkt.com/egyptian-premier-league/startseite/wettbewerb/EGY1'  # رابط الدوري المصري
driver.get(url)

# الانتظار قليلاً حتى يتم تحميل الصفحة بالكامل
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//table[@class="items"]/tbody/tr')))

# استخراج قائمة اللاعبين من الصفحة الحالية
players = driver.find_elements(By.XPATH, '//table[@class="items"]/tbody/tr')

# تخزين البيانات في MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["football_database"]
collection = db["players"]

# استخراج البيانات لكل لاعب
for player in players:
    try:
        name = player.find_element(By.XPATH, './/td[@class="hauptlink"]/a').text
        team = player.find_element(By.XPATH, './/td[@class="verein"]/a').text
        age = player.find_element(By.XPATH, './/td[@class="zentriert"][1]').text  # استخراج العمر
        position = player.find_element(By.XPATH, './/td[@class="pos"]/text()').text  # استخراج المركز
        
        # إضافة البيانات إلى MongoDB
        collection.insert_one({
            "name": name,
            "team": team,
            "age": age,
            "position": position,
        })
    except Exception as e:
        print(f"Error extracting data for player: {e}")

# التعامل مع الصفحات المتعددة إذا كانت موجودة
next_button = driver.find_elements(By.XPATH, '//a[@class="nextPrev next"]')
if next_button:
    next_button[0].click()
    time.sleep(5)  # الانتظار لفتح الصفحة التالية

# إغلاق المتصفح بعد انتهاء العملية
driver.quit()
