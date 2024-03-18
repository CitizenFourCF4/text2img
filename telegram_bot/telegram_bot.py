import telebot
from dotenv import load_dotenv
import os

load_dotenv()
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
PATH_TO_IMAGE = os.environ.get("PATH_TO_IMAGE")

bot = telebot.TeleBot(TELEGRAM_BOT_TOKEN)





text = ''

@bot.message_handler(content_types=['text'])
def start(message):
    if message.text == '/gen':
        bot.send_message(message.from_user.id, "Введите запрос, по которому вы хотите сгенерировать изображение")
        bot.register_next_step_handler(message, generate_image) #следующий шаг – функция generate_image
    elif message.text == "/help":
         bot.send_message(message.from_user.id, "Здравствуйте, этот бот создан для генерации изображения по текстовому описанию. Для его использования введите /gen и после получения ответа от бота введите текстовое сообщение, на основании которого вы хотите получить картинку!")
    else:
        bot.send_message(message.from_user.id, 'Напишите /help')

def generate_image(message): #получаем запрос и отправляем изображение
    global text
    text = message.text
    image_path = os.path.join(PATH_TO_IMAGE, 'inage.jpg')
    bot.send_photo(message.from_user.id, photo=open(image_path, 'rb'))




bot.polling(none_stop=True, interval=0)