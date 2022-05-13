import pandas as pd

import re, string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer

from joblib import load
rf = load("rf.joblib")
tfidf_vectorizer = load("tfidf_vectorizer.joblib")

# convert symbols to words
def convert_symbols(problem_string):
    
    symbol_map = {
        "%": " percent ",
        "$": " dollar ",
        "△": " triangle ",
        "|": " absolute ",
        "+": " plus ",
        "-": " minus ",
        "=": " equal ",
        ":": " ratio ",
        "/": " divide ",
        "*": " multiply "
    }
    
    for symbol_key, symbol_value in symbol_map.items():
        problem_string = problem_string.replace(symbol_key, symbol_value)
        
    return problem_string

#convert to lowercase, strip and remove punctuations
def preprocess(text):
    text = text.lower() 
    text = text.strip()  
    text = re.compile('<.*?>').sub('', text) 
    text = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', text)  
    text = re.sub('\s+', ' ', text)  
    text = re.sub(r'\[[0-9]*\]',' ',text) 
    text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
    text = re.sub(r'\d',' ',text) 
    text = re.sub(r'\s+',' ',text) 
    return text

# STOPWORD REMOVAL
def stopword(string):
    a= [i for i in string.split() if i not in stopwords.words('english')]
    return ' '.join(a)

#LEMMATIZATION
# Initialize the lemmatizer
wl = WordNetLemmatizer()
 
# This is a helper function to map NTLK position tags
def get_wordnet_pos(tag):
    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN
    
# Lemmatizes the sentence
def lemmatizer(string):
    word_pos_tags = nltk.pos_tag(word_tokenize(string)) # Get position tags
    a = [wl.lemmatize(tag[0], get_wordnet_pos(tag[1])) for idx, tag in enumerate(word_pos_tags)] # Map the position tag and lemmatize the word/token
    return " ".join(a)


def finalpreprocess(string):
    return lemmatizer(stopword(preprocess(string)))

def vectorize(processed_series):
    return tfidf_vectorizer.transform(processed_series.values.astype('U'))

def predict_label(input):
    input_series = pd.Series(input)
    converted_series = input_series.apply(convert_symbols)
    processed_series = converted_series.apply(finalpreprocess)
    features = vectorize(processed_series)
    label = rf.predict(features)

    return pd.DataFrame({"question": input_series, "label": label}).to_dict(orient="records")