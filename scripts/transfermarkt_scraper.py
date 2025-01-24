from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup
import time
from pymongo import MongoClient

# إعدادات Selenium (اختياري: استخدام وضع بدون واجهة رسومية)
options = Options()
options.headless = True  # تشغيل في الخلفية (بدون واجهة)

# مسار geckodriver
service = Service("/usr/local/bin/geckodriver")
driver = webdriver.Firefox(service=service, options=options)

# فتح موقع ترانسفير ماركت
driver.get("https://www.transfermarkt.com/")

# انتظار تحميل الصفحة بالكامل (يمكنك تعديل الوقت حسب سرعة الإنترنت)
time.sleep(3)

# البحث عن الدوري المصري
search_box = driver.find_element(By.NAME, "s")
search_box.send_keys("Egyptian Premier League")
search_box.send_keys(Keys.RETURN)

# انتظار تحميل نتائج البحث
time.sleep(3)

# الدخول على صفحة الدوري المصري
league_link = driver.find_element(By.PARTIAL_LINK_TEXT, "Egyptian Premier League")
league_link.click()

# انتظار تحميل صفحة الدوري
time.sleep(3)

# استخراج HTML للصفحة
soup = BeautifulSoup(driver.page_source, "html.parser")

# استخراج البيانات (مثل اسم اللاعب، النادي، القيمة السوقية)
players = []
player_elements = soup.find_all("tr", class_="odd") + soup.find_all("tr", class_="even")

for player in player_elements:
    name = player.find("td", class_="hauptlink").get_text(strip=True)
    club = player.find("td", class_="zentriert").find_next("a").get_text(strip=True)
    market_value = player.find("td", class_="rechts").get_text(strip=True)

    player_data = {
        "name": name,
        "club": club,
        "market_value": market_value
    }

    players.append(player_data)

# أغلق المتصفح بعد جمع البيانات
driver.quit()

# اتصال بـ MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["egyptian_league"]
collection = db["players"]

# إدخال البيانات إلى MongoDB
collection.insert_many(players)

print(f"تم جلب {len(players)} لاعبًا بنجاح!")
