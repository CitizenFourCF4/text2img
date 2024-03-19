from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from langdetect import detect

def translate(text:str):
    language = detect(text)

    if language == 'ru':
        tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-ru-en")
        model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-ru-en")
    else:
        tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-ru")
        model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-en-ru")
    translator = pipeline('translation', model=model, tokenizer=tokenizer)

    return translator(text)[0]['translation_text']